import { useState, useEffect, useRef } from 'react'
import TerminalShell from './components/terminal/TerminalShell'
import { WorkspaceState, ProcessEvent, TimelineEntry } from './types/terminal'
import { buildInitialState, processCommand } from './lib/terminal-engine'

export default function App() {
  const [state, setState] = useState<WorkspaceState>(() => buildInitialState())
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [activeProcess, setActiveProcess] = useState<ProcessEvent | null>(null)
  const [expandedProcess, setExpandedProcess] = useState<string | null>(null)
  const [cursorVisible, setCursorVisible] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [state.timeline, activeProcess])

  // Focus input
  useEffect(() => {
    const handleClick = () => inputRef.current?.focus()
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const cmd = input.trim()
    setHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)
    setInput('')

    // Start active process
    const processId = `proc-${Date.now()}`
    setActiveProcess({
      id: processId,
      command: cmd,
      status: 'running',
      startTime: Date.now(),
      events: [`> ${cmd}`],
    })

    // Process command with delay to simulate runtime
    setTimeout(() => {
      const result = processCommand(cmd, state)
      
      // Complete the process
      const completedProcess: ProcessEvent = {
        id: processId,
        command: cmd,
        status: result.success ? 'completed' : 'failed',
        startTime: Date.now() - Math.floor(Math.random() * 200 + 50),
        endTime: Date.now(),
        events: [`> ${cmd}`, ...result.events],
        summary: result.summary,
      }
      
      setActiveProcess(null)
      
      // Add to timeline
      const entry: TimelineEntry = {
        id: `tl-${Date.now()}`,
        timestamp: new Date().toISOString(),
        process: completedProcess,
        type: result.type,
      }
      
      setState(prev => ({
        ...prev,
        timeline: [...prev.timeline, entry],
        contextUsage: Math.min(95, prev.contextUsage + Math.random() * 3),
      }))
    }, 300 + Math.random() * 400)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    } else if (e.key === 'k' && e.ctrlKey) {
      e.preventDefault()
      // Ctrl+K — clear timeline
      setState(prev => ({ ...prev, timeline: [] }))
    }
  }

  return (
    <TerminalShell
      state={state}
      input={input}
      activeProcess={activeProcess}
      expandedProcess={expandedProcess}
      cursorVisible={cursorVisible}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      onInputChange={setInput}
      onToggleExpand={setExpandedProcess}
      inputRef={inputRef}
      scrollRef={scrollRef}
    />
  )
}

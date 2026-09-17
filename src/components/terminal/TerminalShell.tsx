import { WorkspaceState, ProcessEvent, TimelineEntry } from '../../types/terminal'

interface TerminalShellProps {
  state: WorkspaceState
  input: string
  activeProcess: ProcessEvent | null
  expandedProcess: string | null
  cursorVisible: boolean
  onSubmit: (e: React.FormEvent) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onInputChange: (value: string) => void
  onToggleExpand: (id: string | null) => void
  inputRef: React.RefObject<HTMLInputElement>
  scrollRef: React.RefObject<HTMLDivElement>
}

export default function TerminalShell({
  state,
  input,
  activeProcess,
  expandedProcess,
  cursorVisible,
  onSubmit,
  onKeyDown,
  onInputChange,
  onToggleExpand,
  inputRef,
  scrollRef,
}: TerminalShellProps) {
  const contextBarWidth = Math.min(100, state.contextUsage)
  
  const gateStatusColor = (status: string) => {
    switch (status) {
      case 'PASS': case 'ACTIVE': case 'STABLE': return 'text-green-400'
      case 'FAIL': case 'BLOCKED': return 'text-red-400'
      case 'OPEN': return 'text-orange-400'
      case 'IN_PROGRESS': return 'text-yellow-400'
      default: return 'text-[#8e8e93]'
    }
  }

  const ciColor = (ci: string) => {
    switch (ci) {
      case 'PASS': return 'text-green-400'
      case 'FAIL': return 'text-red-400'
      default: return 'text-[#8e8e93]'
    }
  }

  const typeColor = (type: string) => {
    switch (type) {
      case 'inspect': return 'text-blue-400'
      case 'audit': return 'text-purple-400'
      case 'gate': return 'text-orange-400'
      case 'query': return 'text-cyan-400'
      default: return 'text-[#8e8e93]'
    }
  }

  // Get last 3 completed processes for the "recent" section
  const recentEntries = state.timeline.slice(-3)

  return (
    <div className="h-screen w-screen bg-[#0b0b0c] text-[#e1e1e6] font-mono text-[13px] flex flex-col overflow-hidden select-none">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <div className="flex-shrink-0 border-b border-[#2a2a2d]">
        {/* Primary identity bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#0b0b0c]">
          <div className="flex items-center gap-3">
            <span className="text-[#ff3b3b] font-bold tracking-wider text-[11px]">LBE</span>
            <span className="text-[#2a2a2d]">·</span>
            <span className="text-[#e1e1e6]">{state.workspace}</span>
            <span className="text-[#2a2a2d]">·</span>
            <span className="text-[#8e8e93]">{state.model}</span>
            <span className="text-[#2a2a2d]">·</span>
            <span className={`font-bold ${state.mode === 'ACT' ? 'text-green-400' : 'text-[#8e8e93]'}`}>
              {state.mode}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[#8e8e93] text-[11px]">
            <span>git <span className="text-[#e1e1e6]">{state.gitBranch}</span></span>
            <span className="text-[#2a2a2d]">·</span>
            <span className="text-green-400">{state.gitDiff}</span>
          </div>
        </div>

        {/* Context bar */}
        <div className="px-4 py-1 bg-[#0f0f10] flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2">
            <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider">ctx</span>
            <div className="flex-1 h-[3px] bg-[#1c1c1f] rounded-full overflow-hidden max-w-[200px]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${contextBarWidth}%`,
                  backgroundColor: contextBarWidth > 80 ? '#ff3b3b' : contextBarWidth > 60 ? '#f59e0b' : '#22c55e',
                }}
              />
            </div>
            <span className="text-[10px] text-[#8e8e93]">{Math.round(contextBarWidth)}%</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="text-[#8e8e93]">gate:</span>
            <span className={`font-bold ${gateStatusColor(state.gate.status)}`}>{state.gate.status}</span>
            <span className="text-[#2a2a2d]">|</span>
            <span className="text-[#8e8e93]">provider:</span>
            <span className={state.providerStatus === 'connected' ? 'text-green-400' : 'text-yellow-400'}>
              {state.providerStatus}
            </span>
          </div>
        </div>

        {/* Ecosystem strip */}
        <div className="px-4 py-1 bg-[#0b0b0c] border-t border-[#1c1c1f] flex items-center gap-2 overflow-x-auto">
          {state.repos.map(repo => (
            <div key={repo.name} className="flex items-center gap-1.5 flex-shrink-0">
              <div className={`w-1.5 h-1.5 rounded-full ${
                repo.gateStatus === 'PASS' || repo.gateStatus === 'ACTIVE' || repo.gateStatus === 'STABLE'
                  ? 'bg-green-500'
                  : repo.gateStatus === 'BLOCKED' || repo.gateStatus === 'FAIL'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`} />
              <span className="text-[10px] text-[#8e8e93]">{repo.shortName}</span>
              <span className={`text-[10px] ${ciColor(repo.ci)}`}>
                {repo.ci === 'PASS' ? '✓' : repo.ci === 'FAIL' ? '✗' : '—'}
              </span>
            </div>
          ))}
          <span className="text-[#2a2a2d] mx-1">|</span>
          <span className="text-[10px] text-[#8e8e93]">
            MCP: <span className="text-blue-400">{state.topology.validatedPass}P</span>
            <span className="text-[#2a2a2d]">/</span>
            <span className="text-red-400">{state.topology.validatedFail}F</span>
          </span>
        </div>
      </div>

      {/* ═══════════════════ TIMELINE ═══════════════════ */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-0">
        {/* Session init block */}
        <div className="mb-4 pb-3 border-b border-[#1c1c1f]">
          <div className="text-[10px] text-[#8e8e93] uppercase tracking-wider mb-1">session</div>
          <div className="text-[12px] text-[#e1e1e6]">{state.sessionId}</div>
          <div className="text-[11px] text-[#8e8e93] mt-0.5">
            workspace-root verified · provider: {state.model} · {state.providerStatus}
          </div>
        </div>

        {/* Gate state */}
        <div className="mb-4 pb-3 border-b border-[#1c1c1f]">
          <div className="text-[10px] text-[#8e8e93] uppercase tracking-wider mb-1">machine gate</div>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${gateStatusColor(state.gate.status)}`}>
              {state.gate.status}
            </span>
            <span className="text-[#2a2a2d]">·</span>
            <span className="text-[#e1e1e6]">{state.gate.activeSlice}</span>
          </div>
          {state.gate.blockedBy && (
            <div className="text-[11px] text-red-400/80 mt-0.5">
              blocked: {state.gate.blockedBy}
            </div>
          )}
        </div>

        {/* Execution timeline header */}
        {state.timeline.length > 0 && (
          <div className="mb-2 flex items-center gap-2">
            <div className="h-px flex-1 bg-[#2a2a2d]" />
            <span className="text-[10px] text-[#8e8e93] uppercase tracking-wider">
              execution timeline · {state.timeline.length}
            </span>
            <div className="h-px flex-1 bg-[#2a2a2d]" />
          </div>
        )}

        {/* Timeline entries */}
        {state.timeline.map((entry) => {
          const isExpanded = expandedProcess === entry.process.id
          const duration = entry.process.endTime 
            ? `${entry.process.endTime - entry.process.startTime}ms`
            : '...'
          
          return (
            <div key={entry.id} className="mb-2">
              {/* Collapsed summary line */}
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-[#141416] px-1 py-0.5 rounded transition-colors"
                onClick={() => onToggleExpand(isExpanded ? null : entry.process.id)}
              >
                <span className={entry.process.status === 'completed' ? 'text-green-400' : 'text-red-400'}>
                  {entry.process.status === 'completed' ? '✓' : '✗'}
                </span>
                <span className={`text-[10px] uppercase ${typeColor(entry.type)}`}>
                  {entry.type}
                </span>
                <span className="text-[#e1e1e6] truncate flex-1">
                  {entry.process.summary || entry.process.command}
                </span>
                <span className="text-[10px] text-[#8e8e93] flex-shrink-0">{duration}</span>
                <span className="text-[10px] text-[#8e8e93]">
                  {isExpanded ? '▾' : '▸'}
                </span>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="ml-5 mt-1 mb-2 pl-3 border-l border-[#2a2a2d] space-y-0.5">
                  {entry.process.events.map((event, i) => (
                    <div key={i} className="text-[11px] text-[#8e8e93]">
                      {event}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}

        {/* Recent processes (collapsed) */}
        {recentEntries.length > 0 && state.timeline.length > 3 && (
          <div className="mt-2 text-[10px] text-[#8e8e93]">
            showing last {recentEntries.length} of {state.timeline.length} entries
          </div>
        )}
      </div>

      {/* ═══════════════════ ACTIVE PROCESS ═══════════════════ */}
      {activeProcess && (
        <div className="flex-shrink-0 border-t border-[#2a2a2d] px-4 py-2 bg-[#0f0f10]">
          <div className="text-[10px] text-[#8e8e93] uppercase tracking-wider mb-1">active process</div>
          <div className="space-y-0.5">
            {/* Show at most 3 runtime event lines */}
            {activeProcess.events.slice(-3).map((event, i) => (
              <div key={i} className="text-[12px] text-[#e1e1e6] flex items-center gap-2">
                {i === activeProcess.events.slice(-3).length - 1 && (
                  <span className="inline-flex gap-0.5">
                    <span className="w-1 h-1 rounded-full bg-[#ff3b3b] animate-pulse" />
                    <span className="w-1 h-1 rounded-full bg-[#ff3b3b] animate-pulse" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 h-1 rounded-full bg-[#ff3b3b] animate-pulse" style={{ animationDelay: '300ms' }} />
                  </span>
                )}
                <span className={i === activeProcess.events.slice(-3).length - 1 ? 'text-[#e1e1e6]' : 'text-[#8e8e93]'}>
                  {event}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════ COMPOSER ═══════════════════ */}
      <div className="flex-shrink-0 border-t border-[#2a2a2d]">
        <form onSubmit={onSubmit} className="px-4 py-2">
          <div className="flex items-center gap-2">
            <span className={`text-[12px] font-bold flex-shrink-0 ${
              activeProcess ? 'text-[#ff3b3b]' : 'text-[#8e8e93]'
            }`}>
              [I]
            </span>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={!!activeProcess}
                placeholder={activeProcess ? 'processing...' : 'Message LBE...'}
                className="w-full bg-transparent text-[#e1e1e6] placeholder-[#8e8e93]/50 outline-none text-[13px] caret-[#ff3b3b]"
                spellCheck={false}
                autoComplete="off"
              />
              {!input && !activeProcess && cursorVisible && (
                <span className="absolute left-0 top-0 w-[7px] h-[16px] bg-[#ff3b3b]/60" />
              )}
            </div>
          </div>
        </form>
        
        {/* Footer bar */}
        <div className="flex items-center justify-between px-4 py-1 bg-[#0f0f10] border-t border-[#1c1c1f]">
          <div className="flex items-center gap-3 text-[10px] text-[#8e8e93]">
            <span>ctx <span className="text-[#e1e1e6]">{Math.round(state.contextUsage)}%</span></span>
            <span className="text-[#2a2a2d]">·</span>
            <span className={`font-bold ${state.mode === 'ACT' ? 'text-green-400' : 'text-[#8e8e93]'}`}>
              {state.mode}
            </span>
            <span className="text-[#2a2a2d]">·</span>
            <span>type <span className="text-[#e1e1e6]">help</span> for commands</span>
          </div>
          <div className="text-[10px] text-[#8e8e93]">
            Ctrl+K clear
          </div>
        </div>
      </div>
    </div>
  )
}

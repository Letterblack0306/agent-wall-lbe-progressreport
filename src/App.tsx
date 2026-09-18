import { useState } from 'react'

export default function App() {
  const [selectedView, setSelectedView] = useState<'landing' | 'react-proto' | 'cockpit' | 'reconciliation' | 'cline-seam' | 'governance'>('landing')

  if (selectedView === 'react-proto') {
    return (
      <div className="h-screen w-screen bg-[#0b0b0c] text-[#e1e1e6] font-mono">
        <div className="fixed top-2 right-2 z-50">
          <button
            onClick={() => setSelectedView('landing')}
            className="px-3 py-1.5 bg-[#1c1c1f] border border-[#2a2a2d] rounded text-xs text-[#8e8e93] hover:text-[#e1e1e6] transition-colors"
          >
            ← Back to Hub
          </button>
        </div>
        <iframe src="/react-terminal.html" className="w-full h-full border-0" title="React Terminal Prototype" />
      </div>
    )
  }

  if (selectedView === 'cockpit') {
    return (
      <div className="h-screen w-screen bg-[#0b0b0c] text-[#e1e1e6] font-mono">
        <div className="fixed top-2 right-2 z-50">
          <button
            onClick={() => setSelectedView('landing')}
            className="px-3 py-1.5 bg-[#1c1c1f] border border-[#2a2a2d] rounded text-xs text-[#8e8e93] hover:text-[#e1e1e6] transition-colors"
          >
            ← Back to Hub
          </button>
        </div>
        <iframe src="/cockpit.html" className="w-full h-full border-0" title="HTML Cockpit Prototype" />
      </div>
    )
  }

  if (selectedView === 'reconciliation') {
    return (
      <div className="h-screen w-screen bg-[#0b0b0c] text-[#e1e1e6] font-mono">
        <div className="fixed top-2 right-2 z-50">
          <button
            onClick={() => setSelectedView('landing')}
            className="px-3 py-1.5 bg-[#1c1c1f] border border-[#2a2a2d] rounded text-xs text-[#8e8e93] hover:text-[#e1e1e6] transition-colors"
          >
            ← Back to Hub
          </button>
        </div>
        <iframe src="/reconciliation.html" className="w-full h-full border-0" title="Reconciliation Document" />
      </div>
    )
  }

  if (selectedView === 'cline-seam') {
    return (
      <div className="h-screen w-screen bg-[#0b0b0c] text-[#e1e1e6] font-mono">
        <div className="fixed top-2 right-2 z-50">
          <button
            onClick={() => setSelectedView('landing')}
            className="px-3 py-1.5 bg-[#1c1c1f] border border-[#2a2a2d] rounded text-xs text-[#8e8e93] hover:text-[#e1e1e6] transition-colors"
          >
            ← Back to Hub
          </button>
        </div>
        <iframe src="/cline-dependency-seam.html" className="w-full h-full border-0" title="Cline Dependency Seam Analysis" />
      </div>
    )
  }

  if (selectedView === 'governance') {
    return (
      <div className="h-screen w-screen bg-[#0b0b0c] text-[#e1e1e6] font-mono">
        <div className="fixed top-2 right-2 z-50">
          <button
            onClick={() => setSelectedView('landing')}
            className="px-3 py-1.5 bg-[#1c1c1f] border border-[#2a2a2d] rounded text-xs text-[#8e8e93] hover:text-[#e1e1e6] transition-colors"
          >
            ← Back to Hub
          </button>
        </div>
        <iframe src="/governance-subagent.html" className="w-full h-full border-0" title="Dual-Agent Governance Pattern" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-[#e1e1e6] font-mono p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#ff3b3b]" />
            <h1 className="text-xl font-bold tracking-tight">LBE WORKSPACE ARTIFACTS</h1>
          </div>
          <p className="text-sm text-[#8e8e93]">
            Reference prototypes and reconciliation documents for the Lockstep Boundary Engine terminal UI
          </p>
        </div>

        {/* Classification notice */}
        <div className="bg-[#141416] border border-[#f59e0b]/40 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-[#f59e0b] text-lg">⚠</span>
            <div>
              <h2 className="text-sm font-bold text-[#f59e0b] mb-1">CLASSIFICATION: VISUAL REFERENCE ONLY</h2>
              <p className="text-xs text-[#8e8e93] leading-relaxed">
                All artifacts in this workspace are <strong className="text-[#e1e1e6]">reference prototypes</strong> with 
                hard-coded state. They have <strong className="text-[#e1e1e6]">NO runtime connection</strong> to the actual 
                LBE runtime, Cline provider, or BirdEye MCP. Production implementation must bind to LBE Runtime Boundary 
                and prove acceptance in a real TTY/ConPTY terminal.
              </p>
            </div>
          </div>
        </div>

        {/* Artifact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* React Terminal Prototype */}
          <button
            onClick={() => setSelectedView('react-proto')}
            className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5 text-left hover:border-[#3b82f6] transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold group-hover:text-[#3b82f6]">React Terminal Prototype</h3>
              <span className="text-[10px] px-2 py-0.5 bg-yellow-900/40 text-yellow-400 rounded border border-yellow-800">
                REFERENCE
              </span>
            </div>
            <p className="text-xs text-[#8e8e93] mb-3 leading-relaxed">
              Interactive terminal UI with command system. Demonstrates visual hierarchy, 
              process projection, and [I] composer from the locked Sep 5 contract.
            </p>
            <div className="text-[10px] text-[#8e8e93] space-y-1">
              <div>• React + TypeScript + Tailwind</div>
              <div>• Interactive commands: help, status, repos, audit, blockers, plan</div>
              <div>• Hard-coded state (no runtime transport)</div>
              <div>• Missing AUDIT mode (canonical requires PLAN/ACT/AUDIT)</div>
            </div>
            <div className="mt-3 text-[10px] text-[#3b82f6]">
              Open →
            </div>
          </button>

          {/* HTML Cockpit */}
          <button
            onClick={() => setSelectedView('cockpit')}
            className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5 text-left hover:border-[#22c55e] transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold group-hover:text-[#22c55e]">HTML Cockpit Prototype</h3>
              <span className="text-[10px] px-2 py-0.5 bg-green-900/40 text-green-400 rounded border border-green-800">
                REFERENCE
              </span>
            </div>
            <p className="text-xs text-[#8e8e93] mb-3 leading-relaxed">
              Single-file HTML cockpit retained as a visual/interaction reference for the selected Rust/Ratatui LBE client.
            </p>
            <div className="text-[10px] text-[#8e8e93] space-y-1">
              <div>• Pure HTML/CSS/JS (no framework)</div>
              <div>• Industrial Dark system exact palette</div>
              <div>• Locked Sep 5 contract structure</div>
              <div>• Click-to-expand timeline entries</div>
            </div>
            <div className="mt-3 text-[10px] text-[#22c55e]">
              Open →
            </div>
          </button>

          {/* Reconciliation Document */}
          <button
            onClick={() => setSelectedView('reconciliation')}
            className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5 text-left hover:border-[#f59e0b] transition-colors group md:col-span-2"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold group-hover:text-[#f59e0b]">Reconciliation Document</h3>
              <span className="text-[10px] px-2 py-0.5 bg-orange-900/40 text-orange-400 rounded border border-orange-800">
                ARCHITECTURE RECONCILIATION
              </span>
            </div>
            <p className="text-xs text-[#8e8e93] mb-3 leading-relaxed">
              Formal reconciliation between the uploaded React prototype and the canonical LBE workspace architecture. 
              Documents what the prototype gets right, what it gets wrong, and the correct implementation path.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] text-[#8e8e93]">
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Prototype Classification</div>
                <div>REFERENCE_REUSE_INPUT_NOT_FINAL_PRODUCT_AUTHORITY</div>
              </div>
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Canonical Direction</div>
                <div>LBE_OWNED_RUST_RATATUI_PRODUCT_TARGET</div>
              </div>
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Production Target</div>
                <div>RealLbeWrapper + Cline + BirdEye MCP</div>
              </div>
            </div>
            <div className="mt-3 text-[10px] text-[#f59e0b]">
              Open →
            </div>
          </button>

          {/* Cline Dependency Seam Analysis */}
          <button
            onClick={() => setSelectedView('cline-seam')}
            className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5 text-left hover:border-[#a855f7] transition-colors group md:col-span-2"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold group-hover:text-[#a855f7]">Cline Dependency Seam Analysis</h3>
              <span className="text-[10px] px-2 py-0.5 bg-purple-900/40 text-purple-400 rounded border border-purple-800">
                RECOVERY/COMPOSITION
              </span>
            </div>
            <p className="text-xs text-[#8e8e93] mb-3 leading-relaxed">
              Deep analysis of the embedded Cline client dependency. Documents the pinned commit, 
              inspected files, authority boundaries, missing modules, and recovery options for the 
              LBE × Cline composition seam.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-[10px] text-[#8e8e93]">
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Pinned Commit</div>
                <div className="font-mono text-[9px]">952df213ee654633...</div>
              </div>
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">npm Package</div>
                <div>@cline/agents@0.0.75</div>
              </div>
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Missing</div>
                <div className="text-[#ff3b3b]">cline/ directory</div>
              </div>
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Recovery</div>
                <div className="text-[#22c55e]">Option A (bounded)</div>
              </div>
            </div>
            <div className="mt-3 text-[10px] text-[#a855f7]">
              Open →
            </div>
          </button>

          {/* Dual-Agent Governance Pattern */}
          <button
            onClick={() => setSelectedView('governance')}
            className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5 text-left hover:border-[#22c55e] transition-colors group md:col-span-2"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold group-hover:text-[#22c55e]">Dual-Agent Governance Pattern</h3>
              <span className="text-[10px] px-2 py-0.5 bg-green-900/40 text-green-400 rounded border border-green-800">
                GOVERNANCE ARCHITECTURE
              </span>
            </div>
            <p className="text-xs text-[#8e8e93] mb-3 leading-relaxed">
              Architecture pattern where a coding agent and governance subagent work in parallel. 
              The coding agent focuses on implementation while the governance subagent maintains 
              documentation, tracks intent, manages gate state, and catches contradictions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] text-[#8e8e93]">
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Problem Solved</div>
                <div>Coding agents forget governance docs</div>
              </div>
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Pattern</div>
                <div>Parallel agents, separated concerns</div>
              </div>
              <div>
                <div className="font-bold text-[#e1e1e6] mb-1">Status</div>
                <div className="text-[#22c55e]">SPECIFIED — READY</div>
              </div>
            </div>
            <div className="mt-3 text-[10px] text-[#22c55e]">
              Open →
            </div>
          </button>
        </div>

        {/* Architecture flow */}
        <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5 mb-8">
          <h2 className="text-sm font-bold mb-4">Correct Implementation Path</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {[
              { label: 'Visual Reference', color: 'bg-yellow-900/30 text-yellow-400 border-yellow-800' },
              { label: '→', color: 'text-[#8e8e93]' },
              { label: 'Reuse Concepts', color: 'bg-blue-900/30 text-blue-400 border-blue-800' },
              { label: '→', color: 'text-[#8e8e93]' },
              { label: 'Rust/Ratatui LBE Client', color: 'bg-green-900/30 text-green-400 border-green-800' },
              { label: '→', color: 'text-[#8e8e93]' },
              { label: 'RealLbeWrapper', color: 'bg-purple-900/30 text-purple-400 border-purple-800' },
              { label: '→', color: 'text-[#8e8e93]' },
              { label: 'Headless Cline Mechanics', color: 'bg-cyan-900/30 text-cyan-400 border-cyan-800' },
              { label: '→', color: 'text-[#8e8e93]' },
              { label: 'Real TTY/ConPTY', color: 'bg-red-900/30 text-red-400 border-red-800' },
            ].map((step, i) => (
              step.label === '→'
                ? <span key={i} className={step.color}>→</span>
                : <span key={i} className={`px-2 py-1 rounded border ${step.color}`}>{step.label}</span>
            ))}
          </div>
        </div>

        {/* Key files */}
        <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5">
          <h2 className="text-sm font-bold mb-3">Workspace Files</h2>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[#3b82f6]">▸</span>
              <code className="text-[#e1e1e6]">/react-terminal.html</code>
              <span className="text-[#8e8e93]">— Interactive React terminal prototype</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#22c55e]">▸</span>
              <code className="text-[#e1e1e6]">/cockpit.html</code>
              <span className="text-[#8e8e93]">— HTML cockpit (visual reference)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#f59e0b]">▸</span>
              <code className="text-[#e1e1e6]">/reconciliation.html</code>
              <span className="text-[#8e8e93]">— Architecture reconciliation document</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#a855f7]">▸</span>
              <code className="text-[#e1e1e6]">/cline-dependency-seam.html</code>
              <span className="text-[#8e8e93]">— Cline dependency recovery seam analysis</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#22c55e]">▸</span>
              <code className="text-[#e1e1e6]">/governance-subagent.html</code>
              <span className="text-[#8e8e93]">— Dual-agent governance pattern specification</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#2a2a2d] text-[10px] text-[#8e8e93] flex justify-between">
          <span>LBE Workspace Artifacts — 2026-09-18</span>
          <span>Classification: REFERENCE_REUSE_INPUT_NOT_FINAL_PRODUCT_AUTHORITY</span>
        </div>
      </div>
    </div>
  )
}

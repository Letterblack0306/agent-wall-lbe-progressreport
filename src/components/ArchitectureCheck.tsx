import StatusBadge from './StatusBadge'

const architecturePlan = [
  {
    layer: 'User → LBE CLI/TUI',
    planned: 'Single-command `lbe` entrypoint with LBE branding',
    actual: 'lbe-cli.ps1 launches lbe.exe; PROJECT_INDEX registers `lbe` as product entry',
    status: 'ALIGNED',
    gap: 'Structural LBE shell (header, timeline, context bar) not yet implemented in terminal',
  },
  {
    layer: 'Cline (Embedded Mechanics)',
    planned: 'Cline provides reasoning, planning, tool proposals, continuation',
    actual: 'Cline CLI source at C:\\LBE-TUI-Lab\\cline\\apps\\cli; provider config wired',
    status: 'ALIGNED',
    gap: 'Cline is embedded but not yet proven as the sole reasoning path through LBE authority',
  },
  {
    layer: 'LBE Session/Identity',
    planned: 'LBE owns workspace/session/turn identity',
    actual: 'Session create/list/inspect/resume all PROVEN; 767 tests passing',
    status: 'PASS',
    gap: 'None — this layer is complete and proven',
  },
  {
    layer: 'Authorization & Governed Execution',
    planned: 'Every action checked against policy; governed tool registry',
    actual: 'R6C/R6E proven; 732+ tests; authorization-before-execution enforced',
    status: 'PASS',
    gap: 'None — this layer is complete and proven',
  },
  {
    layer: 'ToolReceipt / Evidence',
    planned: 'Every action produces proof record; evidence provenance',
    actual: 'Correlated receipts proven; evidence package schema enforced',
    status: 'PASS',
    gap: 'None — receipts and evidence are proven at the runtime level',
  },
  {
    layer: 'Persistence / Recovery',
    planned: 'Sessions survive restarts; deterministic recovery',
    actual: 'Recovery/completion promotion PASS; installed restart/resume proven',
    status: 'PASS',
    gap: 'None — persistence and recovery are proven',
  },
  {
    layer: 'Terminal Projection (UI)',
    planned: 'Structural LBE shell with timeline, context bar, process projection',
    actual: 'Textual TUI is PREVIEW/synthetic; Rust is reference-only; Cline UI not structurally distinct',
    status: 'FAIL',
    gap: 'CRITICAL: No terminal surface achieves the locked September 5 structural contract',
  },
  {
    layer: 'Validation / Completion Truth',
    planned: 'Deterministic validation; LBE owns completion truth',
    actual: 'Recovery/completion promotion PASS; verified completion proven',
    status: 'PASS',
    gap: 'None at runtime level; UI projection of completion not yet proven',
  },
]

export default function ArchitectureCheck() {
  const passCount = architecturePlan.filter(a => a.status === 'PASS' || a.status === 'ALIGNED').length
  const failCount = architecturePlan.filter(a => a.status === 'FAIL').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span className="text-[#ff3b3b]">▸</span> Architecture Compliance vs Plan
        </h2>
        <p className="text-sm text-[#8e8e93]">
          Checking each layer of the intended implementation chain against actual repository state.
        </p>
      </div>

      {/* Summary bar */}
      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm">{passCount} layers aligned/proven</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm">{failCount} layer(s) failing</span>
          </div>
          <div className="flex-1" />
          <div className="text-sm">
            <span className="text-[#8e8e93]">Compliance: </span>
            <span className="font-bold text-[#e1e1e6]">{Math.round((passCount / architecturePlan.length) * 100)}%</span>
          </div>
        </div>
        <div className="mt-3 h-2 bg-[#1c1c1f] rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-600 rounded-full transition-all"
            style={{ width: `${(passCount / architecturePlan.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Implementation chain diagram */}
      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5">
        <h3 className="text-sm font-bold mb-4">Intended Implementation Chain</h3>
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {['USER', '→', 'lbe CLI', '→', 'Cline reasoning', '→', 'LBE session', '→', 'Authorization', '→', 'Governed exec', '→', 'Receipt', '→', 'Evidence', '→', 'Validation', '→', 'Completion', '→', 'TUI projection'].map((step, i) => (
            step === '→' 
              ? <span key={i} className="text-[#8e8e93] mx-1">→</span>
              : <span key={i} className="px-2 py-1 bg-[#1c1c1f] border border-[#2a2a2d] rounded text-[#e1e1e6]">{step}</span>
          ))}
        </div>
      </div>

      {/* Layer-by-layer check */}
      <div className="space-y-3">
        {architecturePlan.map((layer) => (
          <div key={layer.layer} className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold">{layer.layer}</h4>
              <StatusBadge status={layer.status} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <div className="text-[#8e8e93] mb-1">Planned:</div>
                <div className="text-[#e1e1e6]">{layer.planned}</div>
              </div>
              <div>
                <div className="text-[#8e8e93] mb-1">Actual:</div>
                <div className="text-[#e1e1e6]">{layer.actual}</div>
              </div>
            </div>
            {layer.gap && (
              <div className={`mt-2 text-xs px-3 py-2 rounded ${
                layer.status === 'FAIL' || layer.status === 'BLOCKED'
                  ? 'bg-red-900/20 text-red-300 border border-red-900/40'
                  : 'bg-yellow-900/20 text-yellow-300 border border-yellow-900/40'
              }`}>
                <span className="font-bold">Gap: </span>{layer.gap}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

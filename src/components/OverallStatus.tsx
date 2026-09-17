import StatusBadge from './StatusBadge'

const verdicts = [
  { label: 'Backend Governance Runtime', status: 'BLOCKED', detail: 'Source contradiction blocks final product acceptance' },
  { label: 'Frontend TUI Integration', status: 'IN_PROGRESS', detail: 'Launcher reconciled; structural UI not yet accepted' },
  { label: 'Authority Separation', status: 'PASS', detail: 'LBE/Cline ownership boundaries correctly enforced in docs' },
  { label: 'CI/CD Pipeline', status: 'FAIL', detail: 'Latest validate workflow fails on main (7+ consecutive failures)' },
  { label: 'Machine Gate State', status: 'OPEN', detail: 'FINAL_PRODUCT_SOURCE_RECONCILIATION slice is active' },
  { label: 'Cross-Repo Coupling', status: 'ALIGNED', detail: 'Both repos reference same authority model and trust hierarchy' },
]

export default function OverallStatus() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-[#ff3b3b]">▸</span> Overall Verdict
      </h2>
      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-6 mb-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg bg-[#1c1c1f] border border-[#2a2a2d] flex items-center justify-center">
              <span className="text-2xl font-bold text-[#ff3b3b]">⚠</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold mb-1">PARTIALLY ON PLAN — Active Blockers Present</h3>
            <p className="text-sm text-[#8e8e93] mb-3">
              The architecture and authority model are correctly implemented and enforced. However, the final product 
              acceptance gate remains OPEN due to source/surface contradictions. The CI pipeline is failing on the 
              latest 7+ commits. The Textual TUI is classified as PREVIEW/synthetic and cannot be promoted to 
              final-product acceptance.
            </p>
            <div className="flex gap-4 text-xs">
              <span className="text-[#8e8e93]">Gate: <span className="text-[#ff3b3b]">OPEN</span></span>
              <span className="text-[#8e8e93]">Phase: <span className="text-[#e1e1e6]">INSTALLED_PTY_CONPTY_AND_FINAL_PRODUCT_ACCEPTANCE</span></span>
              <span className="text-[#8e8e93]">Slice: <span className="text-[#e1e1e6]">FINAL_PRODUCT_SOURCE_RECONCILIATION</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {verdicts.map((v) => (
          <div key={v.label} className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#8e8e93] truncate">{v.label}</span>
              <StatusBadge status={v.status} />
            </div>
            <p className="text-xs text-[#8e8e93] leading-relaxed">{v.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const events = [
  { date: '2026-09-17 13:56', repo: 'Backend', event: 'Commit: Register lbe as product entrypoint and Cline as embedded mechanics', status: 'FAIL' },
  { date: '2026-09-17 13:56', repo: 'Backend', event: 'Commit: Align gate projection with lbe product entrypoint', status: 'FAIL' },
  { date: '2026-09-17 13:56', repo: 'Backend', event: 'Commit: Align product entrypoint with embedded Cline mechanics', status: 'FAIL' },
  { date: '2026-09-17 13:55', repo: 'Backend', event: 'Commit: Clarify lbe product entrypoint and embedded Cline mechanics', status: 'FAIL' },
  { date: '2026-09-17 13:46', repo: 'Backend', event: 'Commit: Reconcile current implementation gate to active final product slice', status: 'FAIL' },
  { date: '2026-09-17 13:45', repo: 'Backend', event: 'Commit: Reconcile implementation plan to final Cline/LBE acceptance slice', status: 'FAIL' },
  { date: '2026-09-17 13:36', repo: 'Backend', event: 'Commit: Reconcile current LBE source and Cline UI handoff', status: 'FAIL' },
  { date: '2026-09-17 ~13:30', repo: 'Frontend', event: 'Commit: Reconcile LBE launcher with provider and session owners', status: 'PASS' },
  { date: '2026-09-17 ~13:30', repo: 'Frontend', event: 'Commit: Route canonical lbe entrypoint through LBE CLI wrapper', status: 'PASS' },
  { date: '2026-09-15', repo: 'Backend', event: 'Commit: Reconcile local provider runtime changes with canonical source', status: 'PASS' },
  { date: '2026-09-15', repo: 'Frontend', event: 'Commit: Fix agent authority routing and prevent LBE spec drift', status: 'PASS' },
  { date: '2026-09-15', repo: 'Frontend', event: 'Commit: Reconcile LBE product identity and lock terminal UI contract', status: 'PASS' },
  { date: '2026-09-09', repo: 'Backend', event: 'Gate reopened: FINAL_PRODUCT_SOURCE_RECONCILIATION (source contradictions found)', status: 'WARN' },
  { date: '2026-09-08', repo: 'Frontend', event: 'Replace fake PowerShell conversation with real TUI launch; PLAN/ACT mode contract', status: 'PASS' },
  { date: '2026-09-07', repo: 'Frontend', event: 'Add LBE CLI launcher, install script, and documentation (CLEANUP_PLAN.md, WHAT_IS_LBE.md)', status: 'PASS' },
  { date: '2026-09-07', repo: 'Backend', event: 'Add LBE Textual TUI and gate docs', status: 'PASS' },
  { date: '2026-09-06', repo: 'Backend', event: 'Reject skin-only Cline UI as LBE visual acceptance', status: 'PASS' },
  { date: '2026-09-05', repo: 'Both', event: 'September 5 interaction decisions locked (terminal contract baseline)', status: 'PASS' },
  { date: '2026-08-26', repo: 'Backend', event: 'Adopt Cline CLI/SDK surface and remove Python/Textual interface', status: 'PASS' },
  { date: '2026-08-25', repo: 'Backend', event: 'Multiple PASS gates: governed mutation dispatch, external capability, first-run session, etc.', status: 'PASS' },
]

export default function TimelineView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span className="text-[#ff3b3b]">▸</span> Recent Activity Timeline
        </h2>
        <p className="text-sm text-[#8e8e93]">
          Last 20 significant events across both repositories, ordered most recent first.
        </p>
      </div>

      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-4 py-2 border-b border-[#2a2a2d] bg-[#1c1c1f] text-[10px] text-[#8e8e93] font-bold uppercase">
          <div className="col-span-2">Timestamp</div>
          <div className="col-span-1">Repo</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-8">Event</div>
        </div>
        {events.map((e, i) => (
          <div key={i} className={`grid grid-cols-12 gap-2 px-4 py-2.5 text-xs border-b border-[#2a2a2d]/50 ${
            i % 2 === 0 ? 'bg-[#141416]' : 'bg-[#0f0f10]'
          }`}>
            <div className="col-span-2 text-[#8e8e93] font-mono text-[10px]">{e.date}</div>
            <div className="col-span-1">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                e.repo === 'Backend' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'
              }`}>{e.repo === 'Backend' ? 'BE' : 'FE'}</span>
            </div>
            <div className="col-span-1">
              <span className={`inline-flex items-center w-2 h-2 rounded-full ${
                e.status === 'FAIL' ? 'bg-red-500' :
                e.status === 'PASS' ? 'bg-green-500' :
                'bg-yellow-500'
              }`} title={e.status} />
            </div>
            <div className="col-span-8 text-[#e1e1e6] truncate">{e.event}</div>
          </div>
        ))}
      </div>

      {/* Pattern analysis */}
      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5">
        <h3 className="text-sm font-bold mb-3">Pattern Analysis</h3>
        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0" />
            <div>
              <span className="font-bold text-red-400">Backend CI Cascade Failure:</span>
              <span className="text-[#8e8e93]"> 7 consecutive validate failures starting Sep 17 13:36. All are documentation/governance reconciliation commits — suggests the validate workflow checks something these commits violate (likely a gate state check or test assertion about product entry behavior).</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1 flex-shrink-0" />
            <div>
              <span className="font-bold text-green-400">Frontend Progressing Steadily:</span>
              <span className="text-[#8e8e93]"> The integration repo shows consistent forward progress — authority routing fixed, product identity reconciled, launcher wired to provider/session owners. No CI failures (no CI configured).</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1 flex-shrink-0" />
            <div>
              <span className="font-bold text-yellow-400">Convergence Attempt:</span>
              <span className="text-[#8e8e93]"> Both repos are actively trying to reconcile the same thing: making `lbe` the unified product entrypoint with Cline as embedded mechanics. The backend is updating PROJECT_INDEX and CURRENT_STATUS; the frontend is updating the launcher and routing. They're working toward the same goal but haven't yet achieved end-to-end proof.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

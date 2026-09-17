const recommendations = [
  {
    priority: 1,
    title: 'Fix CI/CD Pipeline Immediately',
    description: 'The validate workflow has been failing for 7+ consecutive commits. Check the workflow logs for runs #616-622. This is likely a test failure or lint issue introduced by the recent source reconciliation commits. Fix this first — without CI passing, no governance gate can be machine-validated.',
    effort: 'LOW',
    repo: 'Backend',
  },
  {
    priority: 2,
    title: 'Resolve Source/Surface Contradiction',
    description: 'The machine gate is BLOCKED because textual_tui.py is PREVIEW/synthetic but Cline is the selected final surface. Decision needed: Either (a) wire Cline CLI as the actual product entrypoint through LBE authority, or (b) fix textual_tui.py to project real authoritative state instead of synthesizing. The current state has neither path fully proven.',
    effort: 'HIGH',
    repo: 'Both',
  },
  {
    priority: 3,
    title: 'Implement Structural LBE Shell',
    description: 'The September 5 locked contract defines the exact visual structure. Implement it in the Cline CLI surface (the accepted product path). Key elements: persistent header with workspace/model/mode/git/context, conversation+execution timeline, 3-line active process projection, [I] composer identity, context-window usage bar.',
    effort: 'HIGH',
    repo: 'Frontend',
  },
  {
    priority: 4,
    title: 'Fix Session Mode in Launcher',
    description: 'The lbe-cli.ps1 now creates sessions with --mode audit and --permission read_only. If the intended user flow is governed coding, this should be --mode coding with appropriate permissions. Verify this matches the product intent.',
    effort: 'LOW',
    repo: 'Frontend',
  },
  {
    priority: 5,
    title: 'Remove Binary Artifacts from Git',
    description: 'lbe.exe should not be committed to the repository. Add it to .gitignore and remove from tracking. Use cargo build --release to produce it locally.',
    effort: 'LOW',
    repo: 'Frontend',
  },
  {
    priority: 6,
    title: 'Prove End-to-End Path',
    description: 'Once the above are resolved, prove one complete path: session → provider/model → turn → governed tool → authorization → ToolReceipt/evidence → continuation → validation/completion → clean exit/terminal restoration. This is the final acceptance criterion.',
    effort: 'MEDIUM',
    repo: 'Both',
  },
]

export default function Recommendations() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-[#ff3b3b]">▸</span> Recommended Actions (Priority Order)
      </h2>
      <div className="space-y-3">
        {recommendations.map((r) => (
          <div key={r.priority} className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-[#1c1c1f] border border-[#2a2a2d] flex items-center justify-center text-xs font-bold">
                {r.priority}
              </div>
              <h3 className="text-sm font-bold flex-1">{r.title}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                r.effort === 'LOW' ? 'bg-green-900/40 text-green-400' :
                r.effort === 'MEDIUM' ? 'bg-yellow-900/40 text-yellow-400' :
                'bg-red-900/40 text-red-400'
              }`}>{r.effort} effort</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#1c1c1f] border border-[#2a2a2d] text-[#8e8e93]">{r.repo}</span>
            </div>
            <p className="text-xs text-[#8e8e93] leading-relaxed ml-10">{r.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

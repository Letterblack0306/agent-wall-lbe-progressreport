import StatusBadge from './StatusBadge'

const blockers = [
  {
    severity: 'CRITICAL',
    title: 'CI/CD Pipeline Failure (Backend)',
    description: 'The validate workflow has failed on 7+ consecutive commits to main. The latest commit "Register lbe as product entrypoint and Cline as embedded mechanics" shows failure status. This blocks all merge validation.',
    impact: 'No automated verification of code correctness; governance gates cannot be machine-validated.',
    source: '.github/workflows/validate.yml — runs #616-622 all failing',
  },
  {
    severity: 'CRITICAL',
    title: 'Final Product Source Contradiction',
    description: 'The machine gate classifies the execution plan as BLOCKED_BY_SOURCE_CONTRADICTION. The Textual TUI (textual_tui.py) is PREVIEW/synthetic for receipt/evidence claims, but the selected final surface is Cline under LBE authority. These paths have not been reconciled.',
    impact: 'Cannot close FINAL_PRODUCT_ACCEPTANCE gate. All downstream slices are blocked.',
    source: 'implementation-gates.json: active_execution_plan.status = "BLOCKED_BY_SOURCE_CONTRADICTION"',
  },
  {
    severity: 'HIGH',
    title: 'Structural LBE UI Not Implemented',
    description: 'The locked September 5 terminal interaction contract defines a specific structural shell (header, timeline, context bar, process projection, [I] composer). Neither the Textual TUI nor the Cline CLI currently achieves this structure.',
    impact: 'Visual acceptance cannot close. The UI remains a "skin-only" Cline composition.',
    source: 'docs/CURRENT_STATUS.md: "structural visual differentiation = NOT ACCEPTED"',
  },
  {
    severity: 'HIGH',
    title: 'Textual TUI Synthesizes Receipts/Evidence',
    description: 'textual_tui.py fabricates receipt IDs, evidence labels, and governed-turn text instead of projecting persisted authoritative records. This violates the core "no simulation" principle.',
    impact: 'GOVERNED_CODING_FLOW, RECEIPT_EVIDENCE_PROJECTION, and REAL_RUNTIME_ATTACHMENT slices all FAIL.',
    source: 'implementation-gates.json: ordered_slices.RECEIPT_EVIDENCE_PROJECTION.status = "FAIL"',
  },
  {
    severity: 'MEDIUM',
    title: 'Binary Artifact (lbe.exe) Committed to Frontend Repo',
    description: 'The compiled Rust binary lbe.exe is tracked in the integration repository. This should be a build artifact, not committed source.',
    impact: 'Repository bloat; potential security/staleness concerns; violates CLEANUP_PLAN.md guidance.',
    source: 'LBE_Agents_wall_Intigration root: lbe.exe tracked in git',
  },
  {
    severity: 'MEDIUM',
    title: 'Session Mode Mismatch in Launcher',
    description: 'The latest lbe-cli.ps1 commit changes session creation mode from "coding" to "audit" with "read_only" permission. This may not match the intended governed coding flow.',
    impact: 'Users launching via lbe-cli.ps1 get audit/read-only mode instead of governed coding mode.',
    source: 'lbe-cli.ps1 commit 0284fd6: --mode audit, --permission read_only, --runtime-policy audit',
  },
]

export default function BlockersSection() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span className="text-[#ff3b3b]">▸</span> Active Blockers & Risks
      </h2>
      <div className="space-y-3">
        {blockers.map((b, i) => (
          <div key={i} className={`bg-[#141416] border rounded-lg p-4 ${
            b.severity === 'CRITICAL' ? 'border-red-900/60' :
            b.severity === 'HIGH' ? 'border-orange-900/60' :
            'border-yellow-900/60'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={b.severity === 'CRITICAL' ? 'FAIL' : b.severity === 'HIGH' ? 'BLOCKED' : 'UNVERIFIED'} />
                <h3 className="text-sm font-bold">{b.title}</h3>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                b.severity === 'CRITICAL' ? 'bg-red-900/40 text-red-400' :
                b.severity === 'HIGH' ? 'bg-orange-900/40 text-orange-400' :
                'bg-yellow-900/40 text-yellow-400'
              }`}>{b.severity}</span>
            </div>
            <p className="text-xs text-[#e1e1e6] mb-2">{b.description}</p>
            <div className="text-xs text-[#8e8e93]">
              <span className="font-bold">Impact: </span>{b.impact}
            </div>
            <div className="text-[10px] text-[#8e8e93] mt-1 font-mono">
              Source: {b.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

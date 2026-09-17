import StatusBadge from './StatusBadge'

interface RepoAuditProps {
  repo: 'backend' | 'frontend' | 'knowledge' | 'birdeye'
  full?: boolean
}

const backendData: {
  name: string; subtitle: string; url: string; tech: string; commits: number; branches: number;
  lastCommit: string; lastCommitMsg: string; ciStatus: string; gateStatus: string;
  checks: { item: string; status: string; note: string }[]
} = {
  name: 'LBE_Presistent_Agent_wall',
  subtitle: 'Backend / Governance Layer',
  url: 'https://github.com/Letterblack0306/LBE_Presistent_Agent_wall',
  tech: 'Python 95.7% · PowerShell 3.4%',
  commits: 880,
  branches: 77,
  lastCommit: '4 hours ago',
  lastCommitMsg: 'Register lbe as product entrypoint and Cline as embedded mechanics',
  ciStatus: 'FAIL' as const,
  gateStatus: 'OPEN' as const,
  checks: [
    { item: 'Evidence-bound inspection runtime', status: 'PROVEN', note: 'guard_inspector, guard_runner, evidence_service all proven' },
    { item: 'Governed tool execution (R6C/R6E)', status: 'PASS', note: '767 tests passing, authorization-before-execution enforced' },
    { item: 'Session persistence & recovery', status: 'PASS', note: 'Create/restore/identity persistence proven' },
    { item: 'Provider routing (11 providers)', status: 'PASS', note: 'Provider catalog and routing proven in bounded runtime' },
    { item: 'ToolReceipt / Evidence persistence', status: 'PASS', note: 'Correlated receipts with evidence provenance' },
    { item: 'Machine governance gates', status: 'PASS', note: 'implementation-gates.json actively enforced' },
    { item: 'PROJECT_INDEX.md authority registry', status: 'PASS', note: 'All structures indexed with owners and mutation boundaries' },
    { item: 'Textual TUI as final product', status: 'FAIL', note: 'Classified PREVIEW/synthetic — cannot be promoted' },
    { item: 'CI/CD validate workflow', status: 'FAIL', note: '7+ consecutive failures on main branch' },
    { item: 'Final product source reconciliation', status: 'BLOCKED', note: 'Source/surface mismatch with Cline path' },
    { item: 'Publication (v2.0.3)', status: 'UNVERIFIED', note: 'Paused by explicit user product priority' },
  ],
}

const frontendData: typeof backendData = {
  name: 'LBE_Agents_wall_Intigration',
  subtitle: 'Frontend / Terminal UI Layer',
  url: 'https://github.com/Letterblack0306/LBE_Agents_wall_Intigration',
  tech: 'Rust 95.2% · PowerShell 4.5% · Batchfile 0.3%',
  commits: 57,
  branches: 2,
  lastCommit: '28 minutes ago',
  lastCommitMsg: 'Reconcile LBE launcher with provider and session owners',
  ciStatus: 'N/A' as const,
  gateStatus: 'IN_PROGRESS' as const,
  checks: [
    { item: 'LBE authority model in README', status: 'PASS', note: 'Correctly documents LBE as sole authority, Cline as embedded' },
    { item: 'No-simulation rule enforced', status: 'PASS', note: 'State-truth requirements explicitly documented' },
    { item: 'Letterblack Industrial Dark theme', status: 'IMPLEMENTED', note: 'Color system matches canonical spec' },
    { item: 'Rust/Ratatui reference client', status: 'PROVEN', note: 'Builds and tests pass; correctly scoped as reference only' },
    { item: 'LBE CLI launcher (lbe-cli.ps1)', status: 'IN_PROGRESS', note: 'Provider config + session resolution wired; mode set to audit' },
    { item: 'Cline provider integration', status: 'IN_PROGRESS', note: 'providers.json resolution wired into launcher' },
    { item: 'Structural LBE shell (locked contract)', status: 'UNVERIFIED', note: 'Contract locked Sep 5; not yet structurally implemented' },
    { item: 'Real TUI launch (no fake conversations)', status: 'PASS', note: 'Fake PREVIEW conversation removed; launches lbe.exe' },
    { item: 'Agent authority routing', status: 'PASS', note: 'Fixed in commit 4a1dd91; spec drift prevented' },
    { item: 'Workspace cleanup (CLEANUP_PLAN.md)', status: 'IN_PROGRESS', note: 'Plan defined; execution status unclear' },
    { item: 'Binary artifacts in repo (lbe.exe)', status: 'FAIL', note: 'lbe.exe committed to repo; should be build artifact' },
  ],
}

const knowledgeData: typeof backendData = {
  name: 'GPT-Knowledge',
  subtitle: 'Knowledge & Reference Base',
  url: 'https://github.com/Letterblack0306/GPT-Knowledge',
  tech: 'JavaScript 71% · Python 17.2% · HTML 11.8%',
  commits: 821,
  branches: 10,
  lastCommit: '2 hours ago',
  lastCommitMsg: 'Record Brew Batch B browser relay blocker',
  ciStatus: 'PASS',
  gateStatus: 'ACTIVE',
  checks: [
    { item: 'Industrial Dark UI system documentation', status: 'PASS', note: 'Canonical Letterblack branding guide deployed' },
    { item: 'Agent engineering unified methods', status: 'PASS', note: 'Single canonical guide consolidating Aider/Claude Code/Codex/etc.' },
    { item: 'MCP ecosystem routing', status: 'PASS', note: 'Validated 53 required PASS / 0 FAIL topology' },
    { item: 'Browser agent knowledge', status: 'PASS', note: 'CDP, connector patterns, security, verification documented' },
    { item: 'Local model integration (LM Studio)', status: 'PASS', note: 'Runtime, auth, model lifecycle, tool calling documented' },
    { item: 'Curated agent references (GPT_Ref)', status: 'PASS', note: 'Machine-readable catalogue with strict scope' },
    { item: 'CI/CD pipeline', status: 'PASS', note: 'Validate workflow passing, latest commit success' },
    { item: 'Vercel deployment', status: 'PASS', note: 'gpt-knowledge.vercel.app live and read-only' },
    { item: 'Knowledge quality rules enforced', status: 'PASS', note: 'Source, confidence, verification, applicability required' },
    { item: 'Section-level routing manifest', status: 'PASS', note: 'knowledge-index.json + knowledge-sections.json active' },
    { item: 'Skills routing integration', status: 'PASS', note: 'Routes to registered skills index via BirdEye MCP' },
  ],
}

const birdeyeData: typeof backendData = {
  name: 'Letterblack_BirdEye',
  subtitle: 'MCP Server & Consolidated Route',
  url: 'https://github.com/Letterblack0306/Letterblack_BirdEye',
  tech: 'Python 100%',
  commits: 48,
  branches: 5,
  lastCommit: '2 days ago',
  lastCommitMsg: 'test: remove dead MCP contract expectations',
  ciStatus: 'PASS',
  gateStatus: 'STABLE',
  checks: [
    { item: 'MCP server (workspace/memory/skills query)', status: 'PASS', note: 'Consolidated client-facing Letterblack MCP route' },
    { item: 'Project workspace projection', status: 'PASS', note: 'Config-driven registry mapping GPT-K projects to local roots' },
    { item: 'Governed local execution', status: 'PASS', note: 'Safe workspace terminal access with command policy' },
    { item: 'Workspace identity & revision status', status: 'PASS', note: 'Git timeout handling, graceful degradation' },
    { item: 'Execution evidence & history', status: 'PASS', note: 'Chronological runtime event history with SHA256' },
    { item: 'Skills & memory unification', status: 'PASS', note: 'Unified BirdEye Skills and indexed roots' },
    { item: 'Test suite', status: 'PASS', note: '41 tests passing (28 workspace_run + 13 others)' },
    { item: 'Generated index boundaries', status: 'PASS', note: 'Clear separation of generated vs curated content' },
    { item: 'Dead MCP contract cleanup', status: 'PASS', note: 'Removed obsolete contract expectations' },
    { item: 'Database reconciliation', status: 'PASS', note: 'Handles deleted workspace rows gracefully' },
    { item: 'Query projection bootstrap', status: 'PASS', note: 'Missing query projection handled' },
  ],
}

export default function RepoAudit({ repo, full }: RepoAuditProps) {
  const data = repo === 'backend' ? backendData : 
               repo === 'frontend' ? frontendData :
               repo === 'knowledge' ? knowledgeData :
               birdeyeData

  return (
    <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#2a2a2d] bg-[#1c1c1f]">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold">{data.name}</h3>
          <StatusBadge status={data.gateStatus} />
        </div>
        <p className="text-xs text-[#8e8e93]">{data.subtitle}</p>
        <div className="flex gap-4 mt-2 text-[10px] text-[#8e8e93]">
          <span>{data.tech}</span>
          <span>{data.commits} commits</span>
          <span>{data.branches} branches</span>
        </div>
      </div>

      {/* Latest commit */}
      <div className="px-5 py-3 border-b border-[#2a2a2d]">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#8e8e93]">Latest:</span>
          <span className="truncate">{data.lastCommitMsg}</span>
          <span className="text-[#8e8e93] flex-shrink-0">({data.lastCommit})</span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-xs">
          <span className="text-[#8e8e93]">CI:</span>
          <StatusBadge status={data.ciStatus === 'FAIL' ? 'FAIL' : data.ciStatus === 'N/A' ? 'UNVERIFIED' : data.ciStatus} />
        </div>
      </div>

      {/* Checks */}
      <div className="px-5 py-3">
        <div className="space-y-2">
          {(full ? data.checks : data.checks.slice(0, 7)).map((check) => (
            <div key={check.item} className="flex items-start gap-2 text-xs">
              <StatusBadge status={check.status} />
              <div className="flex-1 min-w-0">
                <div className="text-[#e1e1e6] truncate">{check.item}</div>
                {full && <div className="text-[#8e8e93] text-[10px] mt-0.5">{check.note}</div>}
              </div>
            </div>
          ))}
        </div>
        {!full && data.checks.length > 7 && (
          <div className="text-[10px] text-[#8e8e93] mt-3 pt-2 border-t border-[#2a2a2d]">
            +{data.checks.length - 7} more checks — view full report in dedicated tab
          </div>
        )}
      </div>
    </div>
  )
}

import StatusBadge from './StatusBadge'

// Planning sessions extracted from Google Drive folder listing
// These map ChatGPT session exports to the decisions/commits they produced
const planningSessions = [
  {
    date: '2026-08-20',
    sessions: 2,
    totalSize: '172 KB',
    phase: 'Foundation',
    decisions: [
      'Established persistent agent baseline',
      'Created initial evidence package schema',
      'Defined guard inspector contracts',
    ],
    outcome: 'PASS',
    outcomeNote: 'Led to: chore: establish persistent agent baseline commit',
  },
  {
    date: '2026-08-22',
    sessions: 2,
    totalSize: '416 KB',
    phase: 'Runtime Core',
    decisions: [
      'Designed governed tool execution model (R6C/R6E)',
      'Established authorization-before-execution rule',
      'Defined ToolReceipt correlation model',
    ],
    outcome: 'PASS',
    outcomeNote: 'Led to: feat(audit) enforcement and rule execution infrastructure',
  },
  {
    date: '2026-08-23 – 2026-08-24',
    sessions: 3,
    totalSize: '672 KB',
    phase: 'Provider & Session',
    decisions: [
      'Explicit startup composition for reasoning',
      'Provider catalog and routing design',
      'Session persistence and recovery model',
    ],
    outcome: 'PASS',
    outcomeNote: 'Led to: feat(reasoning): add explicit startup composition (#16)',
  },
  {
    date: '2026-08-26 – 2026-08-27',
    sessions: 3,
    totalSize: '504 KB',
    phase: 'Cline Integration Decision',
    decisions: [
      'CRITICAL: Adopted Cline CLI/SDK as product surface',
      'Removed Python/Textual interface from final-product path',
      'Defined Cline-as-embedded-mechanics architecture',
    ],
    outcome: 'PASS',
    outcomeNote: 'Led to: govern: adopt Cline CLI/SDK surface and remove Python/Textual interface',
  },
  {
    date: '2026-09-04',
    sessions: 6,
    totalSize: '1.2 MB',
    phase: 'TUI Integration Sprint',
    decisions: [
      'Connected packaged LBE surface to Cline behavior',
      'Designed portable environment-aware installer',
      'Established Rust/Ratatui as reference client only',
      'Created run-cline-lbe.ps1 launcher',
    ],
    outcome: 'PASS',
    outcomeNote: 'Led to: Multiple TUI integration commits in both repos',
  },
  {
    date: '2026-09-05',
    sessions: 1,
    totalSize: '218 KB',
    phase: 'LOCKED CONTRACT',
    decisions: [
      'LOCKED: Terminal interaction contract (header, timeline, context bar, [I] composer)',
      'LOCKED: Letterblack Industrial Dark visual system',
      'LOCKED: State-truth requirements (no simulation)',
      'LOCKED: Active-process projection rules',
    ],
    outcome: 'LOCKED',
    outcomeNote: 'This is the binding product contract — all subsequent work must comply',
  },
  {
    date: '2026-09-06',
    sessions: 6,
    totalSize: '719 KB',
    phase: 'Visual Rejection & Cleanup',
    decisions: [
      'REJECTED: Skin-only Cline UI as LBE visual acceptance',
      'Created CLEANUP_PLAN.md for workspace consolidation',
      'Created WHAT_IS_LBE.md product definition',
      'Designed LBE CLI unique frontend design document',
      'Fixed Cargo.toml edition 2024→2021',
    ],
    outcome: 'PARTIAL',
    outcomeNote: 'Cleanup plan defined but not fully executed; visual rejection stands',
  },
  {
    date: '2026-09-07',
    sessions: 1,
    totalSize: '82 KB',
    phase: 'CLI & Documentation',
    decisions: [
      'Created lbe-cli.ps1 with governance panels',
      'Created install-lbe-path.ps1 PATH helper',
      'Created lbe.bat/lbe.ps1 launcher entry points',
      'Added LBE Textual TUI and gate docs to backend',
    ],
    outcome: 'PASS',
    outcomeNote: 'Led to: Add LBE CLI launcher, install script, and documentation',
  },
  {
    date: '2026-09-09',
    sessions: 0,
    totalSize: '—',
    phase: 'Gate Reopened',
    decisions: [
      'Machine gate reopened: FINAL_PRODUCT_SOURCE_RECONCILIATION',
      'Identified source/surface contradiction',
      'Classified Textual TUI as PREVIEW/synthetic',
    ],
    outcome: 'BLOCKED',
    outcomeNote: 'Led to: Reopen final product gate on source contradictions',
  },
  {
    date: '2026-09-13',
    sessions: 6,
    totalSize: '1.2 MB',
    phase: 'Cline STDIO & Receipt Correlation',
    decisions: [
      'Bounded on_tool_receipt receipt correlation in Cline STDIO bridge',
      'Fixed agent authority routing',
      'Prevented LBE spec drift in frontend',
      'Reconciled LBE product identity',
      'Locked terminal UI contract in README',
    ],
    outcome: 'PASS',
    outcomeNote: 'Led to: Fix agent authority routing; Reconcile LBE product identity',
  },
  {
    date: '2026-09-15',
    sessions: 1,
    totalSize: '147 KB',
    phase: 'Provider Runtime Reconciliation',
    decisions: [
      'Reconciled local provider runtime changes with canonical source',
      'Updated tests to match new provider behavior',
    ],
    outcome: 'PASS',
    outcomeNote: 'Led to: Reconcile local provider runtime changes with canonical source',
  },
  {
    date: '2026-09-17 (TODAY)',
    sessions: 0,
    totalSize: '—',
    phase: 'Product Entrypoint Finalization',
    decisions: [
      'Register lbe as product entrypoint and Cline as embedded mechanics',
      'Align gate projection with lbe product entrypoint',
      'Reconcile LBE launcher with provider and session owners',
      'Route canonical lbe entrypoint through LBE CLI wrapper',
    ],
    outcome: 'FAIL',
    outcomeNote: 'Backend CI failing (7+ consecutive); Frontend progressing but unverified end-to-end',
  },
]

// Planning artifacts found in the Drive folder
const artifacts = [
  { name: 'cli/', type: 'folder', date: 'Sep 12', note: 'CLI integration material' },
  { name: '.46_Accecc_Browser_Agent.sync-manifest.json', type: 'json', date: 'Sep 12', note: 'Browser agent sync manifest (395 KB)' },
  { name: 'brew_20260906_*.json', type: 'json', date: 'Sep 6', note: 'Homebrew package lists (environment snapshot)' },
  { name: 'sha working knowledge data.json', type: 'json', date: 'Aug 23', note: 'Working knowledge/hash data (213 KB)' },
  { name: 'Chat_Print.py', type: 'python', date: 'Aug 18', note: 'Chat session printing utility' },
  { name: 'Scrollprint.py', type: 'python', date: 'Aug 18', note: 'Scroll/print utility' },
  { name: 'fetch_chatgpt.py', type: 'python', date: 'Sep 7', note: 'ChatGPT session fetcher (22 KB)' },
  { name: 'SKILL.md / chatgpt-fetcher-SKILL.md', type: 'markdown', date: 'Sep 7', note: 'Skill definitions for chat fetching' },
]

export default function PlanningSessions() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span className="text-[#ff3b3b]">▸</span> Planning Sessions & Decision History
        </h2>
        <p className="text-sm text-[#8e8e93] mb-1">
          Source: Google Drive folder — 25+ ChatGPT session exports (Aug 20 – Sep 15, 2026) + utility scripts
        </p>
        <p className="text-xs text-[#8e8e93]">
          These sessions document the decision-making process that drove workspace development.
          Individual file content requires authenticated access; this view maps session dates to observed outcomes.
        </p>
      </div>

      {/* Drive folder summary */}
      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5">
        <h3 className="text-sm font-bold mb-3">Drive Folder Contents</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-[#1c1c1f] rounded p-3 border border-[#2a2a2d]">
            <div className="text-2xl font-bold text-[#e1e1e6]">25+</div>
            <div className="text-[10px] text-[#8e8e93] uppercase">Chat Sessions</div>
          </div>
          <div className="bg-[#1c1c1f] rounded p-3 border border-[#2a2a2d]">
            <div className="text-2xl font-bold text-[#e1e1e6]">27</div>
            <div className="text-[10px] text-[#8e8e93] uppercase">Days Span</div>
          </div>
          <div className="bg-[#1c1c1f] rounded p-3 border border-[#2a2a2d]">
            <div className="text-2xl font-bold text-[#e1e1e6]">~6 MB</div>
            <div className="text-[10px] text-[#8e8e93] uppercase">Total Export Size</div>
          </div>
          <div className="bg-[#1c1c1f] rounded p-3 border border-[#2a2a2d]">
            <div className="text-2xl font-bold text-[#e1e1e6]">4</div>
            <div className="text-[10px] text-[#8e8e93] uppercase">Utility Scripts</div>
          </div>
        </div>
        <div className="space-y-1.5">
          {artifacts.map((a) => (
            <div key={a.name} className="flex items-center gap-2 text-xs">
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                a.type === 'folder' ? 'bg-blue-900/30 text-blue-400' :
                a.type === 'json' ? 'bg-yellow-900/30 text-yellow-400' :
                a.type === 'python' ? 'bg-green-900/30 text-green-400' :
                'bg-gray-900/30 text-gray-400'
              }`}>{a.type}</span>
              <span className="font-mono text-[#e1e1e6] truncate flex-1">{a.name}</span>
              <span className="text-[#8e8e93] flex-shrink-0">{a.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decision timeline */}
      <div>
        <h3 className="text-sm font-bold mb-3">Decision Timeline — Session → Outcome</h3>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#2a2a2d]" />
          
          <div className="space-y-4">
            {planningSessions.map((session, i) => (
              <div key={i} className="relative pl-7">
                {/* Timeline dot */}
                <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 ${
                  session.outcome === 'PASS' ? 'bg-green-500/20 border-green-500' :
                  session.outcome === 'FAIL' ? 'bg-red-500/20 border-red-500' :
                  session.outcome === 'BLOCKED' ? 'bg-orange-500/20 border-orange-500' :
                  session.outcome === 'LOCKED' ? 'bg-purple-500/20 border-purple-500' :
                  'bg-yellow-500/20 border-yellow-500'
                }`} />
                
                <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#8e8e93]">{session.date}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-[#1c1c1f] border border-[#2a2a2d] text-[#e1e1e6]">
                        {session.phase}
                      </span>
                      <span className="text-[10px] text-[#8e8e93]">
                        {session.sessions} session{session.sessions !== 1 ? 's' : ''} · {session.totalSize}
                      </span>
                    </div>
                    <StatusBadge status={session.outcome === 'LOCKED' ? 'PASS' : session.outcome} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] text-[#8e8e93] uppercase mb-1 font-bold">Decisions Made</div>
                      <ul className="space-y-1">
                        {session.decisions.map((d, j) => (
                          <li key={j} className="text-xs text-[#e1e1e6] flex items-start gap-1.5">
                            <span className="text-[#8e8e93] mt-0.5">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#8e8e93] uppercase mb-1 font-bold">Implementation Outcome</div>
                      <p className="text-xs text-[#8e8e93]">{session.outcomeNote}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="bg-[#1c1c1f] border border-[#ff3b3b]/30 rounded-lg p-5">
        <h3 className="text-sm font-bold mb-2 text-[#ff3b3b]">⚠ Critical Planning Observation</h3>
        <p className="text-xs text-[#e1e1e6] leading-relaxed mb-3">
          The planning sessions show a clear <span className="font-bold">architecture pivot on Aug 26</span> where 
          the team decided to adopt Cline CLI/SDK as the product surface and remove Python/Textual from the 
          final-product path. This was the correct decision and is consistently enforced in documentation.
        </p>
        <p className="text-xs text-[#e1e1e6] leading-relaxed mb-3">
          However, the <span className="font-bold">Sep 5 locked contract</span> defined a specific structural 
          terminal UI that <span className="font-bold text-[#ff3b3b]">neither the Cline CLI nor the Textual TUI 
          currently implements</span>. The planning sessions show the team recognized this on Sep 6 
          ("Reject skin-only Cline UI as LBE visual acceptance") but the structural implementation has not 
          been completed.
        </p>
        <p className="text-xs text-[#e1e1e6] leading-relaxed">
          The most recent sessions (Sep 13-17) show the team trying to reconcile the product entrypoint 
          (`lbe` as unified command) but the <span className="font-bold">end-to-end proof</span> — running 
          the full chain from session → provider → governed tool → receipt → evidence → completion → TUI 
          projection — has not been achieved. This is exactly what the machine gate requires to close.
        </p>
      </div>

      {/* Access note */}
      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-4">
        <p className="text-xs text-[#8e8e93]">
          <span className="font-bold text-[#e1e1e6]">Note:</span> Individual ChatGPT session JSON files 
          (25+ files, ~6 MB total) require authenticated Google Drive access to read. The decision mapping 
          above is reconstructed from commit history, governance artifacts, and file metadata. To get the 
          full decision context, download the JSON exports and parse the conversation threads — particularly 
          the Sep 5, Sep 6, and Sep 13 sessions which contain the locked contract and rejection decisions.
        </p>
      </div>
    </div>
  )
}

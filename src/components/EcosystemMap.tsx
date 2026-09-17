export default function EcosystemMap() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
          <span className="text-[#ff3b3b]">▸</span> Full Ecosystem Topology
        </h2>
        <p className="text-sm text-[#8e8e93]">
          The Letterblack workspace is a 4-repository ecosystem with defined authority boundaries and data flow.
        </p>
      </div>

      {/* Ecosystem diagram */}
      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-6">
        <h3 className="text-sm font-bold mb-4">Client → MCP → Knowledge Flow</h3>
        <div className="flex flex-col items-center gap-4">
          {/* Clients */}
          <div className="flex gap-2 flex-wrap justify-center">
            {['Codex', 'Cline', 'OpenCode', 'Gemini', 'Antigravity', 'Claude'].map(client => (
              <div key={client} className="px-3 py-1.5 bg-[#1c1c1f] border border-[#2a2a2d] rounded text-xs text-[#e1e1e6]">
                {client}
              </div>
            ))}
          </div>
          
          <div className="text-[#8e8e93] text-xs">↓</div>
          
          {/* BirdEye MCP */}
          <div className="px-6 py-3 bg-blue-900/20 border-2 border-blue-600 rounded-lg">
            <div className="text-sm font-bold text-blue-400 mb-2">BirdEye MCP</div>
            <div className="flex gap-4 text-xs text-[#8e8e93]">
              <span>workspace query</span>
              <span>memory query</span>
              <span>skills query</span>
            </div>
          </div>
          
          <div className="flex gap-8 text-[#8e8e93] text-xs">
            <span>↓</span>
            <span>↓</span>
            <span>↓</span>
          </div>
          
          {/* Data sources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="px-4 py-3 bg-green-900/20 border border-green-700 rounded">
              <div className="text-xs font-bold text-green-400 mb-1">GPT-Knowledge</div>
              <div className="text-[10px] text-[#8e8e93]">Durable project/method projection</div>
            </div>
            <div className="px-4 py-3 bg-purple-900/20 border border-purple-700 rounded">
              <div className="text-xs font-bold text-purple-400 mb-1">Memory</div>
              <div className="text-[10px] text-[#8e8e93]">Historical conversations/provenance</div>
            </div>
            <div className="px-4 py-3 bg-orange-900/20 border border-orange-700 rounded">
              <div className="text-xs font-bold text-orange-400 mb-1">GitHub</div>
              <div className="text-[10px] text-[#8e8e93]">Remote repository/commit truth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Repository roles */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold">Repository Authority Boundaries</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LBE Persistent Agent Wall */}
          <div className="bg-[#141416] border-2 border-red-900/60 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-red-400">LBE_Presistent_Agent_wall</h4>
              <span className="text-[10px] px-2 py-0.5 bg-red-900/40 text-red-400 rounded">BLOCKED</span>
            </div>
            <div className="text-xs text-[#8e8e93] mb-2">Backend Governance Runtime</div>
            <ul className="text-xs space-y-1 text-[#e1e1e6]">
              <li>• Session/workspace identity</li>
              <li>• Authorization & governed execution</li>
              <li>• ToolReceipt & evidence persistence</li>
              <li>• Machine governance gates</li>
              <li>• 880 commits · 77 branches</li>
            </ul>
            <div className="mt-2 text-[10px] text-red-400">
              Status: CI failing (7+ consecutive), source contradiction blocks final acceptance
            </div>
          </div>

          {/* LBE Agents Wall Integration */}
          <div className="bg-[#141416] border-2 border-yellow-900/60 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-yellow-400">LBE_Agents_wall_Intigration</h4>
              <span className="text-[10px] px-2 py-0.5 bg-yellow-900/40 text-yellow-400 rounded">IN PROGRESS</span>
            </div>
            <div className="text-xs text-[#8e8e93] mb-2">Frontend TUI Integration</div>
            <ul className="text-xs space-y-1 text-[#e1e1e6]">
              <li>• Terminal UI projection</li>
              <li>• Cline CLI embedding</li>
              <li>• Rust/Ratatui reference client</li>
              <li>• LBE launcher (lbe-cli.ps1)</li>
              <li>• 57 commits · 2 branches</li>
            </ul>
            <div className="mt-2 text-[10px] text-yellow-400">
              Status: Launcher wired, structural UI contract not implemented
            </div>
          </div>

          {/* GPT-Knowledge */}
          <div className="bg-[#141416] border-2 border-green-900/60 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-green-400">GPT-Knowledge</h4>
              <span className="text-[10px] px-2 py-0.5 bg-green-900/40 text-green-400 rounded">ACTIVE</span>
            </div>
            <div className="text-xs text-[#8e8e93] mb-2">Knowledge & Reference Base</div>
            <ul className="text-xs space-y-1 text-[#e1e1e6]">
              <li>• Industrial Dark UI system</li>
              <li>• Agent engineering methods</li>
              <li>• MCP ecosystem routing</li>
              <li>• Browser/local-model knowledge</li>
              <li>• 821 commits · 10 branches</li>
            </ul>
            <div className="mt-2 text-[10px] text-green-400">
              Status: CI passing, actively maintained, deployed to Vercel
            </div>
          </div>

          {/* Letterblack BirdEye */}
          <div className="bg-[#141416] border-2 border-blue-900/60 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-blue-400">Letterblack_BirdEye</h4>
              <span className="text-[10px] px-2 py-0.5 bg-blue-900/40 text-blue-400 rounded">STABLE</span>
            </div>
            <div className="text-xs text-[#8e8e93] mb-2">MCP Server & Consolidated Route</div>
            <ul className="text-xs space-y-1 text-[#e1e1e6]">
              <li>• Workspace/memory/skills query</li>
              <li>• Project workspace projection</li>
              <li>• Governed local execution</li>
              <li>• Safe terminal access</li>
              <li>• 48 commits · 5 branches</li>
            </ul>
            <div className="mt-2 text-[10px] text-blue-400">
              Status: 41 tests passing, stable MCP route for all clients
            </div>
          </div>
        </div>
      </div>

      {/* Data flow */}
      <div className="bg-[#141416] border border-[#2a2a2d] rounded-lg p-5">
        <h3 className="text-sm font-bold mb-3">Cross-Repository Data Flow</h3>
        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-blue-400">BirdEye → GPT-Knowledge:</span>
              <span className="text-[#8e8e93]"> Read-only access to project/method/status projections via route/read endpoints</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-purple-400">BirdEye → Memory:</span>
              <span className="text-[#8e8e93]"> Query historical conversations and provenance through consolidated MCP route</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-orange-400">BirdEye → GitHub:</span>
              <span className="text-[#8e8e93]"> Remote repository/branch/commit/PR/check truth (read-only)</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-red-400">LBE Backend → BirdEye:</span>
              <span className="text-[#8e8e93]"> Session/workspace identity, governed execution results, receipts, evidence</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-yellow-400">LBE Frontend → LBE Backend:</span>
              <span className="text-[#8e8e93]"> Terminal UI projects authoritative runtime state (not yet fully implemented)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ecosystem health */}
      <div className="bg-[#1c1c1f] border border-[#2a2a2d] rounded-lg p-5">
        <h3 className="text-sm font-bold mb-3">Ecosystem Health Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">2</div>
            <div className="text-[10px] text-[#8e8e93] uppercase">Repos Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">1</div>
            <div className="text-[10px] text-[#8e8e93] uppercase">Repo Blocked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">1</div>
            <div className="text-[10px] text-[#8e8e93] uppercase">Repo In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#e1e1e6]">1,806</div>
            <div className="text-[10px] text-[#8e8e93] uppercase">Total Commits</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-[#8e8e93]">
          <span className="font-bold text-[#e1e1e6]">Key Insight:</span> The knowledge layer (GPT-Knowledge) and MCP layer (BirdEye) are healthy and stable. 
          The governance runtime (LBE Backend) is blocked by CI failures and source contradictions. The frontend integration (LBE Frontend) is progressing 
          but hasn't achieved the locked structural UI contract. The ecosystem is architecturally sound but has implementation gaps in the terminal UI layer.
        </div>
      </div>
    </div>
  )
}

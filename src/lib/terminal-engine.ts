import { WorkspaceState, CommandResult, RepoStatus } from '../types/terminal'

export function buildInitialState(): WorkspaceState {
  return {
    sessionId: 'lbe-session-a8f3c2d1',
    workspace: 'agents-workspace',
    model: 'claude-sonnet-4',
    mode: 'PLAN',
    gitBranch: 'main',
    gitDiff: '+4 -2',
    contextUsage: 67,
    sessionStart: new Date(Date.now() - 3600000).toISOString(),
    providerStatus: 'connected',
    authStatus: 'authorized',
    repos: [
      {
        name: 'LBE_Presistent_Agent_wall',
        shortName: 'LBE-Backend',
        role: 'Backend Governance Runtime',
        commits: 880,
        branches: 77,
        ci: 'FAIL',
        gate: 'FINAL_PRODUCT_SOURCE_RECONCILIATION',
        gateStatus: 'BLOCKED',
        lastCommit: '4 hours ago',
        lastCommitMsg: 'Register lbe as product entrypoint and Cline as embedded mechanics',
        tech: 'Python 95.7% · PowerShell 3.4%',
        details: [
          '880 commits · 77 branches · CI: FAIL (7+ consecutive)',
          'gate: BLOCKED_BY_SOURCE_CONTRADICTION',
          'runtime: 767 tests PASS · all core capabilities PROVEN',
          'blocker: Textual TUI classified PREVIEW/synthetic',
        ],
      },
      {
        name: 'LBE_Agents_wall_Intigration',
        shortName: 'LBE-Frontend',
        role: 'Frontend TUI Integration',
        commits: 57,
        branches: 2,
        ci: 'N/A',
        gate: 'STRUCTURAL_UI_CONTRACT',
        gateStatus: 'IN_PROGRESS',
        lastCommit: '28 minutes ago',
        lastCommitMsg: 'Reconcile LBE launcher with provider and session owners',
        tech: 'Rust 95.2% · PowerShell 4.5%',
        details: [
          '57 commits · 2 branches · launcher reconciled',
          'gate: IN_PROGRESS · structural UI not implemented',
          'authority routing: FIXED · spec drift: PREVENTED',
          'issue: session mode set to audit instead of coding',
        ],
      },
      {
        name: 'GPT-Knowledge',
        shortName: 'GPT-K',
        role: 'Knowledge & Reference Base',
        commits: 821,
        branches: 10,
        ci: 'PASS',
        gate: 'ACTIVE',
        gateStatus: 'ACTIVE',
        lastCommit: '2 hours ago',
        lastCommitMsg: 'Record Brew Batch B browser relay blocker',
        tech: 'JavaScript 71% · Python 17.2%',
        details: [
          '821 commits · 10 branches · CI: PASS',
          'gate: ACTIVE · deployed to Vercel',
          'Industrial Dark UI system: DOCUMENTED',
          'MCP ecosystem routing: VALIDATED',
        ],
      },
      {
        name: 'Letterblack_BirdEye',
        shortName: 'BirdEye',
        role: 'MCP Server / Consolidated Route',
        commits: 48,
        branches: 5,
        ci: 'PASS',
        gate: 'STABLE',
        gateStatus: 'STABLE',
        lastCommit: '2 days ago',
        lastCommitMsg: 'test: remove dead MCP contract expectations',
        tech: 'Python 100%',
        details: [
          '48 commits · 5 branches · 41 tests PASS',
          'gate: STABLE · consolidated MCP route',
          'workspace/memory/skills query: OPERATIONAL',
          'validated topology: 53 PASS / 0 FAIL',
        ],
      },
    ],
    gate: {
      activePlan: 'INSTALLED_PTY_CONPTY_AND_FINAL_PRODUCT_ACCEPTANCE',
      activePhase: 'FINAL_PRODUCT_ACCEPTANCE',
      activeSlice: 'FINAL_PRODUCT_SOURCE_RECONCILIATION',
      status: 'OPEN',
      executionPlan: 'BLOCKED_BY_SOURCE_CONTRADICTION',
      selectedAgent: 'Cline',
      blockedBy: 'Textual TUI PREVIEW/synthetic vs Cline path not reconciled',
    },
    topology: {
      clients: ['Codex', 'Cline', 'OpenCode', 'Gemini', 'Antigravity', 'Claude'],
      mcpRoute: 'BirdEye MCP (consolidated)',
      dataSources: [
        { name: 'GPT-Knowledge', role: 'durable projection', status: 'ACTIVE' },
        { name: 'Memory', role: 'historical provenance', status: 'OPERATIONAL' },
        { name: 'GitHub', role: 'remote repository truth', status: 'LIVE' },
      ],
      validatedPass: 53,
      validatedFail: 0,
    },
    timeline: [],
  }
}

export function processCommand(cmd: string, state: WorkspaceState): CommandResult {
  const lower = cmd.toLowerCase().trim()

  // Help command
  if (lower === 'help' || lower === '?') {
    return {
      success: true,
      events: [
        'available commands:',
        '  status              — show current workspace state',
        '  repos               — list all repositories',
        '  inspect <repo>      — detailed repo inspection',
        '  gate                — show machine gate state',
        '  topology            — show ecosystem topology',
        '  audit               — run architecture compliance check',
        '  blockers            — list active blockers',
        '  plan                — show recommended actions',
        '  clear               — clear timeline',
        '  help                — show this message',
      ],
      summary: 'help.displayed',
      type: 'system',
    }
  }

  // Status command
  if (lower === 'status') {
    return {
      success: true,
      events: [
        `session: ${state.sessionId}`,
        `workspace: ${state.workspace}`,
        `provider: ${state.model} · ${state.providerStatus}`,
        `auth: ${state.authStatus}`,
        `mode: ${state.mode}`,
        `context: ${Math.round(state.contextUsage)}%`,
        `gate: ${state.gate.status} · ${state.gate.activeSlice}`,
        `execution: ${state.gate.executionPlan}`,
      ],
      summary: 'status.displayed',
      type: 'system',
    }
  }

  // Repos command
  if (lower === 'repos') {
    const events = state.repos.map(repo => {
      const ciIcon = repo.ci === 'PASS' ? '✓' : repo.ci === 'FAIL' ? '✗' : '—'
      return `${ciIcon} ${repo.shortName.padEnd(12)} · ${repo.commits} commits · ${repo.branches} branches · gate: ${repo.gateStatus}`
    })
    return {
      success: true,
      events: ['ecosystem repositories:', ...events],
      summary: `repos.listed · ${state.repos.length} repos`,
      type: 'inspect',
    }
  }

  // Inspect command
  if (lower.startsWith('inspect')) {
    const repoName = lower.replace('inspect', '').trim()
    const repo = state.repos.find(r => 
      r.shortName.toLowerCase().includes(repoName) || 
      r.name.toLowerCase().includes(repoName)
    )
    
    if (!repo) {
      return {
        success: false,
        events: [`error: repository not found: ${repoName}`, 'available: LBE-Backend, LBE-Frontend, GPT-K, BirdEye'],
        summary: 'inspect.failed · repo not found',
        type: 'inspect',
      }
    }

    return {
      success: true,
      events: [
        `inspect: ${repo.name}`,
        `role: ${repo.role}`,
        `tech: ${repo.tech}`,
        `commits: ${repo.commits} · branches: ${repo.branches}`,
        `ci: ${repo.ci} · gate: ${repo.gateStatus}`,
        `last: ${repo.lastCommit} — ${repo.lastCommitMsg}`,
        ...repo.details.map(d => `  ${d}`),
      ],
      summary: `inspect.completed · ${repo.shortName}`,
      type: 'inspect',
    }
  }

  // Gate command
  if (lower === 'gate') {
    return {
      success: true,
      events: [
        'machine gate state:',
        `  plan: ${state.gate.activePlan}`,
        `  phase: ${state.gate.activePhase}`,
        `  slice: ${state.gate.activeSlice}`,
        `  status: ${state.gate.status}`,
        `  execution: ${state.gate.executionPlan}`,
        `  agent: ${state.gate.selectedAgent}`,
        state.gate.blockedBy ? `  blocked: ${state.gate.blockedBy}` : '',
      ].filter(Boolean),
      summary: 'gate.displayed',
      type: 'gate',
    }
  }

  // Topology command
  if (lower === 'topology') {
    return {
      success: true,
      events: [
        'ecosystem topology:',
        `  clients: ${state.topology.clients.join(', ')}`,
        `  mcp route: ${state.topology.mcpRoute}`,
        '  data sources:',
        ...state.topology.dataSources.map(ds => `    ${ds.name} · ${ds.role} · ${ds.status}`),
        `  validated: ${state.topology.validatedPass} PASS / ${state.topology.validatedFail} FAIL`,
      ],
      summary: 'topology.displayed',
      type: 'query',
    }
  }

  // Audit command
  if (lower === 'audit') {
    const passCount = state.repos.filter(r => r.gateStatus === 'PASS' || r.gateStatus === 'ACTIVE' || r.gateStatus === 'STABLE').length
    const totalLayers = 8
    const alignedLayers = 6
    
    return {
      success: true,
      events: [
        'architecture compliance audit:',
        `  layers aligned: ${alignedLayers}/${totalLayers}`,
        `  repos healthy: ${passCount}/${state.repos.length}`,
        '',
        '  ✓ Authority Separation — LBE governance / Cline reasoning',
        '  ✓ Backend Runtime — 767 tests PASS',
        '  ✓ Machine Governance — gates enforced',
        '  ✓ Knowledge Layer — GPT-Knowledge stable',
        '  ✓ MCP Layer — BirdEye validated',
        '  ✓ Cross-Repo Coupling — trust hierarchy correct',
        '  ✗ CI/CD Pipeline — 7+ consecutive failures',
        '  ✗ Structural LBE UI — Sep 5 contract not implemented',
        '',
        '  compliance: 75%',
      ],
      summary: `audit.completed · ${alignedLayers}/${totalLayers} layers`,
      type: 'audit',
    }
  }

  // Blockers command
  if (lower === 'blockers') {
    return {
      success: true,
      events: [
        'active blockers:',
        '',
        '  [CRITICAL] CI/CD Pipeline Failure',
        '    7+ consecutive validate failures on main',
        '    impact: no machine validation possible',
        '',
        '  [CRITICAL] Source/Surface Contradiction',
        '    Textual TUI PREVIEW vs Cline path not reconciled',
        '    impact: FINAL_PRODUCT_ACCEPTANCE gate blocked',
        '',
        '  [HIGH] Structural LBE UI Not Implemented',
        '    Sep 5 locked contract not achieved in any surface',
        '    impact: visual acceptance cannot close',
        '',
        '  [MEDIUM] Session Mode Mismatch',
        '    launcher set to audit instead of coding',
        '    impact: wrong permissions for governed coding flow',
      ],
      summary: 'blockers.listed · 4 active',
      type: 'audit',
    }
  }

  // Plan command
  if (lower === 'plan') {
    return {
      success: true,
      events: [
        'recommended actions (priority order):',
        '',
        '  1. Fix CI/CD Pipeline [LOW effort]',
        '     check validate workflow logs #616-622',
        '',
        '  2. Implement Structural LBE Shell [HIGH effort]',
        '     build Sep 5 locked contract in Cline CLI',
        '     header + timeline + context bar + [I] composer',
        '',
        '  3. Fix Session Mode [LOW effort]',
        '     change lbe-cli.ps1 from audit to coding',
        '',
        '  4. Remove Binary from Git [LOW effort]',
        '     add lbe.exe to .gitignore',
        '',
        '  5. Prove End-to-End Path [MEDIUM effort]',
        '     session → provider → tool → receipt → evidence',
        '     → completion → TUI projection → clean exit',
      ],
      summary: 'plan.displayed · 5 actions',
      type: 'system',
    }
  }

  // Clear command
  if (lower === 'clear') {
    return {
      success: true,
      events: ['timeline cleared'],
      summary: 'clear.executed',
      type: 'system',
    }
  }

  // Unknown command
  return {
    success: false,
    events: [
      `error: unknown command: ${cmd}`,
      'type "help" for available commands',
    ],
    summary: 'command.failed · unknown',
    type: 'system',
  }
}

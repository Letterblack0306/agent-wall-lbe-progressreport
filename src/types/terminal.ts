export interface RepoStatus {
  name: string
  shortName: string
  role: string
  commits: number
  branches: number
  ci: 'PASS' | 'FAIL' | 'N/A'
  gate: string
  gateStatus: 'PASS' | 'FAIL' | 'BLOCKED' | 'OPEN' | 'ACTIVE' | 'STABLE' | 'IN_PROGRESS'
  lastCommit: string
  lastCommitMsg: string
  tech: string
  details: string[]
}

export interface MachineGate {
  activePlan: string
  activePhase: string
  activeSlice: string
  status: 'OPEN' | 'CLOSED' | 'BLOCKED'
  executionPlan: string
  selectedAgent: string
  blockedBy: string | null
}

export interface EcosystemTopology {
  clients: string[]
  mcpRoute: string
  dataSources: { name: string; role: string; status: string }[]
  validatedPass: number
  validatedFail: number
}

export interface WorkspaceState {
  sessionId: string
  workspace: string
  model: string
  mode: 'PLAN' | 'ACT'
  gitBranch: string
  gitDiff: string
  contextUsage: number
  repos: RepoStatus[]
  gate: MachineGate
  topology: EcosystemTopology
  timeline: TimelineEntry[]
  sessionStart: string
  providerStatus: 'connected' | 'configured' | 'disconnected'
  authStatus: 'authorized' | 'pending'
}

export interface ProcessEvent {
  id: string
  command: string
  status: 'running' | 'completed' | 'failed'
  startTime: number
  endTime?: number
  events: string[]
  summary?: string
}

export interface TimelineEntry {
  id: string
  timestamp: string
  process: ProcessEvent
  type: 'inspect' | 'audit' | 'query' | 'gate' | 'system'
}

export interface CommandResult {
  success: boolean
  events: string[]
  summary: string
  type: TimelineEntry['type']
}

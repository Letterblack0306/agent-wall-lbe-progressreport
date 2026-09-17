type Status = 'PASS' | 'FAIL' | 'BLOCKED' | 'UNVERIFIED' | 'OPEN' | 'PROVEN' | 'IN_PROGRESS' | 'ALIGNED' | 'STALE' | 'IMPLEMENTED'

export default function StatusBadge({ status }: { status: Status | string }) {
  const colors: Record<string, string> = {
    PASS: 'bg-green-900/40 text-green-400 border-green-800',
    FAIL: 'bg-red-900/40 text-red-400 border-red-800',
    BLOCKED: 'bg-red-900/40 text-red-400 border-red-800',
    UNVERIFIED: 'bg-yellow-900/40 text-yellow-400 border-yellow-800',
    OPEN: 'bg-orange-900/40 text-orange-400 border-orange-800',
    PROVEN: 'bg-green-900/40 text-green-400 border-green-800',
    'IN_PROGRESS': 'bg-blue-900/40 text-blue-400 border-blue-800',
    ALIGNED: 'bg-green-900/40 text-green-400 border-green-800',
    STALE: 'bg-gray-900/40 text-gray-400 border-gray-700',
    IMPLEMENTED: 'bg-blue-900/40 text-blue-400 border-blue-800',
    'NOT ACCEPTED': 'bg-red-900/40 text-red-400 border-red-800',
  }

  const color = colors[status] || 'bg-gray-900/40 text-gray-400 border-gray-700'

  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded border ${color}`}>
      {status}
    </span>
  )
}

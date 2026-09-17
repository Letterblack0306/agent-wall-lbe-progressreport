export default function AuditHeader() {
  return (
    <header className="border-b border-[#2a2a2d] px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#ff3b3b] animate-pulse" />
              <h1 className="text-xl font-bold tracking-tight">LBE WORKSPACE AUDIT</h1>
            </div>
            <p className="text-sm text-[#8e8e93]">
              Lockstep Boundary Engine — Dual Repository Compliance & Plan Audit
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#8e8e93]">Audit Date</div>
            <div className="text-sm font-bold">2026-09-17</div>
            <div className="text-xs text-[#8e8e93] mt-1">Classification</div>
            <div className="text-sm text-[#ff3b3b]">ACTIVE — OPEN GATE</div>
          </div>
        </div>
      </div>
    </header>
  )
}

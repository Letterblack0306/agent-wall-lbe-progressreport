import { useState } from 'react'
import AuditHeader from './components/AuditHeader'
import OverallStatus from './components/OverallStatus'
import RepoAudit from './components/RepoAudit'
import ArchitectureCheck from './components/ArchitectureCheck'
import BlockersSection from './components/BlockersSection'
import Recommendations from './components/Recommendations'
import TimelineView from './components/TimelineView'
import PlanningSessions from './components/PlanningSessions'

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'backend' | 'frontend' | 'architecture' | 'timeline' | 'planning'>('overview')

  return (
    <div className="min-h-screen bg-[#0b0b0c] text-[#e1e1e6] font-mono">
      <AuditHeader />
      
      {/* Navigation */}
      <nav className="border-b border-[#2a2a2d] px-6 py-3">
        <div className="max-w-7xl mx-auto flex gap-1">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'backend', label: 'Backend (Python)' },
            { id: 'frontend', label: 'Frontend (Rust/PS)' },
            { id: 'architecture', label: 'Architecture' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'planning', label: 'Planning Sessions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-sm rounded transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1c1c1f] text-[#e1e1e6] border border-[#2a2a2d]'
                  : 'text-[#8e8e93] hover:text-[#e1e1e6] hover:bg-[#141416]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <OverallStatus />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RepoAudit repo="backend" />
              <RepoAudit repo="frontend" />
            </div>
            <BlockersSection />
            <Recommendations />
          </div>
        )}
        {activeTab === 'backend' && (
          <div className="space-y-6">
            <RepoAudit repo="backend" full />
            <BlockersSection />
          </div>
        )}
        {activeTab === 'frontend' && (
          <div className="space-y-6">
            <RepoAudit repo="frontend" full />
          </div>
        )}
        {activeTab === 'architecture' && (
          <ArchitectureCheck />
        )}
        {activeTab === 'timeline' && (
          <TimelineView />
        )}
        {activeTab === 'planning' && (
          <PlanningSessions />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2d] px-6 py-4 mt-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-[#8e8e93]">
          <span>LBE Audit Report — Generated 2026-09-17</span>
          <span>Source: live GitHub evidence + governance artifacts</span>
        </div>
      </footer>
    </div>
  )
}

import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './views/Dashboard'
import { DesignerAssessment } from './views/DesignerAssessment'
import { LeadAssessment } from './views/LeadAssessment'
import { Comparison } from './views/Comparison'
import { Presentation } from './views/Presentation'
import type { View } from './types'

export default function App() {
  const [view, setView] = useState<View>('dashboard')

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard onNavigate={setView} />
      case 'designer-assessment': return <DesignerAssessment onNavigate={setView} />
      case 'lead-assessment': return <LeadAssessment onNavigate={setView} />
      case 'comparison': return <Comparison onNavigate={setView} />
      case 'presentation': return <Presentation onNavigate={setView} />
    }
  }

  return (
    <div className="app-shell">
      <Sidebar current={view} onNavigate={setView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  )
}

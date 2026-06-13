import type { View } from '../types'

interface NavItem {
  id: View
  label: string
  sublabel: string
  badge?: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Team Dashboard', sublabel: 'Facilitator view', badge: '12' },
  { id: 'designer-assessment', label: 'Designer Assessment', sublabel: 'Self-assessment flow' },
  { id: 'lead-assessment', label: 'Lead Assessment', sublabel: 'Observer evaluation' },
  { id: 'comparison', label: 'Comparison View', sublabel: 'Self vs lead scores' },
  { id: 'presentation', label: 'Presentation Mode', sublabel: 'Workshop-ready summary' },
]

const ICONS: Record<View, string> = {
  dashboard: '⊞',
  'designer-assessment': '◷',
  'lead-assessment': '◈',
  comparison: '⇌',
  presentation: '▶',
}

interface Props {
  current: View
  onNavigate: (view: View) => void
}

export function Sidebar({ current, onNavigate }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">AI</div>
        <div className="brand-text">
          <strong>Questionnaire VM</strong>
          <span>Workshop MVP</span>
        </div>
      </div>

      <div>
        <div className="sidebar-section-label" style={{ marginBottom: 6 }}>Views</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item${current === item.id ? ' active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={current === item.id ? 'page' : undefined}
            >
              <span className="nav-item-icon" aria-hidden="true">{ICONS[item.id]}</span>
              <span className="nav-item-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        Fictional demo data · Constructive wording only · Workshop MVP prototype
      </div>
    </aside>
  )
}

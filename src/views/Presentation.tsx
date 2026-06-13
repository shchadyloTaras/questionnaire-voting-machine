import { TEAM_METRICS, TEAM_CATEGORY_SCORES } from '../data/mockData'
import type { View } from '../types'

const MATURITY_DIST = [
  { label: 'AI Curious', count: 1 },
  { label: 'AI Beginner', count: 2 },
  { label: 'AI Practitioner', count: 4 },
  { label: 'AI Power User', count: 4 },
  { label: 'AI Design Leader', count: 1 },
]
const TOTAL_DIST = MATURITY_DIST.reduce((s, d) => s + d.count, 0)

interface Props {
  onNavigate: (view: View) => void
}

export function Presentation({ onNavigate }: Props) {
  const selfPct = Math.round((TEAM_METRICS.selfComplete / TEAM_METRICS.totalDesigners) * 100)
  const topStrength = [...TEAM_CATEGORY_SCORES].sort((a, b) => b.score - a.score)[0]
  const topFocus = [...TEAM_CATEGORY_SCORES].sort((a, b) => a.score - b.score)[0]

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Presentation Mode</h1>
          <p className="page-subtitle">Workshop-friendly summary · Personal detail minimized</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-sm" onClick={() => onNavigate('dashboard')}>← Back to dashboard</button>
        </div>
      </div>

      <div className="presentation-shell">
        <div className="presentation-header">
          <h2>AI Competency Snapshot</h2>
          <p>Team-level results · Constructive development language · Fictional demo data</p>
        </div>

        <div className="presentation-metrics">
          <div className="presentation-metric">
            <div className="metric-label">Completion</div>
            <div className="metric-value">{selfPct}%</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>self-assessments</div>
          </div>
          <div className="presentation-metric">
            <div className="metric-label">Avg maturity</div>
            <div className="metric-value">{TEAM_METRICS.avgMaturity}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>AI Practitioner level</div>
          </div>
          <div className="presentation-metric">
            <div className="metric-label">Top strength</div>
            <div className="metric-value" style={{ fontSize: 20, lineHeight: 1.2 }}>{topStrength.category.split(' ')[0]}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>{topStrength.score}% team avg</div>
          </div>
          <div className="presentation-metric">
            <div className="metric-label">Recommended focus</div>
            <div className="metric-value" style={{ fontSize: 20, lineHeight: 1.2 }}>{topFocus.category.split(' and ')[0].split(' ')[0]}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 3 }}>{topFocus.score}% team avg</div>
          </div>
        </div>

        <div>
          <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
            Category score overview
          </div>
          <div className="presentation-categories">
            {TEAM_CATEGORY_SCORES.map((c) => (
              <div key={c.category} className="presentation-cat-row">
                <div className="presentation-cat-header">
                  <span className="presentation-cat-name">{c.category}</span>
                  <span className="presentation-cat-score">{c.score}%</span>
                </div>
                <div className="presentation-track">
                  <div
                    className="presentation-fill"
                    style={{ width: `${c.score}%`, background: c.score < 50 ? '#f97316' : c.score < 65 ? '#facc15' : '#2dd4bf' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>
            Maturity distribution
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {MATURITY_DIST.map((m) => {
              const pct = Math.round((m.count / TOTAL_DIST) * 100)
              return (
                <div key={m.label} style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 80 }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'white', lineHeight: 1 }}>{m.count}</div>
                  <div style={{ height: Math.max(pct, 10), background: 'rgba(255,255,255,0.12)', borderRadius: 4 }} />
                  <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.3 }}>{m.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="presentation-footer">
          <span>Fictional demo data only</span>
          <span>Constructive wording · No punitive labels</span>
          <span>Workshop MVP · Next: build vertical slice</span>
        </div>
      </div>

      <div className="panel mt-4">
        <div className="panel-title">Workshop conversation starters</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { q: 'What patterns do you see in the category gaps?', hint: 'Discuss where self-perception and lead observation diverge.' },
            { q: 'Which recommended focus areas apply to your whole team?', hint: 'Look at the bottom two category scores.' },
            { q: 'Who might be ready to mentor others in AI practice?', hint: 'Consider AI Power User and AI Design Leader profiles.' },
          ].map((item) => (
            <div key={item.q} style={{ padding: '14px 16px', borderRadius: 6, background: 'var(--soft)', border: '1px solid var(--line-soft)' }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 6 }}>{item.q}</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>{item.hint}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

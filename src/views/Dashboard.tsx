import { DESIGNERS, TEAM_METRICS, TEAM_CATEGORY_SCORES, MATURITY_LEVELS } from '../data/mockData'
import { ProgressBar } from '../components/ProgressBar'
import { statusPill } from '../components/Pill'
import type { View } from '../types'

const MATURITY_DIST = [
  { level: 'AI Curious', count: 1, color: '#94a3b8' },
  { level: 'AI Beginner', count: 2, color: '#fb923c' },
  { level: 'AI Practitioner', count: 4, color: '#facc15' },
  { level: 'AI Power User', count: 4, color: '#4ade80' },
  { level: 'AI Design Leader', count: 1, color: '#2dd4bf' },
]
const TOTAL_DIST = MATURITY_DIST.reduce((s, d) => s + d.count, 0)

interface Props {
  onNavigate: (view: View) => void
}

export function Dashboard({ onNavigate }: Props) {
  const selfPct = Math.round((TEAM_METRICS.selfComplete / TEAM_METRICS.totalDesigners) * 100)
  const leadPct = Math.round((TEAM_METRICS.leadComplete / TEAM_METRICS.totalDesigners) * 100)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Team AI Competency Snapshot</h1>
          <p className="page-subtitle">Workshop Facilitator view · Fictional demo data</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-sm">Edit Questionnaire</button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('designer-assessment')}>
            Start Demo Flow →
          </button>
        </div>
      </div>

      {/* Metrics row */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-label">Designers</div>
          <div className="metric-value">{TEAM_METRICS.totalDesigners}</div>
          <div className="metric-sub">in this cohort</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Self-assessments</div>
          <div className="metric-value">{TEAM_METRICS.selfComplete}<span style={{ fontSize: 18, fontWeight: 600, color: 'var(--muted)' }}>/{TEAM_METRICS.totalDesigners}</span></div>
          <div className="metric-sub"><span className="metric-trend-up">{selfPct}% complete</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Lead reviews</div>
          <div className="metric-value">{TEAM_METRICS.leadComplete}<span style={{ fontSize: 18, fontWeight: 600, color: 'var(--muted)' }}>/{TEAM_METRICS.totalDesigners}</span></div>
          <div className="metric-sub"><span style={{ color: 'var(--muted)' }}>{leadPct}% complete</span></div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg AI maturity</div>
          <div className="metric-value">{TEAM_METRICS.avgMaturity}</div>
          <div className="metric-sub">AI Practitioner level</div>
        </div>
      </div>

      {/* Main panels */}
      <div className="two-col">
        {/* Designer table */}
        <div className="panel">
          <div className="panel-title">
            Designer Status
            <span className="text-sm muted">{DESIGNERS.length} shown</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Designer</th>
                <th>Self</th>
                <th>Lead</th>
                <th>Combined</th>
                <th>Focus area</th>
              </tr>
            </thead>
            <tbody>
              {DESIGNERS.map((d) => (
                <tr key={d.id} style={{ cursor: 'pointer' }} onClick={() => onNavigate('comparison')}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{d.initials}</div>
                      <div>
                        <div className="table-name">{d.name}</div>
                        <div className="table-role">{d.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>{statusPill(d.selfStatus)}</td>
                  <td>{statusPill(d.leadStatus)}</td>
                  <td>
                    {d.combinedScore !== null
                      ? <strong>{d.combinedScore}</strong>
                      : <span className="muted">—</span>}
                  </td>
                  <td><span className="text-sm muted">{d.focusArea}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Maturity distribution */}
          <div className="panel">
            <div className="panel-title">Maturity Distribution</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MATURITY_DIST.map((m) => (
                <div key={m.level}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold">{m.level}</span>
                    <span className="text-xs muted">{m.count} of {TOTAL_DIST}</span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.round((m.count / TOTAL_DIST) * 100)}%`, background: m.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category gaps */}
          <div className="panel">
            <div className="panel-title">Category Score Overview</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {TEAM_CATEGORY_SCORES.map((c) => (
                <div key={c.category} className="category-row">
                  <div className="category-row-header">
                    <span className="category-name">{c.category}</span>
                    <span className="category-score-label">{c.score}%</span>
                  </div>
                  <ProgressBar
                    value={c.score}
                    variant={c.score < 50 ? 'gap' : c.score < 60 ? 'warn' : 'default'}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Maturity legend */}
      <div className="panel mt-4">
        <div className="panel-title">AI Maturity Model Reference</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {MATURITY_LEVELS.map((m) => (
            <div key={m.level} style={{ padding: '10px 12px', borderRadius: 6, background: 'var(--soft)', border: '1px solid var(--line-soft)' }}>
              <div style={{ fontWeight: 800, fontSize: 13 }}>Level {m.level} · {m.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 3 }}>{m.scoreRange}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4, lineHeight: 1.4 }}>{m.interpretation}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { DESIGNERS, CATEGORY_GAPS, RECOMMENDATIONS, getMaturityInfo } from '../data/mockData'
import { Pill, statusPill } from '../components/Pill'
import { ProgressBar } from '../components/ProgressBar'
import type { View } from '../types'

interface Props {
  onNavigate: (view: View) => void
}

export function Comparison({ onNavigate }: Props) {
  const completedDesigners = DESIGNERS.filter((d) => d.selfStatus === 'submitted' && d.leadStatus === 'submitted')
  const pendingDesigners = DESIGNERS.filter((d) => d.selfStatus === 'submitted' && d.leadStatus !== 'submitted')
  const [activeId, setActiveId] = useState<string>(completedDesigners[0]?.id ?? '')

  const designer = DESIGNERS.find((d) => d.id === activeId)
  const maturity = designer?.combinedScore !== null && designer?.combinedScore !== undefined
    ? getMaturityInfo(designer.combinedScore)
    : null

  const gapVariant = (gap: number) => {
    if (Math.abs(gap) <= 5) return 'aligned'
    if (gap < -5) return 'growth_area'
    return 'discuss_evidence'
  }

  const gapLabel = (signal: string) => {
    if (signal === 'aligned') return <Pill variant="success">Aligned</Pill>
    if (signal === 'growth_area') return <Pill variant="danger">Growth area</Pill>
    return <Pill variant="warn">Discuss evidence</Pill>
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Self vs Lead Comparison</h1>
          <p className="page-subtitle">Scores calculated from recorded responses — server-owned.</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('presentation')}>
            Open Presentation Mode →
          </button>
        </div>
      </div>

      {/* Designer selector */}
      <div className="panel mb-3" style={{ padding: '14px 18px' }}>
        <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
          <span className="text-sm muted">Select designer:</span>
          {completedDesigners.map((d) => (
            <button
              key={d.id}
              className={`btn btn-sm${activeId === d.id ? ' btn-primary' : ''}`}
              onClick={() => setActiveId(d.id)}
            >
              {d.name}
            </button>
          ))}
          {pendingDesigners.map((d) => (
            <button key={d.id} className="btn btn-sm" disabled style={{ opacity: 0.5 }}>
              {d.name} (pending lead)
            </button>
          ))}
        </div>
      </div>

      {designer && maturity ? (
        <>
          {/* Score trio */}
          <div className="score-trio">
            <div className="score-card">
              <div className="score-card-label">Self-score</div>
              <div className="score-card-value">{designer.selfScore}</div>
              <div className="score-card-sub">
                <Pill variant="info">{getMaturityInfo(designer.selfScore!).name}</Pill>
              </div>
            </div>
            <div className="score-card">
              <div className="score-card-label">Lead-score</div>
              <div className="score-card-value">{designer.leadScore}</div>
              <div className="score-card-sub">
                <Pill variant="info">{getMaturityInfo(designer.leadScore!).name}</Pill>
              </div>
            </div>
            <div className="score-card" style={{ background: '#f0faf9', borderColor: '#a7f3d0' }}>
              <div className="score-card-label">Combined score</div>
              <div className="score-card-value" style={{ color: 'var(--brand-dark)' }}>{designer.combinedScore}</div>
              <div className="score-card-sub">
                <Pill variant="success">Recommended focus ready</Pill>
              </div>
            </div>
          </div>

          {/* Maturity banner */}
          <div className="maturity-banner">
            <div className="maturity-level-badge">{maturity.level}</div>
            <div>
              <div className="maturity-name">{maturity.name}</div>
              <div className="maturity-desc">{maturity.interpretation}</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <div className="text-xs muted">Score range</div>
              <div className="font-bold">{maturity.scoreRange}</div>
            </div>
          </div>

          <div className="two-even">
            {/* Category gaps */}
            <div className="panel">
              <div className="panel-title">Category Gap Analysis</div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Self</th>
                    <th>Lead</th>
                    <th>Gap</th>
                    <th>Signal</th>
                  </tr>
                </thead>
                <tbody>
                  {CATEGORY_GAPS.map((cg) => {
                    const signal = gapVariant(cg.gap)
                    return (
                      <tr key={cg.category}>
                        <td><span className="text-sm font-bold">{cg.category}</span></td>
                        <td>{cg.selfScore}</td>
                        <td>{cg.leadScore}</td>
                        <td>
                          <span className={cg.gap > 0 ? 'gap-direction-up' : cg.gap < -5 ? 'gap-direction-down' : 'gap-direction-neutral'}>
                            {cg.gap > 0 ? '+' : ''}{cg.gap}
                          </span>
                        </td>
                        <td>{gapLabel(signal)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              <div className="divider" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {CATEGORY_GAPS.map((cg) => (
                  <div key={cg.category} className="category-row">
                    <div className="category-row-header">
                      <span className="category-name text-sm">{cg.category}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                      <div>
                        <div className="text-xs muted mb-1">Self</div>
                        <ProgressBar value={cg.selfScore} />
                      </div>
                      <div>
                        <div className="text-xs muted mb-1">Lead</div>
                        <ProgressBar value={cg.leadScore} variant={cg.leadScore < cg.selfScore - 5 ? 'warn' : 'default'} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations + designer info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="panel">
                <div className="panel-title">Recommended Learning Focus</div>
                <ul className="recommendations-list">
                  {RECOMMENDATIONS.map((r, i) => (
                    <li key={i} className="recommendation-item">
                      <div className={`rec-priority rec-${r.priority}`} />
                      <span>{r.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel">
                <div className="designer-profile-header" style={{ marginBottom: 0, paddingBottom: 0, borderBottom: 0 }}>
                  <div className="avatar">{designer.initials}</div>
                  <div>
                    <div className="font-bold">{designer.name}</div>
                    <div className="text-sm muted">{designer.role} · Lead: {designer.leadName}</div>
                  </div>
                </div>
                <div className="divider" />
                <table className="data-table">
                  <tbody>
                    <tr><td className="muted text-sm">Self-assessment</td><td>{statusPill(designer.selfStatus)}</td></tr>
                    <tr><td className="muted text-sm">Lead assessment</td><td>{statusPill(designer.leadStatus)}</td></tr>
                    <tr><td className="muted text-sm">Lead visibility</td><td><span className="text-sm muted">Facilitator-controlled</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="panel" style={{ maxWidth: 520 }}>
          <h2>Comparison not yet available</h2>
          <p className="muted" style={{ lineHeight: 1.6 }}>
            Both the self-assessment and lead assessment must be complete before the comparison view can show combined
            scores, category gaps, and recommended focus areas.
          </p>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate('designer-assessment')}>Start self-assessment</button>
            <button className="btn btn-sm" onClick={() => onNavigate('lead-assessment')}>Start lead assessment</button>
          </div>
        </div>
      )}
    </div>
  )
}

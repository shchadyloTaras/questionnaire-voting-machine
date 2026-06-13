import { useState } from 'react'
import { DESIGNERS, LEAD_QUESTIONS } from '../data/mockData'
import { statusPill } from '../components/Pill'
import type { View } from '../types'

type Phase = 'list' | 'question' | 'saved'

interface Props {
  onNavigate: (view: View) => void
}

export function LeadAssessment({ onNavigate }: Props) {
  const [phase, setPhase] = useState<Phase>('list')
  const [selectedDesignerId, setSelectedDesignerId] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selections, setSelections] = useState<(number | null)[]>(Array(LEAD_QUESTIONS.length).fill(null))
  const [comment, setComment] = useState('')
  const [validationError, setValidationError] = useState(false)

  const designer = DESIGNERS.find((d) => d.id === selectedDesignerId)
  const question = LEAD_QUESTIONS[currentIndex]
  const total = LEAD_QUESTIONS.length

  const assignedDesigners = DESIGNERS.filter((d) => d.leadStatus !== 'submitted')

  const handleSelectDesigner = (id: string) => {
    setSelectedDesignerId(id)
    setPhase('question')
    setCurrentIndex(0)
    setSelections(Array(total).fill(null))
    setComment('')
    setValidationError(false)
  }

  const handleNext = () => {
    if (selections[currentIndex] === null) {
      setValidationError(true)
      return
    }
    setValidationError(false)
    if (currentIndex + 1 < total) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setPhase('saved')
    }
  }

  const handleSelect = (idx: number) => {
    const updated = [...selections]
    updated[currentIndex] = idx
    setSelections(updated)
    setValidationError(false)
  }

  if (phase === 'list') {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1>Lead Assessment</h1>
            <p className="page-subtitle">Observer perspective for Assigned Designers · Design Lead view</p>
          </div>
        </div>

        <div className="two-col">
          <div className="panel">
            <div className="panel-title">
              Assigned Designers
              <span className="text-sm muted">Team list</span>
            </div>
            {assignedDesigners.length === 0 ? (
              <p className="muted text-sm">All assigned designers have completed their lead assessment.</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Designer</th>
                    <th>Self-assessment</th>
                    <th>Lead review</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {assignedDesigners.map((d) => (
                    <tr key={d.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar" style={{ width: 32, height: 32, fontSize: 11 }}>{d.initials}</div>
                          <div>
                            <div className="table-name">{d.name}</div>
                            <div className="table-role">{d.role} · {d.team}</div>
                          </div>
                        </div>
                      </td>
                      <td>{statusPill(d.selfStatus)}</td>
                      <td>{statusPill(d.leadStatus)}</td>
                      <td>
                        <button className="btn btn-primary btn-sm" onClick={() => handleSelectDesigner(d.id)}>
                          Assess →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {DESIGNERS.filter((d) => d.leadStatus === 'submitted').length > 0 && (
              <>
                <div className="divider" />
                <div className="panel-title" style={{ fontSize: 13 }}>Completed reviews</div>
                <table className="data-table">
                  <thead>
                    <tr><th>Designer</th><th>Combined score</th><th></th></tr>
                  </thead>
                  <tbody>
                    {DESIGNERS.filter((d) => d.leadStatus === 'submitted').map((d) => (
                      <tr key={d.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{d.initials}</div>
                            <span className="table-name">{d.name}</span>
                          </div>
                        </td>
                        <td><strong>{d.combinedScore}</strong></td>
                        <td>
                          <button className="btn btn-sm" onClick={() => onNavigate('comparison')}>View comparison</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>

          <div className="panel">
            <h3>How lead assessment works</h3>
            <p className="text-sm muted" style={{ lineHeight: 1.6 }}>
              As a Design Lead, you evaluate an Assigned Designer from an observer perspective using the same AI
              competency categories. Your assessment is combined with the Designer's self-assessment to produce a
              balanced score and growth area focus.
            </p>
            <div className="divider" />
            <h3>Result visibility</h3>
            <p className="text-sm muted" style={{ lineHeight: 1.6 }}>
              Lead assessment results are not shown to Designers unless the Workshop Facilitator explicitly enables that
              visibility. Comments remain confidential by default.
            </p>
            <div className="divider" />
            <h3>Combined score formula</h3>
            <div style={{ fontFamily: 'monospace', fontSize: 12, background: 'var(--soft)', padding: '10px 12px', borderRadius: 6, color: 'var(--muted)' }}>
              combined = self × 0.4 + lead × 0.6
            </div>
            <p className="text-xs muted mt-1">Lead carries more weight to reduce self-perception bias.</p>
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'saved') {
    return (
      <div>
        <div className="page-header">
          <h1>Lead Assessment Saved</h1>
        </div>
        <div className="panel" style={{ maxWidth: 520 }}>
          <div className="completion-icon" style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--ok-bg)', color: 'var(--ok)', display: 'grid', placeItems: 'center', fontSize: 24, marginBottom: 16 }}>✓</div>
          <h2>Lead assessment recorded for {designer?.name}</h2>
          <p className="muted" style={{ lineHeight: 1.6 }}>
            Your observer assessment is now available for comparison. The combined score and growth area analysis will
            appear in the comparison view and facilitator dashboard.
          </p>
          <div className="flex gap-2 mt-3" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('comparison')}>Open Comparison →</button>
            <button className="btn" onClick={() => setPhase('list')}>Back to list</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Lead Assessment</h1>
          <p className="page-subtitle">{question.category}</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-sm" onClick={() => setPhase('list')}>← Back to list</button>
        </div>
      </div>

      {designer && (
        <div className="two-col">
          <div className="panel">
            {/* Designer profile */}
            <div className="designer-profile-header">
              <div className={`avatar avatar-lg`}>{designer.initials}</div>
              <div className="designer-profile-meta">
                <div className="designer-profile-name">{designer.name}</div>
                <div className="designer-profile-role">{designer.role} · {designer.team}</div>
              </div>
              <div>{statusPill(designer.selfStatus)}</div>
            </div>

            {/* Progress */}
            <div className="flex justify-between text-sm muted mb-1">
              <span>Question {currentIndex + 1} of {total}</span>
              <span>{question.category}</span>
            </div>
            <div className="progress-track mb-3">
              <div className="progress-fill" style={{ width: `${(currentIndex / total) * 100}%` }} />
            </div>

            {/* Question */}
            <div className="question-text">{question.text}</div>

            {validationError && (
              <p style={{ color: 'var(--gap-color)', fontSize: 13, marginBottom: 10 }}>
                Please select an answer before continuing.
              </p>
            )}

            <div className="option-list">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`option-item${selections[currentIndex] === idx ? ' selected' : ''}`}
                  onClick={() => handleSelect(idx)}
                >
                  <div className="option-radio">
                    <div className="option-radio-dot" />
                  </div>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            {currentIndex === total - 1 && (
              <div style={{ marginTop: 18 }}>
                <h3>Constructive comment <span className="muted text-sm">(optional)</span></h3>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe an observed AI practice or recommended focus area using constructive language…"
                  style={{ width: '100%', border: '1px solid var(--line)', borderRadius: 6, padding: '10px 12px', resize: 'vertical', fontSize: 13.5 }}
                />
              </div>
            )}

            <div className="question-nav">
              <span className="question-counter">
                {currentIndex + 1} / {total} · Weight {question.weight}×
              </span>
              <button className="btn btn-primary btn-sm" onClick={handleNext}>
                {currentIndex + 1 === total ? 'Save Lead Review' : 'Next →'}
              </button>
            </div>
          </div>

          <div className="panel">
            <h3>Assessment status</h3>
            <table className="data-table">
              <tbody>
                <tr>
                  <td>Self-assessment</td>
                  <td>{statusPill(designer.selfStatus)}</td>
                </tr>
                <tr>
                  <td>Lead assessment</td>
                  <td><span className="pill pill-warn">In progress</span></td>
                </tr>
                <tr>
                  <td>Result visibility</td>
                  <td><span className="text-sm muted">Lead details hidden from Designer</span></td>
                </tr>
              </tbody>
            </table>
            <div className="divider" />
            <h3>Observer guidelines</h3>
            <p className="text-sm muted" style={{ lineHeight: 1.6 }}>
              Base your answers on work you have directly observed during design reviews, critiques, research sessions,
              or handoff discussions. If you have not observed a specific behavior, select "Not observed."
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

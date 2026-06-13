import { useState, useEffect, useCallback } from 'react'
import { ASSESSMENT_QUESTIONS } from '../data/mockData'
import { ProgressBar } from '../components/ProgressBar'
import type { View } from '../types'

type Phase = 'intro' | 'question' | 'complete'

interface Props {
  onNavigate: (view: View) => void
}

export function DesignerAssessment({ onNavigate }: Props) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [validationError, setValidationError] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(ASSESSMENT_QUESTIONS.length).fill(null))

  const question = ASSESSMENT_QUESTIONS[currentIndex]
  const total = ASSESSMENT_QUESTIONS.length

  const advanceQuestion = useCallback(() => {
    const updated = [...answers]
    updated[currentIndex] = selected
    setAnswers(updated)
    if (currentIndex + 1 < total) {
      setCurrentIndex(currentIndex + 1)
      setSelected(null)
      setValidationError(false)
    } else {
      setPhase('complete')
    }
  }, [answers, currentIndex, selected, total])

  useEffect(() => {
    if (phase !== 'question') return
    setTimeLeft(question.timerSec)
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          advanceQuestion()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [phase, currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleNext = () => {
    if (selected === null) {
      setValidationError(true)
      return
    }
    advanceQuestion()
  }

  const handleOptionSelect = (idx: number) => {
    setSelected(idx)
    setValidationError(false)
  }

  if (phase === 'intro') {
    return (
      <div>
        <div className="page-header">
          <div>
            <h1>Designer Self-assessment</h1>
            <p className="page-subtitle">A constructive timed assessment — not a pass/fail test.</p>
          </div>
        </div>
        <div className="assessment-intro panel">
          <h2>Before you begin</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
            This assessment captures a snapshot of your AI knowledge, usage habits, and critical judgment. Your answers
            help identify strengths and recommended learning focus. There are no wrong answers that will harm you — the
            goal is to understand where the team is today and plan practical next steps.
          </p>
          <div className="intro-meta">
            <div className="meta-chip"><span>Questions</span><span className="meta-chip-value">{total}</span></div>
            <div className="meta-chip"><span>Timer</span><span className="meta-chip-value">per question</span></div>
            <div className="meta-chip"><span>Format</span><span className="meta-chip-value">Single choice</span></div>
            <div className="meta-chip"><span>Results</span><span className="meta-chip-value">Lead-only by default</span></div>
          </div>
          <h3>Assessment categories</h3>
          <div className="categories-list">
            {Array.from(new Set(ASSESSMENT_QUESTIONS.map((q) => q.category))).map((cat) => (
              <span key={cat} className="pill pill-info">{cat}</span>
            ))}
          </div>
          <div className="divider" />
          <p className="text-sm muted">
            Answer each question within the time shown. If time runs out, the question is marked unanswered and the assessment moves on.
            Timing data is used as a reliability signal — not as a penalty.
          </p>
          <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setPhase('question')}>
            Begin Assessment →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'complete') {
    const answered = answers.filter((a) => a !== null).length
    return (
      <div>
        <div className="page-header">
          <h1>Assessment Submitted</h1>
        </div>
        <div className="panel completion-card" style={{ maxWidth: 520 }}>
          <div className="completion-icon">✓</div>
          <h2>Well done — your assessment has been recorded.</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: 20 }}>
            You answered {answered} of {total} questions. Your responses are now read-only. Your Design Lead will
            complete a complementary assessment, after which your Workshop Facilitator can open the comparison view.
          </p>
          <p className="text-sm" style={{ color: 'var(--muted)', lineHeight: 1.5 }}>
            Your results reveal <strong>recommended learning focus areas</strong> — not grades or performance rankings.
            Lead assessment results are only shared with you when the Workshop Facilitator enables that visibility.
          </p>
          <div className="divider" />
          <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('lead-assessment')}>
              Continue to Lead Assessment →
            </button>
            <button className="btn" onClick={() => { setPhase('intro'); setCurrentIndex(0); setAnswers(Array(total).fill(null)) }}>
              Restart demo
            </button>
          </div>
        </div>
      </div>
    )
  }

  const pct = ((currentIndex) / total) * 100
  const timerPct = (timeLeft / question.timerSec) * 100
  const timerVariant = timerPct > 40 ? '' : timerPct > 20 ? ' warning' : ' critical'
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const timerLabel = `${mins > 0 ? `${mins}:` : ''}${String(secs).padStart(2, '0')} remaining`

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Designer Self-assessment</h1>
          <p className="page-subtitle">{question.category}</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-sm" onClick={() => setPhase('intro')}>← Back to intro</button>
        </div>
      </div>

      <div className="two-col">
        <div className="panel question-card">
          {/* Progress */}
          <div className="question-progress-header">
            <span>Question {currentIndex + 1} of {total}</span>
            <span>{question.category}</span>
          </div>
          <div className="progress-track" style={{ marginBottom: 20 }}>
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>

          {/* Timer */}
          <div className="timer-chip">
            <span>⏱</span>
            <span>{timerLabel}</span>
          </div>
          <div className="question-timer-bar">
            <div className={`question-timer-fill${timerVariant}`} style={{ width: `${timerPct}%` }} />
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
                className={`option-item${selected === idx ? ' selected' : ''}`}
                onClick={() => handleOptionSelect(idx)}
              >
                <div className="option-radio">
                  <div className="option-radio-dot" />
                </div>
                <span>{opt}</span>
              </button>
            ))}
          </div>

          <div className="question-nav">
            <span className="question-counter">
              {currentIndex + 1} / {total} · Weight {question.weight}×
            </span>
            <button className="btn btn-primary btn-sm" onClick={handleNext}>
              {currentIndex + 1 === total ? 'Submit Assessment' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Sidebar panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="panel">
            <h3>Assessment Progress</h3>
            <ProgressBar value={currentIndex} max={total} />
            <p className="text-sm muted mt-1">{total - currentIndex - 1} questions remaining</p>
            <div className="divider" />
            <h3>Categories covered</h3>
            <div className="categories-list" style={{ flexDirection: 'column', gap: 4 }}>
              {Array.from(new Set(ASSESSMENT_QUESTIONS.map((q) => q.category))).map((cat) => {
                const done = ASSESSMENT_QUESTIONS.slice(0, currentIndex + 1).some((q) => q.category === cat)
                const current_ = ASSESSMENT_QUESTIONS[currentIndex].category === cat
                return (
                  <div key={cat} className="flex items-center gap-2 text-sm" style={{ padding: '4px 0' }}>
                    <div className={`status-dot ${current_ ? 'status-dot-yellow' : done ? 'status-dot-green' : 'status-dot-gray'}`} />
                    <span style={{ color: current_ ? 'var(--ink)' : done ? 'var(--ok)' : 'var(--muted-light)' }}>{cat}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="panel">
            <h3>Privacy note</h3>
            <p className="text-sm muted" style={{ lineHeight: 1.6 }}>
              Your answers are used to identify growth areas and recommended learning focus.
              Lead assessment results are not shown to you unless the Workshop Facilitator enables that visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export type View = 'dashboard' | 'designer-assessment' | 'lead-assessment' | 'comparison' | 'presentation'

export type AssessmentStatus = 'not_started' | 'in_progress' | 'submitted'

export type MaturityLevel = 1 | 2 | 3 | 4 | 5

export interface MaturityInfo {
  level: MaturityLevel
  name: string
  scoreRange: string
  interpretation: string
}

export interface Designer {
  id: string
  name: string
  initials: string
  role: string
  team: string
  leadName: string
  selfStatus: AssessmentStatus
  leadStatus: AssessmentStatus
  selfScore: number | null
  leadScore: number | null
  combinedScore: number | null
  maturityLevel: MaturityLevel | null
  focusArea: string
}

export interface CategoryGap {
  category: string
  selfScore: number
  leadScore: number
  gap: number
  signal: 'aligned' | 'growth_area' | 'discuss_evidence'
}

export interface Recommendation {
  text: string
  priority: 'high' | 'medium' | 'low'
}

export interface Question {
  id: string
  category: string
  text: string
  options: string[]
  correctIndex: number
  weight: number
  timerSec: number
}

export interface TeamMetrics {
  totalDesigners: number
  selfComplete: number
  leadComplete: number
  avgMaturity: number
}

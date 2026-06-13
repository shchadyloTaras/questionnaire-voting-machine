import type { Designer, CategoryGap, Recommendation, Question, TeamMetrics, MaturityInfo } from '../types'

export const MATURITY_LEVELS: MaturityInfo[] = [
  { level: 1, name: 'AI Curious', scoreRange: '0–24', interpretation: 'Has tried AI tools occasionally but has no stable design workflow yet.' },
  { level: 2, name: 'AI Beginner', scoreRange: '25–44', interpretation: 'Uses AI for simple tasks, often with ready-made prompts and limited validation.' },
  { level: 3, name: 'AI Practitioner', scoreRange: '45–64', interpretation: 'Uses AI regularly, writes workable prompts, validates output, and applies AI to design tasks.' },
  { level: 4, name: 'AI Power User', scoreRange: '65–84', interpretation: 'Integrates AI across many design stages, builds custom prompts, combines tools, and helps peers.' },
  { level: 5, name: 'AI Design Leader', scoreRange: '85–100', interpretation: 'Shapes team practices, teaches others, creates standards, and evaluates AI risks critically.' },
]

export function getMaturityInfo(score: number): MaturityInfo {
  if (score >= 85) return MATURITY_LEVELS[4]
  if (score >= 65) return MATURITY_LEVELS[3]
  if (score >= 45) return MATURITY_LEVELS[2]
  if (score >= 25) return MATURITY_LEVELS[1]
  return MATURITY_LEVELS[0]
}

export const TEAM_METRICS: TeamMetrics = {
  totalDesigners: 12,
  selfComplete: 9,
  leadComplete: 7,
  avgMaturity: 3.2,
}

export const DESIGNERS: Designer[] = [
  {
    id: '1',
    name: 'Marta Kovalenko',
    initials: 'MK',
    role: 'Product Designer',
    team: 'Growth',
    leadName: 'Iryna Melnyk',
    selfStatus: 'submitted',
    leadStatus: 'submitted',
    selfScore: 72,
    leadScore: 65,
    combinedScore: 68,
    maturityLevel: 4,
    focusArea: 'Critical Thinking and AI Safety',
  },
  {
    id: '2',
    name: 'Denys Savchuk',
    initials: 'DS',
    role: 'UX Designer',
    team: 'Platform',
    leadName: 'Iryna Melnyk',
    selfStatus: 'submitted',
    leadStatus: 'not_started',
    selfScore: 58,
    leadScore: null,
    combinedScore: null,
    maturityLevel: null,
    focusArea: 'Needs lead review',
  },
  {
    id: '3',
    name: 'Olena Shevchenko',
    initials: 'OS',
    role: 'Senior UX Designer',
    team: 'Growth',
    leadName: 'Iryna Melnyk',
    selfStatus: 'submitted',
    leadStatus: 'submitted',
    selfScore: 50,
    leadScore: 57,
    combinedScore: 54,
    maturityLevel: 3,
    focusArea: 'Validation habits',
  },
  {
    id: '4',
    name: 'Ivan Bondar',
    initials: 'IB',
    role: 'UI Designer',
    team: 'Platform',
    leadName: 'Iryna Melnyk',
    selfStatus: 'in_progress',
    leadStatus: 'not_started',
    selfScore: null,
    leadScore: null,
    combinedScore: null,
    maturityLevel: null,
    focusArea: 'Finish assessment',
  },
  {
    id: '5',
    name: 'Natalia Petrenko',
    initials: 'NP',
    role: 'Design Lead',
    team: 'Onboarding',
    leadName: 'Iryna Melnyk',
    selfStatus: 'submitted',
    leadStatus: 'submitted',
    selfScore: 81,
    leadScore: 79,
    combinedScore: 80,
    maturityLevel: 4,
    focusArea: 'Workflow sharing',
  },
  {
    id: '6',
    name: 'Andriy Lysenko',
    initials: 'AL',
    role: 'Product Designer',
    team: 'Growth',
    leadName: 'Iryna Melnyk',
    selfStatus: 'not_started',
    leadStatus: 'not_started',
    selfScore: null,
    leadScore: null,
    combinedScore: null,
    maturityLevel: null,
    focusArea: 'Not started',
  },
]

export const CATEGORY_GAPS: CategoryGap[] = [
  { category: 'Prompting Skills', selfScore: 74, leadScore: 70, gap: -4, signal: 'aligned' },
  { category: 'Critical Thinking and AI Safety', selfScore: 68, leadScore: 57, gap: -11, signal: 'growth_area' },
  { category: 'UX Research with AI', selfScore: 62, leadScore: 55, gap: -7, signal: 'discuss_evidence' },
  { category: 'Workflow Automation', selfScore: 70, leadScore: 72, gap: 2, signal: 'aligned' },
  { category: 'AI Awareness', selfScore: 78, leadScore: 74, gap: -4, signal: 'aligned' },
  { category: 'Ideation and Concepting', selfScore: 55, leadScore: 49, gap: -6, signal: 'discuss_evidence' },
]

export const TEAM_CATEGORY_SCORES: { category: string; score: number }[] = [
  { category: 'Critical Thinking and AI Safety', score: 42 },
  { category: 'Prompting Skills', score: 68 },
  { category: 'UX Research with AI', score: 56 },
  { category: 'Workflow Automation', score: 74 },
  { category: 'AI Awareness', score: 71 },
  { category: 'Ideation and Concepting', score: 52 },
  { category: 'UX Writing with AI', score: 48 },
  { category: 'Design Review and Critique', score: 60 },
]

export const RECOMMENDATIONS: Recommendation[] = [
  { text: 'Practice citing source evidence when using AI for research synthesis.', priority: 'high' },
  { text: 'Create a personal checklist for hallucination, privacy, and bias review.', priority: 'high' },
  { text: 'Share one validated AI workflow with the team during the next design critique.', priority: 'medium' },
  { text: 'Explore prompting patterns that combine role, context, constraints, and output format.', priority: 'medium' },
  { text: 'Review the team AI safety guidelines and bring one example to the next retrospective.', priority: 'low' },
]

export const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'AI Awareness',
    text: 'How confident are you explaining what an LLM can and cannot do to a product stakeholder?',
    options: ['Not confident at all', 'I can explain the basics', 'Moderate — I cover most questions', 'Strong — I answer confidently', 'I can teach others and handle edge cases'],
    correctIndex: 3,
    weight: 1.0,
    timerSec: 90,
  },
  {
    id: 'q2',
    category: 'Workflow Automation',
    text: 'How often do you use AI in your design process?',
    options: ['Never', 'Rarely (once a month or less)', 'Weekly', 'Several times per week', 'Daily — it is part of my core workflow'],
    correctIndex: 3,
    weight: 1.0,
    timerSec: 60,
  },
  {
    id: 'q3',
    category: 'UX Research with AI',
    text: 'Which UX tasks have you used AI for in the last month?',
    options: ['Interview summary or synthesis', 'Persona drafting from research notes', 'Competitor analysis', 'Journey mapping support', 'I have not used AI for UX research recently'],
    correctIndex: 0,
    weight: 1.2,
    timerSec: 90,
  },
  {
    id: 'q4',
    category: 'Critical Thinking and AI Safety',
    text: 'What would you do if AI gave a convincing but unverified research claim?',
    options: [
      'Use it directly because the wording sounds confident.',
      'Ask AI again until it gives a stronger answer.',
      'Verify against source material before using it.',
      'Ignore all AI output in research work.',
    ],
    correctIndex: 2,
    weight: 1.5,
    timerSec: 84,
  },
  {
    id: 'q5',
    category: 'Prompting Skills',
    text: 'Which prompt is strongest for generating personas from research notes?',
    options: [
      '"Make personas"',
      '"Create 3 personas from this"',
      '"Act as a UX researcher. Use these notes, cite evidence, flag assumptions, output a persona table."',
      '"Give me some ideas for personas"',
    ],
    correctIndex: 2,
    weight: 1.5,
    timerSec: 90,
  },
  {
    id: 'q6',
    category: 'Critical Thinking and AI Safety',
    text: 'Is it acceptable to paste confidential client data into a public AI tool without approval?',
    options: ['Yes, if you need a quick answer', 'Yes, if you delete the chat afterward', 'No — confidential data must not be shared with public tools without approval', 'It depends on the deadline'],
    correctIndex: 2,
    weight: 2.0,
    timerSec: 60,
  },
  {
    id: 'q7',
    category: 'Design Review and Critique',
    text: 'How can AI help with a UX audit?',
    options: [
      'Identify unclear or ambiguous user flows',
      'Check for potential accessibility risks',
      'Summarize heuristic issues across screens',
      'Completely replace user testing',
    ],
    correctIndex: 0,
    weight: 1.3,
    timerSec: 90,
  },
]

export const LEAD_QUESTIONS: Question[] = [
  {
    id: 'lq1',
    category: 'Prompting Skills',
    text: 'The Designer writes prompts that include role, context, constraints, and output format.',
    options: ['Not observed in their work', 'Rarely — mostly simple prompts', 'Sometimes — improving over time', 'Often — consistent prompt quality', 'Consistently — teaches the approach to others'],
    correctIndex: 3,
    weight: 1.5,
    timerSec: 90,
  },
  {
    id: 'lq2',
    category: 'Critical Thinking and AI Safety',
    text: 'The Designer validates AI output against source material or project evidence before using it.',
    options: ['Not observed', 'Rarely explains validation steps', 'Sometimes validates, not consistently', 'Often validates and documents the check', 'Always validates and shares the approach'],
    correctIndex: 3,
    weight: 1.5,
    timerSec: 90,
  },
  {
    id: 'lq3',
    category: 'UX Research with AI',
    text: 'The Designer uses AI to support UX research tasks such as synthesis, personas, or competitive analysis.',
    options: ['No observed usage', 'Occasional usage without clear method', 'Regular usage with some structure', 'Regular usage with clear methodology', 'Exemplary — brings structure and teaches peers'],
    correctIndex: 3,
    weight: 1.2,
    timerSec: 90,
  },
  {
    id: 'lq4',
    category: 'Workflow Automation',
    text: 'The Designer can explain why an AI-assisted design decision is valid when asked.',
    options: ['Not observed', 'Rarely — relies on AI without explanation', 'Sometimes — improving explainability', 'Often — explains AI role in decisions', 'Consistently teaches others how to explain AI decisions'],
    correctIndex: 3,
    weight: 1.5,
    timerSec: 90,
  },
]

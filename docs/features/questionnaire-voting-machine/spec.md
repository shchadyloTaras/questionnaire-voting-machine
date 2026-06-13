---
status: Draft
owner: "Workshop Facilitator"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-06-13"
feature_size: "M"
---

# Spec - questionnaire-voting-machine

> **Glossary:** [CONTEXT](./CONTEXT.md)
> **Reference module / docs / channels used:** None - only the user-provided workshop intake brief and the glossary.

## 1. Context

Design teams are being asked to adopt AI in research, ideation, UX writing, design critique, visual exploration, and routine workflow support, but leaders often have only anecdotes about who uses AI well and where the team needs practice. The feature solves this by giving Designers, Design Leads, and the Workshop Facilitator a structured way to capture self-assessment, observer assessment, skill gaps, and maturity interpretation.

The immediate trigger is an educational workshop about SDLC and AI-assisted development. The project must be useful as a product in its own right and as a teaching vehicle that walks participants from discovery and requirements through design, implementation, testing, deployment, demo, retrospective, and roadmap planning.

The committed approach is a workshop-ready questionnaire voting machine: Designers complete a timed self-assessment, Design Leads assess the same Designers using a separate observer-oriented question set that shares the same assessment categories, and the system compares results to produce constructive maturity levels, category gaps, and recommended learning focus. This balances a realistic company use case with an MVP small enough to build and explain in a workshop setting.

Decision assumptions recorded during intake:
- Interview depth used: medium, based on the local SDD default.
- Feature size used: M, because the project introduces a new product surface with questionnaire management, assessment flows, scoring, dashboard, data model, and API contract work.
- Competitive research was not run in this environment; the recommendation is grounded in the provided product brief and workshop constraints.

## 2. Goals

- Capture realistic AI competency signals from both Designer self-assessment and Design Lead assessment.
- Reveal constructive gaps, strengths, maturity levels, and recommended learning focus at Designer and team level.
- Provide a workshop backbone that demonstrates the full SDLC and practical AI assistance at each stage.

## 3. Non-goals

- Full authentication and complex role management are not part of the MVP because the workshop needs a small, teachable access model.
- In-product management of the Designer-to-Design-Lead assignment (Team list) is not part of the MVP; assignments are facilitator-seeded as configuration/demo data, so no assignment-management UI is built.
- Runtime detection or automatic rewriting of punitive language is not part of the MVP; constructive tone is enforced through approved copy templates and a manual copy QA process, not a language-detection feature.
- Full proctoring, video monitoring, and punitive anti-fraud controls are excluded because the product tone is developmental rather than disciplinary.
- Payments, HR integrations, LMS integrations, and enterprise reporting are excluded because they would distract from the core assessment and SDLC learning goals.
- Historical progress tracking and advanced adaptive testing are deferred because the MVP focuses on one workshop-ready assessment cycle.

## 4. User stories

### US-01: Open self-assessment

**As a** Designer  
**I want** to open my personal assessment experience  
**So that** I can understand the assessment purpose before answering

### US-02: Complete timed questionnaire

**As a** Designer  
**I want** to answer AI competency questions within clear timing rules  
**So that** the snapshot reflects my current knowledge and practical instincts

### US-03: See completion confirmation

**As a** Designer  
**I want** to see a completion confirmation after submission  
**So that** I know my self-assessment was recorded and cannot be endlessly changed

### US-04: Review designer profile

**As a** Design Lead  
**I want** to open a Designer profile from my Team list of Assigned Designers
**So that** I can assess the Designer in the right context

### US-05: Complete lead assessment

**As a** Design Lead  
**I want** to evaluate a Designer using the same AI competency categories  
**So that** the comparison reflects both self-perception and observed behavior

### US-06: Configure questionnaire

**As a** Workshop Facilitator  
**I want** to create categories, questions, answer options, and scoring rules  
**So that** the workshop can demonstrate a realistic assessment setup

### US-07: Configure timing rules

**As a** Workshop Facilitator  
**I want** to set timing rules for questions and the full assessment  
**So that** the assessment encourages honest first-pass answers without feeling punitive

### US-08: Calculate maturity score

**As a** Workshop Facilitator  
**I want** the system to calculate self-scores, lead-scores, combined scores, and maturity levels  
**So that** results are consistent and explainable during the workshop

### US-09: Compare assessments

**As a** Design Lead  
**I want** to compare self-assessment and lead assessment for one Designer  
**So that** I can identify overestimation, underestimation, strengths, and growth areas

### US-10: View team dashboard

**As a** Workshop Facilitator  
**I want** to view team-level results and category trends  
**So that** I can present the current AI competency snapshot

### US-11: Present workshop results

**As a** Workshop Facilitator  
**I want** a presentation-friendly view of summary results  
**So that** participants can discuss the SDLC outcome without exposing unnecessary personal detail

## 5. Acceptance criteria

### AC-01 (US-01) - happy

**Given** a Designer has valid assessment access and has not completed the self-assessment  
**When** the Designer opens the assessment experience  
**Then** the system shows the assessment purpose, approved constructive wording, timing rules, and a clear way to begin

### AC-02 (US-02) - happy

**Given** a published Questionnaire is available and the Designer has an active Assessment session  
**When** the Designer answers all required questions within the timing rules and submits the assessment  
**Then** the system records the responses against the published Questionnaire version, marks the self-assessment complete, keeps the submitted attempt read-only for normal Designer use, and allows changes only through a facilitator-approved new attempt or correction. A Designer has a single self-assessment attempt by default; starting another attempt requires Workshop Facilitator approval, and the latest facilitator-approved submitted attempt is the authoritative one for scoring and comparison

### AC-03 (US-02) - error

**Given** a Designer is answering a required question  
**When** the Designer tries to continue or finish without selecting or entering an answer  
**Then** the system keeps the Designer in the current step and explains that the question needs an answer before continuing

### AC-04 (US-02) - domain invariant

**Given** a Designer is answering a timed question and no answer has been submitted  
**When** the question timer expires  
**Then** the system records that the question was not answered in time, scores that required question as zero, and moves the Assessment session to the next question or completion step according to the published timing rules, with no grace period or automatic partial-answer submission in the MVP. Because a timed-out required question is recorded with a zero score rather than left blank, the assessment can still reach a complete, scorable state

### AC-04b (US-02) - domain invariant

**Given** a Designer has an active timed Assessment session with a full-assessment timing rule configured
**When** the full-assessment timer expires while the Designer is mid-question
**Then** the system ends the session, submits the answers recorded so far, marks every remaining required question as not answered in time and scores each as zero per AC-04, and the full-assessment timer takes precedence over the per-question timer

### AC-05 (US-03) - happy

**Given** a Designer has submitted the self-assessment  
**When** the submission is accepted  
**Then** the system shows a completion confirmation with approved constructive wording and no punitive result language

### AC-06 (US-04) - happy

**Given** a Design Lead has access to a facilitator-seeded Team list of Assigned Designers
**When** the Design Lead selects an Assigned Designer from that list
**Then** the system shows the Designer profile, assessment status, and available lead-assessment actions

### AC-07 (US-04) - authorization

**Given** a Design Lead is not assigned to view a Designer's assessment information
**When** the Design Lead tries to open that Designer's profile  
**Then** the system denies access to that Designer's profile and personal assessment details and explains that the role has no permission for those results

### AC-08 (US-05) - happy

**Given** a Design Lead is viewing a Designer profile and a lead assessment is available  
**When** the Design Lead completes the assessment using the observer-oriented question set for the configured categories  
**Then** the system records the Lead assessment and makes it available for comparison with the Designer's self-assessment

### AC-09 (US-06) - happy

**Given** the Workshop Facilitator is setting up the workshop assessment  
**When** the Workshop Facilitator adds categories, questions, answer options, and scoring weights  
**Then** the system saves a draft Questionnaire that can be reviewed before publishing

### AC-10 (US-06) - domain invariant

**Given** a draft Questionnaire is missing required Assessment categories, required scorable questions, usable answer options, scoring weights, or timing rules
**When** the Workshop Facilitator tries to publish it  
**Then** the system blocks publishing and names the missing content that must be added first

### AC-10b (US-06) - domain invariant

**Given** a draft Questionnaire includes required Assessment categories, required scorable questions, usable answer options, scoring weights, and timing rules
**When** the Workshop Facilitator publishes it
**Then** the system makes that Questionnaire version available to new Assessment sessions and keeps its questions, answer options, scoring weights, and timing rules unchanged for sessions started from that version

### AC-11 (US-07) - happy

**Given** the Workshop Facilitator is editing a draft Questionnaire  
**When** the Workshop Facilitator sets timing rules for questions and the full assessment  
**Then** the system saves the timing rules and shows them in the assessment introduction before Designers begin

### AC-12 (US-08) - happy

**Given** a Designer self-assessment or Lead assessment contains an answer for every required scorable question in that assessment side
**When** the submission is accepted, the Design Lead opens that Assigned Designer's comparison view, or the Workshop Facilitator opens a results dashboard
**Then** the system produces category scores, an overall score for that assessment side, and a provisional maturity level for that side using the published scoring rules; the maturity level is derived from fixed score bands (Level 1 AI Curious 0-24, Level 2 AI Beginner 25-44, Level 3 AI Practitioner 45-64, Level 4 AI Power User 65-84, Level 5 AI Design Leader 85-100) that are part of the published scoring rules and are not separately configured per assessment

### AC-13 (US-08) - error

**Given** an assessment side has no recorded response at all for one or more required scorable questions (a question never reached, or a session not yet started or submitted; this is distinct from a timed-out question, which is recorded with a zero score per AC-04 and does not count as missing)
**When** results are requested  
**Then** the system marks the result as unavailable and explains which assessment input is still missing

### AC-14 (US-09) - cross-context

**Given** a Designer's self-assessment and the matching Lead assessment are both complete  
**When** the comparison view is opened  
**Then** the system shows the self-score, lead-score, combined score, overall gap, category gaps, maturity interpretation, and recommended focus areas, where the recommendations are produced from approved constructive recommendation templates selected by the score and gap profile (no free-form or externally generated recommendation text in the MVP)

### AC-15 (US-09) - cross-context

**Given** only one side of the assessment is complete for a Designer  
**When** the comparison view is opened  
**Then** the system shows the available side's scores and provisional maturity level, omits the combined score and category gaps, and clearly states that the missing counterpart is required before the combined interpretation should be treated as final

### AC-16 (US-10) - happy

**Given** at least one Designer has assessment data available to the Workshop Facilitator  
**When** the Workshop Facilitator opens the Team dashboard  
**Then** the system shows team status, facilitator-facing named Designer summaries, category trends, gap highlights, and maturity distribution

### AC-17 (US-11) - happy

**Given** the Workshop Facilitator is presenting during the workshop  
**When** the Workshop Facilitator opens the presentation-friendly results view  
**Then** the system shows a clear summary that supports group discussion while minimizing unnecessary personal detail

## 6. Non-functional requirements

| Aspect | Target | Measurement |
|---|---|---|
| Assessment interaction latency | p95 <= 300 ms for answer save feedback in the workshop environment | browser performance traces during smoke test |
| Result calculation latency | p95 <= 2 s for a cohort of 100 Designers | automated scoring benchmark |
| Dashboard load latency | p95 <= 2 s for a cohort of 100 Designers and 1 active Questionnaire | browser performance traces during smoke test |
| Concurrent workshop usage | >= 50 active assessment sessions without data loss | load smoke test before demo |
| Availability during workshop | >= 99.0% for the scheduled workshop window | uptime check during rehearsal and live session |
| Accessibility | WCAG 2.2 AA for core assessment, lead assessment, and dashboard flows | accessibility audit and keyboard-only QA |
| Data recovery | No submitted assessment response lost after a page refresh | integration test and manual refresh scenario |
| Error clarity | 100% of blocking validation messages name the missing or invalid action in plain language | manual QA checklist |
| Constructive content review | 100% of maturity labels, recommendations, and dashboard summaries use approved constructive copy templates and pass QA review before the workshop demo | copy QA checklist |

## 6.1 Security / privacy

- **Data classification:** confidential - assessment answers, lead comments, and competency interpretations can affect workplace perception even though they are not regulated health or payment data.
- **Personal data touched:** Designer name, team label, lead relationship, assessment responses, answer timing, lead comments, scores, maturity levels, and recommendations.
- **AuthZ/AuthN impact:** the MVP uses lightweight access boundaries suitable for a workshop; Designers can access only their own assessment, Design Leads can access Assigned Designers from their Team list, and the Workshop Facilitator can configure questionnaires, view aggregate results, and view named Designer summaries in facilitator-facing dashboards.
- **Abuse cases:**
  - Cross-team result access: deny personal assessment detail unless the actor is assigned to that Designer or acting as Workshop Facilitator.
  - Accidental exposure of Lead assessment: hide Lead assessment from the Designer unless the Workshop Facilitator explicitly enables that visibility.
  - Toxic interpretation: use approved constructive copy templates and QA review for maturity labels, recommendations, and dashboard summaries; block or rewrite punitive labels during the manual copy QA process before the workshop demo (this is a review process applied to authored copy and templates, not a runtime language-detection or auto-rewrite feature).
  - Spam setup activity: limit repeated questionnaire configuration actions to 20 per minute per Workshop Facilitator during the workshop.
  - Tampered score input: ignore client-provided scores and calculate results from recorded responses and published scoring rules.
- **Security review:** Required because the feature handles personal development assessments, role-based visibility, and team-level reporting.

## 7. Metrics / KPIs

- **Workshop completion rate** - baseline: 0 for a new project, target: 90% of demo Designers complete self-assessment during the workshop run.
- **Lead assessment completion rate** - baseline: 0, target: 80% of prepared demo Designer profiles receive a Lead assessment during the demo.
- **Score explainability success** - baseline: 0, target: 90% of workshop participants can explain the combined score and gap interpretation in the retrospective survey.
- **SDLC artifact coverage** - baseline: 0, target: every workshop phase has at least one reviewed artifact before implementation starts.
- **Constructive tone compliance** - baseline: 0, target: 100% of maturity labels, recommendations, and dashboard summaries avoid punitive wording in QA review.

## 8. Open questions

- [ ] Which lightweight access model should be used for the workshop MVP? Default now: personal assessment links for Designers and facilitator-seeded access for leads. - owner: Workshop Facilitator, due: before `sdd:design`
- [ ] Should Lead comments be required or optional in the MVP? Default now: optional comment per category plus one summary comment. - owner: Product Owner, due: before `sdd:tasks`
- [ ] Should category weights be equal for the first workshop run? Default now: equal category weighting, with Lead assessment weighted more than self-assessment in the combined score. - owner: Product Owner, due: before `sdd:data-model`
- [ ] What demo data privacy rule should be used live? Default now: fictional Designers and anonymized team summaries. - owner: Security Lead, due: before workshop dry run

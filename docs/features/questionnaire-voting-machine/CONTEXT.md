---
status: Living
updated_at: "2026-06-13"
---

# Domain Context - questionnaire-voting-machine

## Glossary

- AI competency - A designer's observable knowledge, judgment, and practical use of AI across design work. NOT general technical literacy; it is scoped to UX/UI design practice.
- AI maturity level - A five-level interpretation of assessment results that explains current AI practice in constructive language. NOT a pass/fail grade.
- Assigned Designer - A Designer whom the Workshop Facilitator has explicitly linked to a Design Lead for lead assessment and visibility. NOT any Designer in the workshop cohort.
- Assessment category - A skill area used to group questions and scores, such as Prompting Skills or Critical Thinking and AI Safety. NOT a page section or visual grouping only.
- Assessment session - A time-bounded attempt by a Designer or Design Lead to answer an assessment for one Designer. NOT an editable draft after submission.
- Answer time signal - Timing data that helps interpret assessment reliability, such as unusually fast or slow answers. NOT punitive surveillance.
- Category gap - The difference between self-assessment and lead assessment within one assessment category. NOT the final score by itself.
- Combined score - A weighted score that blends self-assessment and lead assessment to summarize AI competency. NOT a replacement for category-level interpretation.
- Designer - A UX/UI designer who completes a self-assessment of their AI knowledge, AI usage, and AI safety judgment. NOT the Design Lead evaluating them.
- Design Lead - A lead or manager who evaluates a Designer from an observer perspective using similar AI competency criteria. NOT the Workshop Facilitator configuring the questionnaire.
- Lead assessment - A Design Lead's assessment of a Designer's practical AI competency. NOT the Designer's self-assessment.
- Overall score - The aggregate 0-100 score for a single assessment side, computed as the weighted average of that side's category scores (the self-score for the Designer side, the lead-score for the Design Lead side). NOT the Combined score, which blends both sides.
- Presentation-friendly results view - A facilitator-facing summary mode that hides unnecessary personal detail during a live workshop demo. NOT a full analytics dashboard.
- Questionnaire - A configured set of categories, questions, answer options, scoring rules, and timing rules used for assessment. NOT a one-off survey with no scoring.
- Recommendation - A constructive next learning step generated from scores and gaps. NOT a punitive performance label.
- Self-assessment - A Designer's own answers about AI knowledge, usage, confidence, and critical judgment. NOT an externally verified skill proof.
- Team dashboard - A facilitator-facing view of named Designer summaries, aggregate scores, gaps, maturity levels, and category trends. NOT a public leaderboard.
- Team list - The facilitator-seeded list of Assigned Designers a Design Lead can review and assess during the workshop. NOT a global directory of every Designer in the workshop.
- Workshop Facilitator - The person who configures the questionnaire, demonstrates the system, and presents results during the workshop; also called Admin in workshop notes. NOT the Design Lead unless the same person is explicitly acting in both roles.

## Invariants

- A submitted Assessment session can never be freely edited without starting a clearly marked new attempt or facilitator-approved correction.
- A published Questionnaire always must include required Assessment categories, required scorable questions, usable answer options, scoring weights, and timing rules.
- Lead assessment results can never be shown to a Designer unless the Workshop Facilitator explicitly configures that visibility.
- Recommendations always must use constructive development language and avoid punitive labels.

## Out of scope

- Full proctoring - The workshop MVP intentionally avoids video monitoring and invasive anti-cheating controls.
- HR performance ranking - The product is positioned as a learning and development tool, not a disciplinary performance system.

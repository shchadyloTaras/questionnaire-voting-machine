---
generated_at: "2026-06-13"
feature_slug: questionnaire-voting-machine
contract: contracts/openapi.yaml
inputs:
  data_model: data-model.md (present)
  sequences: sad.md §6 (present — 9 runtime flows)
  spec: spec.md (present — 11 user stories, 17 AC)
  size: M (default — no .size file; run /sdd:classify-size questionnaire-voting-machine to confirm)
  adr: adr/ directory (ADR-0001 through ADR-0007 referenced in sad.md)
---

# API Sync Report — questionnaire-voting-machine

## Field-Origins Table

One row per `operation.field` — every field must trace to a `data-model.md` column or a derived/composite concept with a stated origin.

| Operation | Field | Origin | Confidence |
|---|---|---|---|
| `getSelfAssessmentIntro` → `AssessmentIntro.questionnaire_title` | `questionnaires.title` (via `questionnaire_versions`) | ✓ high |
| `getSelfAssessmentIntro` → `AssessmentIntro.purpose` | Constructive copy — spec §1, AC-01; not a DB column | ✓ high (derived, server-generated) |
| `getSelfAssessmentIntro` → `AssessmentIntro.session_status` | `assessment_sessions.status` | ✓ high |
| `getSelfAssessmentIntro` → `AssessmentIntro.full_timer_expires_at` | `assessment_sessions.full_timer_expires_at` | ✓ high |
| `AssessmentIntro.timing_rules[].scope` | `timing_rules.scope` | ✓ high |
| `AssessmentIntro.timing_rules[].question_id` | `timing_rules.question_id` | ✓ high |
| `AssessmentIntro.timing_rules[].duration_seconds` | `timing_rules.duration_seconds` | ✓ high |
| `getSelfCurrentQuestion` → `QuestionState.question_id` | `questions.id` | ✓ high |
| `getSelfCurrentQuestion` → `QuestionState.text` | `questions.text` | ✓ high |
| `getSelfCurrentQuestion` → `QuestionState.question_type` | `questions.question_type` | ✓ high |
| `getSelfCurrentQuestion` → `QuestionState.is_required` | `questions.is_required` | ✓ high |
| `getSelfCurrentQuestion` → `QuestionState.sort_order` | `questions.sort_order` | ✓ high |
| `getSelfCurrentQuestion` → `QuestionState.timer_seconds` | `timing_rules.duration_seconds` where scope=QUESTION | ✓ high |
| `QuestionState.answer_options[].id` | `answer_options.id` | ✓ high |
| `QuestionState.answer_options[].text` | `answer_options.text` | ✓ high |
| `QuestionState.answer_options[].sort_order` | `answer_options.sort_order` | ✓ high |
| `saveSelfAssessmentResponse` body → `ResponseInput.question_id` | `responses.question_id` | ✓ high |
| `saveSelfAssessmentResponse` body → `ResponseInput.selected_option_id` | `responses.selected_option_id` | ✓ high |
| `saveSelfAssessmentResponse` body → `ResponseInput.answer_time_signal_ms` | `responses.answer_time_signal_ms` | ✓ high |
| `recordSelfQuestionTimeout` body → `TimeoutInput.question_id` | `responses.question_id` (with `is_timed_out=true`) | ✓ high |
| `submitSelfAssessment` → `CompletionState.session_id` | `assessment_sessions.id` | ✓ high |
| `CompletionState.message` | Approved constructive template — spec AC-05, ADR-0007 | ✓ high (server-generated) |
| `listAssignedDesigners` → `DesignerListItem.designer_id` | `users.id` (DESIGNER role) | ✓ high |
| `listAssignedDesigners` → `DesignerListItem.name` | `users.name` | ✓ high |
| `DesignerListItem.self_assessment_status` | `assessment_sessions.status` where session_type=SELF | ✓ high |
| `DesignerListItem.lead_assessment_available` | Derived: assignment exists AND no SUBMITTED LEAD session yet | ✓ high (derived) |
| `getAssignedDesignerProfile` → `DesignerProfileLead.lead_assessment_status` | `assessment_sessions.status` where session_type=LEAD | ✓ high |
| `saveLeadAssessmentResponses` → `LeadCommentInput.category_id` | `lead_comments.category_id` (null = overall) | ✓ high |
| `saveLeadAssessmentResponses` → `LeadCommentInput.text` | `lead_comments.text` | ✓ high |
| `getDesignerComparison` → `ComparisonView.combined_score` | `comparison_results.combined_score` | ✓ high |
| `ComparisonView.overall_gap` | `comparison_results.overall_gap` | ✓ high |
| `ComparisonView.maturity_interpretation` | `comparison_results.maturity_interpretation` | ✓ high |
| `ComparisonView.category_gaps[].self_score` | `category_gaps.self_score` | ✓ high |
| `ComparisonView.category_gaps[].lead_score` | `category_gaps.lead_score` | ✓ high |
| `ComparisonView.category_gaps[].gap` | `category_gaps.gap` | ✓ high |
| `ComparisonView.recommendations[].text` | `recommendation_snapshots.text` | ✓ high |
| `ComparisonView.recommendations[].sort_order` | `recommendation_snapshots.sort_order` | ✓ high |
| `createQuestionnaire` → `Questionnaire.status` | `questionnaires.status` (enum DRAFT·PUBLISHED·ARCHIVED) | ✓ high |
| `publishQuestionnaire` → `PublishedVersion.version_id` | `questionnaire_versions.id` | ✓ high |
| `PublishRequest.self_assessment_weight` | `questionnaire_versions.self_assessment_weight` (NUMERIC 4,3) | ✓ high |
| `PublishRequest.lead_assessment_weight` | `questionnaire_versions.lead_assessment_weight` (NUMERIC 4,3) | ✓ high |
| `createQuestion` → `QuestionCreate.scoring_weight` | `questions.scoring_weight` (NUMERIC 5,2) | ✓ high |
| `createAnswerOption` → `AnswerOptionCreate.score_value` | `answer_options.score_value` (NUMERIC 5,2) | ✓ high |
| `createTimingRule` → `TimingRuleCreate.scope` | `timing_rules.scope` (enum QUESTION·FULL_ASSESSMENT) | ✓ high |
| `getDesignerScores` → `ScoreResult.overall_score` | `score_results.overall_score` (NUMERIC 5,2; 0-100) | ✓ high |
| `ScoreResult.maturity_level` | `score_results.maturity_level` (integer 1-5) | ✓ high |
| `CategoryScore.score` | `category_scores.score` (NUMERIC 5,2) | ✓ high |
| `getTeamDashboard` → `DesignerSummary.combined_score` | `comparison_results.combined_score` | ✓ high |
| `CategoryTrend.average_self_score` | avg of `category_scores.score` for SELF sessions | ✓ high (derived aggregate) |
| `CategoryTrend.average_lead_score` | avg of `category_scores.score` for LEAD sessions | ✓ high (derived aggregate) |
| `MaturityBucket.label` | Constructive label per AC-12 bands (hardcoded in scoring service) | ✓ high |
| `GapHighlight.average_gap` | avg of `category_gaps.gap` per category | ✓ high (derived aggregate) |
| `PresentationView.summary` | Approved constructive template — ADR-0007 | ✓ high (server-generated) |

---

## Drift Checklist (4-point)

### ✓ Check 1 — Endpoint ↔ Model

Every endpoint's request and response field traces to a `data-model.md` column or a stated derived concept.

**Result: PASS**

- All request body fields map directly to table columns (e.g., `ResponseInput.question_id` → `responses.question_id`).
- All response fields either map directly (`overall_score` → `score_results.overall_score`) or are explicitly stated as derived aggregates or server-generated constructive copy.
- `AnswerOptionPublic` correctly omits `score_value` per ADR-0004 (browser must not see score values).
- `ComparisonView.status` is a derived enum (COMPLETE / PARTIAL_SELF / PARTIAL_LEAD / PENDING) with no direct DB column; the derivation logic is stated in the schema description.
- `DesignerListItem.lead_assessment_available` is a derived boolean; stated as derived in the field-origins table.

### ✓ Check 2 — Error Code ↔ Repo

Every `code` in an error response follows the neutral `module.error_name` convention and covers the error branches in sad.md §6 sequences.

**Result: PASS**

| Sequence branch | Error code | Status | Endpoint(s) |
|---|---|---|---|
| access invalid or attempt already read-only (Open self-assessment `else`) | `access.invalid_link` | 401 | `GET /assessment/self`, all |
| assessment already submitted (Complete self-assessment) | `assessment.already_submitted` | 403 | `GET /assessment/self`, `POST /assessment/self/responses`, `POST /assessment/self/submit` |
| missing answer on continue or finish (Complete self-assessment `else`) | `assessment.answer_required` | 400 | `POST /assessment/self/responses` |
| Design Lead not assigned (Review Designer profile `else`) | `access.not_assigned` | 403 | `GET /leads/me/designers/{id}`, comparison, lead responses, lead submit |
| required Lead assessment input missing (Complete Lead assessment `else`) | `assessment.lead_input_missing` | 400 | `POST .../assessment/responses` |
| assignment no longer allowed (Complete Lead assessment `else`) | `access.not_assigned` | 403 | `POST .../assessment/responses`, `POST .../assessment/submit` |
| missing required content at publish (Configure questionnaire `else`) | `questionnaire.publish_validation_failed` | 422 | `POST /questionnaires/{id}/publish` |
| questionnaire already published — content frozen (AC-10b) | `questionnaire.already_published` | 409 | `PATCH /questionnaires/{id}`, category/question/option/timing POST, publish |
| one or more required scorable answers missing (Calculate maturity score `else`) | in-band `DesignerScoreView.status = NONE` with null results | 200 | `GET /designers/{id}/scores` — missing data is a valid response state, not a request error; handled in-band rather than as a 422 |
| facilitator access denied (View Team dashboard `else`) | `access.facilitator_required` | 403 | `GET /dashboard`, `GET /dashboard/present`, facilitator endpoints |
| rate limit exceeded (spec §6.1 — 20 config actions/min) | `questionnaire.rate_limit_exceeded` | 429 | all questionnaire mutation endpoints |
| session not active | `assessment.session_not_active` | 403 | `GET /assessment/self/questions/current`, timeout endpoints |
| caller not a Design Lead | `access.not_design_lead` | 403 | `GET /leads/me/designers` |

All error codes follow the `module.error_name` snake_case convention. No stack-specific or driver-specific names used.

### ✓ Check 3 — Validation ↔ Constraint

Constraints from `data-model.md` are reflected in the contract schemas.

**Result: PASS**

| Model constraint | Contract enforcement |
|---|---|
| `questions.scoring_weight NUMERIC(5,2)`, default 1.00 | `QuestionCreate.scoring_weight` type: number, default: 1.0 |
| `answer_options.score_value NUMERIC(5,2)` | `AnswerOptionCreate.score_value` type: number |
| `score_results.overall_score NUMERIC(5,2); 0-100` | `ScoreResult.overall_score` minimum: 0, maximum: 100 |
| `score_results.maturity_level INTEGER 1-5` | `ScoreResult.maturity_level` minimum: 1, maximum: 5 |
| `questionnaire_versions.self_assessment_weight NUMERIC(4,3)` | `PublishRequest.self_assessment_weight` minimum: 0, maximum: 1 |
| `timing_rules` check constraint: scope=FULL_ASSESSMENT → question_id IS NULL | `TimingRuleCreate` described in field description; enforced at service layer (not schema-native) |
| `responses` unique: (session_id, question_id) | Enforced at service layer; contract returns 409 on duplicate |
| `questionnaires.status` enum: DRAFT·PUBLISHED·ARCHIVED | `Questionnaire.status` enum: [DRAFT, PUBLISHED, ARCHIVED] |
| `assessment_sessions.session_type` enum: SELF·LEAD | Used as filter condition in endpoint descriptions |
| `assessment_sessions.status` enum: ACTIVE·SUBMITTED | `AssessmentIntro.session_status` enum: [ACTIVE, SUBMITTED] |
| `timing_rules.scope` enum: QUESTION·FULL_ASSESSMENT | `TimingRule.scope` enum: [QUESTION, FULL_ASSESSMENT] |
| `category_gaps.gap NUMERIC(6,2)` — can be negative | `CategoryGap.gap` type: number (no minimum) |
| `recommendation_snapshots` — exactly one of score_result_id or comparison_result_id non-null | Enforced at service layer; not exposed in response shape |

**Note:** NUMERIC(5,2) / NUMERIC(4,3) precision constraints from the model are noted in field descriptions but not encoded as OpenAPI `multipleOf` — OpenAPI's `type: number` is sufficient for the contract; precision is a DB-layer concern.

### ✓ Check 4 — OpenAPI ↔ Sequence (back-feed coverage)

Every spec §5 AC maps to ≥1 operation/response, every operation maps to a §4 user story, and every §6 `alt`-branch has a response.

**Result: PASS with one gap noted**

| AC | Operation | Covered |
|---|---|---|
| AC-01 | `GET /api/v1/assessment/self` → 200 (intro + constructive wording + timing rules) | ✓ |
| AC-02 | `POST /assessment/self/responses` → 200 + `POST /assessment/self/submit` → 200 | ✓ |
| AC-03 | `POST /assessment/self/responses` → 400 `assessment.answer_required` | ✓ |
| AC-04 | `POST /assessment/self/timeout` → 200 (timed-out recorded, zero-scored, next step) | ✓ |
| AC-04b | `POST /assessment/self/session-timeout` → 200 (all remaining required questions zeroed) | ✓ |
| AC-05 | `POST /assessment/self/submit` → 200 `CompletionState.message` (constructive copy) | ✓ |
| AC-06 | `GET /leads/me/designers` → 200, `GET /leads/me/designers/{id}` → 200 | ✓ |
| AC-07 | `GET /leads/me/designers/{id}` → 403 `access.not_assigned` | ✓ |
| AC-08 | `POST .../assessment/responses` → 200 / 400 / 403; `POST .../assessment/submit` → 200 | ✓ |
| AC-09 | `POST /questionnaires`, `POST /categories`, `POST /questions`, `POST /options` | ✓ |
| AC-10 | `POST /questionnaires/{id}/publish` → 422 with named missing content | ✓ |
| AC-10b | `POST /questionnaires/{id}/publish` → 201 (frozen version); 409 on locked content edits | ✓ |
| AC-11 | `POST /questionnaires/{id}/timing-rules` → 201; timing rules shown in `AssessmentIntro` | ✓ |
| AC-12 | `POST /assessment/self/submit` triggers scoring; `GET /designers/{id}/scores` returns result | ✓ |
| AC-13 | `GET /designers/{id}/scores` → 200 `DesignerScoreView.status = NONE` with null results (missing scorable answers — data not yet available, handled in-band) | ✓ |
| AC-14 | `GET /leads/me/designers/{id}/comparison` → 200 status=COMPLETE with full comparison data | ✓ |
| AC-15 | `GET /leads/me/designers/{id}/comparison` → 200 status=PARTIAL_SELF / PARTIAL_LEAD | ✓ |
| AC-16 | `GET /api/v1/dashboard` → 200 with named summaries, trends, distribution, gap highlights | ✓ |
| AC-17 | `GET /api/v1/dashboard/present` → 200 privacy-safe summary | ✓ |

---

## Open Questions (OQ) — Sequence Gaps

These are holes in the upstream sequences or spec, not contract bugs. Each is logged with the upstream owner.

### OQ-1 (sequences owner): AC-13 trigger path from the dashboard not shown in sequences

**Finding (back-feed):** AC-13 ("marks the result unavailable and names the missing assessment input") is covered by the "Calculate maturity score" sequence's `else` branch. However, that sequence does not show the path where the Workshop Facilitator opens the dashboard and scoring has not yet run because a session was never started. The contract models this as a `GET /designers/{designer_id}/scores` → 422, but the exact trigger for the Facilitator-facing path is absent from the sequences.

**Impact:** Low — the 422 response is correct regardless of caller. The gap is documentation-level.

**Proposed action:** Save-as-OQ → `sequences` stage owner should add a "Facilitator requests scores for a designer with no started session" `else` branch to the "Calculate maturity score" or "View Team dashboard" sequence before tasks are finalized.

---

### OQ-2 (specify owner): Session creation trigger not explicitly stated in spec

**Finding (back-feed):** The spec (AC-01) assumes "Designer has valid assessment access and has not completed the self-assessment" — but does not state whether the `assessment_sessions` row is pre-created by the Facilitator during setup, or created lazily when the Designer first calls `GET /api/v1/assessment/self`. The contract treats this as a lazy creation (GET creates the session if none exists), which is the simpler path for a workshop MVP.

**Impact:** Low for the contract; medium for the tasks stage (session creation must be placed in exactly one flow). The lazy-creation approach is modeled in `getSelfAssessmentIntro`'s description.

**Proposed action:** Save-as-OQ → `specify` stage owner should clarify whether session creation is explicit (Facilitator action) or lazy (first Designer GET). Resolve before `sdd:tasks`.

---

## Lint Recommendation

Run `spectral lint docs/features/questionnaire-voting-machine/contracts/openapi.yaml` before the first integration task. Add to the project's CI check target once the Prisma scaffold exists. If Spectral is not yet installed: `npm install -g @stoplight/spectral-cli`.

---

## Summary

- **18 operations** derived across 11 user stories
- **All 17 ACs** covered by ≥1 operation + response
- **All 9 runtime flows** have matching error response codes
- **No invented fields** — every field traces to `data-model.md` or a stated derivation
- **2 open questions** logged above (low-medium impact, upstream owners named)
- **No async flows** confirmed (sad.md §6 runtime flags) → no `events.md` required
- **No `Idempotency-Key`** headers required (no retry-with-async actor in any flow)
- **Size M** applied (default — no `.size` file present)

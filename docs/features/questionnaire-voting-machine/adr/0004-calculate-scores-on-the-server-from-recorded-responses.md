---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-06-13"
feature_size: "M"
ticket: "questionnaire-voting-machine"
---

# 0004 - Calculate scores on the server from recorded responses

- **Status:** Accepted
- **Date:** 2026-06-13
- **Deciders:** Architect / Tech Lead

## Context

The product calculates self-scores, lead-scores, combined scores, category gaps, maturity levels, and recommendations. Scores influence workplace perception, so the browser must not be trusted to submit final scores. The system also needs consistent pending-comparison behavior when only one assessment side is complete.

## Decision drivers

- Spec §6.1 explicitly says to ignore client-provided scores and calculate results from recorded responses and published scoring rules.
- Result calculation targets p95 <= 2 s for a cohort of 100 Designers.
- Score explainability is a KPI: 90% of workshop participants should be able to explain combined score and gap interpretation.
- Constructive recommendations must be reproducible and copy-reviewable.

## Considered options

1. **Server calculation from recorded responses** - Persist responses and calculate scores in backend domain services.
2. **Client calculation with server verification** - Let the browser compute preliminary scores and have the server verify them later.
3. **Asynchronous precomputed score job** - Queue scoring work and read results from a precomputed projection.

## Decision outcome

**Chosen:** Server calculation from recorded responses. It is the simplest trustworthy path for the MVP and keeps scoring explainable during the workshop. Asynchronous projections can be added later if benchmark data shows p95 <= 2 s cannot be met for the target cohort.

## Consequences

**Positive**
- Prevents tampered browser score input from becoming trusted state.
- Makes unit testing pure scoring functions straightforward.
- Keeps score explanations traceable to published Questionnaire rules and recorded responses.

**Negative**
- Server handlers must be efficient enough to support live workshop use.
- Dashboard endpoints must avoid recalculating too much on every page load.

**Neutral**
- Cached or precomputed dashboard summaries remain an optimization, not the source of truth.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0007-generate-recommendations-from-constructive-rule-templates]]

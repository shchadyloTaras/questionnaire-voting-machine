---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-06-13"
feature_size: "M"
ticket: "questionnaire-voting-machine"
---

# 0007 - Generate recommendations from constructive rule templates

- **Status:** Accepted
- **Date:** 2026-06-13
- **Deciders:** Architect / Tech Lead

## Context

Recommendations translate scores and category gaps into next learning steps. The wording must be constructive and must avoid punitive labels because the product is positioned as learning and development, not HR performance ranking. The roadmap mentions AI-generated learning plans later, but the MVP needs reliable demo-safe copy.

## Decision drivers

- 100% of maturity labels, recommendations, and dashboard summaries must use approved constructive copy templates and pass QA review before the workshop demo.
- The product must avoid punitive labels and toxic interpretation.
- Score explainability is a KPI for workshop participants.
- No external AI provider is required for the MVP.

## Considered options

1. **Constructive rule templates** - Map score bands and category gaps to reviewed recommendation copy.
2. **Facilitator-written recommendations only** - Let the Workshop Facilitator manually write or choose recommendations for each Designer.
3. **AI-generated recommendations** - Generate personalized recommendation text from assessment results.

## Decision outcome

**Chosen:** Constructive rule templates. This keeps recommendations explainable, testable, and copy-reviewable during the workshop. AI-generated learning plans can be explored later after privacy, tone, and review controls exist.

## Consequences

**Positive**
- Copy QA can verify every generated recommendation before the demo.
- Recommendations stay deterministic and easy to explain.
- No external AI integration is needed for confidential assessment data.

**Negative**
- Recommendations may feel less personalized than generated text.
- Template coverage must be maintained as categories and maturity levels evolve.

**Neutral**
- The template engine can later provide reviewed prompts or source material for an AI-assisted learning-plan feature.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0004-calculate-scores-on-the-server-from-recorded-responses]]

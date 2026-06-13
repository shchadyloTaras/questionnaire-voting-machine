---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-06-13"
feature_size: "M"
ticket: "questionnaire-voting-machine"
---

# 0001 - Build backend-service and web-frontend surfaces

- **Status:** Accepted
- **Date:** 2026-06-13
- **Deciders:** Architect / Tech Lead

## Context

The feature is a new product surface for a workshop-ready AI competency assessment. Designers, Design Leads, and the Workshop Facilitator need browser workflows, while scoring, role visibility, questionnaire publication, and response persistence must be enforced on the server. The design stage must declare target surfaces so downstream stages generate the right contracts, UI tasks, flows, and tests.

## Decision drivers

- Designers and Design Leads use interactive assessment flows, and the Workshop Facilitator uses dashboard, builder, and presentation views.
- Scores must be calculated server-side and personal results must not be exposed to the wrong role.
- Feature size M expects backend contracts, persistence, and UI-driven tests.
- The workshop needs a small vertical slice rather than separate product lines.

## Considered options

1. **backend-service + web-frontend** - Build one backend service surface and one browser UI surface.
2. **backend-service + web-frontend + worker** - Add a worker surface for asynchronous scoring or dashboard projection.
3. **backend-service + web-frontend + cli** - Add a command-line surface for facilitator setup, seed data, and demo reset operations.

## Decision outcome

**Chosen:** backend-service + web-frontend. This matches the product's browser-first workshop experience while keeping scoring, access, and persistence server-owned. A worker is not needed until measurement shows synchronous scoring or dashboard queries cannot meet the spec targets, and setup/reset scripts can remain implementation tooling rather than a public CLI surface.

## Consequences

**Positive**
- Downstream stages can generate backend contracts and UI-driven flows/tests from one explicit source of truth.
- The workshop demo can show the complete user journey, not only an API.
- Server-owned behavior protects scoring and role visibility.

**Negative**
- Multi-surface scope increases task count compared with an API-only feature.
- UI architecture and backend contracts must stay aligned during implementation.

**Neutral**
- A worker surface or CLI surface can be added later if result calculation, dashboard projection, or demo operations need a separately owned runtime contract.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0002-use-a-hybrid-nextjs-full-stack-web-architecture]]

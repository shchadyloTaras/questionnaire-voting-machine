---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-06-13"
feature_size: "M"
ticket: "questionnaire-voting-machine"
---

# 0002 - Use a hybrid Next.js full-stack web architecture

- **Status:** Accepted
- **Date:** 2026-06-13
- **Deciders:** Architect / Tech Lead

## Context

The workshop brief recommends a Next.js/React direction for a small full-stack demo, with API routes or a clearer backend boundary as possible variants. The product needs interactive timed assessment flows, dashboard pages, questionnaire setup, and presentation mode. The architecture should be compact enough for workshop teaching while preserving server-side ownership of sensitive behavior.

## Decision drivers

- Core flows must remain understandable for first-time workshop participants.
- Assessment answer save feedback targets p95 <= 300 ms in the workshop environment.
- Dashboard load targets p95 <= 2 s for 100 Designers and 1 active Questionnaire.
- Server-side score calculation and role checks are mandatory security/privacy controls.

## Considered options

1. **Hybrid Next.js full-stack app** - Use React UI routes with server handlers/application services in the same app boundary.
2. **Split React SPA plus separate Express API** - Use a distinct frontend application and backend service.
3. **Mostly server-rendered pages** - Keep most UI interactions server-rendered with minimal client state.

## Decision outcome

**Chosen:** Hybrid Next.js full-stack app. It gives the workshop one coherent codebase and deployment unit while still drawing a clear internal line between UI, server handlers, application services, domain rules, and persistence. Timed assessment steps can use client interactivity, while scoring, publication, access checks, and dashboard data stay server-owned.

## Consequences

**Positive**
- Easier workshop onboarding because participants work in one project.
- Supports interactive UI where needed and server rendering/data loading where useful.
- Keeps the future option of extracting a separate API if the product grows.

**Negative**
- The codebase must enforce module boundaries by convention because frontend and backend code live near each other.
- Route-level logic can become messy unless application services and domain modules stay separate.

**Neutral**
- A split service architecture remains possible later, but extraction would require contract hardening and deployment changes.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0001-build-backend-service-and-web-frontend-surfaces]]

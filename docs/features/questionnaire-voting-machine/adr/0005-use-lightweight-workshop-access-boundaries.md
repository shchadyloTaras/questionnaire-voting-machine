---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-06-13"
feature_size: "M"
ticket: "questionnaire-voting-machine"
---

# 0005 - Use lightweight workshop access boundaries

- **Status:** Accepted
- **Date:** 2026-06-13
- **Deciders:** Architect / Tech Lead

## Context

The MVP excludes full authentication and complex role management, but it handles confidential assessment answers, lead comments, scores, maturity levels, and recommendations. Designers must access only their own assessment, Design Leads must access only Assigned Designers, and the Workshop Facilitator needs setup and dashboard visibility. The workshop also needs a low-friction demo path.

## Decision drivers

- Personal assessment details must not be exposed unless the actor is assigned to that Designer or acting as Workshop Facilitator.
- Lead assessment results can never be shown to a Designer unless the Workshop Facilitator explicitly configures that visibility.
- Full authentication and complex role management are non-goals for the MVP.
- The access model should be understandable during an SDLC workshop.

## Considered options

1. **Signed personal links plus facilitator-seeded assignments** - Designers use hard-to-guess links, and Design Leads are mapped to Assigned Designers in seed/setup data.
2. **Single facilitator-controlled demo account** - The facilitator drives all role views from one account during the workshop.
3. **Passwordless role links** - Each role receives a separate magic-style link for the demo session.

## Decision outcome

**Chosen:** Signed personal links plus facilitator-seeded assignments. This preserves the workshop's low-friction access model while still enforcing meaningful role checks on the server. It also maps directly to the glossary terms Team list and Assigned Designer.

## Consequences

**Positive**
- Keeps MVP access teachable and fast to demo.
- Allows authorization tests for Designer, Design Lead, and Workshop Facilitator boundaries.
- Avoids full enterprise authentication while preserving personal data protection.

**Negative**
- Link sharing remains a risk and must be mitigated with hard-to-guess tokens, short validity, and demo data practices.
- It is not a long-term substitute for full authentication and RBAC.

**Neutral**
- The access module can later be adapted behind a real identity provider without changing the domain vocabulary.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0001-build-backend-service-and-web-frontend-surfaces]]

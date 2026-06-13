---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-06-13"
feature_size: "M"
ticket: "questionnaire-voting-machine"
---

# 0006 - Freeze published Questionnaire versions for Assessment sessions

- **Status:** Accepted
- **Date:** 2026-06-13
- **Deciders:** Architect / Tech Lead

## Context

The Workshop Facilitator creates draft Questionnaires and publishes them for assessment sessions. Once sessions begin, changing questions, answer options, weights, or timing rules would make results inconsistent and hard to explain. The spec requires sessions to record responses against the published Questionnaire version and keep published rules unchanged for sessions started from that version.

## Decision drivers

- A published Questionnaire always must include required Assessment categories, required scorable questions, usable answer options, scoring weights, and timing rules.
- New Assessment sessions must use a stable published version.
- Score explainability depends on knowing which rules produced a result.
- Submitted Assessment sessions become read-only except for a clearly marked new attempt or facilitator-approved correction.

## Considered options

1. **Freeze published versions and edit through a new draft/version** - Active sessions keep referencing the exact published version they started from.
2. **Copy the full Questionnaire into each session at start** - Store a complete snapshot per session rather than a shared version record.
3. **Store immutable scoring rules with separately versioned display copy** - Keep scoring stable while allowing reviewed display-copy versions to evolve independently.

## Decision outcome

**Chosen:** Freeze published versions and edit through a new draft/version. It is the clearest mental model for workshop participants and the safest basis for scoring. The data-model stage should decide the exact versioning schema, but the domain rule is locked here.

## Consequences

**Positive**
- Results remain explainable and auditable against the rules in effect at session start.
- Publishing validation has a stable target.
- Dashboard comparisons do not mix silent scoring-rule edits.

**Negative**
- Fixing even small published mistakes requires a new version or explicit correction workflow.
- The Questionnaire builder needs to distinguish draft, published, and superseded states clearly.

**Neutral**
- Session-level snapshots or separately versioned display copy may still be used for denormalized read safety if the data-model stage finds that useful.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0003-use-relational-persistence-with-prisma-managed-schema]]

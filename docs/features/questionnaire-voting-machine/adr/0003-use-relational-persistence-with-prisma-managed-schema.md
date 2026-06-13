---
status: Accepted
owner: "Architect / Tech Lead"
reviewers: ["Tech Lead", "Security Lead"]
updated_at: "2026-06-13"
feature_size: "M"
ticket: "questionnaire-voting-machine"
---

# 0003 - Use relational persistence with Prisma-managed schema

- **Status:** Accepted
- **Date:** 2026-06-13
- **Deciders:** Architect / Tech Lead

## Context

The domain includes Designers, Design Leads, assignments, Questionnaires, categories, questions, answer options, Assessment sessions, responses, Scores, Recommendations, and published versions. These entities have strong relationships and need transactional consistency around answer submission, score calculation, and publication. The workshop brief names Prisma with SQLite locally and PostgreSQL for a production-like variant as the recommended path.

## Decision drivers

- No submitted assessment response may be lost after a page refresh.
- Result calculation must be reproducible from recorded responses and published scoring rules.
- The workshop should support seed data, migrations, and a clear data-model stage.
- The MVP needs relational queries for dashboards, category gaps, assignments, and maturity distribution.

## Considered options

1. **Relational database with Prisma-managed schema** - Use a normalized schema and migrations, with SQLite locally and PostgreSQL-compatible modeling.
2. **Document database** - Store Questionnaires, sessions, and response snapshots as documents.
3. **File-backed JSON store for workshop demo** - Persist demo data in structured files without a database migration system.

## Decision outcome

**Chosen:** Relational database with Prisma-managed schema. It matches the entity relationships, supports clear migrations for teaching, and allows the data-model stage to produce durable schema decisions. The local/demo database choice can vary, but the schema should remain PostgreSQL-compatible enough for a production-like deployment.

## Consequences

**Positive**
- Strong fit for assignments, sessions, responses, scores, and dashboard aggregation.
- Migrations become a teachable SDLC artifact.
- Server-side scoring can query stable published versions and recorded responses.

**Negative**
- Requires schema design and migration discipline before implementation.
- SQLite local behavior may not reveal every production concurrency issue.

**Neutral**
- Document-like fields can still be used sparingly for non-query-heavy metadata if the data-model stage justifies them.

## Links

- Spec: [[../spec.md]]
- SAD: [[../sad.md]] §4
- Related ADR: [[0006-freeze-published-questionnaire-versions-for-assessment-sessions]]

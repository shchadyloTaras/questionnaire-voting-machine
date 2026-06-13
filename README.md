# Questionnaire Voting Machine

Workshop-ready product specification for a web-based AI competency assessment tool for UX/UI designers and design leads.

The project is currently at the discovery and specification stage. It contains the initial SDD package that can be used to continue into clarification, design, implementation, testing, and demo preparation.

## What This Product Does

Questionnaire Voting Machine helps a workshop facilitator assess AI competency across a design team by combining:

- Designer self-assessment
- Design Lead assessment
- AI competency categories
- timed questionnaire flows
- score calculation
- self-vs-lead gap analysis
- maturity levels
- constructive learning recommendations

## Current Artifacts

- [Workshop brief](docs/features/questionnaire-voting-machine/workshop-brief.md)
- [Formal feature spec](docs/features/questionnaire-voting-machine/spec.md)
- [Domain glossary and invariants](docs/features/questionnaire-voting-machine/CONTEXT.md)
- [Feature size classification](docs/features/questionnaire-voting-machine/.size)

## Recommended Next Steps

1. Run `/sdd:clarify questionnaire-voting-machine` to resolve the open product questions.
2. Run `/sdd:design questionnaire-voting-machine` to define UX, architecture, and implementation boundaries.
3. Build a small clickable MVP with one complete happy path:
   - Designer self-assessment
   - Lead assessment
   - score comparison
   - maturity result
   - facilitator dashboard

## Workshop Positioning

This repository is intended to support an SDLC and AI-assisted development workshop. It should evolve from product discovery and requirements into a small working vertical slice, rather than a fully production-ready SaaS application on day one.

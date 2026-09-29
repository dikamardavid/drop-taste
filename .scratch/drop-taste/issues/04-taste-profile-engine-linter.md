# 04 — [Design Systems / AI Engineer] Taste Profile Engine & Design Review Linter

**Role:** Design Systems / AI Engineer
**Status:** Todo
**Blocked by:** 02 — [Backend / Data Architect] Reasoning Schema & Async Triage Pipeline
**Local Repo Path:** `/Users/goregadget/Multica Agentic/projects/drop-taste`

---

## What to build
An automated synthesis engine and MCP tool `get_taste_profile` that aggregates rules from `profiles/` (personal taste vs corporate design system constraints) and `rules/` (component-specific guidelines and anti-pattern bans). Implements the MCP tool `review_design_taste` which takes a UI code snippet or layout description and returns a critique report with score, detected anti-patterns, and actionable elevation suggestions.

---

## Acceptance Criteria
- [ ] Structure for `profiles/personal_taste.md`, `profiles/corporate_constraints.md`, and modular `rules/` (tables, navigation, typography, anti-patterns).
- [ ] MCP tool `get_taste_profile` returns aggregated principles, density thresholds, and banned anti-patterns.
- [ ] MCP tool `review_design_taste` analyzes UI code/description against active rules, flagging anti-patterns (e.g. excessive borders, redundant card wrapping, aggressive shadows) and offering design token-compliant fixes.
- [ ] Automated tests validating critique responses against both good and bad UI samples.

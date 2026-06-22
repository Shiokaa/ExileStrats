# Graph Report - ExileStrats  (2026-06-22)

## Corpus Check
- 66 files · ~73,171 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 692 nodes · 725 edges · 76 communities (46 shown, 30 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 35 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9d105e3e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Modèle de données & tags|Modèle de données & tags]]
- [[_COMMUNITY_Fiche & ton anti-hype|Fiche & ton anti-hype]]
- [[_COMMUNITY_Pipeline & architecture données|Pipeline & architecture données]]
- [[_COMMUNITY_Design system (revirement glass)|Design system (revirement glass)]]
- [[_COMMUNITY_Migration doc & contexte|Migration doc & contexte]]
- [[_COMMUNITY_Script extraction couleurs|Script extraction couleurs]]
- [[_COMMUNITY_Conformité GGG & auth|Conformité GGG & auth]]
- [[_COMMUNITY_Périmètre V1 & écran Créer|Périmètre V1 & écran Créer]]
- [[_COMMUNITY_Couleur par mécanique|Couleur par mécanique]]
- [[_COMMUNITY_Plaisir d'abord (anti-over-eng)|Plaisir d'abord (anti-over-eng)]]
- [[_COMMUNITY_Stack technique|Stack technique]]
- [[_COMMUNITY_Map device (scarabées)|Map device (scarabées)]]
- [[_COMMUNITY_Path of Exile 1|Path of Exile 1]]
- [[_COMMUNITY_Métriques snapshot|Métriques snapshot]]
- [[_COMMUNITY_Workflow Git & CI|Workflow Git & CI]]
- [[_COMMUNITY_Fragments hors V1|Fragments hors V1]]
- [[_COMMUNITY_ADR thèmes lightdark|ADR thèmes light/dark]]
- [[_COMMUNITY_Renommage ExileStrats|Renommage ExileStrats]]
- [[_COMMUNITY_Langue UI (anglais)|Langue UI (anglais)]]
- [[_COMMUNITY_Thèmes lightdark|Thèmes light/dark]]
- [[_COMMUNITY_Tier list (badges)|Tier list (badges)]]
- [[_COMMUNITY_Écran Tier list|Écran Tier list]]
- [[_COMMUNITY_Écran Hub mécanique|Écran Hub mécanique]]
- [[_COMMUNITY_Écran Profil auteur|Écran Profil auteur]]
- [[_COMMUNITY_Logo & marque|Logo & marque]]
- [[_COMMUNITY_Personas & périmètre|Personas & périmètre]]
- [[_COMMUNITY_Fiche — en-têteactions|Fiche — en-tête/actions]]
- [[_COMMUNITY_Fiche — secondaire|Fiche — secondaire]]
- [[_COMMUNITY_Roadmap & risques|Roadmap & risques]]
- [[_COMMUNITY_Glossaire PoE|Glossaire PoE]]
- [[_COMMUNITY_League PoE|League PoE]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Handoff : ExileStrats — base de stratégies de mapping (Path of Exile)` - 14 edges
3. `Tasks: [FEATURE NAME]` - 13 edges
4. `Design Tokens` - 12 edges
5. `files` - 11 edges
6. `files` - 10 edges
7. `Core Principles` - 10 edges
8. `scripts` - 9 edges
9. `CLAUDE.md — ExileStrats` - 9 edges
10. `Screens / Views` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Corps de strat = blob JSON content versionné (schemaVersion)` --semantically_similar_to--> `D5 — Corps de strat = blob JSON versionné`  [INFERRED] [semantically similar]
  docs/03-data-model.md → DECISIONS.md
- `Principe éditorial anti-hype (ton guide, profit neutre)` --semantically_similar_to--> `Positionnement complément de la vidéo`  [INFERRED] [semantically similar]
  design_handoff/README.md → docs/01-vision-and-positioning.md
- `Typographie Saira Condensed / Hanken Grotesk` --semantically_similar_to--> `Brief Claude Design — Habillage fiche (ancien, glass rejeté)`  [INFERRED] [semantically similar]
  design_handoff/README.md → docs/brief-claude-design.md
- `Principe III — Séparation stricte des couches de données` --conceptually_related_to--> `Couche relationnelle PostgreSQL (stable/filtrable)`  [INFERRED]
  .specify/memory/constitution.md → docs/03-data-model.md
- `Surfaces liquid glass (--glass-card/panel/nav, backdrop-filter)` --references--> `Doc 10 — Design system (ancien, partiellement superseded)`  [INFERRED]
  design_handoff/README.md → docs/10-design-system.md

## Hyperedges (group relationships)
- **Séparation stricte des trois couches de données** — docs_03_data_model_content_blob, docs_03_data_model_relational_layer, docs_03_data_model_static_game_data, memory_constitution_principle_iii [EXTRACTED 0.90]
- **Ordre de lecture figé de la fiche** — docs_04_fiche_anatomy_header_actions, docs_04_fiche_anatomy_tldr, docs_04_fiche_anatomy_mapdevice, docs_04_fiche_anatomy_detail, docs_04_fiche_anatomy_secondaire, docs_04_fiche_anatomy_pied [EXTRACTED 0.95]
- **ADRs pilotant le revirement design vers le liquid glass** — decisions_d15, decisions_d19, decisions_d20, decisions_d21, memory_constitution_principle_vii [EXTRACTED 0.90]

## Communities (76 total, 30 thin omitted)

### Community 0 - "Modèle de données & tags"
Cohesion: 0.05
Nodes (47): CLAUDE.md — Primer projet ExileStrats, DECISIONS.md — Journal ADR ExileStrats, D10 — Tags dénormalisés + vocabulaire contrôlé, D14 — Doc découpée en docs/ + AGENTS.md (superseded par D24), D15 — Direction visuelle simpliste, Poppins/Space Grotesk, verre rejeté, D16 — Couleur d'accent par mécanique = Mechanic.color, D19 — design_handoff/ = référence design canonique, D20 — Revirement glassmorphism: liquid glass adopté (+39 more)

### Community 1 - "Fiche & ton anti-hype"
Cohesion: 0.18
Nodes (12): D13 — Anatomie de fiche validée, D22 — Ton guide pas gains rapides (anti-hype), D3 — Positionnement complément de la vidéo, Principe éditorial anti-hype (ton guide, profit neutre), Indicateur de difficulté (3 niveaux, 3 barres), Écran Fiche de stratégie, Positionnement complément de la vidéo, Doc 03 — Modèle de données conceptuel (+4 more)

### Community 2 - "Pipeline & architecture données"
Cohesion: 0.07
Nodes (40): boot(), collectProps(), compileAttr(), compileTemplate(), createComponentFactory(), createExternalModules(), createHelmetManager(), createPseudoSheet() (+32 more)

### Community 3 - "Design system (revirement glass)"
Cohesion: 0.09
Nodes (30): HomeView(), LeagueFilter, MechanicFilter, segment(), Sort, SORTS, cssVars(), StrategyCard() (+22 more)

### Community 4 - "Migration doc & contexte"
Cohesion: 0.05
Nodes (36): 1. Accueil (`ExileStrats Accueil.dc.html`), 2. Fiche de stratégie (`ExileStrats.dc.html`), 3. Tier list (`ExileStrats Tier List.dc.html`), 4. Mécanique / hub (`ExileStrats Mecanique.dc.html`), 5. Profil auteur (`ExileStrats Auteur.dc.html`), 6. Créer une stratégie (`ExileStrats Creer.dc.html`), 7. Design System (`ExileStrats Design System.dc.html`), 8. Logo (`ExileStrats Logo.dc.html`) (+28 more)

### Community 5 - "Script extraction couleurs"
Cohesion: 0.53
Nodes (5): CANONICAL_SCARAB, dominantColor(), main(), rgbToHsl(), toHex()

### Community 6 - "Conformité GGG & auth"
Cohesion: 0.40
Nodes (5): D4 — Pas d'OAuth PoE en V1, Auth Discord, Mention non-affiliation GGG (footer), Bloc 6 — Pied (mention non-affiliation GGG), Règles de conformité GGG (disclaimer, User-Agent, rate limits), Principe VI — Conformité GGG & posture non commerciale

### Community 7 - "Périmètre V1 & écran Créer"
Cohesion: 0.50
Nodes (4): Allocation d'arbre d'atlas par connexité (BFS depuis le hub), Écran Créer une stratégie (form + arbre d'atlas interactif), Périmètre V1 (Builder visuel / Fiche / Partage), Périmètre & non-goals V1 (composer / rendre / partager)

### Community 8 - "Couleur par mécanique"
Cohesion: 0.06
Nodes (30): 1. Initialize Analysis Context, 2. Load Artifacts (Progressive Disclosure), 3. Build Semantic Models, 4. Detection Passes (Token-Efficient Analysis), 5. Severity Assignment, 6. Produce Compact Analysis Report, 7. Provide Next Actions, 8. Offer Remediation (+22 more)

### Community 9 - "Plaisir d'abord (anti-over-eng)"
Cohesion: 0.67
Nodes (3): D2 — Objectif plaisir/apprentissage, adoption = bonus, Définition du succès (plaisir avant adoption), Principe I — Plaisir et usage personnel d'abord (anti-over-engineering)

### Community 10 - "Stack technique"
Cohesion: 0.67
Nodes (3): Stack Next.js + Prisma + PostgreSQL (Supabase, Vercel), D26 — Stack confirmée Next.js (vs React+Vite du handoff), D9 — Stack Next.js + Prisma + PostgreSQL

### Community 11 - "Map device (scarabées)"
Cohesion: 0.67
Nodes (3): D11 — Map device = 5 slots de scarabées (réglable 3-5), Bloc 3 — Map device (rangée de 5 scarabées), Map Device (1 map + jusqu'à 5 scarabées)

### Community 31 - "Community 31"
Cohesion: 0.06
Nodes (30): dependencies, next, next-themes, react, react-dom, @t3-oss/env-nextjs, zod, devDependencies (+22 more)

### Community 32 - "Community 32"
Cohesion: 0.07
Nodes (27): code:bash (# Launch all tests for User Story 1 together (if tests reque), Dependencies & Execution Order, Format: `[ID] [P?] [Story] Description`, Implementation for User Story 1, Implementation for User Story 2, Implementation for User Story 3, Implementation Strategy, Incremental Delivery (+19 more)

### Community 33 - "Community 33"
Cohesion: 0.14
Nodes (12): hanken, metadata, saira, AmbientBackground(), Footer(), FOOTER_LINKS, Header(), NAV_LINKS (+4 more)

### Community 34 - "Community 34"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 35 - "Community 35"
Cohesion: 0.11
Nodes (18): code:text ($ARGUMENTS), code:block2 (## Extension Hooks), code:block3 (## Extension Hooks), code:json ({), code:markdown (# Specification Quality Checklist: [FEATURE NAME]), code:markdown (## Question [N]: [Topic]), code:block7 (## Extension Hooks), code:block8 (## Extension Hooks) (+10 more)

### Community 36 - "Community 36"
Cohesion: 0.12
Nodes (16): code:text ($ARGUMENTS), code:block2 (## Extension Hooks), code:block3 (## Extension Hooks), code:block4 (## Extension Hooks), code:block5 (## Extension Hooks), code:text (For each unknown in Technical Context:), Completion Report, Done When (+8 more)

### Community 37 - "Community 37"
Cohesion: 0.12
Nodes (16): Checklist Format (REQUIRED), code:text ($ARGUMENTS), code:block2 (## Extension Hooks), code:block3 (## Extension Hooks), code:block4 (## Extension Hooks), code:block5 (## Extension Hooks), code:text (- [ ] [TaskID] [P?] [Story?] Description with file path), Completion Report (+8 more)

### Community 38 - "Community 38"
Cohesion: 0.13
Nodes (3): get_feature_paths(), _persist_feature_json(), common.sh script

### Community 39 - "Community 39"
Cohesion: 0.13
Nodes (14): Anti-Examples: What NOT To Do, Checklist Purpose: "Unit Tests for English", code:text ($ARGUMENTS), code:block2 (## Extension Hooks), code:block3 (## Extension Hooks), code:markdown (- [ ] CHK001 - Verify landing page displays 3 episode cards ), code:markdown (- [ ] CHK001 - Are the number and layout of featured episode), code:block6 (## Extension Hooks) (+6 more)

### Community 40 - "Community 40"
Cohesion: 0.13
Nodes (14): files, .specify/scripts/bash/check-prerequisites.sh, .specify/scripts/bash/common.sh, .specify/scripts/bash/create-new-feature.sh, .specify/scripts/bash/setup-plan.sh, .specify/scripts/bash/setup-tasks.sh, .specify/templates/checklist-template.md, .specify/templates/constitution-template.md (+6 more)

### Community 41 - "Community 41"
Cohesion: 0.13
Nodes (14): Constitution ExileStrats, Core Principles, Governance, I. Le plaisir et l'usage personnel d'abord (anti-over-engineering), II. La fiche doit battre Discord (test produit n°1), III. Séparation stricte des couches de données (NON-NÉGOCIABLE), IV. Validation Zod à chaque écriture du blob, IX. Ton « guide », pas « gains rapides » (anti-hype) (+6 more)

### Community 42 - "Community 42"
Cohesion: 0.14
Nodes (13): code:text ($ARGUMENTS), code:block2 (## Extension Hooks), code:block3 (## Extension Hooks), code:text (| Checklist | Total | Completed | Incomplete | Status |), code:sh (git rev-parse --git-dir 2>/dev/null), code:block6 (## Extension Hooks), code:block7 (## Extension Hooks), Completion Report (+5 more)

### Community 43 - "Community 43"
Cohesion: 0.14
Nodes (13): files, .claude/skills/speckit-analyze/SKILL.md, .claude/skills/speckit-checklist/SKILL.md, .claude/skills/speckit-clarify/SKILL.md, .claude/skills/speckit-constitution/SKILL.md, .claude/skills/speckit-implement/SKILL.md, .claude/skills/speckit-plan/SKILL.md, .claude/skills/speckit-specify/SKILL.md (+5 more)

### Community 44 - "Community 44"
Cohesion: 0.15
Nodes (12): Assumptions, Edge Cases, Feature Specification: [FEATURE NAME], Functional Requirements, Key Entities *(include if feature involves data)*, Measurable Outcomes, Requirements *(mandatory)*, Success Criteria *(mandatory)* (+4 more)

### Community 45 - "Community 45"
Cohesion: 0.17
Nodes (11): code:text ($ARGUMENTS), code:block2 (## Extension Hooks), code:block3 (## Extension Hooks), code:block4 (## Extension Hooks), code:block5 (## Extension Hooks), Completion Report, Done When, Mandatory Post-Execution Hooks (+3 more)

### Community 46 - "Community 46"
Cohesion: 0.18
Nodes (10): code:text ($ARGUMENTS), code:block2 (## Extension Hooks), code:block3 (## Extension Hooks), code:bash (git config --get remote.origin.url), code:block5 (## Extension Hooks), code:block6 (## Extension Hooks), Outline, Post-Execution Checks (+2 more)

### Community 47 - "Community 47"
Cohesion: 0.18
Nodes (10): Core Principles, Governance, [PRINCIPLE_1_NAME], [PRINCIPLE_2_NAME], [PRINCIPLE_3_NAME], [PRINCIPLE_4_NAME], [PRINCIPLE_5_NAME], [PROJECT_NAME] Constitution (+2 more)

### Community 48 - "Community 48"
Cohesion: 0.18
Nodes (10): code:text (specs/[###-feature]/), code:text (# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)), Complexity Tracking, Constitution Check, Documentation (this feature), Implementation Plan: [FEATURE], Project Structure, Source Code (repository root) (+2 more)

### Community 49 - "Community 49"
Cohesion: 0.20
Nodes (9): code:yaml (# Path to the coding agent context file managed by this exte), code:bash (pip install pyyaml), code:bash (specify extension disable agent-context), Coding Agent Context Extension, Commands, Configuration, Disable, Requirements (+1 more)

### Community 50 - "Community 50"
Cohesion: 0.20
Nodes (9): CLAUDE.md — ExileStrats, Design (réf. canonique : `design_handoff/`), En une phrase, Git & CI — autorisation & workflow, Invariants à ne pas violer, Ordre de construction, Où regarder, Règles de travail (+1 more)

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (9): code:text ($ARGUMENTS), code:block2 (## Extension Hooks), code:block3 (## Extension Hooks), code:block4 (## Extension Hooks), code:block5 (## Extension Hooks), Outline, Post-Execution Checks, Pre-Execution Checks (+1 more)

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (9): invoke_separator, script, default_integration, installed_integrations, integration, integration_settings, claude, integration_state_schema (+1 more)

### Community 53 - "Community 53"
Cohesion: 0.20
Nodes (9): schema_version, description, installed_at, name, source, updated_at, version, workflows (+1 more)

### Community 54 - "Community 54"
Cohesion: 0.25
Nodes (7): ai, ai_skills, feature_numbering, here, integration, script, speckit_version

### Community 55 - "Community 55"
Cohesion: 0.29
Nodes (6): Arborescence cible, ARCHITECTURE — ExileStrats, code:text (src/), Conventions, Couche données (quand elle sera branchée), Principes directeurs

### Community 56 - "Community 56"
Cohesion: 0.33
Nodes (5): printWidth, semi, singleQuote, tabWidth, trailingComma

### Community 58 - "Community 58"
Cohesion: 0.40
Nodes (4): [Category 1], [Category 2], [CHECKLIST TYPE] Checklist: [FEATURE NAME], Notes

### Community 59 - "Community 59"
Cohesion: 0.50
Nodes (3): Behavior, Execution, Update Coding Agent Context

### Community 60 - "Community 60"
Cohesion: 0.50
Nodes (3): Behavior, Execution, Update Coding Agent Context

### Community 61 - "Community 61"
Cohesion: 0.50
Nodes (3): Décisions de restructuration (juin 2026), Décisions fondatrices (D1–D17), Journal des décisions (ADR) — ExileStrats

## Knowledge Gaps
- **361 isolated node(s):** `eslintConfig`, `config`, `name`, `version`, `private` (+356 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Doc 10 — Design system (ancien, partiellement superseded)` connect `Modèle de données & tags` to `Fiche & ton anti-hype`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `config`, `name` to the rest of the system?**
  _377 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Modèle de données & tags` be split into smaller, more focused modules?**
  _Cohesion score 0.04995374653098982 - nodes in this community are weakly interconnected._
- **Should `Pipeline & architecture données` be split into smaller, more focused modules?**
  _Cohesion score 0.06918238993710692 - nodes in this community are weakly interconnected._
- **Should `Design system (revirement glass)` be split into smaller, more focused modules?**
  _Cohesion score 0.09291521486643438 - nodes in this community are weakly interconnected._
- **Should `Migration doc & contexte` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `Couleur par mécanique` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
# Graph Report - .  (2026-06-21)

## Corpus Check
- 18 files · ~12,294 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 105 nodes · 91 edges · 31 communities (12 shown, 19 thin omitted)
- Extraction: 62% EXTRACTED · 38% INFERRED · 0% AMBIGUOUS · INFERRED: 35 edges (avg confidence: 0.85)
- Token cost: 74,589 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `Principe III — Séparation stricte des couches de données` - 6 edges
2. `Doc 10 — Design system (ancien, partiellement superseded)` - 5 edges
3. `extract-mechanic-colors.mjs — Extraction couleur dominante des scarabées` - 5 edges
4. `dominantColor()` - 4 edges
5. `Principe VII — Identité visuelle: liquid glass, light+dark, couleur fonctionnelle` - 4 edges
6. `CLAUDE.md — Primer projet ExileStrats` - 4 edges
7. `Corps de strat = blob JSON content versionné (schemaVersion)` - 4 edges
8. `Données de jeu statiques hors base, versionnées par league` - 4 edges
9. `Doc 04 — Anatomie de la fiche` - 4 edges
10. `Pipeline d'ingestion des données de jeu (séparé de l'app)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Corps de strat = blob JSON content versionné (schemaVersion)` --semantically_similar_to--> `D5 — Corps de strat = blob JSON versionné`  [INFERRED] [semantically similar]
  docs/03-data-model.md → DECISIONS.md
- `Principe éditorial anti-hype (ton guide, profit neutre)` --semantically_similar_to--> `Positionnement complément de la vidéo`  [INFERRED] [semantically similar]
  design_handoff/README.md → docs/01-vision-and-positioning.md
- `Typographie Saira Condensed / Hanken Grotesk` --semantically_similar_to--> `Brief Claude Design — Habillage fiche (ancien, glass rejeté)`  [INFERRED] [semantically similar]
  design_handoff/README.md → docs/brief-claude-design.md
- `D6 — Données de jeu = JSON statiques hors base, par league` --rationale_for--> `Principe III — Séparation stricte des couches de données`  [EXTRACTED]
  DECISIONS.md → .specify/memory/constitution.md
- `Principe III — Séparation stricte des couches de données` --conceptually_related_to--> `Couche relationnelle PostgreSQL (stable/filtrable)`  [INFERRED]
  .specify/memory/constitution.md → docs/03-data-model.md

## Hyperedges (group relationships)
- **Séparation stricte des trois couches de données** — docs_03_data_model_content_blob, docs_03_data_model_relational_layer, docs_03_data_model_static_game_data, memory_constitution_principle_iii [EXTRACTED 0.90]
- **Ordre de lecture figé de la fiche** — docs_04_fiche_anatomy_header_actions, docs_04_fiche_anatomy_tldr, docs_04_fiche_anatomy_mapdevice, docs_04_fiche_anatomy_detail, docs_04_fiche_anatomy_secondaire, docs_04_fiche_anatomy_pied [EXTRACTED 0.95]
- **ADRs pilotant le revirement design vers le liquid glass** — decisions_d15, decisions_d19, decisions_d20, decisions_d21, memory_constitution_principle_vii [EXTRACTED 0.90]

## Communities (31 total, 19 thin omitted)

### Community 0 - "Modèle de données & tags"
Cohesion: 0.15
Nodes (15): D10 — Tags dénormalisés + vocabulaire contrôlé, D5 — Corps de strat = blob JSON versionné, D8 — Arbre d'Atlas = union 3 niveaux (link/image/allocated), approachTags (vocabulaire contrôlé de style, proposé), mechanicTags (vocabulaire contrôlé dérivé des données de jeu), Arbre d'Atlas — union 3 variantes (link/image/allocated), Corps de strat = blob JSON content versionné (schemaVersion), Couche relationnelle PostgreSQL (stable/filtrable) (+7 more)

### Community 1 - "Fiche & ton anti-hype"
Cohesion: 0.18
Nodes (12): D13 — Anatomie de fiche validée, D22 — Ton guide pas gains rapides (anti-hype), D3 — Positionnement complément de la vidéo, Principe éditorial anti-hype (ton guide, profit neutre), Indicateur de difficulté (3 niveaux, 3 barres), Écran Fiche de stratégie, Positionnement complément de la vidéo, Doc 03 — Modèle de données conceptuel (+4 more)

### Community 2 - "Pipeline & architecture données"
Cohesion: 0.22
Nodes (11): D6 — Données de jeu = JSON statiques hors base, par league, Surfaces liquid glass (--glass-card/panel/nav, backdrop-filter), Doc 05 — Architecture technique, Pipeline d'ingestion des données de jeu (séparé de l'app), Sources de données (atlastree-export, RePoE-fork, poedb, poe.ninja), Doc 06 — Dépendances, conformité GGG, légal, Maintenance par league (resync données, versionnement), Doc 10 — Design system (ancien, partiellement superseded) (+3 more)

### Community 3 - "Design system (revirement glass)"
Cohesion: 0.31
Nodes (9): CLAUDE.md — Primer projet ExileStrats, DECISIONS.md — Journal ADR ExileStrats, D15 — Direction visuelle simpliste, Poppins/Space Grotesk, verre rejeté, D19 — design_handoff/ = référence design canonique, D20 — Revirement glassmorphism: liquid glass adopté, D21 — Polices Saira Condensed / Hanken Grotesk, Design Handoff — Référence design canonique ExileStrats, Constitution ExileStrats (+1 more)

### Community 4 - "Migration doc & contexte"
Cohesion: 0.25
Nodes (8): D14 — Doc découpée en docs/ + AGENTS.md (superseded par D24), D24 — Contexte = graphify-out/ + constitution + DECISIONS.md (supersede D14), Typographie Saira Condensed / Hanken Grotesk, Doc 01 — Vision & positionnement, Doc 08 — Journal des décisions (ancien, superseded), docs/AGENTS.md — Primer dev assisté par IA (ancien), Brief Claude Design — Habillage fiche (ancien, glass rejeté), docs/README.md — Index documentation (MapStrat)

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
Cohesion: 0.50
Nodes (4): D16 — Couleur d'accent par mécanique = Mechanic.color, Couleurs de mécaniques signature (map canonique), Écran Accueil / liste de stratégies, Couleur fonctionnelle par mécanique (Mechanic.color)

### Community 9 - "Plaisir d'abord (anti-over-eng)"
Cohesion: 0.67
Nodes (3): D2 — Objectif plaisir/apprentissage, adoption = bonus, Définition du succès (plaisir avant adoption), Principe I — Plaisir et usage personnel d'abord (anti-over-engineering)

### Community 10 - "Stack technique"
Cohesion: 0.67
Nodes (3): Stack Next.js + Prisma + PostgreSQL (Supabase, Vercel), D26 — Stack confirmée Next.js (vs React+Vite du handoff), D9 — Stack Next.js + Prisma + PostgreSQL

### Community 11 - "Map device (scarabées)"
Cohesion: 0.67
Nodes (3): D11 — Map device = 5 slots de scarabées (réglable 3-5), Bloc 3 — Map device (rangée de 5 scarabées), Map Device (1 map + jusqu'à 5 scarabées)

## Knowledge Gaps
- **35 isolated node(s):** `CANONICAL_SCARAB`, `Workflow Git & CI (main/dev/feat, quality gates)`, `Stack Next.js + Prisma + PostgreSQL (Supabase, Vercel)`, `Thèmes light + dark (localStorage mapstrat-theme)`, `Typographie Saira Condensed / Hanken Grotesk` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Doc 10 — Design system (ancien, partiellement superseded)` connect `Pipeline & architecture données` to `Fiche & ton anti-hype`, `Migration doc & contexte`?**
  _High betweenness centrality (0.204) - this node is a cross-community bridge._
- **Why does `extract-mechanic-colors.mjs — Extraction couleur dominante des scarabées` connect `Pipeline & architecture données` to `Couleur par mécanique`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Principe III — Séparation stricte des couches de données` (e.g. with `Couche relationnelle PostgreSQL (stable/filtrable)` and `Données de jeu statiques hors base, versionnées par league`) actually correct?**
  _`Principe III — Séparation stricte des couches de données` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CANONICAL_SCARAB`, `Principe I — Plaisir et usage personnel d'abord (anti-over-engineering)`, `Principe VIII — Path of Exile 1 uniquement` to the rest of the system?**
  _51 weakly-connected nodes found - possible documentation gaps or missing edges._
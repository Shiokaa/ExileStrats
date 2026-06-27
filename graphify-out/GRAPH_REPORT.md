# Graph Report - ExileStrats (src + governance docs)  (2026-06-25)

## Corpus Check
- 65 files · ~18,268 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 278 nodes · 535 edges · 34 communities (14 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 18 edges (avg confidence: 0.78)
- Token cost: 35,000 input · 6,475 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Strategy & Mechanic Components|Strategy & Mechanic Components]]
- [[_COMMUNITY_App Shell & Layout|App Shell & Layout]]
- [[_COMMUNITY_Strategy Data & Schema|Strategy Data & Schema]]
- [[_COMMUNITY_Profile & Strategy Actions|Profile & Strategy Actions]]
- [[_COMMUNITY_Auth & Server Plumbing|Auth & Server Plumbing]]
- [[_COMMUNITY_Create Form|Create Form]]
- [[_COMMUNITY_Architecture Principles|Architecture Principles]]
- [[_COMMUNITY_Design System Decisions|Design System Decisions]]
- [[_COMMUNITY_Routing & Page Queries|Routing & Page Queries]]
- [[_COMMUNITY_Home Listing & Filters|Home Listing & Filters]]
- [[_COMMUNITY_YouTube Embed|YouTube Embed]]
- [[_COMMUNITY_Server Boundary Conventions|Server Boundary Conventions]]
- [[_COMMUNITY_Zod Content Blob|Zod Content Blob]]
- [[_COMMUNITY_Atlas Tree Decisions|Atlas Tree Decisions]]
- [[_COMMUNITY_Privacy Page|Privacy Page]]
- [[_COMMUNITY_Terms Page|Terms Page]]
- [[_COMMUNITY_App Identity Constants|App Identity Constants]]
- [[_COMMUNITY_Tailwind v4 Styling|Tailwind v4 Styling]]
- [[_COMMUNITY_Git Workflow & CI|Git Workflow & CI]]
- [[_COMMUNITY_Controlled Tag Vocabulary|Controlled Tag Vocabulary]]
- [[_COMMUNITY_PoE 1 Scope|PoE 1 Scope]]
- [[_COMMUNITY_Context Docs Strategy|Context Docs Strategy]]
- [[_COMMUNITY_Next.js Stack Decision|Next.js Stack Decision]]
- [[_COMMUNITY_Tier List (Deferred)|Tier List (Deferred)]]
- [[_COMMUNITY_Complement to Video|Complement to Video]]
- [[_COMMUNITY_Manual Cost Snapshot|Manual Cost Snapshot]]
- [[_COMMUNITY_Map Device Scarabs|Map Device Scarabs]]
- [[_COMMUNITY_Fragments Out of V1|Fragments Out of V1]]
- [[_COMMUNITY_Fiche Anatomy|Fiche Anatomy]]
- [[_COMMUNITY_Project Rename|Project Rename]]
- [[_COMMUNITY_English UI  i18n Deferred|English UI / i18n Deferred]]
- [[_COMMUNITY_Guides Link Removed|Guides Link Removed]]
- [[_COMMUNITY_No Barrel Files|No Barrel Files]]
- [[_COMMUNITY_Typed Env (t3-env)|Typed Env (t3-env)]]

## God Nodes (most connected - your core abstractions)
1. `getCurrentUser()` - 18 edges
2. `Button()` - 12 edges
3. `MECHANICS` - 10 edges
4. `cssVars()` - 10 edges
5. `StrategyCard()` - 10 edges
6. `createStrategyAction()` - 9 edges
7. `StrategySummary` - 9 edges
8. `cx()` - 8 edges
9. `formatReturn()` - 8 edges
10. `formatInvest()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Favorites in localStorage` --semantically_similar_to--> `D17 — Light + dark themes`  [INFERRED] [semantically similar]
  FUTURE.md → DECISIONS.md
- `Zod-validated JSON content blob (schemaVersion)` --semantically_similar_to--> `Zod = source of truth (types inferred)`  [INFERRED] [semantically similar]
  CLAUDE.md → ARCHITECTURE.md
- `Favorites in localStorage` --conceptually_related_to--> `D34 — Auth V1 = Supabase Auth via Discord only`  [INFERRED]
  FUTURE.md → DECISIONS.md
- `Fun before plumbing (Principe I, Slice 1 first)` --conceptually_related_to--> `D2 — Fun/learning goal, adoption is bonus`  [INFERRED]
  CLAUDE.md → DECISIONS.md
- `GGG compliance invariant` --conceptually_related_to--> `D4 — No PoE OAuth in V1, Discord auth`  [INFERRED]
  CLAUDE.md → DECISIONS.md

## Hyperedges (group relationships)
- **Decisions shaping the V1 auth model** — decisions_d4_no_poe_oauth_discord_auth, decisions_d34_auth_v1_supabase_discord, future_email_password_auth, future_poe_login_oauth [INFERRED 0.85]
- **Invariants protecting the Zod-validated content blob** — decisions_d5_strategy_json_blob, claude_zod_validated_content_blob, architecture_zod_source_of_truth, architecture_dal_per_feature [INFERRED 0.85]
- **Design direction reversal driven by design_handoff** — decisions_d15_simplistic_visual_glass_rejected, decisions_d19_design_handoff_canonical_reference, decisions_d20_glassmorphism_adopted, decisions_d21_fonts_saira_hanken, decisions_d27_mechanic_colors_fixed_palette [INFERRED 0.85]

## Communities (34 total, 20 thin omitted)

### Community 0 - "Strategy & Mechanic Components"
Cohesion: 0.12
Nodes (29): AuthorAvatar(), CopyForDiscord(), Fiche(), TOC, MechanicHub(), MechanicHubProps, StrategyCard(), MECHANIC_KEYS (+21 more)

### Community 1 - "App Shell & Layout"
Cohesion: 0.10
Nodes (17): hanken, metadata, saira, AmbientBackground(), Footer(), Header(), Logo(), LogoMark() (+9 more)

### Community 2 - "Strategy Data & Schema"
Cohesion: 0.11
Nodes (20): sampleStrategies, defaultContent(), DETAILS, getStrategyDetail(), TIER_NOTE, atlasTreeSchema, difficultySchema, leagueSchema (+12 more)

### Community 3 - "Profile & Strategy Actions"
Cohesion: 0.18
Nodes (21): OwnerActions(), metadata, ProfilePage(), buildStrategyData(), createInputSchema, createStrategyAction(), CreateStrategyInput, deleteStrategyAction() (+13 more)

### Community 4 - "Auth & Server Plumbing"
Cohesion: 0.12
Nodes (11): AuthForm(), AuthPage(), metadata, adapter, globalForPrisma, env, config, proxy() (+3 more)

### Community 5 - "Create Form"
Cohesion: 0.14
Nodes (10): CreateForm(), CreateFormInitial, CreateFormProps, DIFFICULTY_KEYS, CreatePage(), metadata, metadata, Params (+2 more)

### Community 6 - "Architecture Principles"
Cohesion: 0.14
Nodes (16): DAL per feature (features/*/queries.ts, server-only), Feature-based code organization, Prisma singleton (server/db/prisma.ts), Server-first (Server Components by default), Fun before plumbing (Principe I, Slice 1 first), GGG compliance invariant, No PoE OAuth invariant (Discord auth), D17 — Light + dark themes (+8 more)

### Community 7 - "Design System Decisions"
Cohesion: 0.13
Nodes (16): Anti-hype principle (Principe IX), Design tokens source of truth (design_handoff), Functional color (mechanic/difficulty/action), Liquid glass design language, Static game-data-out-of-DB invariant, D15 — Simplistic visual direction, glass rejected (partly superseded), D16 — Mechanic accent color auto-derived from scarab art (superseded), D19 — design_handoff/ = canonical design reference (+8 more)

### Community 8 - "Routing & Page Queries"
Cohesion: 0.21
Nodes (10): NotFound(), EditStrategyPage(), MechanicPage(), generateMetadata(), Params, StrategyPage(), getSimilarStrategies(), getStrategiesByMechanic() (+2 more)

### Community 9 - "Home Listing & Filters"
Cohesion: 0.22
Nodes (11): Home(), HomeView(), LeagueFilter, MechanicFilter, segment(), Sort, SORTS, League (+3 more)

### Community 10 - "YouTube Embed"
Cohesion: 0.50
Nodes (5): YoutubeEmbed(), parseYouTubeId(), PATTERNS, youtubeEmbedUrl(), youtubeThumbUrl()

### Community 11 - "Server Boundary Conventions"
Cohesion: 0.67
Nodes (3): Route Handlers reserved for webhooks/upload/external, Mutations = Server Actions (features/*/actions.ts), Explicit server boundaries (import 'server-only')

### Community 12 - "Zod Content Blob"
Cohesion: 1.00
Nodes (3): Zod = source of truth (types inferred), Zod-validated JSON content blob (schemaVersion), D5 — Strategy body = versioned JSON blob

### Community 13 - "Atlas Tree Decisions"
Cohesion: 1.00
Nodes (3): D30 — Create page V1 without interactive Atlas editor, D8 — Atlas tree = union of 3 levels, Interactive Atlas tree editor

## Knowledge Gaps
- **65 isolated node(s):** `config`, `Crumb`, `Variant`, `ButtonProps`, `IconButtonProps` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getCurrentUser()` connect `Profile & Strategy Actions` to `Routing & Page Queries`, `App Shell & Layout`, `Auth & Server Plumbing`, `Create Form`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `Button()` connect `Profile & Strategy Actions` to `Strategy & Mechanic Components`, `App Shell & Layout`, `Create Form`, `Routing & Page Queries`, `Home Listing & Filters`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `config`, `Crumb`, `Variant` to the rest of the system?**
  _86 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Strategy & Mechanic Components` be split into smaller, more focused modules?**
  _Cohesion score 0.11846689895470383 - nodes in this community are weakly interconnected._
- **Should `App Shell & Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.0989247311827957 - nodes in this community are weakly interconnected._
- **Should `Strategy Data & Schema` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `Auth & Server Plumbing` be split into smaller, more focused modules?**
  _Cohesion score 0.12318840579710146 - nodes in this community are weakly interconnected._
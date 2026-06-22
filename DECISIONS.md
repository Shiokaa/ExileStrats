# Journal des décisions (ADR) — ExileStrats

> Toutes les décisions structurantes du projet et leur justification. À mettre à jour à chaque
> nouvelle décision. Source de vérité des choix ; cité par la constitution (`.specify/memory/constitution.md`).
> *(Remplace l'ancien `docs/08-decisions.md`, le dossier `docs/` ayant été retiré au profit de
> `graphify-out/` pour le contexte détaillé.)*

## Décisions fondatrices (D1–D17)

| # | Décision | Justification | Statut |
| --- | --- | --- | --- |
| D1 | Cibler **PoE 1** uniquement | Moteur et API stables ; league régulière ; export d'arbre officiel | Actif (→ Principe VIII) |
| D2 | Objectif **plaisir/apprentissage**, adoption = bonus | Cadre tout le dimensionnement ; évite l'over-engineering | Actif (→ Principe I) |
| D3 | Positionnement **complément** de la vidéo | Le créateur ne quitte pas YouTube | Actif |
| D4 | **Pas d'OAuth PoE** en V1 → Auth Discord | Accès GGG discrétionnaire/lent, aucune justification de scope | Actif (→ Principe VI) |
| D5 | Corps de strat = **blob JSON versionné** | PoE change chaque league ; éviter les migrations à répétition | Actif (→ Principe III) |
| D6 | Données de jeu = **JSON statiques hors base, par league** | Découple l'app des changements de format GGG | Actif (→ Principes III, V) |
| D7 | Métriques coût/profit = **snapshot manuel** | Prix trop volatils pour du live en V1 | Actif |
| D8 | Arbre d'Atlas = **union 3 niveaux** (link/image/allocated) | Démarrer simple, enrichir sans changer le schéma | Actif |
| D9 | Stack **Next.js + Prisma + PostgreSQL** | Confort solo, un seul repo, fit avec dev assisté par IA | Actif (réaffirmé par D26) |
| D10 | Tags **dénormalisés** + **vocabulaire contrôlé** | Filtrage qui fonctionne vraiment ; évite le « tag soup » | Actif (→ Principe IV) |
| D11 | Map device = **5 slots de scarabées** (réglable 3–5) | 1 map + 5 scarabées débloqués via la progression d'Atlas | Actif |
| D12 | **Fragments hors V1** | Hors juicing de mapping ; réactivables sans migration (blob) | Actif |
| D13 | **Anatomie de fiche validée** | Ordre de scan figé avant l'habillage | Actif (détaillé par `design_handoff`) |
| D14 | **Doc découpée en `docs/` + `AGENTS.md`** | Récupération de contexte propre | **Superseded par D24** |
| D15 | Direction visuelle **simpliste + couleur fonctionnelle (light+dark)**, polices Poppins/Space Grotesk, **verre rejeté** | Lisibilité ; couleur = info | **Partiellement superseded par D20 (glass) et D21 (polices)** ; couleur fonctionnelle + light/dark restent actifs |
| D16 | Couleur d'accent par mécanique = `Mechanic.color` **auto-dérivée de l'art des scarabées** (script `extract-mechanic-colors.mjs`) | Fidèle à l'art, auto-mise à jour par league | **Superseded par D27** : le design system fige une palette canonique ; plus d'auto-extraction |
| D17 | **Thèmes light + dark** (`prefers-color-scheme` + toggle) | Les deux modes de première classe | Actif ; clé de persistance `localStorage['mapstrat-theme']` (conservée pour compat) |

## Décisions de restructuration (juin 2026)

| # | Décision | Justification | Statut |
| --- | --- | --- | --- |
| D18 | **Renommage** du projet : MapStrat → **ExileStrats** | Nom définitif retenu | Actif |
| D19 | **`design_handoff/` = référence design canonique** (high-fidelity : README + maquettes `*.dc.html` + screenshots) | Design refait avec Claude Code, plus récent et plus complet que la doc initiale ; marqué « définitif » | Actif |
| D20 | **Revirement glassmorphism : le liquid glass est ADOPTÉ** (surfaces `--glass-*`, `backdrop-filter` blur+saturate) | Le design_handoff fait foi (D19) ; l'esthétique verre y est centrale | Actif — **supersede le « verre rejeté » de D15** |
| D21 | **Polices : Saira Condensed (display) / Hanken Grotesk (corps)** | Imposées par le design_handoff | Actif — **supersede Poppins/Space Grotesk de D15** |
| D22 | **Ton « guide », pas « gains rapides » (anti-hype)** : profit neutre, jamais dominant, toujours couplé à un indicateur de difficulté (3 niveaux) | Différenciateur produit ; évite l'aspect « site d'arnaque » | Actif (→ Principe IX) |
| D23 | **Langue de l'UI : anglais par défaut** ; français puis autres langues plus tard (i18n hors V1). Docs/artefacts du projet restent en français | Audience PoE majoritairement anglophone ; i18n = effort reporté | Actif |
| D24 | **Contexte = `graphify-out/` + constitution + `DECISIONS.md`** ; suppression du dossier `docs/` | Récupération de contexte via graphe graphify (rapide, interrogeable) ; un journal ADR lisible en git à la racine | Actif — **supersede D14** |
| D25 | **Workflow Git** : 2 branches longues `main` (stable) + `dev` (intégration) ; travail sur `feat/*` issues de `dev`. **CI** : PR `feat/* → dev` = lint+format + typecheck ; PR `dev → main` = build Next.js + tests | Hygiène façon GitLab : on ne pousse sur `dev`/`main` que si la pipeline passe | Actif |
| D26 | **Stack confirmée Next.js + Prisma + PostgreSQL** (vs reco React+Vite du handoff) | Besoins backend (Prisma/Postgres, Supabase Auth Discord, routes API, SSR) ; un seul repo ; le design tourne en Next App Router | Actif — réaffirme D9 |
| D27 | **Couleurs de mécaniques = palette fixe du design system** (9 valeurs canoniques) ; abandon de l'auto-extraction depuis l'art des scarabées | La maquette fige des couleurs choisies pour l'esthétique cool-neutral + glass (la maquette fait foi, D19) ; une couleur auto-extraite risquerait de jurer. Le script `extract-mechanic-colors.mjs` devient obsolète et part avec `docs/`. **N.B.** : le pipeline d'ingestion des **données** de jeu (D6 / Principe V) reste nécessaire — seule l'étape *couleur* disparaît | Actif — **supersede D16** |
| D28 | **Architecture feature-based + server-first**, posée tôt mais **branchée à la demande** (backend en stub tant qu'un slice ne l'exige pas). Détail : `ARCHITECTURE.md`. Garde-fous : modules serveur via `import 'server-only'` (jamais `'use server'` sur un DAL) ; mutations app = Server Actions ; Route Handlers réservés webhooks/upload/externe ; Zod source de vérité (`schemaVersion` via `discriminatedUnion`) ; env typé (`@t3-oss/env-nextjs`) ; pas de barrel files dans les chemins chauds | Projet voulu scalable/durable (pas POC). On pose structure + conventions sans allumer Prisma/Supabase d'avance (« plaisir avant plomberie », Principe I + V). Reco issue d'une recherche dédiée, corrigée (l'agent confondait `'use server'`/`server-only`, et préfixait `_lib` hors `app/` sans raison) | Actif |
| D29 | **Styling = Tailwind v4** ; les tokens du design system restent des **variables CSS** (définies par thème sous `:root`/`[data-theme='dark']`) exposées via `@theme inline` → utilities thème-aware (`text-fg`, `bg-page`, `rounded-card`…). Les primitives multi-propriétés (glass, `tint()`, ambient, boutons) = `@utility`/`@layer components` dans `globals.css`. Pas de CSS Modules | Standard Next.js 2026, déjà installé, itération rapide ; v4 consomme nativement les variables CSS donc le design system (2 thèmes, `color-mix`, glass) reste intact. Le handoff laissait le choix « Tailwind ou CSS Modules » | Actif |
| D30 | **Page « Créer » en V1 SANS l'éditeur d'arbre d'Atlas interactif** : le formulaire de publication + aperçu live entrent en V1, mais l'arbre d'Atlas se saisit en niveau 0 (lien planner / image), pas via l'éditeur d'allocation interactif | L'éditeur interactif reste un non-goal V1 (constitution / docs §3.2) ; le reste du formulaire apporte de la valeur sans lui | Actif |
| D31 | **Tier list écartée de la V1** (maquettée dans `design_handoff`, mais non construite). Lien retiré de la nav ; reportée dans `FUTURE.md` | Choix produit ; vue agrégée non prioritaire. Réactivable sans coût (vue pure sur les stratégies existantes : `tier` + `mechanicTags` déjà au modèle) | Actif |
| D32 | **Lien « Guides » retiré de la nav** (header + footer) | Reliquat de la maquette sans feature ni concept correspondant en V1 (lien mort) ; aucune intention produit à ce stade | Actif |
| D33 | **Couche données branchée (Prisma 7 + PostgreSQL/Supabase)** : générateur `prisma-client` (client généré dans `src/generated/`, gitignoré, régénéré au `postinstall`) + **driver adapter `pg`** ; config dans `prisma.config.ts` (URLs hors schéma en Prisma 7) — app via `DATABASE_URL` (pooler), migrations via `DIRECT_URL`. **DAL** `features/strategy/queries.ts` (`server-only`, Zod en sortie). Pages lisant la base passées en `force-dynamic` (CI/build verts sans base). Sync initial via `db push` (évite le shadow-DB de `migrate dev` sur Supabase). `Profile`/`Favorite` non créés (auth pas encore là) | Vérifié via Context7 (Prisma 7 récent) ; lectures seulement pour l'instant (Phase 1 sans creds, Phase 2 = migrate+seed avec la base de l'utilisateur) | Actif |

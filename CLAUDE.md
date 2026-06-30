# CLAUDE.md — ExileStrats

> Primer du projet pour le dev assisté par IA. Lire ce fichier, puis interroger `graphify-out/` pour le détail.
> **Loi du projet** : `.specify/memory/constitution.md` (elle prime). **Journal ADR** : `DECISIONS.md`.
> **Référence design** : `design_handoff/` (high-fidelity) pour la **structure/anatomie** des écrans ;
> sa **direction visuelle** (glass, thèmes light+dark) est **superseded par D35** (dark-only, identité
> Atlas). Tokens vivants = `src/app/globals.css`.
>
> **Précédence des sources** : la maquette `design_handoff/` a été faite **après** le plan initial.
> En cas de conflit entre une ancienne décision de plan et la maquette, **la maquette gagne** — sauf
> décision explicite postérieure consignée dans `DECISIONS.md` (ex. stack Next.js D26 ; refonte
> visuelle **D35** dark-only / sans glass, qui supersede l'esthétique verre+light/dark de la maquette).

## En une phrase

Appli web perso (**Next.js + Prisma + PostgreSQL**) pour composer et partager des **stratégies de
mapping Path of Exile 1** sous forme de fiches visuelles. Projet passion : objectif = plaisir et usage
personnel d'abord (pas l'adoption de masse).

## Stack

- **Next.js (TypeScript)** — un seul repo (UI + routes API). *(Choix confirmé vs la reco React+Vite du
  handoff, voir DECISIONS.md D26.)*
- **Prisma** + **PostgreSQL** (Supabase) · **Supabase Auth via Discord** · **Supabase Storage** ·
  **Vercel** pour le déploiement.

## Invariants à ne pas violer

- **Corps de strat = blob JSON validé par Zod** (champ `content`), versionné par `schemaVersion`. Ne
  PAS éclater le blob en colonnes SQL. Validation Zod **obligatoire à chaque écriture** (le type `Json`
  de Prisma n'est pas typé — seul garde-fou). → Principe III/IV
- **Données de jeu (scarabées, mécaniques, arbre d'Atlas) = JSON statiques hors base, versionnés par
  league.** La strat ne stocke que des **IDs + `leagueVersion`**, résolus à l'affichage. → Principe III
- **Ne jamais parser les noms d'affichage** des items pour déduire leur mécanique — utiliser les champs
  structurés. → Principe IV
- **PoE 1 uniquement.** Pas de PoE 2 (ni support, ni « préparation »). → Principe VIII
- **Pas d'OAuth Path of Exile.** Auth = Supabase Auth via Discord. → Principe VI
- **Map device = jusqu'à 5 scarabées** (réglable 3–5, 5 par défaut). **Pas de fragments en V1.**
- **Conformité GGG** : afficher « This product isn't affiliated with or endorsed by Grinding Gear Games
  in any way. », créditer GGG, User-Agent identifiable + rate limits, pas de reverse-engineering. → Principe VI
- **Ton anti-hype** : le **profit n'est jamais l'élément dominant**, présenté en couleur **neutre** (pas
  de vert criard), toujours **équilibré par la difficulté** (3 niveaux). Pas de formulation survendue. → Principe IX
- **Langue de l'UI : anglais par défaut** ; français et autres langues plus tard (i18n hors V1). Les
  artefacts du projet (constitution, DECISIONS.md, ce fichier) restent en français.

## Design (réf. canonique : `design_handoff/`)

- **Pas de liquid glass.** Surfaces **solides** (palette « void »). Les utilities `glass-card/panel/nav`
  de `globals.css` sont conservées **par compatibilité de nom mais rendent du solide** (plus de
  `backdrop-filter`). *(D35 supersede D20 : le verre — réfraction CSS — souffrait d'un bug moteur
  Chromium et jurait pour un outil de contenu.)*
- **Dark-only.** Un seul thème (identité Atlas/void, sombre par essence). **Pas de toggle**, dépendance
  `next-themes` retirée, plus de clé `localStorage['mapstrat-theme']` ni de `prefers-color-scheme`.
  *(D35 supersede D17.)*
- **Identité « Atlas / cartography »** : palette void (`--void`, `--surface`, `--line`, `--ink`) +
  accent **brass** (`--brass`) parcimonieux + les **9 couleurs de mécaniques** (fonctionnelles) +
  profit neutre (Principe IX). Élément signature : la **constellation** (filtre de mécaniques en nœuds
  reliés). *(Détail : DECISIONS.md D35.)*
- **Couleur fonctionnelle** (mécanique / difficulté / action), jamais déco. Couleurs de mécaniques =
  palette fixe canonique (9 valeurs, D27).
- Polices : **Saira Condensed** (display/titres) / **Hanken Grotesk** (corps) / **JetBrains Mono**
  (chiffres/stats, effet « instrument »).
- **Source de vérité des tokens** : `src/app/globals.css` — bloc `@theme inline` + variables `:root`
  (palette void/brass, `--radius-*`, `--font-*`, les 9 couleurs de mécaniques, tiers, difficulté).
  La maquette `design_handoff/design_files/*.dc.html` reste une référence de **structure** mais son
  design system (glass, light/dark, échelle `--text-h1…-meta`) est **superseded par D35**.
- Les maquettes `design_handoff/design_files/*.dc.html` sont des **références** (runtime maison
  `support.js` à NE PAS porter) — lire structure/tokens/logique, réimplémenter proprement.
- **Unités : échelle Tailwind / `rem`, pas de px fixes.** Utiliser l'échelle native
  (`gap-4`, `p-5`, `text-sm`, `size-12`, `max-w-4xl`, `rounded-card`…) plutôt que des valeurs
  arbitraires en pixels (`gap-[14px]`, `text-[13px]`, `size-[50px]`). Le `rem` respecte le zoom
  et les préférences d'accessibilité ; l'échelle est plus lisible et maintenable. **Exceptions
  tolérées** : hairlines (`border`, `h-px`), et le rare cas où aucune valeur d'échelle ne convient
  (le justifier). Le code legacy en px est migré au fil des passages, pas en bloc. *(Le code du
  redesign D35 part propre sur cette règle.)*

## Git & CI — autorisation & workflow

> **Autorisation** : commandes `git` / `gh` autorisées (globalement, cf. CLAUDE.md global).
> Permission harness explicite : `.claude/settings.json` (`Bash(git:*)`, `Bash(gh:*)`).

- Branches longues **protégées** : `main` (stable) et `dev` (intégration). **Aucun push direct** dessus.
- Travail sur des branches **`feat/*`** issues de `dev`. Flux : `feat/* → dev` (PR), puis `dev → main` (PR).
- **CI gates** (→ DECISIONS.md D25) : PR `feat/* → dev` = check **`quality`** (lint + format + typecheck) ;
  PR `dev → main` = check **`verify`** (+ build Next.js + tests). On ne merge que si la CI est verte.
- Commits : messages clairs, **sans** trailer `Co-Authored-By` (cf. CLAUDE.md global).
- Ne jamais forcer un push sur `main`/`dev` ni contourner une CI rouge.
- *Exception unique : le **push de bootstrap** initial (création de `main`/`dev` sur le remote, avant
  l'activation de la protection de branches). Après ça, la règle « aucun push direct » s'applique.*

## Ordre de construction

Plaisir avant plomberie. **Slice 1 d'abord** : rendre une belle fiche depuis un objet écrit en dur,
sans base ni auth — c'est le test produit n°1.

## Où regarder

- **Loi du projet** : `.specify/memory/constitution.md` (principes MUST / MUST NOT).
- **Contexte détaillé** : `graphify-out/` (graphe interrogeable — modèle de données, mécaniques, conformité…).
- **Décisions & justifications** : `DECISIONS.md` (ADR D1–D30).
- **Architecture** : `ARCHITECTURE.md` (structure cible + conventions).
- **Design** : `design_handoff/README.md` (+ maquettes et screenshots).
- **Idées / chantiers reportés** : `FUTURE.md` (non-goals V1, à promouvoir via ADR).

## Règles de travail

- **Revue visuelle / lancement de l'app = par l'utilisateur.** C'est lui qui démarre le serveur web
  (`npm run dev`) et juge le rendu de son côté. Ne PAS tenter de lancer le dev server ni d'installer
  un navigateur/Playwright pour screenshoter ; vérifier le code via lint/typecheck/build/tests, puis
  laisser la revue visuelle à l'utilisateur.
- Toute décision structurante → l'ajouter à `DECISIONS.md`.
- Respecter les non-goals V1 ; tout ajout de périmètre se justifie contre le Principe I.
- L'éditeur d'arbre d'Atlas interactif est maquetté (écran « Créer ») mais **reste un non-goal V1**
  tant qu'aucune ADR ne le promeut.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->

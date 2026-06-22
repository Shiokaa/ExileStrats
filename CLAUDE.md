# CLAUDE.md — ExileStrats

> Primer du projet pour le dev assisté par IA. Lire ce fichier, puis interroger `graphify-out/` pour le détail.
> **Loi du projet** : `.specify/memory/constitution.md` (elle prime). **Journal ADR** : `DECISIONS.md`.
> **Référence design** : `design_handoff/` (high-fidelity, fait foi).
>
> **Précédence des sources** : la maquette `design_handoff/` a été faite **après** le plan initial.
> En cas de conflit entre une ancienne décision de plan et la maquette, **la maquette gagne** — sauf
> décision explicite postérieure consignée dans `DECISIONS.md` (ex. stack Next.js, D26).

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

- **Liquid glass** assumé : surfaces translucides (`--glass-card/panel/nav`), `backdrop-filter`
  (blur + saturate). *(Revirement : l'ancienne consigne « pas de glass » est superseded — DECISIONS.md D20.)*
- **Thèmes light + dark** de première classe ; persistance `localStorage['mapstrat-theme']` (clé
  conservée) + fallback `prefers-color-scheme`.
- **Couleur fonctionnelle** (mécanique / difficulté / action), jamais déco. Accent par mécanique =
  valeurs fixes de `design_handoff` (identiques light/dark).
- Polices : **Saira Condensed** (display/titres/chiffres) / **Hanken Grotesk** (corps).
- **Source de vérité des tokens** : `design_handoff/design_files/ExileStrats Design System.dc.html`
  (valeurs exactes : variables CSS `--text/-accent/-profit/-glass-*/-r-*/-font-*`, échelle typo
  `--text-h1…-meta`, helpers `tint()`/`mix()`, maps des 9 mécaniques / tiers S-A-B-C / difficulté
  3 niveaux, logique de thème `localStorage['mapstrat-theme']`). Le README ne fait que résumer.
- Les maquettes `design_handoff/design_files/*.dc.html` sont des **références** (runtime maison
  `support.js` à NE PAS porter) — lire structure/tokens/logique, réimplémenter proprement.

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
- **Décisions & justifications** : `DECISIONS.md` (ADR D1–D28).
- **Architecture** : `ARCHITECTURE.md` (structure cible + conventions).
- **Design** : `design_handoff/README.md` (+ maquettes et screenshots).

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

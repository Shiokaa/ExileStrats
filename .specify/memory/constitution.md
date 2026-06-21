<!--
SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Raison du bump (MINOR) : ajout du Principe IX (ton anti-hype) ; refonte du Principe VII
  (revirement design : le liquid glass est adopté, polices Saira Condensed / Hanken Grotesk),
  conformément à « design_handoff fait foi ». Migration des références docs/ → DECISIONS.md +
  graphify-out/ + design_handoff/ (le dossier docs/ est retiré).
Principes (9) :
  I.    Le plaisir et l'usage personnel d'abord (anti-over-engineering)
  II.   La fiche doit battre Discord (test produit n°1)
  III.  Séparation stricte des couches de données (NON-NÉGOCIABLE)
  IV.   Validation Zod à chaque écriture du blob
  V.    Pipeline de données séparé — échec bruyant, versionné par league
  VI.   Conformité GGG & posture non commerciale
  VII.  Identité visuelle : liquid glass, light + dark, couleur fonctionnelle  [AMENDÉ]
  VIII. Path of Exile 1 uniquement
  IX.   Ton « guide », pas « gains rapides » (anti-hype)                        [NOUVEAU]
Sections : Périmètre & non-goals (V1) ; Workflow & quality gates (Git/CI ajoutés) ; Gouvernance.
Source de vérité : graphify-out/ (contexte détaillé) + cette constitution + CLAUDE.md ;
  journal ADR = DECISIONS.md (racine) ; référence design = design_handoff/.
Templates Spec Kit revus : plan/spec/tasks — placeholders génériques, aucun conflit (pas d'édition).
Suivi : design_handoff/ couvre la vision produit large (8 écrans) ; le périmètre V1 suit toujours
  les slices (fiche d'abord). L'éditeur d'arbre d'Atlas interactif (maquette « Créer ») reste un
  non-goal V1 tant qu'aucune ADR ne le promeut.
TODO différés : aucun.
-->

# Constitution ExileStrats

> Constitution du projet **ExileStrats** — appli web perso de stratégies de mapping Path of Exile.
> Cette constitution est la loi du projet : elle prime sur toute autre pratique. Tout choix non écrit
> ici (ou dans `DECISIONS.md` / `graphify-out/`) n'est pas tranché.

## Core Principles

### I. Le plaisir et l'usage personnel d'abord (anti-over-engineering)

Le succès du projet est **« je m'amuse, j'apprends, et l'outil m'est utile à moi »** ; l'adoption de
masse est un bonus explicitement **hors objectif**.

- Toute fonctionnalité MUST se justifier par l'usage personnel de l'auteur, pas par une communauté ou
  une échelle hypothétiques.
- On MUST NOT dimensionner, abstraire ou « rendre flexible » pour une charge, un multi-utilisateur ou
  une communauté qui ne sont pas l'objectif V1.
- Devant deux solutions, on MUST choisir la plus simple qui résout le problème réel (YAGNI).

*Rationale : ADR D2. Sans cette boussole, le projet glisse vers l'over-engineering et cesse d'être un
plaisir.*

### II. La fiche doit battre Discord (test produit n°1)

Une fiche MUST être **manifestement plus lisible** qu'un message Discord bien formaté, scannable en
~5 secondes sur un second écran. C'est le critère de validation prioritaire ; si une fiche échoue à ce
test, rien d'autre ne compte.

- L'**ordre des blocs de la fiche est figé** ; l'habillage MUST NOT le réorganiser.
- Les actions principales (« Copier pour Discord », vidéo) MUST être atteignables sans scroller.
- Tout doute produit se tranche en construisant d'abord **la fiche en dur** (slice 1) avant toute
  plomberie (base, auth).

*Rationale : ADR D3/D13 ; `design_handoff/README.md` (écran « Fiche de stratégie »). L'outil est un
complément de la vidéo, pas un substitut — sa seule valeur est la lisibilité de la fiche.*

### III. Séparation stricte des couches de données (NON-NÉGOCIABLE)

Le modèle de données repose sur trois couches qu'on ne mélange jamais :

- Le **corps de la strat** MUST être un **blob JSON unique** (`content`) versionné par `schemaVersion`.
  On MUST NOT l'éclater en colonnes SQL.
- Le **relationnel** (PostgreSQL) ne porte que le **stable et le filtrable** (métadonnées, tags
  dénormalisés, visibilité, et champs de filtrage comme mécanique / league / difficulté / tier).
- Les **données de jeu** (scarabées, mécaniques, fragments, arbre d'Atlas) MUST être des **JSON
  statiques hors base, versionnés par league**. Une strat ne stocke que des **IDs + `leagueVersion`**,
  résolus à l'affichage.

*Rationale : ADR D5/D6/D8 ; contexte détaillé dans `graphify-out/`. PoE change à chaque league ; ce
découplage évite les migrations à répétition et isole l'app des changements de format GGG.*

### IV. Validation Zod à chaque écriture du blob

Le type `Json` de Prisma n'est **pas typé** : la validation applicative est le seul garde-fou de
l'intégrité du `content`.

- Toute écriture du blob `content` MUST être validée par un schéma **Zod** avant persistance.
- On MUST NOT parser les **noms d'affichage** des items pour en déduire une mécanique ou une donnée —
  utiliser exclusivement les champs structurés des données de jeu.
- Les tags (`mechanicTags`, `approachTags`) MUST provenir d'un **vocabulaire contrôlé** (listes
  fermées) pour éviter le « tag soup » et garder un filtrage fonctionnel.

*Rationale : ADR D10. Sans garde-fou, le blob dérive et le filtrage devient inutile.*

### V. Pipeline de données séparé — échec bruyant, versionné par league

L'ingestion des données de jeu est **séparée de l'app** et constitue la vraie tâche récurrente du projet.

- L'app MUST ne lire que des JSON **épurés** produits par le script d'ingestion ; jamais les sources
  upstream directement.
- Le script d'ingestion MUST **échouer bruyamment** (pas de dégradation silencieuse) et rester
  **réparable en ~30 min**.
- La `leagueVersion` est un champ **de première classe** : la league en cours est filtrée par défaut,
  les anciennes sont archivées/grisées automatiquement. Une strat obsolète présentée comme valide est
  **pire** qu'une absence de strat.

*Rationale : ADR D6 ; contexte détaillé dans `graphify-out/`. C'est par conception que le contenu
vieillit ; le système doit le rendre visible, pas le cacher.*

### VI. Conformité GGG & posture non commerciale

Le projet vit dans la zone grise tolérée des outils tiers ; il y reste par discipline.

- La mention **« This product isn't affiliated with or endorsed by Grinding Gear Games in any way. »**
  MUST être affichée, et GGG MUST être crédité visiblement.
- **Pas d'OAuth Path of Exile** en V1 : l'auth MUST passer par Supabase Auth via **Discord**.
- Tout accès à un endpoint/CDN GGG MUST utiliser un **User-Agent identifiable** et **respecter les
  rate limits** ; on MUST NOT reverse-engineer d'endpoints non documentés.
- Le projet MUST rester **non commercial** (pas de monétisation).

*Rationale : ADR D4 ; contexte détaillé dans `graphify-out/`. Le risque réaliste (cease-and-desist)
est minimisé en restant non commercial, crédité et conforme.*

### VII. Identité visuelle : liquid glass, light + dark, couleur fonctionnelle

L'habillage suit la référence canonique **`design_handoff/`** (README + maquettes high-fidelity), pas
le goût du moment ni la doc initiale.

- Les thèmes **light et dark** sont tous deux de première classe. Thème persisté dans
  `localStorage['mapstrat-theme']` (clé conservée pour compat) + fallback `prefers-color-scheme`.
- Le **liquid glass** est l'esthétique retenue : surfaces translucides (`--glass-card`, `--glass-panel`,
  `--glass-nav`) avec `backdrop-filter` (blur + saturate). C'est un **revirement assumé** : l'ancienne
  consigne « pas de glass » est superseded (ADR D20). On garde la **sobriété** (pas de surenchère de
  dégradés, pas de vert criard).
- La **couleur est fonctionnelle**, jamais décorative : elle encode la mécanique, la difficulté,
  l'action. La couleur d'accent par mécanique MUST venir de la **map canonique de `design_handoff`**
  (valeurs fixes par mécanique, identiques en light et dark).
- Polices : **Saira Condensed** (display / titres / chiffres / wordmark) / **Hanken Grotesk** (corps).

*Rationale : ADR D19/D20/D21 ; `design_handoff/README.md`. Le design a évolué depuis la doc initiale ;
le handoff high-fidelity fait foi.*

### VIII. Path of Exile 1 uniquement

Le projet cible **Path of Exile 1 exclusivement**. PoE 2 est **hors périmètre pour le moment**.

- Toutes les données de jeu, mécaniques, scarabées et le traitement de l'arbre d'Atlas MUST cibler PoE 1.
- On MUST NOT ajouter de support PoE 2, de sources de données ou d'abstractions « pour préparer » PoE 2
  sans une nouvelle décision écrite (ADR) amendant cette constitution.

*Rationale : ADR D1. PoE 1 a un moteur/API stables, une cadence de league régulière et un export
d'arbre d'Atlas officiel ; PoE 2 serait un projet distinct, pas un simple flag de configuration.*

### IX. Ton « guide », pas « gains rapides » (anti-hype)

Le différenciateur produit est un **ton sobre de guide**, jamais un site de promesses de gains.

- Le **rendement (profit/h) MUST NOT être l'élément dominant** d'une fiche ni d'une carte ; il est
  présenté en **couleur neutre** (texte), jamais en vert criard.
- Toute mise en avant du profit MUST être **équilibrée par un indicateur de difficulté** (3 niveaux)
  visible au même endroit.
- On MUST NOT employer de formulations survendues (« gains rapides », « broken », etc.).

*Rationale : ADR D22 ; `design_handoff/README.md` (note d'implémentation clé). Évite l'aspect « site
d'arnaque » et préserve la crédibilité éditoriale.*

## Périmètre & non-goals (V1)

La V1 se limite à trois capacités : **composer** (builder visuel à sélecteurs d'icônes), **rendre**
(la fiche), **partager** (lien public + « Copier pour Discord »).

`design_handoff/` couvre la **vision produit large** (accueil, fiche, tier list, hub mécanique, profil
auteur, créer, design system, logo). C'est la référence **visuelle** de toutes ces vues, mais le
**périmètre V1 suit toujours les slices** (la fiche d'abord) : avoir le design d'un écran ne le fait pas
entrer en V1.

**Langue de l'interface :** la langue d'affichage du site est l'**anglais par défaut**. Le **français**
puis d'autres langues viendront **plus tard** : l'i18n (au-delà de l'anglais) est reportée et MUST NOT
être implémentée en V1 sans décision écrite. *(Cela concerne l'UI du site uniquement ; les artefacts du
projet — constitution, DECISIONS.md, CLAUDE.md — restent en français.)*

Sont **explicitement reportés** (réactivables sans migration grâce au blob) et ne doivent pas être
implémentés en V1 sans décision écrite : OAuth PoE, profils publics, badges vérifiés, recherche avancée
par tags, favoris, **éditeur d'arbre d'Atlas interactif** (maquetté dans l'écran « Créer » mais non-goal
V1), prix live (poe.ninja), fragments dans la fiche. Map device = **jusqu'à 5 scarabées** (réglable 3–5,
5 par défaut).

Tout ajout au périmètre MUST être justifié contre le Principe I et inscrit dans `DECISIONS.md`. Le
scope creep est le risque n°1 pour un projet passion.

## Workflow & quality gates

- **Source de vérité** : `graphify-out/` (contexte détaillé interrogeable) + cette constitution +
  `CLAUDE.md` ; journal ADR = `DECISIONS.md` ; référence design = `design_handoff/`.
- **Ordre de construction** : suivre les slices (plaisir avant plomberie). Slice 1 (fiche en dur) MUST
  précéder base et auth.
- **Git** : deux branches longues — `main` (stable) et `dev` (intégration). Le travail se fait sur des
  branches `feat/*` issues de `dev`. Flux de merge : `feat/* → dev`, puis `dev → main`.
- **CI (gates)** : PR `feat/* → dev` MUST passer **lint + format + typecheck** ; PR `dev → main` MUST
  passer en plus **build Next.js + tests**. On ne pousse sur `dev`/`main` que si la pipeline est verte.
  (Voir ADR D25.)
- **Décisions** : toute décision structurante MUST être ajoutée à `DECISIONS.md` avec sa justification.
- **Gate de revue** : chaque changement doit tracer vers un besoin réel, respecter les invariants
  ci-dessus et ne pas réorganiser ce qui est figé (anatomie de fiche, ordre des blocs).

## Governance

Cette constitution prime sur toute autre pratique du projet. En cas de conflit entre une habitude de
code et un principe ici, le principe gagne.

- **Amendements** : tout changement de principe MUST être reporté dans `DECISIONS.md` (nouvelle ADR) et
  faire l'objet d'un bump de version ci-dessous.
- **Versioning sémantique de la constitution** : MAJOR = retrait/refonte d'un principe ou changement
  incompatible de gouvernance ; MINOR = ajout d'un principe ou d'une section ; PATCH =
  clarification/reformulation sans changement de sens.
- **Conformité** : toute revue (humaine ou IA) doit vérifier le respect des principes ; toute
  complexité ajoutée doit être justifiée contre le Principe I.
- **Guidance runtime** : `CLAUDE.md` (racine) sert de primer opérationnel et doit rester cohérent avec
  cette constitution.

**Version**: 1.1.0 | **Ratified**: 2026-06-21 | **Last Amended**: 2026-06-21

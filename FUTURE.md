# FUTURE — ExileStrats

> Idées et chantiers **reportés** (non-goals V1 ou améliorations futures). Rien ici n'est engagé :
> à promouvoir via une ADR dans `DECISIONS.md` le jour où on décide de le faire.

## Favoris (localStorage)

Marquer des stratégies en **favori**, stocké côté client en **`localStorage`** — **pas de lien au compte
utilisateur**, pas de table DB, pas de sync multi-appareil (assumé personnel/local).

- Implémentation pressentie : clé `localStorage['exilestrats-favorites']` = liste de slugs ; un toggle
  « ★ » sur `StrategyCard` + la fiche (composant client) ; une vue « Mes favoris » qui filtre la liste.
- Pas de DB ni de `Favorite` Prisma en V1. Un favori lié au compte (sync) = ADR ultérieure si besoin.

## Éditeur d'arbre d'Atlas interactif

Permettre de **construire / personnaliser un arbre d'Atlas cliquable directement sur le site** (plateau
de nœuds, allocation par connexité, points d'atlas), au lieu de la simple saisie niveau 0 (lien planner
ou image) actuelle.

- Statut : **non-goal V1** (constitution ; `DECISIONS.md` D8 niveau 2 « stretch », D30).
- L'écran « Créer » de `design_handoff` le maquette déjà (section atlas interactive) — référence prête.
- Pré-requis : données de nœuds d'Atlas (export officiel GGG) intégrées via le pipeline d'ingestion.

## Tier list

Classement **S/A/B/C** des stratégies (vue agrégée), avec filtres mécanique + league.

- Statut : **écartée de la V1** par choix produit (`DECISIONS.md` D31).
- Maquettée dans `design_handoff` (écran « Tier List ») — référence prête.
- Réactivable sans coût : c'est une **vue pure** sur les stratégies existantes (`tier` et
  `mechanicTags` sont déjà au modèle). Penser à remettre le lien dans la nav (header + footer).

## Page `/mechanics` — illustrations

Enrichir l'index et les hubs des mécaniques avec de **petites images / icônes** illustrant chaque
mécanique (à la place — ou en complément — de la pastille de couleur unie actuelle).

- Source d'icônes : self-héberger un set curé (cf. conformité GGG, Principe VI) ; keyer par mécanique.
- S'intègre proprement quand le **pipeline d'ingestion** fournira les assets (Principe V).

## Auth email/mot de passe (+ confirmation + reset)

Réactiver la connexion par **email/mot de passe** en plus de Discord, en version **complète**.

- Statut : **reporté** (`DECISIONS.md` D34) ; l'auth V1 reste **Discord uniquement**.
- Le **code est déjà en place mais dormant** : l'ancien `AuthForm` (onglets Sign in/Sign up, formulaire
  email, gestion « email déjà utilisé » incl. cas anti-énumération `identities: []`) est dans l'historique
  de la branche `feat/auth-discord` — à restaurer plutôt qu'à réécrire.
- **Prérequis bloquant** : un **SMTP custom** (le mailer dev de Supabase est limité à ~2 mails/h). Sans
  ça, ni email de confirmation ni reset password fiables. Pistes gratuites : **Resend** (3 000/mois, vérif
  domaine — on a `exilestrats.xyz`) ou **Brevo** (300/j, sender simple sans domaine).
- À livrer **ensemble** (sinon piège) : SMTP → réactiver « Confirm email » + provider Email côté Supabase
  → flow **reset password** (`/auth/forgot` `resetPasswordForEmail` → `/auth/callback?next=…` →
  `/auth/update-password` `updateUser({ password })`) → DMARC/SPF/DKIM pour la délivrabilité.

## Login « Sign in with Path of Exile »

Permettre de se connecter avec son **compte Path of Exile** (en plus / à la place de Discord), pour
le côté thématique « outil PoE ».

- Statut : **addition future** (`DECISIONS.md` D34) ; l'auth V1 reste **Discord** (Supabase).
- **Prérequis bloquant** : faire approuver une app OAuth par GGG — demande **manuelle** par mail à
  `oauth@grindinggear.com`, **à leur discrétion**, et ils **rejettent les demandes générées par IA**
  (→ à rédiger soi-même). Client **confidentiel**, scope minimal **`account:profile`** (renvoie
  `username` + `sub`), **PKCE**, redirect **HTTPS sur domaine possédé** (pas de localhost, même en dev →
  tunnel/preview pour développer).
- Technique : PoE n'est **pas** un provider Supabase (OAuth 2.1, pas OIDC) → **implémentation OAuth
  custom** (route handlers + échange de token + session). À cadrer le jour où l'app est approuvée.
- Réf. : https://www.pathofexile.com/developer/docs/index · https://www.pathofexile.com/developer/docs/authorization

## Vérification des données (avant toute mise en avant publique)

**Vérifier toutes les données saisies dans le projet**, en particulier les **détails de mécaniques**
(actuellement `src/features/mechanic/content.ts` : intro, « how it works », « in brief », scarabées
conseillés, passifs clés — rédigés à la main / par IA et **non vérifiés**).

- Risque : présenter de **fausses informations** PoE comme vraies → nuit à la crédibilité (le ton
  « guide » du Principe IX suppose des infos justes ; une strat fausse est pire qu'une absence de strat).
- Action : relire/corriger ce contenu contre des sources fiables (poedb, wiki, in-game) avant de
  publier les pages mécaniques. À refaire à chaque league (les mécaniques changent).
- S'applique aussi aux **données de jeu statiques** (scarabées, mécaniques) quand le pipeline
  d'ingestion sera branché (Principe V).

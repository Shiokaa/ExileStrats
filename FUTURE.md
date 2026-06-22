# FUTURE — ExileStrats

> Idées et chantiers **reportés** (non-goals V1 ou améliorations futures). Rien ici n'est engagé :
> à promouvoir via une ADR dans `DECISIONS.md` le jour où on décide de le faire.

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

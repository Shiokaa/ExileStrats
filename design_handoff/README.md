# Handoff : ExileStrats — base de stratégies de mapping (Path of Exile)

## Overview
ExileStrats est un site communautaire de **stratégies de farm/mapping** pour un ARPG (type Path of Exile), dans l'esprit de Maxroll / Mobalytics. Les joueurs parcourent des stratégies, les comparent par mécanique, ligue, rendement et difficulté, consultent une tier list, des hubs par mécanique, des profils d'auteurs, et publient leurs propres stratégies.

Principe éditorial fort (à préserver) : **ton « guide », pas « gains rapides »**. Le rendement (profit/h) n'est JAMAIS l'élément dominant d'une carte ni affiché en vert criard — il est neutre et équilibré par un indicateur de difficulté. Ce choix est délibéré pour éviter l'aspect « site d'arnaque ».

## About the Design Files
Les fichiers de `design_files/` sont des **références de design réalisées en HTML** — des prototypes qui montrent l'apparence et le comportement voulus, **pas du code de production à copier tel quel**.

Format : ce sont des **Design Components** (`*.dc.html`) propres à l'outil de design d'origine. Ils s'appuient sur un runtime (`support.js`) avec une syntaxe de template maison (`{{ … }}`, `<sc-for>`, `<sc-if>`) et une classe de logique `class Component extends DCLogic`. **Ne réutilise pas ce runtime.** Lis-les comme des maquettes : structure, styles inline, valeurs exactes, et logique JS (filtrage, état, allocation d'atlas) à réimplémenter.

La tâche : **recréer ces designs dans un vrai codebase**. Aucun environnement n'existe encore — le choix recommandé est **React + Vite + TypeScript** (ou Next.js si tu veux du SSR/routing fichier). Styling : Tailwind ou CSS Modules, peu importe, du moment que les tokens ci-dessous sont respectés.

## Fidelity
**High-fidelity.** Couleurs, typographie, espacements, rayons et interactions sont définitifs. Recrée l'UI au pixel près en utilisant les tokens documentés ci-dessous. Les deux thèmes (clair + sombre) sont à implémenter.

---

## Stack & architecture recommandées
- **React + Vite + TypeScript**, routing via React Router (ou Next App Router).
- **Thème** : `light` / `dark` stocké dans `localStorage` sous la clé `mapstrat-theme` (garde cette clé pour compat), avec fallback `prefers-color-scheme`. Expose les tokens en variables CSS sur `:root[data-theme="dark"]` etc.
- **Données** : aujourd'hui les stratégies sont des tableaux en dur dans chaque page. À terme → API. Modèle d'une stratégie :
  ```ts
  type Strategy = {
    id: string;
    title: string;
    mechanic: MechanicKey;   // 'harvest' | 'breach' | ...
    league: 'Settlers' | 'Standard';
    author: string;
    profit: number;          // divines / heure, ex. 2.4
    invest: number;          // chaos / map, ex. 12
    diff: 1 | 2 | 3;         // 1 accessible, 2 intermédiaire, 3 exigeante
    tier: 'S' | 'A' | 'B' | 'C';
    scarabs: number;
    daysSinceUpdate: number;
  };
  ```

---

## Design Tokens

### Couleurs — neutres & rôles (clair / sombre)
| Token | Rôle | Light | Dark |
|---|---|---|---|
| `--text` | Texte principal | `#15161B` | `#EEF0F5` |
| `--text-2` | Texte secondaire | `#5A5D69` | `#A8ACB8` |
| `--text-3` | Texte tertiaire / méta | `#9396A2` | `#71757F` |
| `--bg-page` | Fond de page | `#E4E8F0` | `#0B0D14` |
| `--accent` | Accent (liens, primaire) | `#2F7FE0` | `#2F7FE0` |
| `--profit` | Profit / positif | `#0F9D58` | `#34D399` |

### Couleurs de mécaniques (signature)
Identiques dans les deux thèmes. Pour les fonds de tag, on désature via une fonction `tint()` (voir plus bas).
| Mécanique | Hex |
|---|---|
| Harvest | `#2F7FE0` |
| Breach | `#7C5AE0` |
| Legion | `#C9972B` |
| Essence | `#1F9E9A` |
| Blight | `#3E9E4F` |
| Ritual | `#C0392B` |
| Expedition | `#B07B3E` |
| Ambush | `#8A5A3C` |
| Delirium | `#9AA0A8` |

### Difficulté (3 niveaux)
| Niveau | Label | Light | Dark |
|---|---|---|---|
| 1 | Accessible | `#0F9D58` | `#34D399` (= profit) |
| 2 | Intermédiaire | `#B7860B` | `#E0B341` |
| 3 | Exigeante | `#C05A36` | `#E0734F` |
Rendu : 3 barres de `20×5px` (radius 3), `n` colorées selon le niveau, le reste en `--subtle-border`.

### Tiers (badges)
| Tier | Base | Note |
|---|---|---|
| S | `#C9972B` | Meta |
| A | `#2F7FE0` | Solide |
| B | `#3E9E4F` | Confort |
| C | `#8A8E99` | Niche |
Badge : tuile `radius 14`, fond = base désaturée, gros chiffre en Saira Condensed 700 (40px) + petite note.

### Surfaces — « liquid glass »
Trois recettes translucides, posées sur des calques d'ambiance (voir Fond). `backdrop-filter` obligatoire.
| Token | Light | Dark |
|---|---|---|
| `--glass-card` bg | `rgba(255,255,255,0.58)` | `rgba(255,255,255,0.065)` |
| `--glass-card` border | `1px solid rgba(255,255,255,0.72)` | `1px solid rgba(255,255,255,0.11)` |
| `--glass-card` blur | `blur(26px) saturate(150%)` | `blur(28px) saturate(150%)` |
| `--glass-card` shadow | `inset 0 1px 0 rgba(255,255,255,0.85), 0 22px 60px -30px rgba(20,24,45,0.4)` | `inset 0 1px 0 rgba(255,255,255,0.13), 0 26px 66px -32px rgba(0,0,0,0.7)` |
| `--glass-panel` bg | `rgba(255,255,255,0.5)` | `rgba(255,255,255,0.045)` |
| `--glass-nav` bg | `rgba(255,255,255,0.62)` | `rgba(15,17,24,0.5–0.6)` |
| `--glass-nav` blur | `blur(22px) saturate(150%)` | `blur(24px) saturate(150%)` |

Utilitaires :
| Token | Light | Dark |
|---|---|---|
| `--subtle-bg` | `rgba(20,24,40,0.05)` | `rgba(255,255,255,0.08)` |
| `--subtle-border` | `rgba(20,24,40,0.08)` | `rgba(255,255,255,0.12)` |
| `--input-bg` | `rgba(255,255,255,0.7)` | `rgba(0,0,0,0.22)` |

### Fond d'ambiance (calques empilés, `position:fixed; inset:0`)
1. **lightField** (radial haut) — Light : `radial-gradient(1400px 820px at 50% -24%, rgba(255,255,255,0.95), transparent 60%)` ; Dark : `… rgba(150,180,235,0.10) …`.
2. **wash** (linéaire diagonal bleu-acier) — Light : `linear-gradient(155deg, rgba(120,148,205,0.20) 0%, rgba(150,168,210,0.08) 40%, transparent 66%)` ; Dark : `… rgba(64,92,150,0.22) …`.
3. **vignette** (radial sombre sur les bords) — utilisé sur certaines pages.
4. **grain** — SVG `feTurbulence` (baseFrequency 0.85), `opacity 0.05` (light) / `0.06` (dark), `mix-blend-mode: overlay`, tile 180px.

### Fonction `tint(base)` (fonds de tag/pastille désaturés)
```js
// mélange linéaire RGB
tint(base) = dark
  ? { bg: mix(base, '#101218', 0.82), text: mix(base, '#FFFFFF', 0.52) }
  : { bg: mix(base, '#FFFFFF', 0.86), text: mix(base, '#000000', 0.46) };
// mix(a,b,t) = interpolation composante par composante, t = poids de b
```

### Typographie
- **Display** : `Saira Condensed` (500/600/700) — titres, chiffres, badges tier, wordmark. Condensée, capitales pour le branding.
- **Body** : `Hanken Grotesk` (400/500/600/700) — corps, labels, nav.
- (Doc/handoff uniquement : `JetBrains Mono` pour les valeurs de tokens.)

Échelle :
| Usage | Famille | Taille | Poids |
|---|---|---|---|
| H1 page | Saira | 42–54px | 700 |
| H2 section | Saira | 24px | 600 |
| Titre carte | Saira | 19–21px | 600 |
| Chiffre/stat | Saira | 24–28px | 700 |
| Lead | Hanken | 16px | 400 |
| Body | Hanken | 15px | 400 |
| Label champ | Hanken | 13px | 600 |
| Méta | Hanken | 11–12px | 500 |

### Rayons
| Token | Valeur | Usage |
|---|---|---|
| `--r-pill` | `999px` | chips, boutons, nav, segmented |
| `--r-card` | `18px` | cartes de stratégie |
| `--r-panel` | `20–22px` | panneaux, sections |
| `--r-input` | `12px` | champs, boutons carrés |
| `--r-tile` | `14px` | tuiles, petites cartes |
| `--r-board` | `16px` | plateau d'atlas |

### Espacement (gaps usuels)
`8px` (chips) · `14px` (cartes) · `18px` (grille) · `24px` (padding section) · `48px` (marge contenu). Conteneur centré `max-width: 1180px`.

### Iconographie
Icônes **au trait**, `stroke-width: 2` (≈2.2 pour petites), bouts arrondis, grille 24×24, `stroke="currentColor"`, jamais de fill. Set utilisé : search, sun, moon, chevron, plus, close (x), check, info.

---

## Logo / Marque
Glyphe = **graphe ramifié** : 2 nœuds carrés en haut → 2 branches courbes convergent vers un nœud rond central → trunk vertical vers un nœud carré en bas. Tout au trait, `stroke-width ~4` sur viewBox 64.
- **App-icon** : glyphe blanc sur tuile bleue `#2F7FE0` arrondie (radius ≈ 24% de la taille), léger inset highlight en haut.
- **Variantes** : verre (glyphe accent sur surface glass), monochrome (currentColor), réversion (blanc sur sombre).
- **Wordmark** : `EXILESTRATS` en Saira Condensed 700, capitales, letter-spacing ~.015em.
- Sources fournies : `design_files/favicon.svg` (vectoriel) et `design_files/favicon.png` (512px).
- Sous 20px : retirer les liaisons, ne garder que les nœuds.
- SVG du glyphe (réutilisable tel quel) :
  ```html
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.2"
       stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 23.5 V28 Q21 34 26 34"/>
    <path d="M43 23.5 V28 Q43 34 38 34"/>
    <path d="M32 40 V44.5"/>
    <rect x="15.5" y="12.5" width="11" height="11" rx="3"/>
    <rect x="37.5" y="12.5" width="11" height="11" rx="3"/>
    <circle cx="32" cy="34" r="6"/>
    <rect x="26.5" y="44.5" width="11" height="11" rx="3"/>
  </svg>
  ```

---

## Chrome partagé (toutes les pages sauf Design System)
- **Nav** : barre flottante en pilule (`--glass-nav`), `max-width 1180`, sticky top, grille 3 colonnes (logo gauche / liens centre / actions droite). Liens : Stratégies, Mécaniques, Tier list, Guides. Actions : toggle thème (bouton rond, icône sun/moon), bouton « Connexion ». Logo = tuile bleue + glyphe + wordmark.
- **Footer** : surface `--glass-nav`, logo réduit + liens + mention « Non affilié à Grinding Gear Games. »
- **Toggle thème** : persiste dans `localStorage['mapstrat-theme']`, partagé entre toutes les pages.

---

## Screens / Views

### 1. Accueil (`ExileStrats Accueil.dc.html`)
- **But** : découvrir et filtrer les stratégies populaires.
- **Layout** : nav → hero centré (badge ligue active, H1, sous-titre, **barre de recherche** proéminente en pilule glass 56px) → rail de **filtres par mécanique** (pastilles colorées, « Toutes » + 9 mécaniques) → toolbar (compteur + **segmented ligue** Settlers/Standard/Toutes + tri Profit/Invest/Récent) → **grille de cartes 3 colonnes** → footer.
- **Carte de stratégie** (`--r-card`, glass) : barre d'accent mécanique en haut (4px), tag mécanique + date maj, titre (Saira) + auteur·ligue·scarabées, ligne **Difficulté** (label + 3 barres), pied séparé d'un trait : « Rendement estimé » (neutre, couleur texte) à gauche / « Mise / map » à droite. Hover : `translateY(-3px)`. Clic → fiche.
- **Interactions** : recherche live (titre/mécanique/auteur), filtre mécanique, filtre ligue, tri ; état « aucun résultat » avec bouton réinitialiser.

### 2. Fiche de stratégie (`ExileStrats.dc.html`)
- **But** : détail complet d'une stratégie. (Page d'origine du projet.)
- **Contenu** : hero (tag mécanique, titre, auteur), **TL;DR en 4 tuiles** : « ce qu'on farme », « Mise / map », « Rendement estimé » (neutre), « Difficulté » (barres + label) ; sections méthode/scarabées/maps ; **cartes « stratégies similaires »** (profit neutre) ; sommaire (toc). Réutilise tous les tokens ci-dessus.

### 3. Tier list (`ExileStrats Tier List.dc.html`)
- **But** : classement S/A/B/C.
- **Layout** : header (date maj, H1, intro, segmented ligue) → rail filtres mécanique → **lignes par tier** : badge tier (tuile 92px) + grille de cartes compactes 3 colonnes (tag, titre, rendement neutre, barres difficulté). Ligne vide → message. → note de **méthodologie** en bas.
- **Interactions** : filtre mécanique + ligue recomposent les lignes.

### 4. Mécanique / hub (`ExileStrats Mecanique.dc.html`)
- **But** : tout savoir sur une mécanique (ex. Harvest) + ses stratégies.
- **Layout** : fil d'ariane → hero (pastille mécanique 64px, titre, tags, intro) → grille 2 colonnes : **colonne principale** (« Comment ça marche » en 3 étapes numérotées ; grille de stratégies de la mécanique, 2 colonnes, ~8 cartes) + **sidebar** (« En bref » : risque/capital/rendement/difficulté ; « Scarabées conseillés » ; « Passifs d'atlas clés »).

### 5. Profil auteur (`ExileStrats Auteur.dc.html`)
- **But** : crédibiliser le contenu.
- **Layout** : fil d'ariane → carte profil (avatar initiales, nom, badge « Vérifié », bio, tags, boutons Suivre/Discord) → **bandeau 4 stats** (stratégies, abonnés, note, ancienneté) → grille 2 colonnes : stratégies publiées (cartes, 2 col.) + sidebar (À propos, Spécialités par mécanique).

### 6. Créer une stratégie (`ExileStrats Creer.dc.html`)
- **But** : formulaire de publication avec **aperçu live**.
- **Layout** : header → grille 2 colonnes : **formulaire** (4 sections numérotées) + **aperçu de carte en sticky** qui se met à jour en temps réel.
  - § 1 L'essentiel : titre, **sélection mécanique** (pastilles), segmented ligue, segmented difficulté.
  - § 2 Chiffres mesurés : rendement (div/h), mise (chaos) + encart anti-hype.
  - § 3 La méthode : résumé (textarea) + **étapes** ajoutables/supprimables.
  - § 4 **Arbre d'atlas interactif** : plateau (`--r-board`, 380px) avec nœuds positionnés en % et liaisons SVG. **Allocation par connexité** : un nœud n'est cliquable que s'il est relié au hub ou à un nœud déjà alloué ; désallouer **élague** les orphelins (BFS depuis le hub). États de nœud : alloué (couleur mécanique + halo `0 0 0 4px`), disponible (gris, cliquable), verrouillé (estompé, `not-allowed`). Compteur « points d'atlas » = `alloués × 2`. Les libellés des nœuds changent selon la mécanique choisie.
  - Barre d'actions : « Enregistrer le brouillon » (secondaire) + « Publier » (primaire accent).
- **Aperçu** : reproduit exactement la carte de l'accueil à partir des champs (titre, mécanique, ligue, difficulté, rendement, mise).

### 7. Design System (`ExileStrats Design System.dc.html`)
- Page de référence interne à sections navigables (sidebar : Fondations / Composants). Sert de **source de vérité visuelle** — utile pour vérifier ton implémentation. Non destinée aux utilisateurs finaux.

### 8. Logo (`ExileStrats Logo.dc.html`)
- Présentation de la marque : lockup, variantes, tailles favicon, zone de protection.

---

## Interactions & comportement (transverses)
- **Thème** : toggle global, persistant (`localStorage['mapstrat-theme']`), réagit à `prefers-color-scheme` au premier chargement.
- **Hover cartes** : `translateY(-2 à -3px)`, transition douce.
- **Filtres/segmented** : état actif = surface plus claire (`--glass-card` / `--subtle-bg`) + texte `--text` ; repos = transparent + `--text-2`.
- **Recherche** : filtrage live insensible à la casse sur titre + mécanique + auteur.
- **Tri** : profit (desc), invest (asc), récent (asc sur jours).
- **Atlas** (page Créer) : voir §6 — graphe + BFS de connexité, à réimplémenter fidèlement.
- **Responsive** : prototypes pensés desktop (max-width 1180). Prévoir l'adaptation mobile (grilles 3→1 colonne, nav repliée) — non spécifié dans les maquettes, à designer selon le codebase.

## State management
Local par page suffit au départ :
- `theme`, `query`, `mechanic`, `league`, `sort` (accueil) ;
- `mechanic`, `league` (tier list) ;
- formulaire Créer : `title, mechanic, league, diff, profit, invest, summary, steps[], atlas[]` (+ helpers d'allocation).
À terme : remonter les données stratégies vers une API / un store.

## Assets
- `favicon.svg`, `favicon.png` (logo, fournis dans `design_files/`).
- Polices : Google Fonts (Hanken Grotesk, Saira Condensed). Aucune image externe — tout est CSS/SVG. Le grain est un SVG inline (`feTurbulence`).
- Pas d'assets de marque tiers ; mention légale « Non affilié à Grinding Gear Games » à conserver.

## Files (dans `design_files/`)
| Fichier | Écran |
|---|---|
| `ExileStrats Accueil.dc.html` | Accueil / liste |
| `ExileStrats.dc.html` | Fiche de stratégie |
| `ExileStrats Tier List.dc.html` | Tier list |
| `ExileStrats Mecanique.dc.html` | Hub mécanique |
| `ExileStrats Auteur.dc.html` | Profil auteur |
| `ExileStrats Creer.dc.html` | Créer (form + atlas) |
| `ExileStrats Design System.dc.html` | Design system (référence) |
| `ExileStrats Logo.dc.html` | Marque / logo |
| `support.js` | Runtime de l'outil d'origine — **référence seulement, ne pas porter** |
| `favicon.svg` / `favicon.png` | Logo |

Captures dans `screenshots/` (dark pour toutes ; accueil aussi en light ; design system : couleurs + composants).

## Note d'implémentation clé
Le différenciateur produit est le **ton anti-arnaque** : ne remets jamais le profit en avant comme une promesse de gains. Profit = donnée neutre, toujours accompagnée de la difficulté. Garde la sobriété du liquid glass (pas de surenchère de dégradés ni de vert criard).

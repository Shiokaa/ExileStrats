# ARCHITECTURE — ExileStrats

> Architecture cible du projet (Next.js 16, App Router, TypeScript). **Feature-based + server-first.**
> Décision : `DECISIONS.md` D28. On pose la structure et les conventions tôt ; on **branche le backend
> à la demande** (Prisma/Supabase allumés quand un slice les exige, pas avant).

## Principes directeurs

1. **Server-first.** Tout est Server Component par défaut. `'use client'` est réservé aux **feuilles**
   interactives (état local, event handlers, API navigateur), au plus près du besoin. On ne passe
   jamais une page entière en client.
2. **Feature-based.** Le code d'un domaine métier vit ensemble dans `src/features/<feature>/`
   (composants, données, schémas, types colocalisés). Le partagé transverse va dans `src/components`,
   `src/lib`, `src/server`.
3. **Frontières serveur explicites.** Un module qui ne doit jamais partir au navigateur importe
   `import 'server-only'` en tête. ⚠️ **`'use server'` ≠ `server-only`** : `'use server'` déclare un
   module de **Server Actions** (chaque export devient un endpoint RPC appelable depuis le client) —
   à n'utiliser que pour de vraies actions, jamais sur un DAL.
4. **Zod = source de vérité.** Les schémas Zod définissent la forme ; les types TS en sont **inférés**
   (`z.infer`). Le blob `content` est validé à chaque écriture et versionné par `schemaVersion` via
   `z.discriminatedUnion('schemaVersion', [...])`.
5. **Mutations = Server Actions** (`src/features/*/actions.ts`). Les **Route Handlers** (`app/api/`)
   sont réservés aux webhooks, uploads, et intégrations externes — pas aux mutations de l'app.
6. **Pas de barrel files** (`index.ts` de ré-export) dans les chemins chauds (`components`, `features`) :
   ça casse le tree-shaking et alourdit le first-load JS. Import direct via l'alias `@/`.

## Arborescence cible

```text
src/
├── app/                          # Routing only — pages fines qui délèguent aux features
│   ├── layout.tsx                # Root layout : providers + chrome (Header/Footer)
│   ├── page.tsx                  # Accueil
│   ├── globals.css               # Design tokens (variables CSS) + base
│   ├── error.tsx                 # Error boundary global
│   ├── not-found.tsx             # 404 global
│   ├── api/                      # Route Handlers : webhooks / upload / externe uniquement
│   └── auth/                     # Flows Supabase (callback, logout) — quand l'auth arrive
│
├── components/                   # UI transverse, SANS logique métier
│   ├── ui/                       # Atomes/molécules génériques (Button, Pill, Segmented…)
│   └── layout/                   # Chrome : Header, Footer, ThemeToggle, AmbientBackground, Logo
│
├── features/                     # Modules métier (colocalisés)
│   └── strategy/
│       ├── components/           # StrategyCard, Fiche, filtres…
│       ├── data.ts               # Échantillons en dur aujourd'hui → DAL plus tard
│       ├── schema.ts             # Schémas Zod du domaine (content versionné)
│       ├── types.ts              # Types inférés / partagés du domaine
│       └── actions.ts            # Server Actions (quand la persistance arrive)
│
├── lib/                          # Helpers transverses, framework-agnostic
│   ├── env.ts                    # Variables d'env typées (@t3-oss/env-nextjs)
│   ├── design.ts                 # Constantes design dérivées (si besoin)
│   └── utils.ts                  # Petits utilitaires purs
│
├── data/
│   └── game/                     # Données de jeu STATIQUES, versionnées par league (hors base)
│       └── leagues/<league>/     # mechanics, scarabs, atlas… (IDs résolus à l'affichage)
│
└── server/                       # Infra SERVER-ONLY (stubs tant que non branché)
    ├── db/                       # Singleton Prisma (plus tard)
    └── auth/                     # Clients Supabase serveur/navigateur + session (plus tard)
```

> Les dossiers `server/`, `features/*/actions.ts`, `app/api`, `app/auth` sont **documentés ici** mais
> ne sont créés que lorsqu'un slice les active (pas de plomberie morte — Principe I).

## Couche données (quand elle sera branchée)

- **Singleton Prisma** dans `server/db/prisma.ts` (évite l'épuisement de connexions en hot-reload et
  en serverless).
- **DAL** par feature (`features/<f>/queries.ts`, `import 'server-only'`) : point d'accès unique à la
  base, **validation Zod en entrée ET en sortie** (le type `Json` de Prisma n'est pas typé).
- **Server Actions** (`features/<f>/actions.ts`, `'use server'`) : appellent le DAL, gèrent
  `revalidatePath`/`redirect`, renvoient un résultat sérialisable.

## Conventions

- **Nommage fichiers** : kebab-case (`strategy-card.tsx`, `theme-toggle.tsx`). Composant exporté en
  PascalCase.
- **Alias d'import** : `@/*` → `src/*`. Jamais de `../../../`.
- **Client/serveur** : un fichier `'use client'` est une feuille ; il reçoit les données déjà résolues
  en props depuis un Server Component parent.
- **Styles** : **Tailwind v4** (DECISIONS.md D29). Tokens du design system = variables CSS par thème
  dans `globals.css`, exposées via `@theme inline` → utilities thème-aware (`text-fg`, `bg-page`,
  `rounded-card`, `font-display`…). Primitives multi-propriétés (glass, `tint()` via `mech-tint`,
  ambient, `.btn`) = `@utility`/`@layer components`. Pas de CSS Modules. Source de vérité des tokens :
  `design_handoff/`.
- **Tests** : Vitest, colocalisés (`*.test.ts(x)` à côté du fichier testé).
- **Env** : tout accès à `process.env` passe par `lib/env.ts` (validé Zod, séparation client/serveur).
- **Erreurs** : `notFound()` pour les 404 ; `error.tsx` par segment pour les erreurs runtime.

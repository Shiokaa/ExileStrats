import type { MechanicKey } from '@/data/game/mechanics';

export interface HowItWorksStep {
  title: string;
  body: string;
}

export interface SidebarFact {
  label: string;
  value: string;
}

export interface RecommendedScarab {
  name: string;
  effect: string;
}

export interface MechanicContent {
  intro: string;
  tags: string[];
  howItWorks: HowItWorksStep[];
  inBrief: SidebarFact[];
  scarabs: RecommendedScarab[];
  keyPassives: string[];
}

const DEFAULT: MechanicContent = {
  intro:
    'This mechanic adds optional encounters to your maps, rewarding players who engage with the league content.',
  tags: ['Encounter', 'Currency'],
  howItWorks: [
    {
      title: 'Find the encounter',
      body: 'The encounter spawns inside your map. Look for its distinctive visual or sound cue.',
    },
    {
      title: 'Engage and complete',
      body: 'Defeat the enemies or fulfil the mechanic objective to unlock the reward.',
    },
    {
      title: 'Collect your rewards',
      body: 'Pick up the league-specific currency or items and repeat across maps.',
    },
  ],
  inBrief: [
    { label: 'Risk', value: 'Moderate' },
    { label: 'Capital', value: '≈ 10c' },
    { label: 'Return', value: '≈ 1–2 div / h' },
    { label: 'Difficulty', value: 'Intermediate' },
  ],
  scarabs: [
    { name: 'Scarab of Quantity', effect: 'Increases the quantity of items found.' },
    { name: 'Scarab of Rarity', effect: 'Increases the rarity of items found.' },
  ],
  keyPassives: ['Wandering Path', 'Shaping the Valleys', 'Singular Focus'],
};

const CONTENT: Partial<Record<MechanicKey, MechanicContent>> = {
  harvest: {
    intro:
      'Harvest spawns a Sacred Grove where you harvest Lifeforce by killing coloured plants. Lifeforce is either sold directly or used for deterministic crafting — a stable mechanic with low risk and strong atlas scaling.',
    tags: ['Lifeforce', 'Crafting', 'Low risk'],
    howItWorks: [
      {
        title: 'Find the Sacred Grove',
        body: 'A Sacred Grove spawns in the map. Interact with the Seed Cache to begin the harvest.',
      },
      {
        title: 'Harvest the Lifeforce',
        body: 'Kill the yellow, blue, and purple plants. Each colour yields a different type of Lifeforce.',
      },
      {
        title: 'Craft or sell',
        body: 'Use Lifeforce for deterministic crafting, or sell it in bulk to other players via trade.',
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'Low' },
      { label: 'Capital', value: '≈ 12c / map' },
      { label: 'Return', value: '≈ 2–4 div / h' },
      { label: 'Difficulty', value: 'Intermediate' },
    ],
    scarabs: [
      { name: 'Horticrafting Scarab', effect: 'Adds a second Sacred Grove to the area.' },
      { name: 'Scarab of Ripening', effect: 'Lifeforce gained in the area is doubled.' },
      { name: 'Scarab of Doubling', effect: 'Chance to double Lifeforce of one colour type.' },
    ],
    keyPassives: [
      'Heart of the Grove',
      'Call of the Brotherhood',
      'Abundant Harvest',
      'Bountiful Harvest',
    ],
  },

  breach: {
    intro:
      'Breach tears open portals to another dimension, flooding the map with dense monsters and Splinters. High monster density makes Breach one of the best scarab-stacking mechanics for raw currency per hour.',
    tags: ['Splinters', 'Monster density', 'Scalable'],
    howItWorks: [
      {
        title: 'Activate the Breach',
        body: 'Step into the glowing circle to open a Breach. The portal expands as you kill monsters inside.',
      },
      {
        title: 'Maximise kills',
        body: 'Stay in the Breach and kill as fast as possible — the hand closes if you stop dealing damage.',
      },
      {
        title: 'Collect Splinters',
        body: 'Pick up Breach Splinters. Combine 100 to open a Breachstone for a dedicated Breach zone.',
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'Medium' },
      { label: 'Capital', value: '≈ 20–30c / map' },
      { label: 'Return', value: '≈ 2–3 div / h' },
      { label: 'Difficulty', value: 'Intermediate' },
    ],
    scarabs: [
      { name: 'Breach Scarab', effect: 'Adds an additional Breach to the area.' },
      { name: 'Breach Scarab of Rifts', effect: 'Breaches in the area contain more monsters.' },
      { name: 'Breach Scarab of Haemorrhage', effect: 'Breaches contain more Clasped Hands.' },
    ],
    keyPassives: [
      "Breachlord's Medallion",
      'Blessings of the Breach',
      'Rituals of the Vaal',
      'Intrusion',
    ],
  },

  legion: {
    intro:
      'Legion freezes two armies mid-battle. Break enemies free from the freeze by dealing damage, then defeat them before the timer expires. Generals drop Emblems which can be combined for top-tier endgame content.',
    tags: ['Emblems', 'Incubators', 'Frozen armies'],
    howItWorks: [
      {
        title: 'Find the monolith',
        body: 'Interact with the Legion Monolith to freeze the two armies in place.',
      },
      {
        title: 'Free and kill',
        body: 'Attack frozen soldiers to free them, then kill them before the timer runs out. Prioritise Generals and rare soldiers.',
      },
      {
        title: 'Collect Emblems',
        body: 'Generals drop Timeless Emblems. Combine five matching Emblems to open the Domain of Timeless Conflict.',
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'Low' },
      { label: 'Capital', value: '≈ 14c / map' },
      { label: 'Return', value: '≈ 1.5–2.5 div / h' },
      { label: 'Difficulty', value: 'Intermediate' },
    ],
    scarabs: [
      { name: 'Legion Scarab', effect: 'Adds an additional Legion encounter to the area.' },
      { name: 'Legion Scarab of Enduring', effect: 'Legion encounters in the area last longer.' },
      {
        name: 'Legion Scarab of Officers',
        effect: 'Legion encounters contain more rare soldiers.',
      },
    ],
    keyPassives: ['Monumental', 'War Supplies', 'Veteran Soldier', 'Time-Lost Warrior'],
  },

  essence: {
    intro:
      'Essence imprisons monsters in place, granting guaranteed modifiers when released. Budget-friendly and consistent, Essences are ideal for crafting specific affixes or selling raw.',
    tags: ['Crafting', 'Budget-friendly', 'Guaranteed mods'],
    howItWorks: [
      {
        title: 'Find an imprisoned monster',
        body: 'Essence encounters spawn as crystalised monsters on the ground. Approach to reveal the Essence type.',
      },
      {
        title: 'Release and kill',
        body: 'Click the monster to release it. Defeat it — it will be tougher than normal monsters.',
      },
      {
        title: 'Craft or sell',
        body: 'Apply the Essence to a base item to guarantee its modifier, or sell high-tier Essences directly.',
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'Very low' },
      { label: 'Capital', value: '≈ 4–10c / map' },
      { label: 'Return', value: '≈ 1–2 div / h' },
      { label: 'Difficulty', value: 'Accessible' },
    ],
    scarabs: [
      { name: 'Essence Scarab', effect: 'Adds additional Essence encounters to the area.' },
      { name: 'Essence Scarab of Ascent', effect: 'Essences are upgraded to the next tier.' },
      { name: 'Essence Scarab of Prominence', effect: 'Imprisoned monsters have more Essences.' },
    ],
    keyPassives: [
      'Essence Glutton',
      'Crystallised Omniscience',
      'Remnants of the Past',
      'Essence Extraction',
    ],
  },

  blight: {
    intro:
      'Blight is a tower-defence mechanic: pump out oils while waves of monsters rush your pump. Oils anoint rings and amulets with atlas passives or are sold in bulk — a passive-income mechanic with low execution stress.',
    tags: ['Oils', 'Tower defence', 'Anointing'],
    howItWorks: [
      {
        title: 'Activate the pump',
        body: 'Find the Blight pump and interact with it to begin the encounter. Place towers along the lanes.',
      },
      {
        title: 'Defend the pump',
        body: 'Use towers to slow and kill the monster waves. Prioritise choke points to maximise tower coverage.',
      },
      {
        title: 'Collect oils',
        body: 'At the end of the encounter gather the oils dropped. Sell in bulk or use to anoint gear and passives.',
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'Low' },
      { label: 'Capital', value: '≈ 8–12c / map' },
      { label: 'Return', value: '≈ 1.5–2.5 div / h' },
      { label: 'Difficulty', value: 'Intermediate' },
    ],
    scarabs: [
      { name: 'Blight Scarab', effect: 'Adds an additional Blight encounter to the area.' },
      {
        name: 'Blight Scarab of Blooming',
        effect: 'Blight encounters in the area spawn more lanes.',
      },
      { name: 'Blight Scarab of Oils', effect: 'Blight encounters drop additional oils.' },
    ],
    keyPassives: ['Spores', 'The Spreader', 'Fungal Canker', 'Blighted Growth'],
  },

  ritual: {
    intro:
      'Ritual sacrifices monster corpses on an altar for tribute currency, which buys exclusive league items. The rotating shop makes Ritual high-variance but occasionally very valuable.',
    tags: ['Tribute', 'Unique items', 'High variance'],
    howItWorks: [
      {
        title: 'Activate rituals',
        body: 'Find the blood altars in your map and complete all four ritual encounters, killing the spawned monsters.',
      },
      {
        title: 'Spend tribute',
        body: 'After completing encounters a shop opens. Spend tribute on rare, unique or atlas-passives items on offer.',
      },
      {
        title: 'Reroll or skip',
        body: 'If nothing is valuable, reroll the shop for more tribute, or skip to bank the remainder for later maps.',
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'Low–Medium' },
      { label: 'Capital', value: '≈ 14–18c / map' },
      { label: 'Return', value: '≈ 1.5–2.5 div / h' },
      { label: 'Difficulty', value: 'Intermediate' },
    ],
    scarabs: [
      { name: 'Ritual Scarab', effect: 'Adds additional Ritual encounters to the area.' },
      {
        name: 'Ritual Scarab of Recognition',
        effect: 'Ritual shops offer more options to choose from.',
      },
      {
        name: 'Ritual Scarab of Selectiveness',
        effect: 'Tribute costs less when purchasing from Rituals.',
      },
    ],
    keyPassives: ['Ritual Mastery', 'A Firm Foothold', 'Blood and Pageantry', 'Ancient Traditions'],
  },

  expedition: {
    intro:
      'Expedition detonates explosives to unearth chests and remnants from ancient Kalguuran ruins. Remnants apply modifiers (positive and negative) to nearby chests — reading them before placing charges is key.',
    tags: ['Logbooks', 'Artifacts', 'Detonation'],
    howItWorks: [
      {
        title: 'Plan your detonation',
        body: 'Inspect Remnants before placing charges — they apply buffs and debuffs to nearby excavated chests.',
      },
      {
        title: 'Detonate the chain',
        body: 'Place charges in a line or chain and detonate. Each charge must be adjacent to the previous explosion.',
      },
      {
        title: 'Deal with Kalguurans',
        body: 'Vendors Tujen, Gwennen, Rog and Dannig each offer different currency-to-artifact exchanges. Pick the best deal.',
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'Low' },
      { label: 'Capital', value: '≈ 6–20c / map' },
      { label: 'Return', value: '≈ 1.5–3 div / h' },
      { label: 'Difficulty', value: 'Intermediate' },
    ],
    scarabs: [
      { name: 'Expedition Scarab', effect: 'Adds an additional Expedition encounter to the area.' },
      { name: 'Expedition Scarab of Relics', effect: 'Expedition chests contain more Artifacts.' },
      {
        name: 'Expedition Scarab of Runefinding',
        effect: 'Expedition encounters have more Remnants.',
      },
    ],
    keyPassives: ['Dead Reckoning', 'Kalguuran Heritage', 'Scouting Runes', 'Expedition Expert'],
  },

  ambush: {
    intro:
      'Ambush adds Strongboxes to maps — magic chests that fight back when opened. Scarabs and passives stack extra chests and special modifiers for straightforward, budget-accessible currency farming.',
    tags: ['Strongboxes', 'Budget', 'Easy scaling'],
    howItWorks: [
      {
        title: 'Find Strongboxes',
        body: 'Strongboxes spawn around the map. Clear the area before opening to avoid being overwhelmed.',
      },
      {
        title: 'Open and survive',
        body: "Opening a Strongbox releases a pack of monsters. Kill them to receive the box's loot.",
      },
      {
        title: 'Target high-value types',
        body: "Diviner's, Arcanist's, and Cartographer's boxes tend to yield the best returns.",
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'Very low' },
      { label: 'Capital', value: '≈ 5–8c / map' },
      { label: 'Return', value: '≈ 1–1.5 div / h' },
      { label: 'Difficulty', value: 'Accessible' },
    ],
    scarabs: [
      { name: 'Ambush Scarab', effect: 'Adds additional Strongboxes to the area.' },
      {
        name: 'Ambush Scarab of Containment',
        effect: 'Strongboxes are guarded by additional monsters.',
      },
      {
        name: 'Ambush Scarab of Discernment',
        effect: 'Strongboxes have a chance to contain better items.',
      },
    ],
    keyPassives: ['Lockpicking', 'Sealed Fate', 'Surprise Attack', 'Hidden Cache'],
  },

  delirium: {
    intro:
      'Delirium engulfs the map in fog that increases difficulty and rewards as you push deeper. Simulacrum Splinters combine into the high-end Simulacrum encounter — one of the most rewarding but demanding mechanics in the game.',
    tags: ['Simulacrum', 'Cluster jewels', 'High risk'],
    howItWorks: [
      {
        title: 'Activate the mirror',
        body: 'Find the Delirium mirror and interact with it to begin. The fog spreads through the map.',
      },
      {
        title: 'Push as deep as possible',
        body: 'Stay in the fog and keep killing. Rewards scale with distance from the mirror — the further you go, the better the loot.',
      },
      {
        title: 'Collect Splinters',
        body: 'Pick up Simulacrum Splinters. Combine 300 to open a Simulacrum encounter for top-tier cluster jewels.',
      },
    ],
    inBrief: [
      { label: 'Risk', value: 'High' },
      { label: 'Capital', value: '≈ 30–40c / map' },
      { label: 'Return', value: '≈ 3–5 div / h' },
      { label: 'Difficulty', value: 'Demanding' },
    ],
    scarabs: [
      { name: 'Delirium Scarab', effect: 'Adds an additional Delirium encounter to the area.' },
      {
        name: 'Delirium Scarab of the Foreboding',
        effect: 'Delirium in the area is more rewarding at greater depth.',
      },
      {
        name: 'Delirium Scarab of Neuroses',
        effect: 'Delirium fog spreads further through the area.',
      },
    ],
    keyPassives: ['Unnatural Calm', 'Fearsome Force', 'Grand Design', 'Delirious in the Fog'],
  },
};

export function getMechanicContent(key: MechanicKey): MechanicContent {
  return CONTENT[key] ?? DEFAULT;
}

/** Static game data — leagues the app knows about (current first). */
export const LEAGUES = ['Settlers', 'Standard'] as const;

export type League = (typeof LEAGUES)[number];

/** The league filtered by default on listings (Principe V: current league is first-class). */
export const CURRENT_LEAGUE: League = 'Settlers';

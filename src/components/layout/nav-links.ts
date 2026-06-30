/** Primary navigation links, shared by the header and footer. */
export type NavLink = { href: string; label: string };

export const NAV_LINKS: readonly NavLink[] = [
  { href: '/', label: 'Strategies' },
  { href: '/mechanics', label: 'Mechanics' },
];

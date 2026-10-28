const paths = {
  search: <><circle cx="10.8" cy="10.8" r="7.3" /><path d="m16.2 16.2 5 5" /></>,
  cart: <><path d="M2 3h3l2.5 12.2h11.2L21 7H6" /><path d="M8.2 11h10.9" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></>,
  heart: <path d="M20.8 4.9a5.4 5.4 0 0 0-7.6 0L12 6.1l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.5a5.4 5.4 0 0 0 0-7.6Z" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  down: <path d="m6 9 6 6 6-6" />,
  right: <path d="m9 6 6 6-6 6" />,
  left: <path d="m15 6-6 6 6 6" />,
  menu: <path d="M4 5h16M4 12h16M4 19h16" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  home: <path d="M3 11 12 3l9 8v10h-6v-6H9v6H3V11Z" />,
  phone: <path d="m6 3 4 4-2 3c2 4 4 6 7 7l3-2 4 4c-1 4-4 4-7 3C7 19 2 12 2 7c0-3 2-4 4-4Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  truck: <><path d="M1 5h13v12H1V5Zm13 4h4l4 4v4h-8" /><circle cx="5" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
  box: <><path d="m3 7 9-4 9 4v11l-9 4-9-4V7Zm0 0 9 4 9-4M12 11v11M7 5l10 4" /></>,
  shield: <><path d="m12 2 9 4v6c0 5-6 9-9 10-3-1-9-5-9-10V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
  tag: <><path d="M3 3h9l10 10-9 9L3 12V3Z" /><circle cx="8" cy="8" r="1" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  trash: <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" />,
  filter: <path d="M3 5h18M6 12h12M10 19h4" />,
  check: <path d="m5 12 5 5 9-10" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>,
} as const;

// Category and service icons from the allshop design (28×28 grid).
const wide = {
  shelves: <path d="M4 3h20v5H4zM4 12h20v5H4zM4 21h20v4H4zM7 8v4m14-4v4M7 17v4m14-4v4" />,
  warehouse: <path d="M5 2v24M23 2v24M5 8h18M5 16h18M5 24h18M7 3h6v5H7zM15 10h6v6h-6zM7 18h7v6H7z" />,
  fridge: <><rect x="6" y="2" width="16" height="24" rx="1.5" /><path d="M6 11h16M10 5v3m0 6v5" /></>,
  checkout: <path d="M3 12h22v13H3zM2 12V9h24v3M9 9V3h8v6m-4-6v6M20 9V6h3v3" />,
  basket: <path d="M2 10h24l-3 15H5L2 10Zm6 0 4-8m8 8-4-8M9 14l1 7m9-7-1 7m-4-7v7" />,
  headset: <path d="M4 16v-4a10 10 0 0 1 20 0v4M5 14H2v9h6v-9H5Zm18 0h3v9h-6v-9h3Zm0 9c0 3-3 3-7 3" />,
  delivery: <><path d="M2 5h15v17H2zM17 11h6l3 5v6h-9M20 11v6h6" /><circle cx="7" cy="23" r="3" /><circle cx="22" cy="23" r="3" /></>,
  tools: <path d="m16 4 4 4 5-5a7 7 0 0 1-9 9L6 25a3 3 0 0 1-4-4L15 11a7 7 0 0 1 1-7Z" />,
  warranty: <><path d="M14 2 24 6v7c0 6.5-4.5 11-10 13C8.5 24 4 19.5 4 13V6l10-4Z" /><path d="m9.5 14 3.2 3.2 6-6.4" /></>,
  trolley: <><path d="M3 4h3.5l2.9 14.2h13L25 8.2H7" /><path d="M9.6 12.8h12.7" /><circle cx="10.5" cy="23.3" r="1.75" /><circle cx="21" cy="23.3" r="1.75" /></>,
} as const;

export type WideIconName = keyof typeof wide;

export function WideIcon({ name, className }: { name: WideIconName; className?: string }) {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className={className ? `icon ${className}` : "icon"}>
      {wide[name]}
    </svg>
  );
}

/** Picks a design icon for a category by its name; shelves when nothing matches. */
export function categoryIcon(name: string): WideIconName {
  if (/საწყობ|სტელაჟ/.test(name)) return "warehouse";
  if (/ურიკ|კალათ/.test(name)) return "trolley";
  if (/მაცივ|საყინულ|სამაცივრ/.test(name)) return "fridge";
  if (/სალარო|POS|სასწორ/.test(name)) return "checkout";
  if (/აქსესუარ/.test(name)) return "basket";
  return "shelves";
}

export type IconName = keyof typeof paths;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ? `icon ${className}` : "icon"}>
      {paths[name]}
    </svg>
  );
}

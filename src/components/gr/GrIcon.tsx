// Line icons of the Golden Rose design (24×24 grid, 1.5 stroke), copied from its static HTML.
const paths = {
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.7" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  heart: <path d="M20.5 4.7a5.4 5.4 0 0 0-7.6 0L12 5.6l-.9-.9a5.4 5.4 0 0 0-7.6 7.6L12 21l8.5-8.7a5.4 5.4 0 0 0 0-7.6Z" />,
  basket: (
    <>
      <path d="M2.5 3.5H5l3 12h11l2-8H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </>
  ),
  prev: <path d="m14 5-7 7 7 7" />,
  next: <path d="m9 5 7 7-7 7" />,
  arrow: <path d="M3 12h18m-6-6 6 6-6 6" />,
  play: <path d="m9 5 11 7-11 7V5Z" />,
  up: <path d="m6 14 6-6 6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export type GrIconName = keyof typeof paths;

export function GrIcon({ name, size = 22 }: { name: GrIconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20.4 3.6a11 11 0 0 0-17.2 13L1.8 22l5.5-1.4A11 11 0 0 0 20.4 3.6Z" />
      <path d="M8 6.5c-2 .5-1 6 3.5 8.5 4 2.2 6.4.2 5.5-1.3l-2.6-1.2-1.2 1.2c-2.2-.9-3.3-2-4.1-3.8l1.2-1.3L9 6.5Z" />
    </svg>
  );
}

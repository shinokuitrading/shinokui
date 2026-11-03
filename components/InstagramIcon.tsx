export function InstagramIcon({ idPrefix = "instagram" }: { idPrefix?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${idPrefix}-gradient`} x1="8" y1="56" x2="56" y2="8">
          <stop stopColor="#FFD600" />
          <stop offset="0.45" stopColor="#FF0169" />
          <stop offset="1" stopColor="#D300C5" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${idPrefix}-gradient)`} />
      <rect x="15" y="15" width="34" height="34" rx="10" stroke="white" strokeWidth="4" />
      <circle cx="32" cy="32" r="8" stroke="white" strokeWidth="4" />
      <circle cx="44" cy="20" r="2.5" fill="white" />
    </svg>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(20rem,100%)] sm:max-w-[28rem] lg:max-w-[32rem]">
      <div className="surface-card absolute inset-[8%] rounded-[2rem]" />

      <svg
        viewBox="0 0 400 400"
        className="relative z-10 h-full w-full"
        role="img"
        aria-label="Abstract gold network visualization for Gold Mans Supply Corporation"
      >
        <defs>
          <radialGradient id="orb" cx="34%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f7edd4" />
            <stop offset="42%" stopColor="#d4b56a" />
            <stop offset="100%" stopColor="#8d6b24" />
          </radialGradient>
          <linearGradient id="glass-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#c4a35a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g className="orbit-slow">
          <ellipse
            cx="200"
            cy="200"
            rx="132"
            ry="50"
            fill="none"
            stroke="url(#glass-ring)"
            strokeWidth="1.2"
            transform="rotate(-18 200 200)"
          />
        </g>
        <g className="orbit-slower">
          <ellipse
            cx="200"
            cy="200"
            rx="104"
            ry="150"
            fill="none"
            stroke="#c4a35a"
            strokeOpacity="0.28"
            strokeWidth="1"
            transform="rotate(22 200 200)"
          />
        </g>

        <circle
          cx="200"
          cy="200"
          r="70"
          fill="url(#orb)"
          className="float-y"
        />
        <circle cx="200" cy="200" r="70" fill="#fff" fillOpacity="0.12" />
        <circle cx="176" cy="176" r="16" fill="#fff" fillOpacity="0.32" />

        <g stroke="#c4a35a" strokeOpacity="0.45" strokeWidth="0.9">
          <line x1="200" y1="200" x2="86" y2="118" />
          <line x1="200" y1="200" x2="318" y2="96" />
          <line x1="200" y1="200" x2="328" y2="252" />
          <line x1="200" y1="200" x2="84" y2="274" />
        </g>
        <g fill="#8d6b24">
          <circle cx="86" cy="118" r="3.4" />
          <circle cx="318" cy="96" r="3.4" />
          <circle cx="328" cy="252" r="3.4" />
          <circle cx="84" cy="274" r="3.4" />
        </g>

        <g className="float-y">
          <rect
            x="258"
            y="148"
            width="84"
            height="56"
            rx="14"
            fill="#ffffff"
            fillOpacity="0.38"
            stroke="#ffffff"
            strokeOpacity="0.7"
          />
          <rect x="272" y="164" width="36" height="4" rx="2" fill="#8d6b24" fillOpacity="0.7" />
          <rect x="272" y="174" width="54" height="3" rx="1.5" fill="#c4a35a" fillOpacity="0.35" />
          <rect x="272" y="182" width="44" height="3" rx="1.5" fill="#c4a35a" fillOpacity="0.22" />
        </g>
      </svg>
    </div>
  );
}

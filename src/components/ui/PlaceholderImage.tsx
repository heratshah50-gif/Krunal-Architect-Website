const GRADIENTS = [
  ["#200000", "#4a1414"],
  ["#35090a", "#632222"],
  ["#120000", "#35090a"],
  ["#4a1414", "#200000"],
  ["#632222", "#120000"],
  ["#200000", "#35090a"],
];

/**
 * Abstract architectural line-art used in place of real project photography
 * until the client supplies photos. Deterministic per `variant` so the same
 * project always renders the same mark.
 */
function LineArt({ variant }: { variant: number }) {
  const v = variant % 6;
  const stroke = "rgba(222, 167, 46, 0.55)";
  const faint = "rgba(222, 167, 46, 0.22)";

  switch (v) {
    case 1:
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none">
          <path d="M60 260 L60 140 L160 80 L260 140 L260 260" />
          <path d="M60 260 L260 260" />
          <path d="M110 260 L110 190 L150 190 L150 260" />
          <path d="M60 140 L260 140" stroke={faint} />
          <path d="M170 260 L170 210 L240 210 L240 260" stroke={faint} />
        </g>
      );
    case 2:
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none">
          <rect x="70" y="90" width="180" height="170" />
          <path d="M70 140 L250 140 M70 190 L250 190 M70 230 L250 230" stroke={faint} />
          <path d="M120 90 L120 260 M170 90 L170 260" stroke={faint} />
          <path d="M70 90 L160 40 L250 90" />
        </g>
      );
    case 3:
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none">
          <path d="M50 260 L50 120 L110 120 L110 260" />
          <path d="M130 260 L130 80 L190 80 L190 260" />
          <path d="M210 260 L210 150 L270 150 L270 260" />
          <path d="M50 260 L270 260" />
          <path d="M60 150 L100 150 M60 190 L100 190" stroke={faint} />
          <path d="M140 120 L180 120 M140 160 L180 160 M140 200 L180 200" stroke={faint} />
        </g>
      );
    case 4:
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none">
          <circle cx="160" cy="170" r="90" stroke={faint} />
          <path d="M90 220 L90 150 L160 100 L230 150 L230 220 Z" />
          <path d="M140 220 L140 175 L180 175 L180 220" stroke={faint} />
        </g>
      );
    case 5:
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none">
          <path d="M40 240 L100 100 L160 240 Z" />
          <path d="M160 240 L220 100 L280 240 Z" stroke={faint} />
          <path d="M40 240 L280 240" />
        </g>
      );
    default:
      return (
        <g stroke={stroke} strokeWidth="1.5" fill="none">
          <rect x="55" y="60" width="210" height="200" rx="4" />
          <path d="M55 120 L265 120 M55 180 L265 180 M55 220 L265 220" stroke={faint} />
          <path d="M115 60 L115 260 M175 60 L175 260" stroke={faint} />
        </g>
      );
  }
}

export function PlaceholderImage({
  variant,
  label,
  className = "",
}: {
  variant: number;
  label?: string;
  className?: string;
}) {
  const [from, to] = GRADIENTS[variant % GRADIENTS.length];
  const gradientId = `ks-grad-${variant}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 320 320"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        <rect width="320" height="320" fill={`url(#${gradientId})`} />
        <LineArt variant={variant} />
      </svg>
      {label ? (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/50 to-transparent px-4 py-3 sm:px-5 sm:py-4">
          <span className="font-display text-sm text-gold-300 sm:text-base">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}

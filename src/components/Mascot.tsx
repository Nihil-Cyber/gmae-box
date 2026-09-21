type Props = {
  className?: string
}

export function Mascot({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden="true"
      role="img"
    >
      <ellipse cx="60" cy="108" rx="34" ry="8" fill="rgba(80,52,20,0.14)" />
      <circle cx="60" cy="62" r="38" fill="#E7A41A" />
      <circle cx="44" cy="56" r="16" fill="#FFFDF8" />
      <circle cx="76" cy="56" r="16" fill="#FFFDF8" />
      <circle cx="45" cy="58" r="7" fill="#2B2118" />
      <circle cx="77" cy="58" r="7" fill="#2B2118" />
      <circle cx="47" cy="56" r="2.2" fill="#FFFDF8" />
      <circle cx="79" cy="56" r="2.2" fill="#FFFDF8" />
      <path d="M52 74c6 8 16 8 22 0" fill="none" stroke="#B67B0C" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="60" cy="68" rx="7" ry="5" fill="#E24C3B" />
      <rect x="28" y="46" width="64" height="8" rx="4" fill="#2B2118" />
      <circle cx="26" cy="50" r="7" fill="#2B2118" />
      <circle cx="94" cy="50" r="7" fill="#2B2118" />
      <path d="M38 28c8-16 36-16 44 0" fill="#5A4A8A" />
      <rect x="52" y="8" width="16" height="12" rx="3" fill="#5A4A8A" />
      <text x="60" y="24" textAnchor="middle" fontSize="10" fill="#FFFDF8" fontWeight="700">
        +
      </text>
    </svg>
  )
}

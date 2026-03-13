'use client';

interface CategoryTagProps {
  label: string;
  variant?: 'foundation' | 'qualification';
}

export default function CategoryTag({ label, variant = 'foundation' }: CategoryTagProps) {
  const styles =
    variant === 'foundation'
      ? 'bg-navy/8 text-navy border-navy/10'
      : 'bg-gold/10 text-gold border-gold/20';

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-inter font-semibold tracking-widest rounded border ${styles}`}
    >
      {label}
    </span>
  );
}

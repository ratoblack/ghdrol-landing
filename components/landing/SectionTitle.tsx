type Props = {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
};

export function SectionTitle({
  as: Tag = "h2",
  children,
  className = "",
  subtitle,
}: Props) {
  return (
    <div className={`mb-8 text-center ${className}`}>
      <Tag className="font-display text-4xl uppercase tracking-tight text-gh-gold-bright sm:text-5xl md:text-6xl">
        {children}
      </Tag>
      {subtitle ? (
        <p className="mt-3 text-sm uppercase tracking-widest text-gh-muted sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function CtaButton({ href, children, className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-md bg-gradient-to-b from-gh-gold-bright to-gh-gold px-8 py-3 text-center text-lg font-bold uppercase tracking-wide text-black shadow-[0_4px_24px_rgba(201,162,39,0.35)] transition hover:brightness-110 active:scale-[0.98] ${className}`}
    >
      {children}
    </Link>
  );
}

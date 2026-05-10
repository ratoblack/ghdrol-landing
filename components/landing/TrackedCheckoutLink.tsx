"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  units: string;
  className?: string;
  children: React.ReactNode;
};

/** Repassa query string da landing (click_id, sid, fbclid, UTM, etc.) para o checkout no mesmo domínio. */
export function TrackedCheckoutLink({ units, className, children }: Props) {
  const sp = useSearchParams();
  const qs = sp.toString();
  const href = qs ? `/checkout/${units}?${qs}` : `/checkout/${units}`;

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

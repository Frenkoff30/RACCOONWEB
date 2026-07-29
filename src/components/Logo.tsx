/* eslint-disable @next/next/no-img-element */

type Props = {
  /** "mark" = jen hlava myvala, "full" = hlava s nápisem RACCOONS */
  variant?: "mark" | "full";
  className?: string;
  priority?: boolean;
};

/**
 * Klubové logo. Je to vektor převedený z originálních křivek, takže ho
 * necháváme jako <img> – next/image by u SVG stejně nic neušetřil.
 */
export default function Logo({
  variant = "mark",
  className,
  priority,
}: Props) {
  const src =
    variant === "full" ? "/brand/raccoon-full.svg" : "/brand/raccoon-head.svg";
  const ratio = variant === "full" ? 500 / 546 : 500 / 462;

  return (
    <img
      src={src}
      alt="Logo hokejového týmu Raccoons"
      width={500}
      height={Math.round(500 / ratio)}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}

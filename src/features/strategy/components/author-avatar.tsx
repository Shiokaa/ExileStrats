/** Round author avatar — Discord image when known, otherwise a neutral initial badge. */
export function AuthorAvatar({
  name,
  src,
  size = 22,
}: {
  name: string;
  src: string | null;
  size?: number;
}) {
  const style = { width: size, height: size };
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt="" style={style} className="rounded-full object-cover" />
    );
  }
  return (
    <span
      style={style}
      className="inline-flex items-center justify-center rounded-full bg-subtle font-display text-[0.6875rem] font-semibold text-fg-2"
      aria-hidden="true"
    >
      {(name.trim()[0] ?? '?').toUpperCase()}
    </span>
  );
}

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { cx } from '@/lib/utils';

type Variant = 'primary' | 'ghost';

const VARIANT: Record<Variant, string> = {
  primary: 'btn btn-primary',
  ghost: 'btn btn-ghost',
};

type ButtonProps =
  | ({ variant?: Variant; href?: undefined } & ComponentPropsWithoutRef<'button'>)
  | ({ variant?: Variant; href: string } & ComponentPropsWithoutRef<typeof Link>);

/** The `.btn` primitive as a component — renders a `<Link>` when `href` is set, else a `<button>`. */
export function Button({ variant = 'ghost', className, ...rest }: ButtonProps) {
  const cls = cx(VARIANT[variant], className);
  if (rest.href != null) {
    return <Link className={cls} {...(rest as ComponentPropsWithoutRef<typeof Link>)} />;
  }
  return <button className={cls} {...(rest as ComponentPropsWithoutRef<'button'>)} />;
}

type IconButtonProps =
  | ({ href?: undefined } & ComponentPropsWithoutRef<'button'>)
  | ({ href: string } & ComponentPropsWithoutRef<typeof Link>);

/** The round `.icon-btn` primitive — renders a `<Link>` when `href` is set, else a `<button>`. */
export function IconButton({ className, ...rest }: IconButtonProps) {
  const cls = cx('icon-btn', className);
  if (rest.href != null) {
    return <Link className={cls} {...(rest as ComponentPropsWithoutRef<typeof Link>)} />;
  }
  return <button className={cls} {...(rest as ComponentPropsWithoutRef<'button'>)} />;
}

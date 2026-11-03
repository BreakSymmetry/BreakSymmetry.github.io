export type SiteVariant = 'online' | 'net';

export const siteVariant: SiteVariant =
  process.env.NEXT_PUBLIC_SITE_VARIANT === 'online' ? 'online' : 'net';

export const isChinaSite = siteVariant === 'online';
export const siteOrigin = isChinaSite
  ? 'https://www.breaksymmetry.online'
  : 'https://breaksymmetry.net';

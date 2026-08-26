export type SiteVariant = 'cn' | 'net';

export const siteVariant: SiteVariant =
  process.env.NEXT_PUBLIC_SITE_VARIANT === 'cn' ? 'cn' : 'net';

export const isChinaSite = siteVariant === 'cn';
export const siteOrigin = isChinaSite
  ? 'https://breaksymmetry.cn'
  : 'https://breaksymmetry.net';

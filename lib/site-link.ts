import NextLink from 'next/link';

// A static host only serves HTML and cannot handle Vinext's RSC navigation requests.
const SiteLink = process.env.NEXT_PUBLIC_STATIC_EXPORT === '1' ? 'a' : NextLink;

export default SiteLink;

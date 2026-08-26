import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { isChinaSite, siteOrigin } from '@/lib/site-variant';

export const metadata: Metadata = {
  title: isChinaSite ? '艾比之星 · Abby Star' : 'Abby Star',
  description: isChinaSite
    ? '末世像素风动作 Roguelike《艾比之星》的官方下载与支持入口。'
    : 'Official downloads and support for Abby Star, a post-apocalyptic pixel action roguelike.',
  alternates: { canonical: `${siteOrigin}/gameinfo` },
  openGraph: {
    type: 'website',
    title: isChinaSite ? '艾比之星 · Abby Star' : 'Abby Star',
    description: isChinaSite
      ? '一位少女，一颗异星，和一场仍在继续的冒险。'
      : 'One girl, one alien world, and an adventure that is still evolving.',
    url: `${siteOrigin}/gameinfo`,
    images: [{ url: `${siteOrigin}/abby-title.png`, alt: isChinaSite ? '《艾比之星》像素游戏画面' : 'Abby Star pixel game scene' }],
  },
  twitter: {
    title: isChinaSite ? '艾比之星 · Abby Star' : 'Abby Star',
    description: isChinaSite
      ? '一位少女，一颗异星，和一场仍在继续的冒险。'
      : 'One girl, one alien world, and an adventure that is still evolving.',
    images: [`${siteOrigin}/abby-title.png`],
  },
};

export default function GameInfoPage() {
  return (
    <main className="gameinfo-page">
      <Link className="gameinfo-brand" href="/">
        <Image src="/brand-mark.jpeg" alt="" width={42} height={42} />
        <span>BREAK SYMMETRY</span>
      </Link>
      <section className="gameinfo-card">
        <div className="gameinfo-image">
          <Image src="/abby-title.png" alt={isChinaSite ? '《艾比之星》游戏画面' : 'Abby Star game scene'} fill sizes="(max-width: 800px) 100vw, 52vw" priority />
        </div>
        <div className="gameinfo-copy">
          <p>ORIGINAL GAME / 2018—</p>
          <h1>{isChinaSite ? '艾比之星' : 'ABBY STAR'}<br /><span>ABBY STAR</span></h1>
          <p className="gameinfo-intro">{isChinaSite
            ? '末世像素风动作 Roguelike。一位少女，一颗异星，和一场仍在继续的冒险。'
            : 'A post-apocalyptic pixel action roguelike. One girl, one alien world, and an adventure that is still evolving.'}</p>
          <div className="gameinfo-links">
            <a href="https://www.taptap.cn/app/78946" target="_blank" rel="noreferrer">TapTap ↗</a>
            <a href="https://apps.apple.com/cn/app/id6738670394" target="_blank" rel="noreferrer">App Store ↗</a>
            <a href="https://play.google.com/store/apps/details?id=com.BreakSymmetry.AbbyStar" target="_blank" rel="noreferrer">Google Play ↗</a>
          </div>
          <div className="gameinfo-legal">
            {isChinaSite && <a href="/static/privacy.html">隐私保护指引</a>}
            {isChinaSite && <a href="/static/agreement.html">游戏许可及服务协议</a>}
            <a href="mailto:info@breaksymmetry.net">{isChinaSite ? '支持邮箱' : 'Support'}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

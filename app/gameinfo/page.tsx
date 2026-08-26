import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '艾比之星 · Abby Star',
  description: '末世像素风动作 Roguelike《艾比之星》的官方下载与支持入口。',
  alternates: { canonical: 'https://breaksymmetry.net/gameinfo' },
  openGraph: {
    type: 'website',
    title: '艾比之星 · Abby Star',
    description: '一位少女，一颗异星，和一场仍在继续的冒险。',
    url: 'https://breaksymmetry.net/gameinfo',
    images: [{ url: 'https://breaksymmetry.net/abby-title.png', alt: '《艾比之星》像素游戏画面' }],
  },
  twitter: {
    title: '艾比之星 · Abby Star',
    description: '一位少女，一颗异星，和一场仍在继续的冒险。',
    images: ['https://breaksymmetry.net/abby-title.png'],
  },
};

export default function GameInfoPage() {
  return (
    <main className="gameinfo-page">
      <a className="gameinfo-brand" href="/">
        <Image src="/brand-mark.jpeg" alt="" width={42} height={42} />
        <span>BREAK SYMMETRY</span>
      </a>
      <section className="gameinfo-card">
        <div className="gameinfo-image">
          <Image src="/abby-title.png" alt="《艾比之星》游戏画面" fill sizes="(max-width: 800px) 100vw, 52vw" priority />
        </div>
        <div className="gameinfo-copy">
          <p>ORIGINAL GAME / 2018—</p>
          <h1>艾比之星<br /><span>ABBY STAR</span></h1>
          <p className="gameinfo-intro">末世像素风动作 Roguelike。一位少女，一颗异星，和一场仍在继续的冒险。</p>
          <div className="gameinfo-links">
            <a href="https://www.taptap.cn/app/78946" target="_blank" rel="noreferrer">TapTap ↗</a>
            <a href="https://apps.apple.com/cn/app/id6738670394" target="_blank" rel="noreferrer">App Store ↗</a>
            <a href="https://play.google.com/store/apps/details?id=com.BreakSymmetry.AbbyStar" target="_blank" rel="noreferrer">Google Play ↗</a>
          </div>
          <div className="gameinfo-legal">
            <a href="/static/privacy.html">隐私保护指引</a>
            <a href="/static/agreement.html">游戏许可及服务协议</a>
            <a href="mailto:info@breaksymmetry.net">支持邮箱</a>
          </div>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { journalPostsByDate } from '@/lib/journal';
import { isChinaSite, siteOrigin } from '@/lib/site-variant';

const gamePosts = journalPostsByDate.filter((post) => post.category !== 'MEDICINE AI');
const locale = isChinaSite ? 'zh' : 'en';

export const metadata: Metadata = {
  title: isChinaSite ? '游戏开发' : 'Game Studio',
  description: isChinaSite
    ? '打破对称游戏工作室：独立游戏、Game AI 与长期产品迭代。'
    : 'Break Symmetry Game Studio: independent games, Game AI and long-term product iteration.',
  alternates: { canonical: `${siteOrigin}/games` },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/games`,
    title: isChinaSite ? '游戏开发 | 打破对称科技' : 'Game Studio | Break Symmetry',
    description: isChinaSite ? '创造可以进入的世界。' : 'Building worlds you can enter.',
    images: [{ url: `${siteOrigin}/abby-title.png`, alt: 'Abby Star' }],
  },
  twitter: {
    title: isChinaSite ? '游戏开发 | 打破对称科技' : 'Game Studio | Break Symmetry',
    description: isChinaSite ? '创造可以进入的世界。' : 'Building worlds you can enter.',
    images: [`${siteOrigin}/abby-title.png`],
  },
};

export default function GamesPage() {
  return (
    <main className="direction-page direction-game">
      <header className="direction-header">
        <Link className="brand" href="/">
          <Image src="/brand-mark.jpeg" alt="" width={44} height={44} className="brand-mark" priority />
          <span className="brand-name"><strong>打破对称</strong><small>BREAK SYMMETRY</small></span>
        </Link>
        <nav><Link href="/medicine-ai">MEDICINE AI ↗</Link><Link href="/journal#game">{isChinaSite ? '游戏文章' : 'GAME NOTES'}</Link></nav>
      </header>

      <section className="direction-main-hero">
        <div className="direction-hero-copy">
          <p>01 / GAME STUDIO</p>
          <h1>{isChinaSite ? <>创造可以<br />进入的世界。</> : <>Building worlds<br />you can enter.</>}</h1>
          <p className="direction-lead">{isChinaSite
            ? '我们开发并长期维护有鲜明表达的独立游戏，也持续研究信息论、几何系统与 AI NPC 如何产生新的可玩性。'
            : 'We create and sustain independent games, while researching how information theory, geometric systems and AI NPCs can open new forms of play.'}</p>
          <div className="direction-actions">
            <Link className="button button-primary" href="/gameinfo">ABBY STAR <span>↗</span></Link>
            <a className="direction-text-link" href="https://github.com/BreakSymmetry" target="_blank" rel="noreferrer">GITHUB ↗</a>
          </div>
        </div>
        <div className="direction-game-visual">
          <Image src="/abby-gameplay.png" alt={isChinaSite ? '《艾比之星》游戏场景' : 'Abby Star gameplay'} fill sizes="(max-width: 900px) 100vw, 48vw" priority />
          <span>ORIGINAL IP / ABBY STAR / 2018—</span>
        </div>
      </section>

      <section className="direction-feature-strip" aria-label={isChinaSite ? '游戏方向' : 'Game focus'}>
        <div><span>01</span><strong>{isChinaSite ? '独立游戏与原创 IP' : 'Independent games & original IP'}</strong></div>
        <div><span>02</span><strong>{isChinaSite ? 'Game AI 与智能角色' : 'Game AI & intelligent characters'}</strong></div>
        <div><span>03</span><strong>{isChinaSite ? '长期运营与跨平台发行' : 'Long-term operation & global platforms'}</strong></div>
      </section>

      <section className="direction-notes" id="notes">
        <header>
          <div><p>GAME NOTES / DEV ARCHIVE</p><h2>{isChinaSite ? '游戏文章' : 'Notes from the game studio'}</h2></div>
          <Link href="/journal#game">{isChinaSite ? '查看游戏文章' : 'VIEW GAME NOTES'} ↗</Link>
        </header>
        <div className="direction-note-list">
          {gamePosts.map((post, index) => (
            <Link className="direction-note-row" href={`/journal/${post.slug}`} key={post.slug}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><small>{post.category} · {post.date}</small><h3>{post.title[locale]}</h3><p>{post.summary[locale]}</p></div>
              <i>↗</i>
            </Link>
          ))}
        </div>
      </section>

      <footer className="direction-footer"><Link href="/">BREAK SYMMETRY</Link><a href="mailto:info@breaksymmetry.net">info@breaksymmetry.net</a></footer>
    </main>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { journalPostsByDate } from '@/lib/journal';
import { isChinaSite, siteOrigin } from '@/lib/site-variant';

export const metadata: Metadata = {
  title: isChinaSite ? '文章与研究日志' : 'Notes & Stories',
  description: isChinaSite
    ? '打破对称科技关于游戏开发、Game AI、Medicine AI 与长期产品迭代的公开文章。'
    : 'Public notes from Break Symmetry on game development, Game AI, Medicine AI and long-term product iteration.',
  alternates: { canonical: `${siteOrigin}/journal` },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/journal`,
    title: isChinaSite ? '文章与研究日志 | 打破对称科技' : 'Notes & Stories | Break Symmetry',
    description: isChinaSite
      ? '关于游戏开发、Game AI、Medicine AI 与长期产品迭代的公开文章。'
      : 'Public notes on game development, Game AI, Medicine AI and long-term product iteration.',
    images: [],
  },
  twitter: {
    title: isChinaSite ? '文章与研究日志 | 打破对称科技' : 'Notes & Stories | Break Symmetry',
    description: isChinaSite
      ? '关于游戏开发、Game AI、Medicine AI 与长期产品迭代的公开文章。'
      : 'Public notes on game development, Game AI, Medicine AI and long-term product iteration.',
    images: [],
  },
};

export default function JournalIndexPage() {
  const archiveCount = journalPostsByDate.filter((post) => post.kind === 'archive').length;
  const gamePosts = journalPostsByDate.filter((post) => post.category !== 'MEDICINE AI');
  const medicinePosts = journalPostsByDate.filter((post) => post.category === 'MEDICINE AI');
  const groups = [
    {
      id: 'game',
      index: '01',
      title: isChinaSite ? '游戏制作与 Game AI' : 'Game making & Game AI',
      description: isChinaSite ? '原创游戏、玩法系统、AI NPC 与开发档案。' : 'Original games, play systems, AI NPCs and development archives.',
      directionHref: '/games',
      posts: gamePosts,
    },
    {
      id: 'medicine-ai',
      index: '02',
      title: isChinaSite ? 'Medicine AI 研究' : 'Medicine AI research',
      description: isChinaSite ? '蛋白质结构、状态、实验监督与研究工作流。' : 'Protein structures, states, experimental supervision and research workflows.',
      directionHref: '/medicine-ai',
      posts: medicinePosts,
    },
  ];

  return (
    <main className="journal-index-page">
      <header className="journal-header">
        <Link className="brand" href="/" aria-label={isChinaSite ? '返回打破对称科技首页' : 'Back to Break Symmetry home'}>
          <Image src="/brand-mark.jpeg" alt="" width={44} height={44} className="brand-mark" priority />
          <span className="brand-name"><strong>打破对称</strong><small>BREAK SYMMETRY</small></span>
        </Link>
        <Link className="journal-back" href="/">← {isChinaSite ? '返回首页' : 'Back home'}</Link>
      </header>

      <section className="journal-index-hero">
        <div className="journal-index-orbit" aria-hidden="true"><i /><i /><i /></div>
        <p className="section-label acid-label">NOTES & STORIES / 文章与研究日志</p>
        {isChinaSite
          ? <h1>把正在形成的想法，<br />和一路走来的经验，<br /><em>一起留下来。</em></h1>
          : <h1>Ideas in formation.<br />Experience earned over time.<br /><em>Written to last.</em></h1>}
        <p>{isChinaSite
          ? '游戏开发、Game AI 与 Medicine AI 的公开研究切片，以及从早期博客重新整理的产品与制作档案。'
          : 'Working notes on game development, Game AI and Medicine AI, alongside product and production stories reconstructed from our early blog.'}</p>
        <div className="journal-index-stats">
          <span><strong>{journalPostsByDate.length}</strong> {isChinaSite ? '篇公开文章' : 'public notes'}</span>
          <span><strong>{gamePosts.length}</strong> {isChinaSite ? '篇游戏文章' : 'game notes'}</span>
          <span><strong>{medicinePosts.length}</strong> {isChinaSite ? '篇研究文章' : 'Medicine AI notes'}</span>
          <span><strong>{archiveCount}</strong> {isChinaSite ? '篇开发档案' : 'dev archives'}</span>
        </div>
      </section>

      <div className="journal-groups" aria-label={isChinaSite ? '分类文章列表' : 'Articles by direction'}>
        {groups.map((group) => (
          <section className="journal-group" id={group.id} key={group.id}>
            <header className="journal-group-header">
              <span>{group.index}</span>
              <div><h2>{group.title}</h2><p>{group.description}</p></div>
              <Link href={group.directionHref}>{isChinaSite ? '进入业务方向' : 'ENTER DIRECTION'} ↗</Link>
            </header>
            <div className="journal-index-list">
              {group.posts.map((post, index) => (
                <Link className={`journal-index-row journal-card-${post.accent}`} href={`/journal/${post.slug}`} key={post.slug}>
                  <span className="journal-index-number">{String(index + 1).padStart(2, '0')}</span>
                  <div className="journal-index-meta">
                    <span>{post.category}</span>
                    <span>{post.kind === 'archive' ? 'DEV ARCHIVE' : 'WORKING NOTE'}</span>
                    <span>{post.date}</span>
                  </div>
                  <div className="journal-index-copy">
                    <h2>{post.title[isChinaSite ? 'zh' : 'en']}</h2>
                    <p>{post.summary[isChinaSite ? 'zh' : 'en']}</p>
                  </div>
                  <span className="journal-index-arrow">↗</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="journal-footer">
        <span>{isChinaSite ? '成都打破对称科技有限公司' : 'BREAK SYMMETRY TECHNOLOGY'}</span>
        <a href="mailto:info@breaksymmetry.net">info@breaksymmetry.net</a>
        <span>© {new Date().getFullYear()} BREAK SYMMETRY</span>
      </footer>
    </main>
  );
}

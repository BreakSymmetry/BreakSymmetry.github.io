import type { Metadata } from 'next';
import Image from 'next/image';
import { journalPostsByDate } from '@/lib/journal';

export const metadata: Metadata = {
  title: '文章与研究日志',
  description: '打破对称科技关于游戏开发、Game AI、Medicine AI 与长期产品迭代的公开文章。',
  alternates: { canonical: 'https://breaksymmetry.net/journal' },
  openGraph: {
    type: 'website',
    url: 'https://breaksymmetry.net/journal',
    title: '文章与研究日志 | 打破对称科技',
    description: '关于游戏开发、Game AI、Medicine AI 与长期产品迭代的公开文章。',
    images: [],
  },
  twitter: {
    title: '文章与研究日志 | 打破对称科技',
    description: '关于游戏开发、Game AI、Medicine AI 与长期产品迭代的公开文章。',
    images: [],
  },
};

export default function JournalIndexPage() {
  const archiveCount = journalPostsByDate.filter((post) => post.kind === 'archive').length;

  return (
    <main className="journal-index-page">
      <header className="journal-header">
        <a className="brand" href="/" aria-label="返回打破对称科技首页">
          <Image src="/brand-mark.jpeg" alt="" width={44} height={44} className="brand-mark" priority />
          <span className="brand-name"><strong>打破对称</strong><small>BREAK SYMMETRY</small></span>
        </a>
        <a className="journal-back" href="/">← 返回首页</a>
      </header>

      <section className="journal-index-hero">
        <div className="journal-index-orbit" aria-hidden="true"><i /><i /><i /></div>
        <p className="section-label acid-label">NOTES & STORIES / 文章与研究日志</p>
        <h1>把正在形成的想法，<br />和一路走来的经验，<br /><em>一起留下来。</em></h1>
        <p>游戏开发、Game AI 与 Medicine AI 的公开研究切片，以及从早期博客重新整理的产品与制作档案。</p>
        <div className="journal-index-stats">
          <span><strong>{journalPostsByDate.length}</strong> 篇公开文章</span>
          <span><strong>{archiveCount}</strong> 篇开发档案</span>
          <span><strong>2</strong> 条研究主线</span>
        </div>
      </section>

      <section className="journal-index-list" aria-label="文章列表">
        {journalPostsByDate.map((post, index) => (
          <a className={`journal-index-row journal-card-${post.accent}`} href={`/journal/${post.slug}`} key={post.slug}>
            <span className="journal-index-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="journal-index-meta">
              <span>{post.category}</span>
              <span>{post.kind === 'archive' ? 'DEV ARCHIVE' : 'WORKING NOTE'}</span>
              <span>{post.date}</span>
            </div>
            <div className="journal-index-copy">
              <h2>{post.title.zh}</h2>
              <p>{post.summary.zh}</p>
            </div>
            <span className="journal-index-arrow">↗</span>
          </a>
        ))}
      </section>

      <footer className="journal-footer">
        <span>成都打破对称科技有限公司</span>
        <a href="mailto:info@breaksymmetry.net">info@breaksymmetry.net</a>
        <span>© {new Date().getFullYear()} BREAK SYMMETRY</span>
      </footer>
    </main>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { journalPostsByDate } from '@/lib/journal';
import { isChinaSite, siteOrigin } from '@/lib/site-variant';

const medicinePosts = journalPostsByDate.filter((post) => post.category === 'MEDICINE AI');
const locale = isChinaSite ? 'zh' : 'en';

export const metadata: Metadata = {
  title: 'Medicine AI',
  description: isChinaSite
    ? '打破对称 Medicine AI：连接蛋白质结构、状态、实验与可追溯研究工作流。'
    : 'Break Symmetry Medicine AI: connecting protein structures, states, experiments and traceable research workflows.',
  alternates: { canonical: `${siteOrigin}/medicine-ai` },
  openGraph: {
    type: 'website',
    url: `${siteOrigin}/medicine-ai`,
    title: 'Medicine AI | Break Symmetry',
    description: isChinaSite ? '理解生命的复杂语言。' : 'Reading the complex language of life.',
    images: [],
  },
  twitter: {
    title: 'Medicine AI | Break Symmetry',
    description: isChinaSite ? '理解生命的复杂语言。' : 'Reading the complex language of life.',
    images: [],
  },
};

export default function MedicineAiPage() {
  return (
    <main className="direction-page direction-medicine">
      <header className="direction-header">
        <Link className="brand" href="/">
          <Image src="/brand-mark.jpeg" alt="" width={44} height={44} className="brand-mark" priority />
          <span className="brand-name"><strong>打破对称</strong><small>BREAK SYMMETRY</small></span>
        </Link>
        <nav><Link href="/games">GAME STUDIO ↗</Link><Link href="/journal#medicine-ai">{isChinaSite ? '研究文章' : 'RESEARCH NOTES'}</Link></nav>
      </header>

      <section className="direction-main-hero">
        <div className="direction-hero-copy">
          <p>02 / MEDICINE AI / PROTEIN INTELLIGENCE</p>
          <h1>{isChinaSite ? <>理解生命的<br />复杂语言。</> : <>Reading the complex<br />language of life.</>}</h1>
          <p className="direction-lead">{isChinaSite
            ? '我们把结构、状态与实验连接起来，建立“证据 → 预测 → 区分性实验 → 数据回流”的可追溯闭环。模型缩小空间，实验保留最终判决权。'
            : 'We connect structures, states and experiments in a traceable evidence → prediction → discriminating experiment → feedback loop. Models narrow the space; experiments retain the final say.'}</p>
          <div className="direction-actions">
            <Link className="button button-primary" href="#notes">{isChinaSite ? '阅读研究笔记' : 'READ RESEARCH NOTES'} <span>↓</span></Link>
            <a className="direction-text-link" href="mailto:info@breaksymmetry.net">{isChinaSite ? '研究合作' : 'RESEARCH COLLABORATION'} ↗</a>
          </div>
        </div>
        <div className="direction-medicine-visual" aria-hidden="true">
          <div className="bio-system">
            <div className="bio-system-grid" />
            <div className="system-ring ring-outer" /><div className="system-ring ring-inner" />
            <span className="system-center">BIO<br /><strong>AI</strong></span>
            <span className="system-data data-one">STATE<br />ENSEMBLE</span>
            <span className="system-data data-two">MODEL<br />TRACEABLE</span>
            <span className="system-data data-three">EXPERIMENT<br />DECIDES</span>
          </div>
        </div>
      </section>

      <section className="direction-feature-strip" aria-label={isChinaSite ? 'Medicine AI 方向' : 'Medicine AI focus'}>
        <div><span>01</span><strong>{isChinaSite ? '结构与构象集合' : 'Structures & ensembles'}</strong></div>
        <div><span>02</span><strong>{isChinaSite ? '实验派生监督' : 'Experimental supervision'}</strong></div>
        <div><span>03</span><strong>{isChinaSite ? '可追溯研究工作流' : 'Traceable research workflows'}</strong></div>
      </section>

      <section className="direction-notes" id="notes">
        <header>
          <div><p>MEDICINE AI / WORKING NOTES</p><h2>{isChinaSite ? '研究文章' : 'Medicine AI research notes'}</h2></div>
          <Link href="/journal#medicine-ai">{isChinaSite ? '查看研究文章' : 'VIEW RESEARCH NOTES'} ↗</Link>
        </header>
        <div className="direction-note-list">
          {medicinePosts.map((post, index) => (
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

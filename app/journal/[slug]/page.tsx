import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJournalPost, journalPosts, journalPostsByDate } from '@/lib/journal';
import { isChinaSite, siteOrigin } from '@/lib/site-variant';

type JournalPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};

  const locale = isChinaSite ? 'zh' : 'en';

  return {
    title: post.title[locale],
    description: post.summary[locale],
    alternates: { canonical: `${siteOrigin}/journal/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `${siteOrigin}/journal/${post.slug}`,
      title: post.title[locale],
      description: post.summary[locale],
      images: [],
    },
    twitter: {
      title: post.title[locale],
      description: post.summary[locale],
      images: [],
    },
  };
}

export default async function JournalPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const postIndex = journalPostsByDate.findIndex((item) => item.slug === post.slug);
  const nextPost = journalPostsByDate[(postIndex + 1) % journalPostsByDate.length];

  return (
    <main className="journal-page">
      <header className="journal-header">
        <Link className="brand" href="/" aria-label={isChinaSite ? '返回打破对称科技首页' : 'Back to Break Symmetry home'}>
          <Image src="/brand-mark.jpeg" alt="" width={44} height={44} className="brand-mark" priority />
          <span className="brand-name"><strong>打破对称</strong><small>BREAK SYMMETRY</small></span>
        </Link>
        <Link className="journal-back" href="/#journal">← {isChinaSite ? '返回研究日志' : 'Back to notes'}</Link>
      </header>

      <article className={`journal-article journal-accent-${post.accent}`}>
        <div className="journal-hero-pattern" aria-hidden="true"><i /><i /><i /><i /></div>
        <header className="journal-article-header">
          <div className="journal-meta"><span>{post.category}</span><span>{post.date}</span><span>{post.readTime}</span></div>
          <h1>{post.title.zh}</h1>
          <p className="journal-deck">{post.summary.zh}</p>
          <div className="journal-abstract">
            <span>ENGLISH ABSTRACT</span>
            <p>{post.englishAbstract}</p>
          </div>
        </header>

        <div className="journal-body">
          <aside>
            <span>{post.kind === 'archive' ? 'DEV ARCHIVE' : 'WORKING NOTE'}</span>
            <p>{post.kind === 'archive'
              ? '这篇文章由历史版本日志与制作记录重新整理，保留当时的经验，同时补充今天仍然有效的开发判断。'
              : '这是一篇公开研究笔记，记录问题框架、设计判断与可验证方向，不代表论文结论、产品承诺或医学建议。'}</p>
          </aside>
          <div className="journal-copy">
            {post.sections.map((section, index) => (
              <section key={section.heading}>
                <span className="journal-section-number">0{index + 1}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}

            {post.references && (
              <section className="journal-references">
                <span className="journal-section-number">REF</span>
                <h2>进一步阅读</h2>
                {post.references.map((reference) => (
                  <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer">{reference.label} ↗</a>
                ))}
              </section>
            )}
          </div>
        </div>
      </article>

      <a className="journal-next" href={`/journal/${nextPost.slug}`}>
        <span>NEXT NOTE / 下一篇</span>
        <strong>{nextPost.title.zh}</strong>
        <i>↗</i>
      </a>

      <footer className="journal-footer">
        <span>{isChinaSite ? '成都打破对称科技有限公司' : 'BREAK SYMMETRY TECHNOLOGY'}</span>
        <a href="mailto:info@breaksymmetry.net">info@breaksymmetry.net</a>
        <span>© {new Date().getFullYear()} BREAK SYMMETRY</span>
      </footer>
    </main>
  );
}

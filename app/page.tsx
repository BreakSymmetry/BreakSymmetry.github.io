'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { journalPostsByDate } from '@/lib/journal';

type Locale = 'zh' | 'en';

const copy = {
  zh: {
    nav: ['业务', '文章', '理念', '联系'],
    heroLabel: '打破既定边界',
    heroTitle: <>为未知，<br /><em>创造新的可能。</em></>,
    heroIntro: '从像素世界到蛋白质系统，我们在成都把技术、设计与长期主义放在一起，探索游戏与 Medicine AI 的下一种形态。',
    heroPrimary: '探索我们的工作',
    heroSecondary: '认识打破对称',
    fields: ['创造可以进入的世界', '理解生命的复杂语言'],
    sectionLabel: '我们的工作 / WHAT WE DO',
    sectionTitle: <>两个尺度，<br />同一种<em>探索精神。</em></>,
    sectionIntro: '游戏让想象成为可以体验的世界；Bio AI 让数据成为理解生命的新工具。看似遥远的两端，背后都是对复杂系统、智能与创造力的长期投入。',
    gameKicker: 'GAME STUDIO / 游戏开发',
    gameTitle: '让好游戏被长久地玩下去。',
    gameBody: '我们开发并长期维护有鲜明表达的独立游戏，也持续研究信息论、几何系统与 AI NPC 怎样产生新的可玩性。',
    gameProduct: '代表作品',
    gameName: '艾比之星',
    gameDesc: '末世像素风动作 Roguelike。一位少女，一颗异星，和一场仍在继续的冒险。',
    gameMetrics: [['11万+', '社区关注'], ['8.4', '玩家评分'], ['3', '全球平台']],
    gameCta: '进入游戏世界',
    bioKicker: 'MEDICINE AI / 蛋白质智能',
    bioTitle: '把结构、状态与实验连接起来。',
    bioBody: '我们以 Protein Intelligence 为研究方向，建立“证据 → 预测 → 区分性实验 → 数据回流”的可追溯闭环。模型帮助缩小空间，实验保留最终判决权。',
    bioStatus: 'RESEARCH IN PROGRESS / 研究进行中',
    bioAreas: [['01', '结构与构象集合'], ['02', '实验派生监督'], ['03', '可追溯研究工作流']],
    journalLabel: '文章与研究日志 / NOTES & STORIES',
    journalTitle: '把研究、制作与长期迭代，写成可以留下来的文章。',
    journalIntro: '这里既有 Game AI 与 Medicine AI 的公开研究切片，也有从旧博客重新整理的开发回顾。我们保留证据边界，也保存作品一路形成的过程。',
    journalCta: '阅读文章',
    journalArchiveCta: '查看全部文章',
    principleLabel: '我们的理念 / HOW WE THINK',
    principleTitle: '真正的新东西，往往发生在边界被重新定义的时候。',
    principles: [
      ['01', '从真实问题出发', '不追逐技术名词。先理解玩家与研究者真正需要解决的难题。'],
      ['02', '做可以验证的事', '把大胆想法拆成可体验、可测量、可持续改进的产品。'],
      ['03', '保留长期耐心', '对创作与研究都保持诚实，用时间建立质量与信任。'],
    ],
    aboutLabel: 'BREAK SYMMETRY',
    aboutTitle: <>我们不想预测未来。<br /><em>我们想参与创造它。</em></>,
    aboutBody: '成都打破对称科技有限公司是一家立足成都、面向全球的探索型科技公司。我们在游戏开发与 Medicine AI 两条业务线上工作，把信息论、几何、人工智能与实验科学连接起来，创造有生命力的产品与研究工具。',
    contactLabel: '一起打破下一个边界',
    contactTitle: '有游戏、技术或 Medicine AI 方向的合作想法？',
    contactBody: '欢迎与我们交流研发、产品与长期合作机会。',
    contactCta: '写信给我们',
    githubCta: '访问 GitHub',
    communityCta: '访问《艾比之星》社区',
    footerNote: '游戏开发 × Medicine AI · 成都，中国',
  },
  en: {
    nav: ['Work', 'Notes', 'Approach', 'Contact'],
    heroLabel: 'BREAK THE EXPECTED',
    heroTitle: <>Creating new possibilities<br /><em>for the unknown.</em></>,
    heroIntro: 'From pixel worlds to protein systems, our Chengdu team brings technology, design and long-term thinking together to explore what comes next in games and Medicine AI.',
    heroPrimary: 'Explore our work',
    heroSecondary: 'Meet Break Symmetry',
    fields: ['Building worlds you can enter', 'Reading the complex language of life'],
    sectionLabel: 'WHAT WE DO / 我们的工作',
    sectionTitle: <>Two scales.<br />One spirit of <em>exploration.</em></>,
    sectionIntro: 'Games turn imagination into worlds we can experience. Bio AI turns data into a new instrument for understanding life. Both demand a lasting commitment to complex systems, intelligence and creativity.',
    gameKicker: 'GAME STUDIO / 游戏开发',
    gameTitle: 'Making good games worth returning to.',
    gameBody: 'We create and sustain independent games, while researching how information theory, geometry and AI NPCs can open new forms of play.',
    gameProduct: 'Featured title',
    gameName: 'Abby Star',
    gameDesc: 'A post-apocalyptic pixel action roguelike. One girl, one alien world, and an adventure that is still evolving.',
    gameMetrics: [['110K+', 'Community'], ['8.4', 'Player rating'], ['3', 'Global platforms']],
    gameCta: 'Enter the game world',
    bioKicker: 'MEDICINE AI / PROTEIN INTELLIGENCE',
    bioTitle: 'Connecting structures, states and experiments.',
    bioBody: 'We are building a traceable evidence → prediction → discriminating experiment → feedback loop. Models narrow the search space; experiments retain the final say.',
    bioStatus: 'RESEARCH IN PROGRESS',
    bioAreas: [['01', 'Structures & ensembles'], ['02', 'Experimental supervision'], ['03', 'Traceable research workflows']],
    journalLabel: 'NOTES & STORIES / 文章与研究日志',
    journalTitle: 'Research, making and long iteration—written to last.',
    journalIntro: 'Public Game AI and Medicine AI working notes now sit alongside development stories reconstructed from our earlier blog. We preserve both evidence boundaries and the path a product took to become itself.',
    journalCta: 'Read article',
    journalArchiveCta: 'View all articles',
    principleLabel: 'HOW WE THINK / 我们的理念',
    principleTitle: 'The genuinely new often appears when a boundary is redefined.',
    principles: [
      ['01', 'Start with real problems', 'We begin with the challenges players and researchers actually need to solve.'],
      ['02', 'Build what can be tested', 'Bold ideas become experiences and tools that can be measured and improved.'],
      ['03', 'Stay patient for the long run', 'We treat both creation and research honestly, earning quality and trust over time.'],
    ],
    aboutLabel: 'BREAK SYMMETRY',
    aboutTitle: <>We do not want to predict the future.<br /><em>We want to help create it.</em></>,
    aboutBody: 'Chengdu Break Symmetry Technology is an exploration-driven company based in Chengdu and working globally. Across game development and Medicine AI, we connect information theory, geometry, artificial intelligence and experimental science.',
    contactLabel: 'LET’S BREAK THE NEXT BOUNDARY',
    contactTitle: 'Exploring a collaboration in games, technology or Medicine AI?',
    contactBody: 'We welcome conversations around R&D, products and long-term partnerships.',
    contactCta: 'Email us',
    githubCta: 'Visit GitHub',
    communityCta: 'Visit the Abby Star community',
    footerNote: 'Game Development × Medicine AI · Chengdu, China',
  },
};

export default function Home() {
  const [locale, setLocale] = useState<Locale>('zh');
  const t = copy[locale];

  useEffect(() => {
    if (window.location.hostname.toLowerCase().endsWith('.net')) setLocale('en');
  }, []);

  const toggleLocale = () => setLocale((current) => current === 'zh' ? 'en' : 'zh');

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={locale === 'zh' ? '打破对称科技首页' : 'Break Symmetry home'}>
          <Image src="/brand-mark.jpeg" alt="" width={48} height={48} className="brand-mark" priority />
          <span className="brand-name"><strong>打破对称</strong><small>BREAK SYMMETRY</small></span>
        </a>
        <nav aria-label={locale === 'zh' ? '主导航' : 'Primary navigation'}>
          <a href="#work">{t.nav[0]}</a><a href="#journal">{t.nav[1]}</a><a href="#about">{t.nav[2]}</a><a href="#contact">{t.nav[3]}</a>
        </nav>
        <button className="language-switch" type="button" onClick={toggleLocale} aria-label={locale === 'zh' ? 'Switch to English' : '切换至中文'}>{locale === 'zh' ? 'EN' : '中文'}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> {t.heroLabel}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-intro">{t.heroIntro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">{t.heroPrimary} <span>↗</span></a>
            <a className="button button-ghost" href="#about">{t.heroSecondary}</a>
          </div>
        </div>
        <div className="hero-stage" aria-label={locale === 'zh' ? '游戏开发与 Bio AI 两条业务线' : 'Game development and Bio AI'}>
          <article className="field-card field-game">
            <div className="field-visual"><Image src="/abby-title.png" alt={locale === 'zh' ? '像素动作游戏《艾比之星》画面' : 'Pixel action game Abby Star'} fill sizes="(max-width: 900px) 80vw, 38vw" className="game-image" priority /></div>
            <div className="field-meta"><span>01 / GAME</span><strong>{t.fields[0]}</strong></div>
          </article>
          <article className="field-card field-bio">
            <div className="bio-visual" aria-hidden="true"><span className="bio-core">AI</span><i className="bio-node node-a" /><i className="bio-node node-b" /><i className="bio-node node-c" /><i className="bio-node node-d" /></div>
            <div className="field-meta"><span>02 / BIO AI</span><strong>{t.fields[1]}</strong></div>
          </article>
        </div>
        <p className="hero-note">CHENGDU · CHINA <span>→</span> WORLDWIDE</p>
      </section>

      <section className="work-intro" id="work">
        <div className="section-index"><span>01</span><i /></div>
        <div className="intro-heading">
          <p className="section-label">{t.sectionLabel}</p>
          <h2>{t.sectionTitle}</h2>
        </div>
        <p className="intro-body">{t.sectionIntro}</p>
      </section>

      <section className="game-section">
        <div className="game-art">
          <Image src="/abby-gameplay.png" alt={locale === 'zh' ? '《艾比之星》游戏场景' : 'Abby Star gameplay scene'} fill sizes="(max-width: 900px) 100vw, 54vw" className="pixel-image" />
          <div className="art-stamp"><span>ORIGINAL IP</span><strong>ABBY<br />STAR</strong></div>
        </div>
        <div className="game-content">
          <p className="section-label blue-label">{t.gameKicker}</p>
          <h2>{t.gameTitle}</h2>
          <p className="body-copy">{t.gameBody}</p>
          <div className="product-card">
            <small>{t.gameProduct}</small>
            <div className="product-title"><strong>{t.gameName}</strong><span>ABBY STAR</span></div>
            <p>{t.gameDesc}</p>
            <div className="metrics">
              {t.gameMetrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
            <div className="product-links">
              <a href="https://www.taptap.cn/app/78946" target="_blank" rel="noreferrer">TapTap ↗</a>
              <a href="https://apps.apple.com/cn/app/id6738670394" target="_blank" rel="noreferrer">App Store ↗</a>
              <a href="https://play.google.com/store/apps/details?id=com.BreakSymmetry.AbbyStar" target="_blank" rel="noreferrer">Google Play ↗</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bio-section">
        <div className="bio-copy">
          <p className="section-label acid-label">{t.bioKicker}</p>
          <h2>{t.bioTitle}</h2>
          <p className="body-copy">{t.bioBody}</p>
          <span className="status-pill"><i /> {t.bioStatus}</span>
        </div>
        <div className="bio-system" aria-hidden="true">
          <div className="bio-system-grid" />
          <div className="system-ring ring-outer" /><div className="system-ring ring-inner" />
          <span className="system-center">BIO<br /><strong>AI</strong></span>
          <span className="system-data data-one">SEQ_01<br />A C G T</span>
          <span className="system-data data-two">MODEL<br />0.982</span>
          <span className="system-data data-three">KNOWLEDGE<br />CONNECTED</span>
        </div>
        <div className="bio-areas">
          {t.bioAreas.map(([number, area]) => <div key={number}><span>{number}</span><strong>{area}</strong><i>↗</i></div>)}
        </div>
      </section>

      <section className="journal-section" id="journal">
        <div className="journal-section-heading">
          <div>
            <p className="section-label">{t.journalLabel}</p>
            <h2>{t.journalTitle}</h2>
          </div>
          <p>{t.journalIntro}</p>
        </div>
        <div className="journal-grid">
          {journalPostsByDate.map((post, index) => (
            <a className={`journal-card journal-card-${post.accent}`} href={`/journal/${post.slug}`} key={post.slug}>
              <div className="journal-card-visual" aria-hidden="true">
                <span>0{index + 1}</span><i /><i /><i />
              </div>
              <div className="journal-card-meta"><span>{post.category}</span><span>{post.date}</span></div>
              <h3>{post.title[locale]}</h3>
              <p>{post.summary[locale]}</p>
              <span className="journal-card-link">{t.journalCta} <i>↗</i></span>
            </a>
          ))}
        </div>
        <a className="journal-all" href="/journal">{t.journalArchiveCta} <span>↗</span></a>
      </section>

      <section className="principles" id="about">
        <div className="principle-lead">
          <p className="section-label">{t.principleLabel}</p>
          <h2>{t.principleTitle}</h2>
        </div>
        <div className="principle-list">
          {t.principles.map(([number, title, body]) => (
            <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <div className="about-mark" aria-hidden="true"><Image src="/brand-mark.jpeg" alt="" width={250} height={250} /></div>
        <div className="about-copy">
          <p className="section-label acid-label">{t.aboutLabel}</p>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-label">{t.contactLabel}</p>
        <h2>{t.contactTitle}</h2>
        <p>{t.contactBody}</p>
        <div className="contact-actions">
          <a className="button button-dark" href="mailto:info@breaksymmetry.net">{t.contactCta} <span>↗</span></a>
          <a className="text-link" href="https://github.com/BreakSymmetry" target="_blank" rel="noreferrer">{t.githubCta} ↗</a>
          <a className="text-link" href="https://www.taptap.cn/app/78946" target="_blank" rel="noreferrer">{t.communityCta} ↗</a>
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#top"><Image src="/brand-mark.jpeg" alt="" width={44} height={44} className="brand-mark" /><span className="brand-name"><strong>打破对称</strong><small>BREAK SYMMETRY</small></span></a>
        <p>{t.footerNote}</p>
        <div className="footer-domains"><a href="https://breaksymmetry.cn">.CN</a><a href="https://breaksymmetry.net">.NET</a><button type="button" onClick={toggleLocale}>{locale === 'zh' ? 'ENGLISH' : '中文'}</button></div>
        <div className="footer-legal">
          <span>成都打破对称科技有限公司</span>
          <a href="/static/agreement.html" target="_blank">游戏许可及服务协议</a>
          <a href="/static/privacy.html" target="_blank">游戏隐私保护指引</a>
          <a href="mailto:info@breaksymmetry.net">info@breaksymmetry.net</a>
        </div>
        <div className="footer-filing">
          <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51015602001170" target="_blank" rel="noreferrer">川公网安备51015602001170</a>
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">蜀ICP备2024112178号</a>
          <span>© {new Date().getFullYear()} BREAK SYMMETRY TECHNOLOGY</span>
        </div>
      </footer>
    </main>
  );
}

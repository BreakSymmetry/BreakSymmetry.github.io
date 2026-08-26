'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Locale = 'zh' | 'en';

const copy = {
  zh: {
    nav: ['业务', '理念', '联系'],
    heroLabel: '打破既定边界',
    heroTitle: <>为未知，<br /><em>创造新的可能。</em></>,
    heroIntro: '从像素世界到生命科学，我们把技术、设计与长期主义放在一起，探索游戏与 Bio AI 的下一种形态。',
    heroPrimary: '探索我们的工作',
    heroSecondary: '认识打破对称',
    fields: ['创造可以进入的世界', '理解生命的复杂语言'],
    sectionLabel: '我们的工作 / WHAT WE DO',
    sectionTitle: <>两个尺度，<br />同一种<em>探索精神。</em></>,
    sectionIntro: '游戏让想象成为可以体验的世界；Bio AI 让数据成为理解生命的新工具。看似遥远的两端，背后都是对复杂系统、智能与创造力的长期投入。',
    gameKicker: 'GAME STUDIO / 游戏开发',
    gameTitle: '让好游戏被长久地玩下去。',
    gameBody: '我们开发并长期维护有鲜明表达的独立游戏，重视手感、世界观，也重视玩家反馈形成的真实循环。',
    gameProduct: '代表作品',
    gameName: '艾比之星',
    gameDesc: '末世像素风动作 Roguelike。一位少女，一颗异星，和一场仍在继续的冒险。',
    gameMetrics: [['11万+', '社区关注'], ['8.4', '玩家评分'], ['3', '全球平台']],
    gameCta: '进入游戏世界',
    bioKicker: 'BIO AI / 生物智能',
    bioTitle: '用计算，寻找生命问题的新解法。',
    bioBody: '我们正在探索 AI 与生命科学的交汇：从生物数据理解、知识连接到可验证的研发工具，让模型真正服务于科学问题。',
    bioStatus: 'IN EXPLORATION / 积极探索中',
    bioAreas: [['01', '生物数据与模型'], ['02', '知识发现与连接'], ['03', '面向研发的 AI 工具']],
    principleLabel: '我们的理念 / HOW WE THINK',
    principleTitle: '真正的新东西，往往发生在边界被重新定义的时候。',
    principles: [
      ['01', '从真实问题出发', '不追逐技术名词。先理解玩家与研究者真正需要解决的难题。'],
      ['02', '做可以验证的事', '把大胆想法拆成可体验、可测量、可持续改进的产品。'],
      ['03', '保留长期耐心', '对创作与研究都保持诚实，用时间建立质量与信任。'],
    ],
    aboutLabel: 'BREAK SYMMETRY',
    aboutTitle: <>我们不想预测未来。<br /><em>我们想参与创造它。</em></>,
    aboutBody: '打破对称科技是一家立足中国、面向全球的探索型科技公司。我们在游戏开发与 Bio AI 两条业务线上工作，把不同学科的洞察连接起来，创造有生命力的产品。',
    contactLabel: '一起打破下一个边界',
    contactTitle: '有游戏、技术或 Bio AI 方向的合作想法？',
    contactBody: '欢迎与我们交流研发、产品与长期合作机会。',
    contactCta: '在 GitHub 找到我们',
    communityCta: '访问《艾比之星》社区',
    footerNote: '游戏开发 × Bio AI · 上海，中国',
  },
  en: {
    nav: ['Work', 'Approach', 'Contact'],
    heroLabel: 'BREAK THE EXPECTED',
    heroTitle: <>Creating new possibilities<br /><em>for the unknown.</em></>,
    heroIntro: 'From pixel worlds to life science, we bring technology, design and long-term thinking together to explore what comes next in games and Bio AI.',
    heroPrimary: 'Explore our work',
    heroSecondary: 'Meet Break Symmetry',
    fields: ['Building worlds you can enter', 'Reading the complex language of life'],
    sectionLabel: 'WHAT WE DO / 我们的工作',
    sectionTitle: <>Two scales.<br />One spirit of <em>exploration.</em></>,
    sectionIntro: 'Games turn imagination into worlds we can experience. Bio AI turns data into a new instrument for understanding life. Both demand a lasting commitment to complex systems, intelligence and creativity.',
    gameKicker: 'GAME STUDIO / 游戏开发',
    gameTitle: 'Making good games worth returning to.',
    gameBody: 'We create and sustain independent games with a distinct point of view—built around great feel, memorable worlds and a real feedback loop with players.',
    gameProduct: 'Featured title',
    gameName: 'Abby Star',
    gameDesc: 'A post-apocalyptic pixel action roguelike. One girl, one alien world, and an adventure that is still evolving.',
    gameMetrics: [['110K+', 'Community'], ['8.4', 'Player rating'], ['3', 'Global platforms']],
    gameCta: 'Enter the game world',
    bioKicker: 'BIO AI / 生物智能',
    bioTitle: 'New computational paths into questions of life.',
    bioBody: 'We are exploring the intersection of AI and life science—from biological data and connected knowledge to verifiable research tools that keep scientific questions at the center.',
    bioStatus: 'IN ACTIVE EXPLORATION',
    bioAreas: [['01', 'Biological data & models'], ['02', 'Knowledge discovery'], ['03', 'AI tools for R&D']],
    principleLabel: 'HOW WE THINK / 我们的理念',
    principleTitle: 'The genuinely new often appears when a boundary is redefined.',
    principles: [
      ['01', 'Start with real problems', 'We begin with the challenges players and researchers actually need to solve.'],
      ['02', 'Build what can be tested', 'Bold ideas become experiences and tools that can be measured and improved.'],
      ['03', 'Stay patient for the long run', 'We treat both creation and research honestly, earning quality and trust over time.'],
    ],
    aboutLabel: 'BREAK SYMMETRY',
    aboutTitle: <>We do not want to predict the future.<br /><em>We want to help create it.</em></>,
    aboutBody: 'Break Symmetry is an exploration-driven technology company based in China and working globally. Across game development and Bio AI, we connect insights from different disciplines to create products with lasting life.',
    contactLabel: 'LET’S BREAK THE NEXT BOUNDARY',
    contactTitle: 'Exploring a collaboration in games, technology or Bio AI?',
    contactBody: 'We welcome conversations around R&D, products and long-term partnerships.',
    contactCta: 'Find us on GitHub',
    communityCta: 'Visit the Abby Star community',
    footerNote: 'Game Development × Bio AI · Shanghai, China',
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
          <a href="#work">{t.nav[0]}</a><a href="#about">{t.nav[1]}</a><a href="#contact">{t.nav[2]}</a>
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
        <p className="hero-note">SHANGHAI · CHINA <span>→</span> WORLDWIDE</p>
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
          <a className="button button-dark" href="https://github.com/BreakSymmetry" target="_blank" rel="noreferrer">{t.contactCta} <span>↗</span></a>
          <a className="text-link" href="https://www.taptap.cn/app/78946" target="_blank" rel="noreferrer">{t.communityCta} ↗</a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><Image src="/brand-mark.jpeg" alt="" width={44} height={44} className="brand-mark" /><span className="brand-name"><strong>打破对称</strong><small>BREAK SYMMETRY</small></span></a>
        <p>{t.footerNote}</p>
        <div><a href="https://breaksymmetry.cn">.CN</a><a href="https://breaksymmetry.net">.NET</a><button type="button" onClick={toggleLocale}>{locale === 'zh' ? 'ENGLISH' : '中文'}</button></div>
        <small>© {new Date().getFullYear()} BREAK SYMMETRY TECHNOLOGY</small>
      </footer>
    </main>
  );
}

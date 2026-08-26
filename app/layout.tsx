import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { isChinaSite, siteOrigin } from '@/lib/site-variant';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: isChinaSite
      ? '成都打破对称科技 | 游戏开发 × Medicine AI'
      : 'Break Symmetry | Game Development × Medicine AI',
    template: isChinaSite ? '%s | 打破对称科技' : '%s | Break Symmetry',
  },
  description: isChinaSite
    ? '成都打破对称科技是一家专注游戏开发与 Medicine AI 探索的科技公司，从像素世界到蛋白质系统，为未知创造新的可能。'
    : 'Break Symmetry is a Chengdu-based technology company exploring game development and Medicine AI, from pixel worlds to protein systems.',
  keywords: isChinaSite
    ? ['成都打破对称科技', 'Break Symmetry', '游戏开发', 'Medicine AI', 'Protein Intelligence', '艾比之星', 'Abby Star']
    : ['Break Symmetry', 'game development', 'Medicine AI', 'Protein Intelligence', 'Abby Star'],
  alternates: {
    canonical: siteOrigin,
    languages: isChinaSite ? { 'zh-CN': siteOrigin } : { en: siteOrigin },
  },
  openGraph: {
    type: 'website',
    locale: isChinaSite ? 'zh_CN' : 'en_US',
    url: siteOrigin,
    siteName: isChinaSite ? '打破对称科技 · Break Symmetry' : 'Break Symmetry',
    title: isChinaSite
      ? '打破既定边界 | 游戏开发 × Medicine AI'
      : 'Break the Expected | Game Development × Medicine AI',
    description: isChinaSite
      ? '从像素世界到蛋白质系统，在成都为未知创造新的可能。'
      : 'From pixel worlds to protein systems, creating new possibilities for the unknown.',
    images: [{
      url: '/og.png',
      width: 1731,
      height: 909,
      alt: isChinaSite
        ? '打破既定边界 · 游戏开发 × Medicine AI'
        : 'Break the Expected · Game Development × Medicine AI',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: isChinaSite
      ? '打破既定边界 | 游戏开发 × Medicine AI'
      : 'Break the Expected | Game Development × Medicine AI',
    description: isChinaSite
      ? '从像素世界到蛋白质系统，在成都为未知创造新的可能。'
      : 'From pixel worlds to protein systems, creating new possibilities for the unknown.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={isChinaSite ? 'zh-CN' : 'en'}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

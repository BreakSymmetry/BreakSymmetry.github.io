import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  metadataBase: new URL('https://breaksymmetry.cn'),
  title: {
    default: '打破对称科技 | 游戏开发 × Bio AI',
    template: '%s | 打破对称科技',
  },
  description: '打破对称科技是一家专注游戏开发与 Bio AI 探索的科技公司，从像素世界到生命科学，为未知创造新的可能。',
  keywords: ['打破对称', 'Break Symmetry', '游戏开发', 'Bio AI', '艾比之星', 'Abby Star'],
  alternates: {
    canonical: 'https://breaksymmetry.cn',
    languages: {
      'zh-CN': 'https://breaksymmetry.cn',
      en: 'https://breaksymmetry.net',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: 'https://breaksymmetry.cn',
    siteName: '打破对称科技 · Break Symmetry',
    title: '打破既定边界 | 游戏开发 × Bio AI',
    description: '从像素世界到生命科学，为未知创造新的可能。',
    images: [{ url: '/og.png', width: 1744, height: 911, alt: '打破既定边界 · 游戏开发 × Bio AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '打破既定边界 | 游戏开发 × Bio AI',
    description: '从像素世界到生命科学，为未知创造新的可能。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

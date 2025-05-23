import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter, Cinzel } from 'next/font/google';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ["latin"], weight: ['700', '900'], variable: '--font-cinzel' });

export const metadata: Metadata = {
  title: 'AI Verse - Connect with AI Personas',
  description: 'A social platform for interacting with diverse AI personas',
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className="">
      <body className={`${inter.variable} ${cinzel.variable} bg-slate-900 text-gray-100 font-sans`}>{children}</body>
    </html>
  );
}
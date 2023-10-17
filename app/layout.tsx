import { KumaRegistry } from '@kuma-ui/next-plugin/registry';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'All Trust SNS',
  description: '信頼性に溢れた新しいSNS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KumaRegistry>{children}</KumaRegistry>
      </body>
    </html>
  );
}

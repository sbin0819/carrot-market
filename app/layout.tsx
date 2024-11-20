import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Karrot Market ',
    default: 'Karrot Market',
  },
  description: 'Sell and buy all kinds of items in your local community',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`mx-auto max-w-screen-md bg-neutral-900 text-white`}>
        {children}
      </body>
    </html>
  );
}

import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export const metadata = {
  title: {
    default: 'syslink',
    template: '%s | syslink'
  },
  description: 'developer building small, practical software.',
  openGraph: {
    title: 'syslink',
    description: 'developer building small, practical software.',
    url: 'https://syslink.dev',
    siteName: 'syslink',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'syslink',
    description: 'developer building small, practical software.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="container">
            <nav className="nav">
              <Link href="/" className="nav-item">home</Link>
              <Link href="/projects" className="nav-item">projects</Link>
              <Link href="/skills" className="nav-item">skills</Link>
              <Link href="/blog" className="nav-item">blog</Link>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <div style={{ borderLeft: '1px solid var(--card-border)', paddingLeft: '1rem', display: 'flex' }}>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
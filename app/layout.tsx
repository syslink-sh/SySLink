import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata = {
  title: {
    default: 'SySLink',
    template: '%s | SySLink'
  },
  description: 'Digital Architect & Systems Engineer building robust, minimalist software solutions.',
  openGraph: {
    title: 'SySLink',
    description: 'Digital Architect & Systems Engineer building robust, minimalist software solutions.',
    url: 'https://syslink.dev',
    siteName: 'SySLink',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SySLink',
    description: 'Digital Architect & Systems Engineer building robust, minimalist software solutions.',
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
              <div style={{ marginLeft: '1rem', borderLeft: '1px solid var(--card-border)', paddingLeft: '1rem', display: 'flex' }}>
                <ThemeToggle />
              </div>
            </nav>
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
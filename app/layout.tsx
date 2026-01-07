import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: {
    default: 'syslink',
    template: '%s | syslink'
  },
  description: 'A developer who enjoys random projects and building minimalist software.',
  openGraph: {
    title: 'syslink',
    description: 'A developer who enjoys random projects and building minimalist software.',
    url: 'https://syslink.dev',
    siteName: 'syslink',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'syslink',
    description: 'A developer who enjoys random projects and building minimalist software.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="container">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
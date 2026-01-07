'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { label: 'Projects', href: '/projects' },
        { label: 'Skills', href: '/skills' },
        { label: 'Blog', href: '/blog' },
    ];

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    return (
        <nav className="nav">
            <Link href="/" className="nav-icon" title="Home">
                👋
            </Link>

            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                >
                    {item.label}
                </Link>
            ))}

            <a
                href="https://github.com/syslink-sh"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-item"
            >
                GitHub
            </a>

            <div
                className="theme-toggle"
                onClick={toggleTheme}
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
                {theme === 'dark' ? '☀️' : '🌙'}
            </div>
        </nav>
    );
}

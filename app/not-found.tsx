import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1 className="title-underline" style={{ fontSize: '4rem' }}>404</h1>
            <h2>page not found</h2>
            <p className="muted" style={{ marginBottom: '2rem' }}>
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link href="/" className="nav-item active" style={{ display: 'inline-block' }}>
                back home
            </Link>
        </div>
    );
}

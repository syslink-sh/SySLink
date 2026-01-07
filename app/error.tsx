'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="fade-in" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <h1 className="title-underline" style={{ fontSize: '4rem' }}>500</h1>
            <h2>something went wrong</h2>
            <p className="muted" style={{ marginBottom: '2rem' }}>
                An unexpected error occurred. We've been notified and are working on it.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                    onClick={() => reset()}
                    className="nav-item active"
                    style={{ border: 'none', cursor: 'pointer', fontSize: 'inherit' }}
                >
                    try again
                </button>
                <Link href="/" className="nav-item" style={{ backgroundColor: 'rgba(128,128,128,0.1)' }}>
                    back home
                </Link>
            </div>
        </div>
    );
}

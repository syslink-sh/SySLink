'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body style={{ backgroundColor: '#0a0a0a', color: '#ededed', fontFamily: 'sans-serif' }}>
                <div style={{ padding: '4rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '4rem', color: '#ffffff' }}>Critical Error</h1>
                    <p style={{ opacity: 0.7, marginBottom: '2rem' }}>A critical system error occurred.</p>
                    <button
                        onClick={() => reset()}
                        style={{
                            padding: '0.75rem 1.5rem',
                            backgroundColor: '#38bdf8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}
                    >
                        Refresh System
                    </button>
                </div>
            </body>
        </html>
    );
}

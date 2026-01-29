import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        console.error('Error Boundary Caught:', error, errorInfo);

        // In production, you could send this to an error reporting service
        // Example: logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                    color: 'white',
                    padding: '2rem',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '3rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(184, 115, 51, 0.3)'
                    }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '1rem',
                            color: '#B87333'
                        }}>⚠️</div>

                        <h1 style={{
                            fontSize: '2rem',
                            marginBottom: '1rem',
                            fontWeight: 700
                        }}>
                            Something Went Wrong
                        </h1>

                        <p style={{
                            fontSize: '1.1rem',
                            color: '#ccc',
                            marginBottom: '2rem',
                            lineHeight: 1.6
                        }}>
                            We encountered an unexpected error. This has been logged and our team will look into it.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details style={{
                                textAlign: 'left',
                                background: 'rgba(0, 0, 0, 0.3)',
                                padding: '1rem',
                                borderRadius: '8px',
                                marginBottom: '2rem',
                                fontSize: '0.9rem',
                                color: '#ff6b6b'
                            }}>
                                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Error Details (Dev Only)
                                </summary>
                                <pre style={{
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    fontSize: '0.85rem'
                                }}>
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => window.location.href = '/'}
                                style={{
                                    background: '#B87333',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.875rem 2rem',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.background = '#a0642d'}
                                onMouseOut={(e) => e.target.style.background = '#B87333'}
                            >
                                Go to Homepage
                            </button>

                            <button
                                onClick={() => window.location.reload()}
                                style={{
                                    background: 'transparent',
                                    color: 'white',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    padding: '0.875rem 2rem',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)'}
                                onMouseOut={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                            >
                                Reload Page
                            </button>
                        </div>

                        <p style={{
                            marginTop: '2rem',
                            fontSize: '0.9rem',
                            color: '#888'
                        }}>
                            If this issue persists, please <a href="/contact" style={{ color: '#B87333', textDecoration: 'underline' }}>contact us</a>.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

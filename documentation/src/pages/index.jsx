import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Home() {
    const {siteConfig} = useDocusaurusContext();

    return (
        <Layout
            title={`Welcome to ${siteConfig.title}`}
            description="Technical documentation for the Anagram Solver built with React and FSD">

            <header className="hero hero--primary" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 className="hero__title" style={{ fontSize: '3rem', fontWeight: '800' }}>
                        {siteConfig.title}
                    </h1>
                    <p className="hero__subtitle" style={{ fontSize: '1.5rem', margin: '1rem 0 2rem' }}>
                        {siteConfig.tagline}
                    </p>
                    <div>
                        <Link
                            className="button button--secondary button--lg"
                            to="/docs/intro"
                            style={{ padding: '1rem 2rem', fontSize: '1.2rem', borderRadius: '8px' }}>
                            Read the Documentation
                        </Link>
                    </div>
                </div>
            </header>

            <main style={{ padding: '4rem 0'}}>
                <div className="container" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ maxWidth: '300px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem' }}>Lightning Fast</h3>
                        <p>Powered by React 19 and Vite for instant HMR and optimized production builds.</p>
                    </div>
                    <div style={{ maxWidth: '300px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem' }}>FSD Architecture</h3>
                        <p>Strictly decoupled Feature-Sliced Design to ensure maintainability and scalability.</p>
                    </div>
                    <div style={{ maxWidth: '300px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem' }}>Privacy First</h3>
                        <p>GDPR-compliant In-Memory storage engine with zero unauthorized data tracking.</p>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
    return (
        <Layout title="About the Developer" description="Information about the Anagram Solver author">
            <main className="container" style={{ padding: '4rem 0', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.5rem', borderBottom: '2px solid var(--ifm-color-primary)', paddingBottom: '10px' }}>
                    👨‍💻 About the Project
                </h1>

                <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginTop: '20px' }}>
                    This project was developed by <strong>Andrii Volynets</strong> as a comprehensive demonstration of modern frontend engineering practices.
                </p>

                <h2>Core Objectives</h2>
                <ul>
                    <li>Demonstrate proficiency with functional React hooks.</li>
                    <li>Implement clean architectural boundaries using Feature-Sliced Design.</li>
                    <li>Create an interactive and engaging user experience purely on the client-side.</li>
                </ul>

                <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--ifm-color-emphasis-100)', borderRadius: '8px' }}>
                    <strong>Note:</strong> You can find the complete source code on my <a href="[https://github.com/ipz234vas/anagram-solver](https://github.com/ipz234vas/anagram-solver)" target="_blank" rel="noreferrer">GitHub repository</a>.
                </div>
            </main>
        </Layout>
    );
}
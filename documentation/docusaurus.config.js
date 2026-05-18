import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Anagram Solver',
    tagline: 'Technical documentation for the Anagram Solver game',

    markdown: {
        mermaid: true,
        hooks: {
            onBrokenMarkdownLinks: 'warn',
        },
    },
    themes: ['@docusaurus/theme-mermaid'],

    favicon: 'img/favicon.ico',

    url: 'https://ipz234vas.github.io',
    baseUrl: '/',
    organizationName: 'ipz234vas',
    projectName: 'anagram-solver',

    onBrokenLinks: 'throw',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                },
                blog: false,
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    plugins: [
        function resolveReactAliases() {
            return {
                name: 'resolve-react-aliases',
                configureWebpack() {
                    const path = require('path');
                    return {
                        resolve: {
                            alias: {
                                '@shared': path.resolve(__dirname, '../src/shared'),
                                '@features': path.resolve(__dirname, '../src/features'),
                                '@pages': path.resolve(__dirname, '../src/pages'),
                                '@app': path.resolve(__dirname, '../src/app'),
                            },
                        },
                    };
                },
            };
        },
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                respectPrefersColorScheme: true,
            },
            navbar: {
                title: 'Anagram Solver',
                logo: {
                    alt: 'Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Documentation',
                    },
                    { to: '/about', label: 'About', position: 'left' },
                    {
                        href: 'https://github.com/ipz234vas/anagram-solver',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Read Documentation',
                                to: '/docs/intro',
                            },
                        ],
                    },
                    {
                        title: 'Project',
                        items: [
                            {
                                label: 'About the Developer',
                                to: '/about',
                            },
                        ],
                    },
                    {
                        title: 'Repository',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/ipz234vas/anagram-solver',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Andrii Volynets. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
        }),
};

export default config;
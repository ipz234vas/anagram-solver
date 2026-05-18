# Project Structure

The repository is structured as a **Monorepo-style** workspace, separating the core application from its documentation to prevent dependency conflicts (e.g., Vite vs Webpack).

## Root Directory

```text
anagram-solver/
├── documentation/       # Docusaurus documentation portal (React 18 + Webpack)
├── public/              # Static assets (favicons, manifest)
├── src/                 # Main game source code (React 19 + Vite)
│   ├── app/             # Global initialization (Router, Styles)
│   ├── pages/           # Full-screen views (GamePage, LoginPage)
│   ├── features/        # Business logic modules (Timer, WordInput)
│   └── shared/          # UI Kit and utility functions
├── .gitignore
├── eslint.config.js     # Strict linting rules
├── package.json         # Root dependencies and scripts
└── vite.config.js       # Client bundler configuration
```

:::info Separation of Concerns
Notice that `documentation` has its own isolated environment. This guarantees that our heavy documentation plugins do not bloat the final production bundle of the game.
:::
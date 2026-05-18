[![License: Apache License 2.0](https://img.shields.io/badge/license-Apache%20License%202.0-blue)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-purple.svg)](https://vitejs.dev/)

# Anagram Solver

A dynamic, web-based puzzle game where players unscramble letters to find the hidden words. Built with React and Vite.

## Table of Contents
- [About the Game](#about-the-game)
- [Key Features](#key-features)
- [How to Play](#how-to-play)
- [Installation & Setup](#installation--setup)
- [Available Commands](#available-commands)
- [Documentation & UI](#documentation--ui)
- [Legal & Privacy](#legal--privacy)
- [License](#license--author)

## About the Game
Anagram Solver is a fast-paced word puzzle designed to test your vocabulary and quick thinking. Players can create personal profiles, compete against the clock, and track their high scores on the local leaderboard.

## Key Features
- Multiple Word Categories: Choose specific themes or mix them up.
- User Profiles: Save your progress, track your win rate, and view personal statistics locally.
- Timer & Hints: Play against the clock with an integrated countdown and use hints if you get stuck.
- Leaderboard: Compare your scores with other local players.
- Responsive UI: Smooth experience across desktop and mobile devices.

## How to Play
1. Login/Register: Create a local profile to track your stats.
2. Select Settings: Adjust the game difficulty (e.g., word length, timer limits) in the settings menu.
3. Solve: You will be presented with a set of scrambled letters. Type or tap the letters in the correct order to form a valid word.
4. Time Limit: Complete the anagram before the timer runs out.
5. Win/Lose: Successful guesses increase your score and streak. Check the Leaderboard to see your ranking!

## Installation & Setup

Ensure you have Node.js installed on your machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/ipz234vas/anagram-solver.git
   cd anagram-solver
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Commands

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Boots up a local static web server that serves the files from `dist`.
- `npm run lint` - Runs ESLint to find code quality issues.
- `npm run storybook` - Runs the project Storybook.
- `npm run docs` - Generates the project documentation.

## Documentation & UI
- Components: UI components (like Buttons and Modals) are documented using Storybook.
- Project Architecture: Full project documentation is generated via Docusaurus and can be built using the scripts above.

## Legal & Privacy

This application complies with standard privacy requirements. All necessary legal documents are available in the repository root:

| Document | File Link |
|----------|-----------|
| **Privacy Policy** | [PRIVACY_POLICY.md](./PRIVACY_POLICY.md) |
| **EULA** | [EULA.md](./EULA.md) |
| **Dependencies Licenses** | [licenses-summary.txt](./licenses-summary.txt) |

## License & Author

**Author:** Andrii Volynets

**GitHub:** [ipz234vas](https://github.com/ipz234vas)

This project is licensed under the **Apache License 2.0**. See the [LICENSE](./LICENSE) file for more details.
A complete list of third-party licenses used in this project can be found in `licenses-detailed.txt`.
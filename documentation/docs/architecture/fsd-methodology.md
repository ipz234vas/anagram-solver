# Feature-Sliced Design (FSD) Implementation

This document describes how the **Feature-Sliced Design (FSD)** methodology is mapped directly onto the Anagram Solver codebase. By enforcing a strict unidirectional dependency tree, we decouple our domain logic from layout view layers.

## Layer-by-Layer Decomposition

Our codebase is structurally divided into four distinct architectural layers, sorted from the most abstract/global to the most concrete/generic.

```text
  ▲  [app]             - Orchestration, routing definitions, global styles
  │  [pages]           - Compositional full-screen layouts (GamePage, Leaderboard)
  │  [features]        - Product capabilities and interactive business slices
  │  [shared]          - Atomic UI components, pure math utils, API facades
```

---

### 1. App (`src/app/`)
The root configuration layer. It serves as the application bootstrapper. It coordinates cross-cutting concerns that affect every subsystem.
* **`App.jsx`**: Houses global UI boundaries and mounts the core `<CookiePopup />`.
* **`routes/`**: Handles application routing configurations using React Router (`AppRouter.jsx`, `ProtectedRoute.jsx`, `UserRoute.jsx`).
* **`styles/`**: Defines the central design system canvas via `globals.css` and `variables.scss` variables.

---

### 2. Pages (`src/pages/`)
Pages are purely compositional architectural modules. They ingest standalone business features and wrap them inside grid systems to form complete structural views. **Pages never contain independent business calculations.**
Our game defines the following layout profiles:
* **`StartPage`**: The welcome lobby allowing users to choose an execution profile or configure a profile nickname.
* **`GamePage`**: The primary interaction field aggregating the live session timers, scrambled tile areas, and input matrix systems.
* **`ResultPage`**: Post-game analytics screen displaying final scores and performance trends.
* **`LeaderboardPage`**: Displays local persistent records and player performance metrics.
* **`LoginPage`**: Entry gateway handling authentication triggers.
* **`UserPage`**: Detailed profile records displaying individual achievements and settings.

---

### 3. Features (`src/features/`)
Features are self-contained functional entities that can be dropped into any layout view to deliver concrete value. Each feature folder encapsulates its own Zustand state controllers, UI wrappers, and data tracking hooks:
* **`auth`**: Governs player registration and credentials persistence (`auth.js`, `usersStorage.js`).
* **`cookie-consent`**: Intercepts lifecycle triggers to process GDPR authorization states.
* **`words`**: Orchestrates external dictionary fetches and filters source words via explicit parameters (`wordsApi.js`).
* **`timer`**: Manages granular countdown ticking states (`useTimer.js`, `useTimerRef.js`).
* **`word-input`**: Validates input buffers, renders slot indicators, and tracks caret focuses (`WordInputField.jsx`, `LetterSlot.jsx`).
* **`letter-selection`**: Controls scrambled anagram tile clicks and visual states.
* **`game-settings`**: Holds user-configured constraints like word length and timeouts (`gameSettings.store.js`).
* **`game-flow`**: The main business brain. It synchronizes timers with input states and orchestrates round increments (`gameRound.store.js`, `gameStats.store.js`).
* **`game-stats` & `game-session`**: Process reactive scoreboard feedback and performance metrics.

---

### 4. Shared (`src/shared/`)
The foundation layer. Code written here is entirely decoupled from the business logic of an anagram game. If we decided to rewrite this app into a chess game, the `shared` directory would remain 100% unchanged.
* **`ui/`**: Pure visual elements (`Button`, `Card`, `Modal`).
* **`storage/`**: Low-level infrastructure governing the data access proxy (`storage.js`).
* **`lib/`**: Generic abstraction wrappers, such as the class compiler utility (`cn.js`).
* **`utils/`**: Pure deterministic calculation modules (`gameLogic.js`, `letterUtils.js`, `percentHelper.js`).

:::warning Strict Architectural Bound
Imports must always flow **downward**. A component in `src/shared` can never import a hook from `src/features`. Breaking this boundary causes circular dependency locks and breaks module isolation.
:::
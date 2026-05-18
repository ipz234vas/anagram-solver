# Zustand State Architecture

The application implements a decoupled reactive state architecture powered by **Zustand**. Instead of relying on centralized global singletons, state is broken into atomic domain slices to maximize performance and eliminate unnecessary re-renders.

## Core State Repositories

The system orchestrates operations across four reactive store frameworks:

| Store Descriptor | File Path | Scope of Responsibility | Persistence |
|---|---|---|---|
| `gameSettings` | `.../game-settings/model/gameSettings.store.js` | Difficulty bounds, chosen category, timer constraints. | **Yes** (Facade Proxy) |
| `gameRound` | `.../game-flow/model/gameRound.store.js` | Current target word, active scrambled array, hint usage indicators. | **No** (Volatile Session) |
| `gameStats` | `.../game-flow/model/gameStats.store.js` | Total points, current streak counts, round multipliers. | **Yes** (Facade Proxy) |
| `gameResult` | `.../game-result/model/gameResult.store.js` | Historical accuracy logs, session summaries, post-game matrices. | **No** (Volatile Session) |

---

## Technical Contract Layouts

### 1. `gameRound` Store Contract
This store manages the immediate state of the current active puzzle. It resets fully whenever a new word is served.

```typescript
interface GameRoundState {
  targetWord: string;          // The correct original un-scrambled word
  scrambledWord: string;       // The randomized anagram string served to UI
  inputBuffer: string;         // The active characters typed by the user
  isCompleted: boolean;        // Flag specifying if the current round is won
  hintsUsed: number;           // Track count of requested reveals for this round
  
  // Operational Triggers
  setTargetWord: (word: string) => void;
  appendCharacter: (char: string) => void;
  popCharacter: () => void;
  clearBuffer: () => void;
  markAsWon: () => void;
}
```

### 2. `gameSettings` Store Contract
Controls game parameters. It links directly into our persistent facade, meaning that user adjustments are saved across sessions if cookies are allowed.

```typescript
interface GameSettingsState {
  category: string;            // Selected lexical domain (e.g., "General")
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimitPerRound: number;   // Total countdown configuration in seconds
  soundEnabled: boolean;       // System configuration settings
  
  updateCategory: (cat: string) => void;
  setDifficulty: (level: string) => void;
  toggleAudio: () => void;
}
```

:::tip Memoized Component Selector Subscriptions
To avoid cascading render loops, components must subscribe to state values using selective micro-selectors rather than reading the entire store container:
```javascript
// ✅ Correct approach - only re-renders when "category" explicitly changes
const category = useGameSettings((state) => state.category);
```
:::
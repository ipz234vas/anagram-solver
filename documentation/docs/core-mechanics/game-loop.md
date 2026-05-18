# Core Game Loop Mechanics

The lifecycle of an Anagram Solver session involves asynchronous ingestion pipelines, string scrambling routines, and event-driven performance evaluation.

## 1. Asynchronous Data Ingestion Pipeline

When the game initializes, it queries an external JSON endpoint to retrieve the global word dictionary. This lifecycle operation is handled asynchronously without blocking the main UI rendering thread.

```javascript title="src/features/words/api/wordsApi.js"
const API_URL = 'https://opensheet.elk.sh/.../Words';

export async function fetchAllWords() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to resolve dictionary');
    return await response.json();
}
```

## 2. Word Processing Pipeline

Once the raw dictionary resolves, it passes through a series of pure transformation filters managed inside the state engine before an anagram is served to the player:

```text
 [ Raw JSON Stream ]
         │
         ▼
 ┌───────────────┐
 │ Category Fit  │ ──► Drops words outside chosen domain (e.g., 'Animals', 'IT')
 └───────────────┘
         │
         ▼
 ┌───────────────┐
 │ Length Filter │ ──► Drops items violating difficulty parameters
 └───────────────┘
         │
         ▼
 ┌───────────────┐
 │ Shuffling Algorithm │ ──► Breaks word into a pseudo-randomized letter tile index
 └───────────────┘
         │
         ▼
 [ Active Game Canvas ]
```

### The Scrambling Utility
The shuffling mechanism reads target strings and randomizes character arrays. If the randomized output matches the original word, a secondary processing shift is forced to guarantee a true anagram challenge.

```javascript title="src/shared/utils/gameLogic.js"
export function scrambleWord(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    const scrambled = letters.join('');
    // Recursive safety check: ensure the scrambled result isn't identical to the source
    return scrambled === word ? scrambleWord(word) : scrambled;
}
```

## 3. Runtime Verification Sequence

1. **Input Collection:** As characters are clicked or keyed into `<WordInputField />`, an active character buffer string accumulates.
2. **Deterministic Evaluation:** When the active buffer length matches the target string length, a verification routine checks if `inputBuffer === targetWord`.
3. **Score Dispatching:** On a successful match, the `gameStats` store triggers animations, increments score streaks, stops the ticking reference timer, and dispatches an initialization flag for the subsequent game round.
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function createLetter(char, index) {
    return {
        id: `${char}-${index}-${Date.now()}-${Math.random()}`,
        char
    };
}

export function wordToLetters(word) {
    return word.split('').map((char, index) => createLetter(char, index));
}

export function shiftLettersForInsertion(word, targetIndex) {
    const newWord = [...word];

    if (newWord[targetIndex] === null) {
        return { newWord, targetIndex };
    }

    const hasEmptySpace = newWord.some(letter => letter === null);
    if (!hasEmptySpace) {
        return null;
    }

    const emptyRight = newWord.findIndex((letter, i) => i > targetIndex && letter === null);

    if (emptyRight !== -1) {
        for (let i = emptyRight; i > targetIndex; i--) {
            newWord[i] = newWord[i - 1];
        }
        newWord[targetIndex] = null;

        const newUsedIds = new Set();
        newWord.forEach(letter => {
            if (letter) newUsedIds.add(letter.id);
        });

        return { newWord, targetIndex, usedLetterIds: newUsedIds };
    }

    const emptyLeft = newWord.findIndex(letter => letter === null);
    if (emptyLeft !== -1 && emptyLeft < targetIndex) {
        for (let i = emptyLeft; i < targetIndex; i++) {
            newWord[i] = newWord[i + 1];
        }
        newWord[targetIndex] = null;

        const newUsedIds = new Set();
        newWord.forEach(letter => {
            if (letter) newUsedIds.add(letter.id);
        });

        return { newWord, targetIndex, usedLetterIds: newUsedIds };
    }

    return null;
}
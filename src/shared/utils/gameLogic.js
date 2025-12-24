export function checkWordCompletion(currentWord, targetWord) {
    const isComplete = currentWord.every(letter => letter !== null);

    if (!isComplete) {
        return { isComplete: false, isCorrect: false, isWrong: false };
    }

    const constructedWord = currentWord.map(letter => letter.char).join('');
    const isCorrect = constructedWord === targetWord;
    const isWrong = isComplete && !isCorrect;

    return { isComplete, isCorrect, isWrong };
}

export function calculateInitialWordScore(word) {
    return word.length * 2;
}

export function calculateHintPenalty(hintCount) {
    return 5 + (hintCount * 5);
}

export function calculateSkipPenalty(wordLength) {
    return wordLength;
}

export function findNextEmptySlot(word, afterIndex) {
    return word.findIndex((letter, i) => i > afterIndex && letter === null);
}

export function findFirstEmptySlot(word) {
    return word.findIndex(letter => letter === null);
}

export function isLetterUsed(letterId, usedLetterIds) {
    return usedLetterIds.has(letterId);
}

export function removeLetterAt(word, index, usedLetterIds) {
    const letter = word[index];
    if (!letter) return { word, usedLetterIds };

    const newWord = [...word];
    newWord[index] = null;

    const newUsedIds = new Set(usedLetterIds);
    newUsedIds.delete(letter.id);

    return { word: newWord, usedLetterIds: newUsedIds };
}

export function placeLetterAt(word, index, letter, usedLetterIds) {
    const newWord = [...word];
    const newUsedIds = new Set(usedLetterIds);

    if (newWord[index]) {
        newUsedIds.delete(newWord[index].id);
    }

    newWord[index] = letter;
    newUsedIds.add(letter.id);

    return { word: newWord, usedLetterIds: newUsedIds };
}

export function swapLetters(word, index1, index2) {
    const newWord = [...word];
    const temp = newWord[index1];
    newWord[index1] = newWord[index2];
    newWord[index2] = temp;
    return newWord;
}
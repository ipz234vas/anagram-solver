const API_URL = 'https://opensheet.elk.sh/1VWIUwMD79Y4qIEKJOabFscvBL3aLpvLzSZCZbUVKrE4/Words';

export async function fetchAllWords() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка завантаження слів:', error);
        throw error;
    }
}

export function extractCategories(words) {
    const categories = words.map(item => item.category);
    return [...new Set(categories)].filter(Boolean);
}

export function filterWordsByCategory(words, category) {
    return words.filter(item => item.category === category);
}

export function filterWordsByCategories(words, categories) {
    if (!categories || categories.length === 0) {
        return words;
    }
    return words.filter(item => categories.includes(item.category));
}

export function filterWordsByLength(words, minLength = 0, maxLength = Infinity) {
    return words.filter(item => {
        const wordLength = item.word.length;
        return wordLength >= minLength && wordLength <= maxLength;
    });
}

export function filterWords(words, filters = {}) {
    let filtered = words;

    if (filters.categories && filters.categories.length > 0) {
        filtered = filterWordsByCategories(filtered, filters.categories);
    }

    if (filters.minLength !== undefined || filters.maxLength !== undefined) {
        filtered = filterWordsByLength(
            filtered,
            filters.minLength || 0,
            filters.maxLength || Infinity
        );
    }

    return filtered;
}

export function getRandomWord(words) {
    if (!words || words.length === 0) {
        return null;
    }
    return words[Math.floor(Math.random() * words.length)];
}
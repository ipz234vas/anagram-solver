import { useState, useEffect } from 'react';
import { fetchAllWords, extractCategories, filterWords } from '../api/wordsApi';

export function useWords(filters = {}) {
    const [allWords, setAllWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadWords = async () => {
            try {
                setIsLoading(true);
                const data = await fetchAllWords();
                if (!isMounted) return;

                setAllWords(data);
                setCategories(extractCategories(data));
                setFilteredWords(filterWords(data, filters));
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadWords();
        return () => { isMounted = false; };
    }, []);

    return {
        allWords,
        filteredWords,
        categories,
        isLoading,
        error,
    };
}
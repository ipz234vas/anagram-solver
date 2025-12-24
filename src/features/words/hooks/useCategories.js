import { useState, useEffect } from 'react';
import { fetchAllWords, extractCategories } from '../api/wordsApi';

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadCategories = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await fetchAllWords();

                if (!isMounted) return;

                const uniqueCategories = extractCategories(data);
                setCategories(uniqueCategories);

            } catch (err) {
                if (!isMounted) return;
                setError(err.message);
                console.error('Помилка завантаження категорій:', err);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadCategories();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        categories,
        isLoading,
        error,
    };
}
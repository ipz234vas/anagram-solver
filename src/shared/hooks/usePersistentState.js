import { useEffect, useState } from "react";
import { storage } from "@shared/storage/storage.js";

export function usePersistentState(key, defaults) {
    const [value, setValue] = useState(() => {
        const saved = storage.get(key, null);
        if (saved && typeof saved === "object" && !Array.isArray(saved)) {
            return { ...defaults, ...saved };
        }
        return saved ?? defaults;
    });

    useEffect(() => {
        storage.set(key, value);
    }, [key, value]);

    const reset = () => setValue(defaults);

    return { value, setValue, reset };
}

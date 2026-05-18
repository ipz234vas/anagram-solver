const CONSENT_KEY = 'app_gdpr_consent';

// Тимчасові сховища в оперативній пам'яті
const localMemoryStorage = new Map();
const sessionMemoryStorage = new Map();

export function getConsent() {
    try {
        const raw = localStorage.getItem(CONSENT_KEY);
        return raw ? JSON.parse(raw) : { necessary: true, functional: false, analytics: false, isSet: false };
    } catch {
        return { necessary: true, functional: false, analytics: false, isSet: false };
    }
}

export function saveConsent(preferences) {
    const consentData = { ...preferences, isSet: true };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
    window.dispatchEvent(new Event('consent-changed'));
}

function isStorageAllowed(key, category) {
    if (key === CONSENT_KEY) return true;

    const consent = getConsent();
    if (!consent.isSet) return false;

    return !!consent[category];
}

// --------------------------------------------------
// Драйвер для LocalStorage (Вимагає згоди 'functional')
// --------------------------------------------------
export const storage = {
    get(key, fallback = null) {
        if (!isStorageAllowed(key, 'functional')) {
            return localMemoryStorage.has(key) ? localMemoryStorage.get(key) : fallback;
        }
        try {
            const raw = localStorage.getItem(key);
            return raw == null ? fallback : JSON.parse(raw);
        } catch { return fallback; }
    },

    set(key, value) {
        if (!isStorageAllowed(key, 'functional')) {
            localMemoryStorage.set(key, value);
            return;
        }
        try {
            localStorage.setItem(key, JSON.stringify(value));
            localMemoryStorage.set(key, value);
        } catch (e) { console.error("LocalStorage write failed:", e); }
    },

    remove(key) {
        localMemoryStorage.delete(key);
        try { localStorage.removeItem(key); } catch { /* empty */ }
    },
};

// --------------------------------------------------
// Драйвер для SessionStorage (Вимагає згоди 'functional')
// --------------------------------------------------
export const sessionStorageWrapper = {
    get(key, fallback = null) {
        if (!isStorageAllowed(key, 'functional')) {
            return sessionMemoryStorage.has(key) ? sessionMemoryStorage.get(key) : fallback;
        }
        try {
            const raw = sessionStorage.getItem(key);
            return raw == null ? fallback : JSON.parse(raw);
        } catch { return fallback; }
    },

    set(key, value) {
        if (!isStorageAllowed(key, 'functional')) {
            sessionMemoryStorage.set(key, value);
            return;
        }
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            sessionMemoryStorage.set(key, value);
        } catch (e) { console.error("SessionStorage write failed:", e); }
    },

    remove(key) {
        sessionMemoryStorage.delete(key);
        try { sessionStorage.removeItem(key); } catch { }
    },
};
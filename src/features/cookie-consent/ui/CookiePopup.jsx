import { useState } from 'react';
import { getConsent, saveConsent } from '@shared/storage/storage.js';
import { Modal } from '@shared/ui/modal/Modal.jsx';
import styles from './CookiePopup.module.css';

export const CookiePopup = () => {
    const [preferences, setPreferences] = useState(() => getConsent());
    const [isVisible, setIsVisible] = useState(() => !getConsent().isSet);
    const [showManage, setShowManage] = useState(false);

    const handleAcceptAll = () => {
        saveConsent({ necessary: true, functional: true, analytics: true });
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        saveConsent({ necessary: true, functional: false, analytics: false });
        setIsVisible(false);
    };

    const handleSaveCustom = () => {
        saveConsent(preferences);
        setIsVisible(false);
    };

    return (
        <Modal
            isOpen={isVisible}
            onClose={() => {}}
            title="Ми використовуємо cookies"
            showCloseButton={false}
            hasBackdropBlur={true}
        >
            {!showManage ? (
                <>
                    <p className={styles.text}>
                        За замовчуванням ми не зберігаємо ваші профілі чи налаштування на пристрої.
                        Щоб ваш прогрес зберігався після закриття вкладки, будь ласка, надайте згоду на використання функціональних файлів cookie (LocalStorage).
                    </p>
                    <div className={styles.actions}>
                        <button type="button" onClick={handleAcceptAll}>Прийняти всі</button>
                        <button type="button" onClick={handleRejectAll}>Відхилити всі</button>
                        <button type="button" onClick={() => setShowManage(true)}>Налаштувати</button>
                    </div>
                </>
            ) : (
                <div className={styles.manageContainer}>
                    <label className={styles.option}>
                        <input type="checkbox" checked disabled />
                        <div>
                            <strong>Необхідні (Завжди увімкнено)</strong>
                            <span>Збереження виключно вашого вибору щодо GDPR налаштувань. Без цього ми будемо запитувати вас щоразу.</span>
                        </div>
                    </label>

                    <label className={styles.option}>
                        <input
                            type="checkbox"
                            checked={preferences.functional}
                            onChange={(e) => setPreferences(prev => ({ ...prev, functional: e.target.checked }))}
                        />
                        <div>
                            <strong>Функціональні</strong>
                            <span>Збереження профілів, статистики, налаштувань таймера та результатів сесії. Без цієї згоди гра працюватиме, але весь прогрес зникатиме після оновлення сторінки (F5).</span>
                        </div>
                    </label>

                    <label className={styles.option}>
                        <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                        />
                        <div>
                            <strong>Аналітика</strong>
                            <span>Анонімний збір даних про тривалість сесій для покращення балансу гри.</span>
                        </div>
                    </label>

                    <div className={styles.actions}>
                        <button type="button" onClick={handleSaveCustom}>Зберегти вибір</button>
                        <button type="button" onClick={() => setShowManage(false)}>Назад</button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export function Modal({
                          isOpen,
                          onClose,
                          title,
                          children,
                          showCloseButton = true,
                          hasBackdropBlur = true
                      }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen)
        return null;


    return createPortal(
        <div
            className={`${styles.backdrop} ${hasBackdropBlur ? styles.backdropBlur : ''}`}
        >
            <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <div className={styles.header}>
                    {title && (
                        <h2 id="modal-title" className={styles.title}>
                            {title}
                        </h2>
                    )}
                    {showCloseButton && onClose && (
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Закрити"
                            type="button"
                        >
                            x
                        </button>
                    )}
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
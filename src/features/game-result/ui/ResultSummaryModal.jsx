import {Button, Card, Modal} from "@shared/ui";
import {RecordBadge} from "@features/game-stats";
import {formatPercent} from "@shared/utils";
import styles from "./ResultSummaryModal.module.css";

export function ResultSummaryModal({
                                       isOpen,
                                       onClose,
                                       successRate,
                                       isNewRecord = false,
                                       onViewDetails,
                                       onGoHome,
                                       onTryAgain,
                                   }) {
    const percent = formatPercent(successRate);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Результат гри"
            hasBackdropBlur
            showCloseButton
        >
            <div className={styles.root}>
                <Card as="section" className={styles.coefficientCard}>
                    {isNewRecord && (
                        <div className={styles.recordBadgeWrapper}>
                            <RecordBadge/>
                        </div>
                    )}

                    <div className={styles.coefficientLabel}>Коефіцієнт успішності</div>
                    <div className={styles.coefficientValue}>{percent}%</div>

                    <p className={styles.coefficientDescription}>
                        Показник залежить від швидкості та точності розв’язання.
                    </p>
                </Card>

                <div className={styles.actions}>
                    <Button variant="secondary" size="large" fullWidth onClick={onViewDetails}>
                        Детальніше
                    </Button>
                    <div className={styles.smallActions}>
                        <Button variant="ghost" size="large" fullWidth onClick={onGoHome}>
                            На головну
                        </Button>

                        <Button variant="primary" size="large" fullWidth onClick={onTryAgain}>
                            Спробувати ще раз
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Modal, Button } from "@shared/ui";
import styles from "./SettingsModal.module.css";
import { useCategories } from "@features/words/index.js";
import {TIME_CONSTRAINTS, WORD_LENGTH_CONSTRAINTS} from "@features/game-settings/index.js";

export function SettingsModal({ isOpen, onClose, settings, onSave }) {
    const { categories, isLoading: categoriesLoading } = useCategories();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: settings,
    });

    useEffect(() => {
        if (isOpen) {
            reset(settings);
        }
    }, [isOpen, settings, reset]);

    const minWordLength = watch("minWordLength");

    const onSubmit = (data) => {
        onSave(data);
        onClose();
    };

    const handleClose = () => {
        reset(settings);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Налаштування гри"
            hasBackdropBlur={true}
        >
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <FormField
                    id="minWordLength"
                    label="Мінімальна кількість літер"
                    type="number"
                    error={errors.minWordLength}
                    register={register("minWordLength", {
                        required: "Це поле обов'язкове",
                        valueAsNumber: true,
                        min: {
                            value: WORD_LENGTH_CONSTRAINTS.MIN,
                            message: `Мінімум ${WORD_LENGTH_CONSTRAINTS.MIN} літери`,
                        },
                        max: {
                            value: WORD_LENGTH_CONSTRAINTS.MAX,
                            message: `Максимум ${WORD_LENGTH_CONSTRAINTS.MAX} літер`,
                        },
                    })}
                />

                <FormField
                    id="maxWordLength"
                    label="Максимальна кількість літер"
                    type="number"
                    error={errors.maxWordLength}
                    register={register("maxWordLength", {
                        required: "Це поле обов'язкове",
                        valueAsNumber: true,
                        min: {
                            value: WORD_LENGTH_CONSTRAINTS.MIN,
                            message: `Мінімум ${WORD_LENGTH_CONSTRAINTS.MIN} літери`,
                        },
                        max: {
                            value: WORD_LENGTH_CONSTRAINTS.MAX,
                            message: `Максимум ${WORD_LENGTH_CONSTRAINTS.MAX} літер`,
                        },
                        validate: {
                            greaterThanMin: (value) =>
                                value >= Number(minWordLength) ||
                                `Має бути не менше мінімальної довжини (${minWordLength})`,
                        },
                    })}
                />

                <FormField
                    id="timeSeconds"
                    label="Час (секунд)"
                    type="number"
                    error={errors.timeSeconds}
                    register={register("timeSeconds", {
                        required: "Це поле обов'язкове",
                        valueAsNumber: true,
                        min: {
                            value: TIME_CONSTRAINTS.MIN,
                            message: `Мінімум ${TIME_CONSTRAINTS.MIN} секунд`,
                        },
                        max: {
                            value: TIME_CONSTRAINTS.MAX,
                            message: `Максимум ${TIME_CONSTRAINTS.MAX} секунд`,
                        },
                    })}
                />

                <div className={styles.field}>
                    <label htmlFor="category" className={styles.label}>
                        Категорія
                    </label>
                    <select
                        id="category"
                        className={`${styles.select} ${
                            errors.category ? styles.inputError : ""
                        }`}
                        disabled={categoriesLoading}
                        {...register("category", {
                            required: "Виберіть категорію",
                        })}
                    >
                        <option value="">
                            {categoriesLoading ? "Завантаження..." : "Оберіть категорію"}
                        </option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <span className={styles.error}>{errors.category.message}</span>
                    )}
                </div>

                <div className={styles.actions}>
                    <Button
                        variant="secondary"
                        type="button"
                        size="large"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Скасувати
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        size="large"
                        disabled={isSubmitting || categoriesLoading}
                    >
                        {isSubmitting ? "Збереження..." : "Зберегти"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}

function FormField({ id, label, type, error, register }) {
    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                className={`${styles.input} ${error ? styles.inputError : ""}`}
                {...register}
            />
            {error && (
                <span className={styles.error}>{error.message}</span>
            )}
        </div>
    );
}
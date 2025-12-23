import styles from './WordInputField.module.css';
import { LetterSlot } from '../letter-slot/LetterSlot';
import { CursorSlot } from '../cursor-slot/CursorSlot';

export function WordInputField({
                                   letters,
                                   wordLength,
                                   selectedSlotIndex = null,
                                   selectedCursorIndex = null,
                                   onSlotClick,
                                   onCursorClick
                               }) {
    const slots = Array.from({ length: wordLength }, (_, i) => letters[i] || '');

    const renderSlots = () => {
        const elements = [];

        elements.push(
            <CursorSlot
                key={`cursor-0`}
                index={0}
                isActive={selectedCursorIndex === 0}
                onClick={onCursorClick}
            />
        );

        slots.forEach((letter, index) => {
            elements.push(
                <LetterSlot
                    key={`slot-${index}`}
                    letter={letter}
                    index={index}
                    isSelected={selectedSlotIndex === index}
                    onClick={onSlotClick}
                />
            );

            elements.push(
                <CursorSlot
                    key={`cursor-${index + 1}`}
                    index={index + 1}
                    isActive={selectedCursorIndex === index + 1}
                    onClick={onCursorClick}
                />
            );
        });

        return elements;
    };

    return (
        <div className={styles.root}>
            {renderSlots()}
        </div>
    );
}
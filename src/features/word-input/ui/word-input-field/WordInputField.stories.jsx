import { useState } from 'react';
import { WordInputField } from './WordInputField';
import { LetterTiles } from '../../../letter-selection/';

export default {
    title: 'Features/Word Input/WordInputField',
    component: WordInputField,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        letters: {
            control: 'object',
            description: 'Поточний масив заповнених літер у полі введення',
            table: { type: { summary: 'array' } },
        },
        wordLength: {
            control: 'number',
            description: 'Загальна довжина цільового слова',
            table: { type: { summary: 'number' } },
        },
        selectedSlotIndex: {
            control: 'number',
            description: 'Індекс виділеного слота літери',
            table: { type: { summary: 'number' }, defaultValue: { summary: 'null' } },
        },
        selectedCursorIndex: {
            control: 'number',
            description: 'Індекс виділеної позиції курсора',
            table: { type: { summary: 'number' }, defaultValue: { summary: 'null' } },
        },
        correctWord: {
            control: 'text',
            description: 'Еталонне правильне слово для звірки',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'null' } },
        },
        hintMode: {
            control: 'boolean',
            description: 'Активний режим відображення підказок',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        isInvalid: {
            control: 'boolean',
            description: 'Стан тригеру помилки при повному заповненні невірного слова',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        onSlotClick: { action: 'slot-clicked' },
        onCursorClick: { action: 'cursor-clicked' },
    },
};

export const EmptyStructure = {
    args: {
        wordLength: 6,
        letters: [],
        selectedCursorIndex: 0,
    },
};

export const ErrorVerificationState = {
    args: {
        wordLength: 6,
        letters: ['L', 'I', 'S', 'N', 'T', 'E'],
        correctWord: 'SILENT',
        isInvalid: true,
    },
};

export const GameFlowSimulation = {
    render: (args) => {
        const targetWord = 'SILENT';
        const availableChars = ['L', 'N', 'S', 'T', 'I', 'E'];

        const [inputLetters, setInputLetters] = useState(Array(targetWord.length).fill(''));
        const [usedTileIndices, setUsedTileIndices] = useState([]);
        const [cursorIndex, setCursorIndex] = useState(0);
        const [slotIndex, setSlotIndex] = useState(null);

        const handleTileClick = (tileIndex, char) => {
            const nextLetters = [...inputLetters];
            let targetPos = slotIndex !== null ? slotIndex : cursorIndex;

            if (targetPos >= targetWord.length || targetPos === null) {
                targetPos = nextLetters.findIndex(l => l === '');
            }

            if (targetPos !== -1 && targetPos < targetWord.length) {
                nextLetters[targetPos] = char;
                setInputLetters(nextLetters);
                setUsedTileIndices([...usedTileIndices, tileIndex]);

                setSlotIndex(null);
                const nextEmpty = nextLetters.findIndex((l, idx) => idx > targetPos && l === '');
                setCursorIndex(nextEmpty !== -1 ? nextEmpty : targetPos + 1);
            }
        };

        const handleSlotClick = (index) => {
            const charToRemove = inputLetters[index];
            if (!charToRemove) {
                setSlotIndex(index);
                setCursorIndex(null);
                return;
            }

            const nextLetters = [...inputLetters];
            nextLetters[index] = '';
            setInputLetters(nextLetters);

            const tileIndexToRestore = availableChars.findIndex(
                (char, tIdx) => char === charToRemove && usedTileIndices.includes(tIdx)
            );

            if (tileIndexToRestore !== -1) {
                setUsedTileIndices(usedTileIndices.filter(idx => idx !== tileIndexToRestore));
            }

            setSlotIndex(index);
            setCursorIndex(null);
        };

        const handleCursorClick = (index) => {
            setCursorIndex(index);
            setSlotIndex(null);
        };

        const isCurrentWrong = inputLetters.every(l => l !== '') && inputLetters.join('') !== targetWord;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', width: '500px' }}>
                <WordInputField
                    {...args}
                    letters={inputLetters}
                    wordLength={targetWord.length}
                    selectedSlotIndex={slotIndex}
                    selectedCursorIndex={cursorIndex}
                    correctWord={targetWord}
                    isInvalid={isCurrentWrong}
                    onSlotClick={handleSlotClick}
                    onCursorClick={handleCursorClick}
                />

                <div style={{ fontSize: '13px', color: '#666', textAlign: 'center' }}>
                    Target Word Reference: {targetWord}
                </div>

                <LetterTiles
                    letters={availableChars}
                    disabledIndices={usedTileIndices}
                    onLetterClick={handleTileClick}
                />
            </div>
        );
    },
    args: {
        hintMode: false,
    },
};
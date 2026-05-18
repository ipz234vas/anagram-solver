import { LetterSlot } from './LetterSlot';

export default {
    title: 'Features/Word Input/LetterSlot',
    component: LetterSlot,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        letter: {
            control: 'text',
            description: 'Символ, який відображається у слоті',
            table: { type: { summary: 'string' } },
        },
        index: {
            control: 'number',
            description: 'Порядковий індекс слота в полі введення',
            table: { type: { summary: 'number' } },
        },
        isSelected: {
            control: 'boolean',
            description: 'Флаг активного виділення слота користувачем',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        hintMode: {
            control: 'boolean',
            description: 'Режим відображення підказки для цього слота',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        isError: {
            control: 'boolean',
            description: 'Флаг помилково заповненого слова',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        isCorrect: {
            control: 'boolean',
            description: 'Флаг підтвердженого правильного символу',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        onClick: {
            action: 'slot-clicked',
            description: 'Колбек при натисканні на слот літери',
            table: { type: { summary: 'function' } },
        },
    },
};

export const Empty = {
    args: {
        letter: '',
        index: 0,
        isSelected: false,
    },
};

export const Filled = {
    args: {
        letter: 'A',
        index: 0,
        isSelected: false,
    },
};

export const Selected = {
    args: {
        letter: 'B',
        index: 1,
        isSelected: true,
    },
};

export const Hint = {
    args: {
        letter: 'C',
        index: 2,
        hintMode: true,
    },
};

export const ErrorState = {
    args: {
        letter: 'W',
        index: 3,
        isError: true,
    },
};

export const CorrectState = {
    args: {
        letter: 'R',
        index: 4,
        isCorrect: true,
    },
};
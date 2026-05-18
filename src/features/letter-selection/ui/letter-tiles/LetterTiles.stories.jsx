import { LetterTiles } from './LetterTiles';

export default {
    title: 'Features/Letter Selection/LetterTiles',
    component: LetterTiles,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        letters: {
            control: 'object',
            description: 'Масив символів для генерації доступних плиток',
            table: { type: { summary: 'array' } },
        },
        disabledIndices: {
            control: 'object',
            description: 'Масив індексів плиток, які вже були використані у полі вводу',
            table: { type: { summary: 'array' } },
        },
        onLetterClick: {
            action: 'letter-tile-clicked',
            description: 'Колбек при натисканні на доступну плитку літери',
            table: { type: { summary: 'function' } },
        },
    },
};

export const InitialState = {
    args: {
        letters: ['L', 'N', 'S', 'T', 'I', 'E'],
        disabledIndices: [],
    },
};

export const PartiallyUsed = {
    args: {
        letters: ['L', 'N', 'S', 'T', 'I', 'E'],
        disabledIndices: [0, 2, 4],
    },
};
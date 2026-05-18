import { CursorSlot } from './CursorSlot';

export default {
    title: 'Features/Word Input/CursorSlot',
    component: CursorSlot,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        index: {
            control: 'number',
            description: 'Індекс позиції курсора для вставки між слотами',
            table: { type: { summary: 'number' } },
        },
        isActive: {
            control: 'boolean',
            description: 'Стан активного фокусу на даній позиції вводу',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        onClick: {
            action: 'cursor-clicked',
            description: 'Колбек при натисканні на зону курсора',
            table: { type: { summary: 'function' } },
        },
    },
};

export const Default = {
    args: {
        index: 0,
        isActive: false,
    },
};

export const Active = {
    args: {
        index: 1,
        isActive: true,
    },
};
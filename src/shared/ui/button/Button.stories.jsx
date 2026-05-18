import { userEvent, within, expect, fn } from '@storybook/test';
import { Button } from './Button';

export default {
    title: 'Shared/UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Вміст кнопки',
            table: { type: { summary: 'ReactNode' } },
        },
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'danger', 'warning', 'ghost', 'link'],
            description: 'Візуальний стиль оформлення кнопки',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'primary' } },
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Розмір кнопки',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'medium' } },
        },
        fullWidth: {
            control: 'boolean',
            description: 'Чи повинна кнопка займати всю ширину контейнера',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        disabled: {
            control: 'boolean',
            description: 'Стан блокування кнопки',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        type: {
            control: 'select',
            options: ['button', 'submit', 'reset'],
            description: 'HTML атрибут type',
            table: { type: { summary: 'string' }, defaultValue: { summary: 'button' } },
        },
        className: {
            control: 'text',
            description: 'Додаткові користувацькі CSS класи',
            table: { type: { summary: 'string' }, defaultValue: { summary: '' } },
        },
        onClick: {
            description: 'Функція зворотного виклику при натисканні',
            table: { type: { summary: 'function' } },
        },
    },
    args: {
        onClick: fn(),
    },
};

export const Primary = {
    args: {
        variant: 'primary',
        children: 'Start Game',
    },
};

export const Secondary = {
    args: {
        variant: 'secondary',
        children: 'Settings',
    },
};

export const Success = {
    args: {
        variant: 'success',
        children: 'Save Progress',
    },
};

export const Danger = {
    args: {
        variant: 'danger',
        children: 'Delete Profile',
    },
};

export const Warning = {
    args: {
        variant: 'warning',
        children: 'Reset Level',
    },
};

export const Ghost = {
    args: {
        variant: 'ghost',
        children: 'Cancel',
    },
};

export const LinkVariant = {
    args: {
        variant: 'link',
        children: 'View Leaderboard',
    },
};

export const Small = {
    args: {
        variant: 'primary',
        size: 'small',
        children: 'Hint',
    },
};

export const Large = {
    args: {
        variant: 'primary',
        size: 'large',
        children: 'Main Menu',
    },
};

export const DisabledState = {
    args: {
        variant: 'primary',
        disabled: true,
        children: 'Loading...',
    },
};

export const FullWidthState = {
    args: {
        variant: 'primary',
        fullWidth: true,
        children: 'Submit Answer',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '400px', padding: '10px', background: '#222' }}>
                <Story />
            </div>
        ),
    ],
};

export const InteractiveClickTest = {
    args: {
        variant: 'primary',
        children: 'Click Simulator',
    },
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement);
        const button = canvas.getByRole('button');
        await expect(button).toBeInTheDocument();
        await userEvent.click(button);
        await expect(args.onClick).toHaveBeenCalled();
    },
};
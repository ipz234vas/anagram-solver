import {forwardRef} from 'react';
import {Timer} from "@shared/ui/index.js";

export const GameTimer = forwardRef(({warningAt, dangerAt, duration, onTimeOver}, ref) => {
    const timeLeft = 50;

    const getTimerState = () => {
        if (timeLeft <= dangerAt)
            return {danger: true};
        if (timeLeft <= warningAt)
            return {warning: true};
        return {};
    };

    return (
        <Timer
            seconds={timeLeft}
            size="large"
            {...getTimerState()}
        />
    );
});
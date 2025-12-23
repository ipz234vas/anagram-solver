import { forwardRef } from 'react';
import { Timer } from "@shared/ui/index.js";
import { useTimerRef } from "../../hooks/useTimerRef.js";

export const GameTimer = forwardRef(({ duration = 60, onTimeOver, warningAt, dangerAt, autoStart = false }, ref) => {
    const { timeLeft } = useTimerRef(ref, {
        duration,
        onTimeOver,
        autoStart
    });

    const timerState = () => {
        if (timeLeft <= dangerAt) {
            return { danger: true };
        }
        if (timeLeft <= warningAt) {
            return { warning: true };
        }
        return {};
    }

    return (
        <Timer
            seconds={timeLeft}
            size="large"
            {...timerState}
        />
    );
});
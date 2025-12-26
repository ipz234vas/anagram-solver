import { useState, useEffect, useRef } from "react";

export function useTimer({ duration, onTimeOver, autoStart = false }) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(autoStart);

    const intervalRef = useRef(null);
    const onTimeOverRef = useRef(onTimeOver);

    useEffect(() => {
        onTimeOverRef.current = onTimeOver;
    }, [onTimeOver]);

    useEffect(() => {
        if (!isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning]);

    useEffect(() => {
        if (!isRunning)
            return;
        if (timeLeft !== 0)
            return;

        setIsRunning(false);
        onTimeOverRef.current?.();
    }, [timeLeft, isRunning]);

    const start = () => {
        setTimeLeft(duration);
        setIsRunning(true);
    };

    const pause = () => setIsRunning(false);

    const resume = () => {
        if (timeLeft > 0) setIsRunning(true);
    };

    const reset = () => {
        setIsRunning(false);
        setTimeLeft(duration);
    };

    const stop = () => {
        setIsRunning(false);
        setTimeLeft(0);
    };

    return {
        timeLeft,
        isRunning,
        start,
        pause,
        resume,
        reset,
        stop,
    };
}
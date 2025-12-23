import { useState, useEffect, useRef } from 'react';

export function useTimer({ duration, onTimeOver, autoStart = false }) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isPaused, setIsPaused] = useState(!autoStart);

    const intervalRef = useRef(null);
    const onTimeOverRef = useRef(onTimeOver);

    useEffect(() => {
        onTimeOverRef.current = onTimeOver;
    }, [onTimeOver]);

    useEffect(() => {
        if (isPaused || timeLeft <= 0) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (onTimeOverRef.current) {
                        onTimeOverRef.current();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPaused, timeLeft]);

    const start = () => {
        setTimeLeft(duration);
        setIsPaused(false);
    };

    const pause = () => {
        setIsPaused(true);
    };

    const resume = () => {
        setIsPaused(false);
    };

    const reset = () => {
        setTimeLeft(duration);
        setIsPaused(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    const stop = () => {
        setIsPaused(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    return {
        timeLeft,
        isPaused,
        start,
        pause,
        resume,
        reset,
        stop
    };
}

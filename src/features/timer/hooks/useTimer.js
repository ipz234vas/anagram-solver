import { useState, useEffect, useRef } from 'react';

export function useTimer({ duration, onTimeOver, autoStart = false }) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(autoStart);

    const intervalRef = useRef(null);
    const onTimeOverRef = useRef(onTimeOver);
    const timeLeftRef = useRef(timeLeft);

    useEffect(() => {
        onTimeOverRef.current = onTimeOver;
    }, [onTimeOver]);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        if (!isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        if (timeLeft <= 0) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsRunning(false);
                    onTimeOverRef.current?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isRunning, timeLeft]);

    const start = () => {
        setTimeLeft(duration);
        setIsRunning(true);
    };

    const pause = () => {
        setIsRunning(false);
    };

    const resume = () => {
        if (timeLeftRef.current > 0) {
            setIsRunning(true);
        }
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
        stop
    };
}
import { useImperativeHandle } from 'react';
import { useTimer } from './useTimer';

export function useTimerRef(ref, { duration, onTimeOver, autoStart = false }) {
    const timer = useTimer({ duration, onTimeOver, autoStart });

    useImperativeHandle(
        ref,
        () => ({
            start: timer.start,
            pause: timer.pause,
            resume: timer.resume,
            reset: timer.reset,
            stop: timer.stop,
            get timeLeft() {
                return timer.timeLeft;
            },
            get isRunning() {
                return timer.isRunning;
            },
        }),
        [timer.start, timer.pause, timer.resume, timer.reset, timer.stop, timer.timeLeft, timer.isRunning]
    );

    return timer;
}
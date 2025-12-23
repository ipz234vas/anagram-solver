import {useImperativeHandle} from 'react';
import {useTimer} from './useTimer';

export function useTimerRef(ref, {duration, onTimeOver, autoStart = false}) {
    const timer = useTimer({duration, onTimeOver, autoStart});

    useImperativeHandle(ref, () => ({
        start: timer.start,
        pause: timer.pause,
        resume: timer.resume,
        reset: timer.reset,
        stop: timer.stop,
        getTimeLeft: () => timer.timeLeft,
        isPaused: () => timer.isPaused
    }), [timer]);

    return timer;
}

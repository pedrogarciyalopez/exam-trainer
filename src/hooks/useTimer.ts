import { useEffect, useRef, useState } from "react";

export const useTimer = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const running = useRef(true);

  useEffect(() => {
    running.current = true;
    const id = setInterval(() => {
      setSeconds((s) => (running.current && s > 0 ? s - 1 : s));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const reset = () => setSeconds(initialSeconds);
  const stop = () => (running.current = false);
  return { seconds, reset, stop };
};

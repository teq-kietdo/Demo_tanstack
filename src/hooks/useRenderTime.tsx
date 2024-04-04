import { useState, useRef, useEffect } from "react";

interface RenderTimeHook {
  renderTime: number | null;
}

function useRenderTime(): RenderTimeHook {
  const [renderTime, setRenderTime] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = performance.now();

    return () => {
      const endTime = performance.now();
      setRenderTime(endTime - startTimeRef.current!); // Use non-null assertion
    };
  }, []);

  return { renderTime };
}

export default useRenderTime;

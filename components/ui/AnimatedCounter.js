import React, { useState, useEffect } from "react";

function AnimatedCounter({ target, duration = 3 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const totalFrames = duration * 60;
    let frame = 0;

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    function updateCounter() {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentCount = Math.floor(progress * target);
      setCount(currentCount > target ? target : currentCount);

      if (frame < totalFrames) {
        requestAnimationFrame(updateCounter);
      }
    }

    const timer = setTimeout(() => {
      requestAnimationFrame(updateCounter);
    }, 1500);

    return () => {
      clearTimeout(timer);
      setCount(target);
    };
  }, [target, duration]);

  return <>{count.toLocaleString()}</>;
}

export default AnimatedCounter;

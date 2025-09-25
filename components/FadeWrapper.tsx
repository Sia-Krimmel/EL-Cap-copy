import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const FadeWrapper = ({ children, isVisible, onComplete }: any) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      anime({
        targets: contentRef.current,
        opacity: [0, 1],
        duration: 3000,
        easing: 'easeInOutQuad',
        complete: onComplete,
      });
    } else {
      anime({
        targets: contentRef.current,
        opacity: [1, 0],
        duration: 3000,
        easing: 'easeInOutQuad',
        complete: onComplete,
      });
    }
  }, [isVisible]);

  return (
    <div ref={contentRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

export default FadeWrapper;

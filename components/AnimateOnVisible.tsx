'use client';

import styles from '@components/AnimateOnVisible.module.scss';
import { classNames } from '@root/common/utilities';

import { useEffect, useRef, useState } from 'react';

export function useIsVisible(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
}

const FadeInAnimation = ({ children, delay = 0.6 }) => {
  const ref = useRef(null);
  const isVisible = useIsVisible(ref);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const hasSeenPage = sessionStorage.getItem('hasSeenPage');
    if (isVisible) {
      setAnimate(true);
      sessionStorage.setItem('hasSeenPage', 'true');
    } else if (!hasSeenPage) {
      setAnimate(false);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className={classNames(styles.content, animate ? styles.animated : '')} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

export default FadeInAnimation;

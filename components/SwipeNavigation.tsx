'use client';

import styles from '@components/SwipeNavigation.module.scss';

import anime from 'animejs';

import { useEffect, useRef, useState } from 'react';
import { FeaturedArticleProps } from '@root/components/FeaturedArticle';

export interface SwipeNavigationProps {
  navItems: {
    title: string;
    items: FeaturedArticleProps[];
  }[];
  onNavChange?: (title: string) => void;
  style?: React.CSSProperties;
}

export interface ReadingNavigationProps {
  title: string;
  items: FeaturedArticleProps[];
}

export default function SwipeNavigation({ navItems, onNavChange, style }: SwipeNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const underlineRef = useRef(null);

  useEffect(() => {
    if (navItems.length > 0) {
      onNavChange(navItems[0].title);
    }
  }, []);

  useEffect(() => {
    const activeElement: any = document.querySelector(`.${styles.active}`);
    if (activeElement && underlineRef.current) {
      const titleWidth = activeElement.offsetWidth;

      anime({
        targets: underlineRef.current,
        left: activeElement.offsetLeft,
        width: titleWidth,
        duration: 300,
        easing: 'easeInOutQuad',
      });
    }
  }, [activeIndex]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    onNavChange(navItems[index].title);
  };

  return (
    <div className={styles.grid} style={style}>
      <div className={styles.borderBottomWrapper}>
        <div className={styles.linksRow}>
          {navItems.map((item, index) => {
            const itemClass = index === activeIndex ? `${styles.link} ${styles.active} ` : styles.link;

            return (
              <div className={itemClass} key={index} onClick={() => handleItemClick(index)}>
                <p className={styles.title}>{item.title}</p>
              </div>
            );
          })}
          <div ref={underlineRef} className={styles.underline} />
        </div>
      </div>
    </div>
  );
}

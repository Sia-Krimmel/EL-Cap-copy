import styles from '@components/LearnMore.module.scss';

import { Arrow } from '@root/components/svgs/Arrow';
import React, { useEffect, useRef, useState } from 'react';

interface LearnMoreProps {
  text: string;
  dropdownContent: string;
}

const LearnMore = ({ text, dropdownContent }: LearnMoreProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (underlineRef.current) {
      underlineRef.current.style.width = '100%'; // Set initial width to reveal immediately
    }
  }, []);

  return (
    <div className={styles.learnMore}>
      <div className={`${styles.dropdownContainer} ${expanded ? styles.expanded : ''}`}>
        <div className={styles.dropdownContent}>{dropdownContent}</div>
      </div>
      <div className={styles.body} onClick={toggleExpand}>
        <div className={styles.contentWithArrow}>
          <span className={styles.underline} ref={underlineRef} style={{ animationDelay: `200ms`, textDecoration: 'none' }}>
            {expanded ? 'Close' : text}
          </span>
          <Arrow className={`${styles.arrow} ${expanded ? styles.rotate : ''}`} />
        </div>
      </div>
    </div>
  );
};

export default LearnMore;

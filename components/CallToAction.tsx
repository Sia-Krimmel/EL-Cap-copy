import styles from '@components/CallToAction.module.scss';

import Link from 'next/link';
import { Arrow } from '@root/components/svgs/Arrow';
import { useEffect, useRef } from 'react';

interface CallToActionProps {
  link: string;
  text: string;
  animationDelay?: string;
  textColor?: string;
}

const CallToAction: React.FC<CallToActionProps> = ({ link, text, animationDelay, textColor }) => {
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (underlineRef.current) {
      underlineRef.current.style.width = '100%'; // Set initial width to reveal immediately
    }
  }, []);

  return (
    <div className={styles.link}>
      <Link href={link} style={{ textDecoration: 'none' }}>
        <div className={styles.body}>
          <span className={styles.underline} ref={underlineRef} style={{ animationDelay: `${animationDelay}s`, color: textColor ? textColor : 'currentColor' }}>
            {text}
          </span>
        </div>
      </Link>

      <Arrow className={styles.arrow} />
    </div>
  );
};

export default CallToAction;

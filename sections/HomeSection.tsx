'use client';

import styles from '@root/sections/HomeSection.module.scss';

import React, { useEffect, useState } from 'react';

import { classNames } from '@root/common/utilities';
import { ElCap } from '@root/components/svgs/ElCap';
import { H2 } from '@root/system/typography';
import CallToAction from '@root/components/CallToAction';
import FadeInAnimation from '@root/components/AnimateOnVisible';
import FadeWrapper from '@root/components/FadeWrapper';
import PageGutterWrapper from '@root/components/PageGutterWrapper';
import ElcapMobileSVG from '@root/components/svgs/ElcapMobileSVG';

export default function HomeSection() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    document.body.classList.add('theme-beige');
    setIsLoaded(true);

    const preventDefault = (e) => e.preventDefault();
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove', preventDefault, { passive: false });
    document.addEventListener('wheel', preventDefault, { passive: false });

    return () => {
      document.body.classList.remove('theme-beige');
      document.body.style.overflow = 'auto';
      document.removeEventListener('touchmove', preventDefault);
      document.removeEventListener('wheel', preventDefault);
    };
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <FadeWrapper isVisible={isVisible}>
      <div className={styles.container}>
        <PageGutterWrapper>
          <div className={styles.body}>
            <FadeInAnimation delay={0.1}>
              <H2 className={styles.h2}>We build and invest at the collision of technology shifts and behavior change.</H2>

              <div className={styles.callToAction}>
                <CallToAction text="Read the Founders' Letter" link="/el-cap/el-cap-founders-letter" textColor="var(--color-text)" />
              </div>
            </FadeInAnimation>
          </div>
        </PageGutterWrapper>

        <div className={classNames(styles.logoContainer, styles.logoContainerMobile)}>
          <div className={styles.logoDesktop}>
            <FadeInAnimation delay={0.1}>
              <ElCap className={classNames(styles.elcapLogo, styles.path)} />
            </FadeInAnimation>
          </div>

          <div className={styles.logoMobile}>
            <div className={classNames(styles.elcapLogoMobile)}>
              <ElcapMobileSVG className={classNames(styles.mobileSvg)} />
            </div>
          </div>
        </div>
      </div>
    </FadeWrapper>
  );
}

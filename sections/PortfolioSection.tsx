'use client';

import styles from '@components/PortfolioItems.module.scss';

import { FOOTER } from '@root/common/constants';
import { useState } from 'react';
import FadeWrapper from '@root/components/FadeWrapper';
import SectionFooter from '@root/components/SectionFooter';
import PortfolioItems from '@root/components/PortfolioItems';

export default function PortfolioSection({ portfolio }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <FadeWrapper isVisible={isVisible}>
      <div className={styles.portfolioSection} style={{ paddingBottom: 'var(--spacing-for-bottom-of-page)' }}>
        <PortfolioItems {...portfolio} />
      </div>
      <SectionFooter tagline={FOOTER.tagline} links={FOOTER.links} copyright={FOOTER.copyright} />
    </FadeWrapper>
  );
}

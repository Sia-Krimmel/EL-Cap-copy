'use client';

import { FOOTER } from '@common/constants';
import { useState } from 'react';
import SectionAboutHero from '@root/components/SectionAboutHero';
import SectionFooter from '@root/components/SectionFooter';
import FadeWrapper from '@root/components/FadeWrapper';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <FadeWrapper isVisible={isVisible}>
      <SectionAboutHero />
      <SectionFooter tagline={FOOTER.tagline} links={FOOTER.links} copyright={FOOTER.copyright} />{' '}
    </FadeWrapper>
  );
}

'use client';

import { FOOTER } from '@root/common/constants';
import { useState } from 'react';
import FadeWrapper from '@root/components/FadeWrapper';
import SectionContributors from '@root/components/SectionContributors';
import SectionFooter from '@root/components/SectionFooter';

export default function ContributorsSection({ contributors }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <FadeWrapper isVisible={isVisible}>
      <SectionContributors contributors={contributors} />
      <SectionFooter tagline={FOOTER.tagline} links={FOOTER.links} copyright={FOOTER.copyright} />
    </FadeWrapper>
  );
}

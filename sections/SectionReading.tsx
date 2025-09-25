'use client';

import { useState } from 'react';
import FadeWrapper from '@root/components/FadeWrapper';
import SectionFooter from '@root/components/SectionFooter';
import SectionReadingList from '@root/components/ReadingListSection';

export default function SectionReading({ footer, formattedReadings }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <FadeWrapper isVisible={isVisible}>
      {formattedReadings && (
        <div style={{ paddingBottom: 'var(--spacing-for-bottom-of-page)' }}>
          <SectionReadingList readingList={formattedReadings} />{' '}
        </div>
      )}
      <SectionFooter {...footer} />
    </FadeWrapper>
  );
}

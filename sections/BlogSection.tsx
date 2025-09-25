'use client';

import { useState } from 'react';
import FadeWrapper from '@root/components/FadeWrapper';
import SectionFooter from '@root/components/SectionFooter';
import BlogArticles from '@root/components/BlogArticles';

export default function BlogSection({ blogArticles, footer }) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <FadeWrapper isVisible={isVisible}>
      <div style={{ paddingBottom: 'var(--spacing-for-bottom-of-page)' }}>
        <BlogArticles blogArticles={blogArticles} />
      </div>
      <SectionFooter {...footer} />
    </FadeWrapper>
  );
}

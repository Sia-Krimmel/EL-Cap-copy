'use client';

import { P } from '@root/system/typography';
import { useState } from 'react';
import FadeInAnimation from '@root/components/AnimateOnVisible';
import FeaturedArticle, { FeaturedArticleProps } from '@root/components/FeaturedArticle';
import Link from '@root/components/Link';
import PageGutterWrapper from '@root/components/PageGutterWrapper';
import styles from '@components/ReadingListSection.module.scss';
import SwipeNavigation from '@root/components/SwipeNavigation';

interface ReadingListSectionProps {
  readingList: {
    title: string;
    items: FeaturedArticleProps[];
  }[];
}

const ITEMS_PER_PAGE = 16;

const SectionReadingList: React.FC<ReadingListSectionProps> = ({ readingList }) => {
  const readingListPresent = readingList && readingList.length > 0 ? readingList[0].items : [];
  const [activeContent, setActiveContent] = useState<FeaturedArticleProps[]>(readingListPresent);
  const [currentPage, setCurrentPage] = useState(0);

  const handleNavChange = (title: string) => {
    const activeNav = readingList.find((nav) => nav.title === title);
    if (activeNav && activeNav.items) {
      setActiveContent(activeNav.items);
    } else {
      setActiveContent([]);
    }
  };

  // Pagination
  const indexOfLastItem = (currentPage + 1) * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = activeContent.slice(indexOfFirstItem, indexOfLastItem);

  const pageCount = Math.ceil(activeContent.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className={styles.container}>
      <PageGutterWrapper>
        <SwipeNavigation navItems={readingList} onNavChange={handleNavChange} style={{ paddingBottom: '48px' }} />

        <div className={styles.articles}>
          {currentItems.length > 0 ? (
            currentItems.map((article, index) =>
              article.href ? (
                <Link href={article.href} target="_blank" key={`${currentPage}-${index}`} className={styles.article}>
                  <FadeInAnimation delay={0.2}>
                    <FeaturedArticle {...article} />
                  </FadeInAnimation>
                </Link>
              ) : (
                <FadeInAnimation delay={0.2} key={index}>
                  <div className={styles.article}>
                    <FeaturedArticle {...article} />
                  </div>
                </FadeInAnimation>
              )
            )
          ) : (
            <P style={{ color: 'var(--theme-foreground-text)' }}>No Readings</P>
          )}
        </div>
        {pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />}
      </PageGutterWrapper>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageChange }) => {
  const MAX_PAGES = 8;
  let items = [];
  let leftBoundary = Math.max(0, currentPage - 4);
  let rightBoundary = Math.min(pageCount, leftBoundary + MAX_PAGES);

  // Correct boundaries
  if (rightBoundary - leftBoundary < MAX_PAGES) {
    leftBoundary = Math.max(0, rightBoundary - MAX_PAGES);
  }

  // Add left arrow for scrolling
  items.push(
    <button key="left" onClick={() => onPageChange(leftBoundary - 1)} disabled={leftBoundary === 0} className={leftBoundary === 0 ? styles.disabled : ''}>
      &laquo;
    </button>
  );

  // Generate page numbers
  for (let i = leftBoundary; i < rightBoundary; i++) {
    items.push(
      <button key={i} onClick={() => onPageChange(i)} className={i === currentPage ? styles.activePage : ''} disabled={i === currentPage}>
        {i + 1}
      </button>
    );
  }

  // Add right arrow for scrolling
  items.push(
    <button key="right" disabled={rightBoundary >= pageCount} onClick={() => onPageChange(rightBoundary)} className={rightBoundary >= pageCount ? styles.disabled : ''}>
      &raquo;
    </button>
  );

  return <div className={styles.pagination}>{items}</div>;
};

export default SectionReadingList;

'use client';

import styles from '@root/components/FeaturedArticle.module.scss';

import { Arrow } from '@root/components/svgs/Arrow';
import { classNames } from '@root/common/utilities';
import { P } from '@root/system/typography';
import { useRef, useState } from 'react';
import Link from '@root/components/Link';

export interface FeaturedArticleProps {
  authors?: string[];
  category?: string[];
  href: string;
  showFullTitle?: boolean;
  title: string;
}
export interface ArticleRecord {
  _rawJson: {
    createdTime: string;
  };
  fields: {
    Name: string;
    Topic?: string;
    Link: string;
  };
}

function truncateTitle(title) {
  if (!title) return { displayTitle: '', truncated: false };

  const maxLength = 85;
  let displayTitle: string = title;
  let truncated: boolean = false;

  if (title.length > maxLength) {
    let lastSpace = title.lastIndexOf(' ', maxLength);
    if (lastSpace === -1) {
      lastSpace = maxLength;
    }
    displayTitle = title.substring(0, lastSpace) + '...';
    truncated = true;
  }

  return { displayTitle, truncated };
}

export default function FeaturedArticle({ authors, category, title, showFullTitle, href }: FeaturedArticleProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const containerRef = useRef(null);
  const { displayTitle, truncated } = truncateTitle(title);
  const hasLink = href ? true : false;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(styles.container, { hovered: isHovered }, { [styles.activeLink]: hasLink })}
    >
      <div>
        <p className={styles.title}>
          {href && truncated ? (
            <Link href={href} className={styles.readMore}>
              <span>{displayTitle}</span>
            </Link>
          ) : (
            <span>{showFullTitle ? title : displayTitle}</span>
          )}
        </p>
      </div>
      <div>
        {authors && <P className={styles.label}>Author(s):</P>}
        {category && <P className={styles.label}>Topic:</P>}

        <div className={styles.authorsRow}>
          {authors &&
            authors.length > 0 &&
            authors?.map((author, index) => {
              return (
                <span key={index} className={styles.label}>
                  {author}
                  {index < authors.length - 1 ? ', ' : ''}
                </span>
              );
            })}
        </div>
      </div>

      <div className={styles.callToAction}>
        {href && (
          <div className={styles.authorWithLink}>
            {category && (
              <p className={classNames(styles.label, { [styles.animatedUnderline]: hasLink })}>
                <span>{category}</span>
              </p>
            )}
            {!category && !authors && (
              <p className={classNames(styles.label, { [styles.animatedUnderline]: hasLink })}>
                <span>Read More </span>
              </p>
            )}

            <Arrow className={styles.arrow} color="var(--theme-foreground-text)" />
          </div>
        )}
      </div>
    </div>
  );
}

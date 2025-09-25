'use client';

import '@root/global.scss';
import styles from '@components/BlogArticles.module.scss';

import { Arrow } from '@root/components/svgs/Arrow';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import Link, { LINK_STYLE_ENUM } from '@root/components/Link';
import PageGutterWrapper from '@root/components/PageGutterWrapper';

export interface BlogSectionProps {
  author: string;
  date: string;
  href: string;
  title: string;
  style?: React.CSSProperties;
}

export interface BlogArticlesProps {
  blogArticles: BlogSectionProps[];
}

function TextArticle({ author, date, href, title, style }: BlogSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleClick = () => {
    containerRef.current?.click();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(styles.articleContainer, { hovered: isHovered })}
      style={style}
    >
      <PageGutterWrapper>
        <Link href={href} linkStyle={LINK_STYLE_ENUM.NONE} target="_blank">
          <div className={styles.contentContainer}>
            <div>
              <div className={classNames(styles.link, styles.title, { [styles.animatedUnderline]: true })}>
                <span className={styles.title}>{title}</span>
              </div>

              <div className={styles.articleDetails}>
                {author && (
                  <>
                    <span className={styles.link}>{author}</span>
                    <div className={styles.circle}></div>
                  </>
                )}

                <p className={styles.date}>{date}</p>
              </div>
            </div>
            <Arrow className={styles.arrow} />
          </div>
        </Link>
      </PageGutterWrapper>
    </div>
  );
}

export default function BlogArticles({ blogArticles }: BlogArticlesProps) {
  return (
    <div className={styles.mobileSpacing}>
      <div className={styles.container}>
        {blogArticles?.map((article, index) => (
          <TextArticle {...article} key={index} />
        ))}
      </div>
    </div>
  );
}

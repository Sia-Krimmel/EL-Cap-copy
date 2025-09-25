'use client';

import anime from 'animejs';

import styles from '@components/SectionFooter.module.scss';

import { ElCap } from '@root/components/svgs/ElCap';
import { P } from '@root/system/typography';
import { useEffect, useState } from 'react';

import AboutSquiggleSVG from '@root/components/svgs/AboutSquiggleSVG';
import BlogSquiggleSVG from '@root/components/svgs/BlogSquiggleSVG';
import classNames from 'classnames';
import ContributorsSquiggleSVG from '@root/components/svgs/ContributorsSVG';
import FadeInAnimation from '@root/components/AnimateOnVisible';
import Link, { LINK_STYLE_ENUM } from '@root/components/Link';
import PageGutterWrapper from '@root/components/PageGutterWrapper';
import PortfolioSquiggleSVG from '@root/components/svgs/PortfolioSquiggleSVG';
import ReadingListSquiggleSVG from '@root/components/svgs/ReadingListSVG';

const getSVGComponent = (path) => {
  switch (path) {
    case '/about':
      return (
        <div className={classNames(styles.svgAbout, styles.svgItem)}>
          <AboutSquiggleSVG color="currentColor" className={styles.svgAboutItem} />
        </div>
      );
    case '/reading-list':
      return (
        <div className={classNames(styles.svgReadingList, styles.svgItem)}>
          <ReadingListSquiggleSVG color="currentColor" className={styles.svgReadingListItem} />
        </div>
      );
    case '/blog':
      return (
        <div className={classNames(styles.svgBlog, styles.svgItem)}>
          <BlogSquiggleSVG color="currentColor" className={styles.svgBlogItem} />
        </div>
      );
    case '/contributors':
      return (
        <div className={classNames(styles.svgContributors, styles.svgItem)}>
          <ContributorsSquiggleSVG color="currentColor" className={styles.svgContributorsItem} />
        </div>
      );
    case '/portfolio':
      return (
        <div className={classNames(styles.svgPortfolio, styles.svgItem)}>
          <PortfolioSquiggleSVG color="currentColor" className={styles.svgPortfolioItem} />
        </div>
      );
    default:
      return null;
  }
};

export default function SectionFooter({ tagline, links, copyright }) {
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    if (hoveredLink) {
      anime({
        targets: `.${styles.navItemSquiggle} .${hoveredLink}`,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1000,
      });
    }
  }, [hoveredLink]);

  return (
    <div className={styles.container}>
      <FadeInAnimation delay={0.1}>
        <div className={styles.mainContent}>
          <PageGutterWrapper>
            {tagline && <P className={styles.tagline}>{tagline}</P>}
            <div className={styles.mainContentGrid}>
              <div className={styles.logoContainer}>
                <ElCap className={styles.logo} />
              </div>
              <div className={styles.links}>
                {links?.map((link, index) => (
                  <div key={index} className={styles.navItem} onMouseEnter={() => setHoveredLink(link.href.replace('/', ''))} onMouseLeave={() => setHoveredLink(null)}>
                    <Link className={styles.link} href={link.href} linkStyle={LINK_STYLE_ENUM.NONE}>
                      <P className={styles.linkItem}>
                        <span className={styles.animatedUnderline}>{link?.name}</span>
                      </P>
                    </Link>
                    <Link className={styles.link} href={link.href} linkStyle={LINK_STYLE_ENUM.NONE}>
                      <div className={`${styles.navItemSquiggle} ${link.href.replace('/', '')}`}>{getSVGComponent(link.href)}</div>
                    </Link>
                  </div>
                ))}
              </div>
              {copyright && <P className={styles.copyright}>{copyright}</P>}
            </div>
          </PageGutterWrapper>
        </div>
      </FadeInAnimation>
    </div>
  );
}

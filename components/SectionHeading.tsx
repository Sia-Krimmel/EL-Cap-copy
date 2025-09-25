'use client';

import styles from '@components/SectionHeading.module.scss';

import * as React from 'react';

import Link from 'next/link';
import { classNames } from '@root/common/utilities';
import { ElCap } from '@components/svgs/ElCap';
import { usePathname } from 'next/navigation';

import AboutSquiggleSVG from '@root/components/svgs/AboutSquiggleSVG';
import BlogSquiggleSVG from '@root/components/svgs/BlogSquiggleSVG';
import ContributorsSquiggleSVG from '@root/components/svgs/ContributorsSVG';
import PageGutterWrapper from '@components/PageGutterWrapper';
import PortfolioSquiggleSVG from '@root/components/svgs/PortfolioSquiggleSVG';
import ReadingListSquiggleSVG from '@root/components/svgs/ReadingListSVG';

export default function SectionHeading(props) {
  const [menuActive, setMenuActive] = React.useState(false);
  const [scrolling, setScrolling] = React.useState(false);
  const [delayedBackground, setDelayedBackground] = React.useState(false);

  const pathname = usePathname();

  const hamburgerRef = React.useRef(null);
  const navMenuRef = React.useRef(null);

  const mobileMenuOnClickHandler = () => {
    if (hamburgerRef.current) {
      hamburgerRef.current.classList.toggle(styles.active);
    }
    if (navMenuRef.current) {
      navMenuRef.current.classList.toggle(styles.active);
    }
    if (!menuActive) {
      setDelayedBackground(true);
      setMenuActive(true);
    } else {
      setMenuActive(false);
      setTimeout(() => {
        setDelayedBackground(false);
      }, 3000); // Adjust the delay as needed
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setScrolling(window.scrollY > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    if (menuActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuActive]);

  const navbarStyle = {
    backgroundColor: menuActive || delayedBackground ? 'var(--theme-background)' : '',
  };

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
            <ContributorsSquiggleSVG color="currentColor" className={styles.svgContributorsItem} />{' '}
          </div>
        );
      case '/portfolio':
        return (
          <div className={classNames(styles.svgPortfolio, styles.svgItem)}>
            <PortfolioSquiggleSVG color="currentColor" className={styles.svgPortfolioItem} />
          </div>
        );
      default:
        return (
          <div className={styles.svgAbout}>
            <AboutSquiggleSVG color="currentColor" />
          </div>
        );
    }
  };

  return (
    <div className={styles.body}>
      <PageGutterWrapper>
        <div className={styles.logoContainer}>
          <Link href="/" style={{ color: 'inherit' }}>
            <ElCap className={styles.elCap} color="currentColor" />
          </Link>

          <div ref={hamburgerRef} className={styles.hamburger} onClick={mobileMenuOnClickHandler}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </div>

        <nav ref={navMenuRef} className={`${styles.navbar} ${menuActive ? styles.active : ''}`} style={navbarStyle}>
          {props?.navContent?.map((item, index) => (
            <ul key={index} className={styles.navItem}>
              <Link href={item.link} style={{ textDecoration: 'none', color: 'currentColor' }}>
                <li className={styles.navItemText}>
                  {item.name}
                  <div className={pathname === item.link ? styles.activeNavItemSquiggle : styles.navItemSquiggle}>{getSVGComponent(item.link)}</div>
                </li>
              </Link>
            </ul>
          ))}

          <ElCap className={styles.elCapLogo} color="currentColor" />
        </nav>
      </PageGutterWrapper>
    </div>
  );
}

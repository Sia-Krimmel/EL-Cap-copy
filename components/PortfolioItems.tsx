import '@root/global.scss';

import styles from '@root/components/PortfolioItems.module.scss';

import classNames from 'classnames';
import { P } from '@root/system/typography';
import { useRef, useState } from 'react';
import Link, { LINK_STYLE_ENUM } from '@root/components/Link';
import PageGutterWrapper from '@root/components/PageGutterWrapper';

export interface PortfolioItemsProps {
  name: string;
  description: string;
  href?: string;
}

export interface PortfolioProps {
  portfolioItems: PortfolioItemsProps[];
}

function PortfolioItem({ name, href, description }: PortfolioItemsProps) {
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
    <div onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={classNames(styles.articleContainer, { hovered: isHovered })}>
      <PageGutterWrapper>
        <div className={styles.contentContainer}>
          {href ? (
            <Link href={href} linkStyle={LINK_STYLE_ENUM.NONE}>
              <div className={classNames(styles.titleContainer, { [styles.animatedUnderline]: true })}>
                <div className={classNames(styles.arrow)}>→</div>
                <div className={classNames(styles.name)}>
                  <span className={classNames({ [styles.animatedUnderline]: isHovered })}>{name}</span>
                </div>
              </div>
            </Link>
          ) : (
            <div className={styles.titleContainer}>
              <P className={styles.name}>{name}</P>
            </div>
          )}
          <div>
            <P className={styles.description}>{description}</P>
          </div>
        </div>
      </PageGutterWrapper>
    </div>
  );
}

export default function PortfolioItems({ portfolioItems }: PortfolioProps) {
  return (
    <div className={styles.mobileSpacing}>
      <div className={styles.container}>
        {portfolioItems.map((item, index) => (
          <PortfolioItem {...item} key={index} />
        ))}
      </div>
    </div>
  );
}

import styles from '@components/ContributorCard.module.scss';

import { H2, H4, P } from '@root/system/typography';
import { Contributor } from '@root/components/SectionContributors';

export default function ContributorCard({ name, imageUrl, siteURL, twitterURL, linkedinURL }: Contributor) {
  return (
    <div className={styles.card}>
      <div className={styles.defaultView}>
        <H2 className={styles.name}>
          {/* (xBalbinus) Split the name into two lines between first and last */}
          {name?.split(' ')[0]}
          <br />
          {name?.split(' ')[1]} {name?.split(' ')[2]} {name?.split(' ')[3]}
        </H2>
      </div>
      <div className={styles.hoverView}>
        <img src={imageUrl} alt={name} className={styles.image} />
        <div className={styles.hoverViewContent}>
          <H4 className={styles.nameOnHover}>{name}</H4>
          <div className={styles.links}>
            <div>
              {siteURL && (
                <>
                  <a href={siteURL} target="_blank" rel="noopener noreferrer" className={styles.linkStyle}>
                    Personal Site
                  </a>
                  {linkedinURL || twitterURL ? ', ' : '.'}
                </>
              )}
              {linkedinURL && (
                <>
                  <a href={linkedinURL} target="_blank" rel="noopener noreferrer" className={styles.linkStyle}>
                    LinkedIn
                  </a>
                  {twitterURL ? ', and ' : '.'}
                </>
              )}
              {twitterURL && (
                <>
                  <a href={twitterURL} target="_blank" rel="noopener noreferrer" className={styles.linkStyle}>
                    Twitter
                  </a>
                  .
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

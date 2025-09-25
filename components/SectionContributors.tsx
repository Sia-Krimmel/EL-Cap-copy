'use client';

import styles from '@components/SectionContributors.module.scss';

import { DROPDOWN_STRING } from '@root/common/constants';
import { P } from '@root/system/typography';
import ContributorCard from '@components/ContributorCard';
import FadeInAnimation from '@root/components/AnimateOnVisible';
import LearnMore from '@root/components/LearnMore';
import PageGutterWrapper from '@components/PageGutterWrapper';

export type Contributor = {
  name: string;
  imageUrl: string;
  siteURL?: string;
  twitterURL?: string;
  linkedinURL?: string;
  githubURL?: string;
};

const SectionContributors: React.FC<{ contributors: Contributor[] }> = ({ contributors }) => {
  return (
    <div className={styles.body}>
      <PageGutterWrapper>
        <FadeInAnimation delay={0.5}>
          <div className={styles.contentContainer}>
            <P className={styles.p}>A community-driven approach to company support.</P>
            <LearnMore text="Learn More" dropdownContent={DROPDOWN_STRING} />
          </div>
        </FadeInAnimation>

        <FadeInAnimation delay={0.5}>
          <div className={styles.contributorsContainer}>
            {contributors?.map((contributor) => (
              <ContributorCard key={contributor.name} {...contributor} />
            ))}
          </div>
        </FadeInAnimation>
      </PageGutterWrapper>
    </div>
  );
};

export default SectionContributors;

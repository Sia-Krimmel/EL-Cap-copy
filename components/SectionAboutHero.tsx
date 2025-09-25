'use client';

import styles from '@components/SectionAboutHero.module.scss';

import { H2, P } from '@root/system/typography';
import CallToAction from '@root/components/CallToAction';
import FadeInAnimation from '@root/components/AnimateOnVisible';
import FounderCard from '@root/components/FounderCard';
import PageGutterWrapper from '@components/PageGutterWrapper';

export default function SectionAboutHero() {
  const htmlContent = `
  We are generalists who have invested in categories spanning AI, climate, web3, developer tools, SaaS, and more. Our job is to accelerate the visions of founders who are building the future. If you know that’s you, please don’t hesitate to 
  <a href="mailto:partners@elcap.xyz" style=" white-space: nowrap;  color:var(--color-text);border-bottom:1px solid var(--color-text)">get in touch</a>.
`;

  return (
    <div className={styles.body}>
      <PageGutterWrapper>
        <FadeInAnimation delay={0.2}>
          <div className={styles.content}>
            <H2 className={styles.h2}>El Cap is a venture capital firm that explores the edges. We build and invest where technology shifts and human behavior change collide.</H2>
            <div className={styles.callToAction}>
              <CallToAction text="Read the Founders' Letter" link="/el-cap/el-cap-founders-letter" textColor="var(--color-text)" />
            </div>
          </div>
        </FadeInAnimation>

        <div className={styles.heroImageContainer}>
          <div className={styles.heroGrid}>
            <FadeInAnimation>
              <FounderCard name="Stew Bradley" imageUrl="/media/stew_bradley.png" />{' '}
            </FadeInAnimation>
            <FadeInAnimation>
              <FounderCard name="Kunal Tandon" imageUrl="/media/kunal_tandon.png" />{' '}
            </FadeInAnimation>
          </div>
        </div>

        <FadeInAnimation delay={0.2}>
          <div className={styles.thesisTextContainer}>
            <P className={styles.p}>
              As a partnership we are builders first. Since 2019 we’ve been building El Cap, a venture capital firm focused on partnering with founders at the earliest stages,
              maintaining high context on their businesses, and providing support to help them move faster and avoid routine mistakes.
            </P>
            <br />

            <P className={styles.p} style={{ display: 'inline', whiteSpace: 'normal' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </FadeInAnimation>
      </PageGutterWrapper>
    </div>
  );
}

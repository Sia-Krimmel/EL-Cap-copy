import styles from '@components/SectionSplash.module.scss';
import { H3 } from '@root/system/typography';

import * as React from 'react';
import PageGutterWrapper from '@root/components/PageGutterWrapper';

export default function SectionSplash(props) {
  return (
    <div className={styles.body}>
      <PageGutterWrapper>
        <H3 style={{ paddingTop: '48px' }}>Welcome to EL Cap - TXT.</H3>
      </PageGutterWrapper>
      <img className={styles.image} src="https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/f9322e25-7015-4a02-82e4-2c6371760b64.png" />
    </div>
  );
}

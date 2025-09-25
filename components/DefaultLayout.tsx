import styles from '@components/DefaultLayout.module.scss';

import * as React from 'react';
import Link from '@root/components/Link';

export default function DefaultLayout(props) {
  return (
    <>
      <Link href="/signin">
        <div className={styles.top}>
          <div className={styles.corner}>{props.logo}</div>
          <div className={styles.remainder}>{props.top}</div>
        </div>
      </Link>
      <div className={styles.bottom}>
        <div className={styles.sidebar}>
          <div className={styles.topbar}>{props.sidebar}</div>
          {props.bottombar ? <div className={styles.bottombar}>{props.bottombar}</div> : null}
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
}

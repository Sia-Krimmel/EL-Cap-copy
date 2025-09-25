import styles from '@components/StatusText.module.scss';

import * as React from 'react';

export default function StatusText(props) {
  return <div className={styles.root}>{props.children}</div>;
}

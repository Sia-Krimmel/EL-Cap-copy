import styles from '@components/PostByline.module.scss';

import * as React from 'react';

export default function PostByline(props) {
  return (
    <div className={styles.body}>
      <span className={styles.name}>{props.user.username}</span>
      <span className={styles.split}>—</span>
      <span className={styles.time}>updated on {props.timestamp}</span>
    </div>
  );
}

import styles from '@components/PostDescription.module.scss';

import * as React from 'react';

import Textarea from '@components/Textarea';

export default function PostDescription(props) {
  if (props.readOnly) {
    return (
      <div className={styles.public}>
        <p className={styles.description}>{props.value}</p>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <span className={styles.label}>Description</span>
      <Textarea value={props.value} onChange={(e) => props.onChange(e.target.value)} className={styles.textarea} placeholder="Describe what you're sharing..." />
    </div>
  );
}

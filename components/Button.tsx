'use client';

import styles from '@components/Button.module.scss';

import * as React from 'react';

export default function Button(props) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

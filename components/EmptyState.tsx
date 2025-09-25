'use client';

import styles from '@components/EmptyState.module.scss';
import words from '@components/PostElements.module.scss';

import * as HTTP from '@common/http';
import * as React from 'react';
import * as Utilities from '@common/utilities';

import Button from '@components/Button';
import InputWithLabel from '@components/InputWithLabel';

export default function EmptyState(props) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>⭠</div>
      <div className={styles.top} />

      <div className={styles.block} style={{ borderTop: 0 }}>
        <div className={styles.content}>
          <h1 className={words.h1}>{props.title}</h1>
          <p className={words.p} style={{ marginTop: `1rem` }}>
            {props.children}
          </p>
        </div>
      </div>
    </section>
  );
}

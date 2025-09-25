import styles from '@components/ButtonAction.module.scss';

import * as React from 'react';

export default function ButtonAction(props) {
  if (props.href) {
    return (
      <a
        className={styles.button}
        style={props.active ? { color: `var(--theme-background)`, background: 'var(--color-button-active)', border: `1px solid var(--color-button-active)` } : null}
        href={props.href}
        target={props.target}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      className={styles.button}
      style={props.active ? { color: `var(--theme-background)`, background: 'var(--color-button-active)', border: `1px solid var(--color-button-active)` } : null}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

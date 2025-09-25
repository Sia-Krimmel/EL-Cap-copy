import styles from '@components/Input.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

export default function Input(props) {
  return (
    <input
      className={styles.input}
      autoComplete="off"
      autoFocus={props.autoFocus}
      value={props.value}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onKeyUp={props.onKeyUp}
      disabled={props.disabled}
      readOnly={props.readOnly}
      style={props.style}
    />
  );
}

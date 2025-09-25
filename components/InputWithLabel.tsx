import styles from '@components/InputWithLabel.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import Input from '@components/Input';

export default function InputWithLabel(props) {
  return (
    <div className={styles.group} style={props.style}>
      <label className={styles.label}>{props.label}</label>
      <Input type={props.type} name={props.name} value={props.value} onChange={props.onChange} style={{ padding: '1rem 1.4rem' }} />
    </div>
  );
}

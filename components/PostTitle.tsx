import styles from '@components/PostTitle.module.scss';

import * as React from 'react';
import * as Utilities from '@common/utilities';

import Textarea from '@components/Textarea';

export default function PostTitle(props) {
  if (props.readOnly) {
    return (
      <div className={styles.public}>
        <h1 className={styles.heading}>{props.value}</h1>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <span className={styles.label}>Title</span>
      <Textarea
        className={styles.textarea}
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
          props.onSlugChange(Utilities.createSlug(e.target.value));
        }}
        placeholder="Untitled"
      />
      {Utilities.isEmpty(props.slug) ? null : (
        <span className={styles.urlPreview}>
          [Production URL]{' '}
          <a className={styles.link} href={`https://www-elcap.onrender.com/${props.username}/${props.slug}`} target="_blank">
            https://www-elcap.onrender.com/{props.username}/{props.slug}
          </a>
        </span>
      )}
    </div>
  );
}

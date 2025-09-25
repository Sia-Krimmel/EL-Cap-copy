import styles from '@components/PostAuthorAndDate.module.scss';

import * as React from 'react';

import Input from '@root/components/Input';

export interface AuthorInfo {
  author: string;
  link: string;
}

interface PostAuthorAndDateProps {
  date: string;
  authorInfo: AuthorInfo;
  onChange?: (value: { author: string; link: string; date: string }) => void;
  readOnly: boolean;
}

export default function PostAuthorAndDate({ authorInfo, date, onChange, readOnly }: PostAuthorAndDateProps) {
  if (readOnly) {
    return (
      <div className={styles.public}>
        {authorInfo?.link ? (
          <a className={styles.link} href={authorInfo.link}>
            <p className={styles.author}>{authorInfo.author}</p>
          </a>
        ) : (
          <>{authorInfo?.author && <p className={styles.author}>{authorInfo.author}</p>}</>
        )}
        {date && <p className={styles.text}>{date}</p>}
      </div>
    );
  }

  const handleInputChange = (key: keyof AuthorInfo | 'date', val: string) => {
    if (onChange) {
      if (key === 'date') {
        onChange({ ...authorInfo, date: val });
      } else {
        onChange({ ...authorInfo, date, [key]: val });
      }
    }
  };

  return (
    <div className={styles.body}>
      <span className={styles.label}>Author</span>
      <div className={styles.content}>
        {authorInfo?.author && (
          <Input value={authorInfo.author} onChange={(e) => handleInputChange('author', e.target.value)} className={styles.input} placeholder="Author's Name..." />
        )}
        {authorInfo?.link && (
          <Input value={authorInfo.link} onChange={(e) => handleInputChange('link', e.target.value)} className={styles.input} placeholder="Author's Social Link" />
        )}
      </div>
      <div className={styles.grid2Columns}>
        {date && <Input value={date} onChange={(e) => handleInputChange('date', e.target.value)} className={styles.input} placeholder="Date..." />}
      </div>
    </div>
  );
}

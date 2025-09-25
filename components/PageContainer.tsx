'use client';

import styles from '@components/PageContainer.module.scss';

interface PageContainer {
  children: React.ReactNode;
  style?: React.CSSProperties;
  initialTheme?: any;
}
export default function PageContainer({ children, style }: PageContainer) {
  return (
    <div className={styles.page} style={style}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

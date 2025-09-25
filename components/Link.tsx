import styles from '@components/Link.module.scss';

import LinkItem from 'next/link';
import { ReactNode } from 'react';

export enum LINK_STYLE_ENUM {
  ANIMATED_UNDERLINE = 'animated-underline',
  NONE = 'none',
}

function SwitchLinkStyle(style) {
  let defaultStyle;

  switch (style) {
    case LINK_STYLE_ENUM.ANIMATED_UNDERLINE:
      return (defaultStyle = `${styles.animatedUnderline} ${styles.textOnLight}`);
    case LINK_STYLE_ENUM.NONE:
    default:
      return (defaultStyle = `${styles.none}`);
  }
}

export interface LinkProps {
  children: ReactNode;
  className?: string;
  color?: string;
  href: string;
  props?: any;
  linkStyle?: string;
  target?: string;
  style?: React.CSSProperties;
  ref?: any;
}

export default function Link({ children, className, ref, color, href, props, linkStyle, target, style }: LinkProps) {
  const defaultStyle = SwitchLinkStyle(linkStyle);

  return (
    <LinkItem href={href} ref={ref} className={`${defaultStyle} ${className}`} {...props} target={target ?? '_self'} style={style}>
      <div style={{ color: color }}>{children}</div>
    </LinkItem>
  );
}

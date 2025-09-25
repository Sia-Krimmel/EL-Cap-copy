'use client';

import styles from '@components/Post.module.scss';

import * as React from 'react';
import * as HTTP from '@common/http';
import * as Utilities from '@common/utilities';
import * as SlateUtilities from '@common/slate';
import * as PostElements from '@components/PostElements';

import { Editable, Slate } from 'slate-react';

export default function Post(props) {
  const renderElement = React.useCallback((props) => <PostElements.Element {...props} />, []);
  const renderLeaf = React.useCallback((props) => <PostElements.Leaf {...props} />, []);
  const { initialValue, editor } = props;

  return (
    <div className={styles.body}>
      <Editable
        autoFocus={props.autoFocus}
        className={styles.editor}
        onDOMBeforeInput={props.onDOMBeforeInput}
        onKeyDown={(e) => props.onKeyDown(e, editor)}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck={props.spellCheck}
        style={{ outline: 0, border: 0 }}
      />
    </div>
  );
}

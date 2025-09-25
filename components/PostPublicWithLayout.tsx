'use client';

import styles from '@components/PostPublicWithLayout.module.scss';

import dynamic from 'next/dynamic';
const Post = dynamic(() => import('@components/Post'), {
  ssr: false,
});

import ButtonAction from '@components/ButtonAction';

import * as Utilities from '@common/utilities';
import * as Icon from '@components/Icon';
import * as Hooks from '@modules/hooks';
import * as React from 'react';

import PostDescription from '@components/PostDescription';
import PostTitle from '@components/PostTitle';

import { FOOTER, NAV_CONTENT } from '@root/common/constants';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import PageContainer from '@root/components/PageContainer';
import SectionFooter from '@root/components/SectionFooter';
import SectionHeading from '@root/components/SectionHeading';
import PostAuthorAndDate from '@root/components/PostAuthorAndDate';

const SidebarElements = (props) => {
  const forceUpdate = Hooks.useForceUpdate();
  const [height, setHeight] = React.useState(0);

  Hooks.useScrollTrigger(() => {
    const distance = Utilities.getScrollDistance();

    setHeight(distance - 49 >= 0 ? distance - 41 : 0);
    forceUpdate();
  });

  return (
    <div style={{ marginTop: height, transition: `200ms ease all`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
      <ButtonAction class="twitter-share-button" href={`https://twitter.com/intent/tweet?text=${props.postURL}`} target="_blank">
        <Icon.Twitter height="16px" />
      </ButtonAction>
      <ButtonAction href={props.authorURL}>
        <Icon.Author height="16px" />
      </ButtonAction>
      {props.isViewer ? (
        <ButtonAction href={`/${props.user.username}/-/${props.post.id}`}>
          <Icon.EditPost height="16px" style={{ paddingBottom: 2, paddingLeft: 2 }} />
        </ButtonAction>
      ) : null}
    </div>
  );
};

export default function PostPublicWithLayout(props) {
  const { post, user, isViewer } = props;
  const initialValue = React.useMemo(() => post.data.editorContent.children, []);
  const [editor] = React.useState(() => withReact(createEditor()));
  const postURL = `Reading ${post.data.title} was interesting. https://www-elcap.onrender.com/${user.email}/${post.slug}`;
  const authorURL = `/${user.email}`;

  const authorInfo = {
    author: post.data?.authorInfo?.author || '',
    link: post.data?.authorInfo?.link || '',
  };
  const date = post?.data?.date || post?.data?.created_at;

  const footer = FOOTER;
  const navContent = NAV_CONTENT;

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <PageContainer>
        <SectionHeading navContent={navContent} />

        <PostTitle value={post.data.title} readOnly />
        {(authorInfo?.author || date) && <PostAuthorAndDate authorInfo={authorInfo} date={date} readOnly />}

        {/* <PostByline user={user} timestamp={Utilities.toDateISOString(post.updated_at)} /> */}
        <PostDescription value={post.data.description} readOnly />

        <div className={styles.body}>
          <Post editor={editor} initialValue={initialValue} readOnly />
        </div>

        <div style={{ paddingTop: 'var(--spacing-for-bottom-of-page)' }}>
          <SectionFooter {...footer} />
        </div>
      </PageContainer>
    </Slate>
  );
}

'use client';

import dynamic from 'next/dynamic';
const Post = dynamic(() => import('@components/Post'), {
  ssr: false,
});

import * as React from 'react';
import * as Utilities from '@common/utilities';
import * as HTTP from '@common/http';
import * as SlateUtilities from '@common/slate';
import * as Icon from '@components/Icon';
import * as Hooks from '@modules/hooks';

import ButtonAction from '@components/ButtonAction';
import Cookies from 'universal-cookie';
import DefaultLayout from '@components/DefaultLayout';
import PostTitle from '@components/PostTitle';
import PostDescription from '@components/PostDescription';
import StatusText from '@components/StatusText';

import { withReact, ReactEditor, useSlate, Slate } from 'slate-react';
import { Editor, createEditor, Element as SlateElement, Node as SlateNode } from 'slate';
import { withHistory } from 'slate-history';
import { ElCap } from '@root/components/svgs/ElCap';
import PostAuthorAndDate from '@root/components/PostAuthorAndDate';

const SidebarElements = (props) => {
  const editor = useSlate();
  const forceUpdate = Hooks.useForceUpdate();
  const [height, setHeight] = React.useState(0);

  Hooks.useScrollTrigger(() => {
    const distance = Utilities.getScrollDistance();

    setHeight(distance - 49 >= 0 ? distance - 41 : 0);
    forceUpdate();
  });

  return (
    <div style={{ marginTop: height, transition: `200ms ease all`, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column' }}>
      <ButtonAction
        active={SlateUtilities.isMarkActive(editor, 'bold')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleMark(editor, 'bold');
          forceUpdate();
        }}
      >
        <Icon.EditorBold height="12px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isMarkActive(editor, 'italic')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleMark(editor, 'italic');
          forceUpdate();
        }}
      >
        <Icon.EditorItalic height="12px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isMarkActive(editor, 'underline')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleMark(editor, 'underline');
          forceUpdate();
        }}
      >
        <Icon.EditorUnderline height="12px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isMarkActive(editor, 'code')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleMark(editor, 'code');
          forceUpdate();
        }}
      >
        <Icon.EditorCode height="12px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isBlockActive(editor, 'heading-one')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleBlock(editor, 'heading-one');
          forceUpdate();
        }}
      >
        <Icon.EditorH1 height="12px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isBlockActive(editor, 'heading-two')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleBlock(editor, 'heading-two');
          forceUpdate();
        }}
      >
        <Icon.EditorH2 height="12px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isBlockActive(editor, 'block-quote')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleBlock(editor, 'block-quote');
          forceUpdate();
        }}
      >
        <Icon.EditorBlockQuote height="10px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isBlockActive(editor, 'numbered-list')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleBlock(editor, 'numbered-list');
          forceUpdate();
        }}
      >
        <Icon.EditorOrderedList height="10px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isBlockActive(editor, 'bulleted-list')}
        onClick={(event) => {
          event.preventDefault();
          SlateUtilities.toggleBlock(editor, 'bulleted-list');
          forceUpdate();
        }}
      >
        <Icon.EditorUnorderedList height="10px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isLinkActive(editor)}
        onClick={(event) => {
          event.preventDefault();
          const active = SlateUtilities.isLinkActive(editor);

          if (active) {
            SlateUtilities.unwrapLink(editor);
            return forceUpdate();
          }

          const url = window.prompt('Enter the URL of the link:');
          if (Utilities.isEmpty(url)) return;
          SlateUtilities.insertLink(editor, url);
          return forceUpdate();
        }}
      >
        <Icon.EditorLink height="10px" />
      </ButtonAction>
      <ButtonAction
        active={SlateUtilities.isBlockActive(editor, 'image')}
        onClick={(event) => {
          event.preventDefault();
          if (SlateUtilities.isBlockActive(editor, 'image')) {
            return;
          }

          var input = document.createElement('input');
          input.style.cssText = 'visiblity:hidden;position:absolute;top:0;left:0;opacity:0;height:1px;width:1px';
          input.type = 'file';
          input.onchange = function () {
            if (input.files && input.files.length) {
              // @ts-ignore
              editor.insertFile(input.files[0]);
            }
          };
          input.click();
        }}
      >
        <Icon.EditorImage height="10px" />
      </ButtonAction>
    </div>
  );
};

const BottomBarElements = (props) => {
  const editor = useSlate();
  const forceUpdate = Hooks.useForceUpdate();
  const data = {
    ...props.data,
    description: props.description,
    editorContent: {
      children: editor.children,
    },
    authorInfo: props.authorInfo,
    date: props.date,
    title: props.title,
    public: props.public,
  };
  return (
    <>
      <ButtonAction
        active={props.public}
        onClick={async () => {
          const cookies = new Cookies(null, { path: '/' });
          const key = cookies.get('elcap_txt');
          const nextPublic = !props.public;
          const response = await HTTP.updatePost({
            id: props.id,
            key,
            updates: {
              data: { ...data, public: nextPublic },
              slug: props.slug,
            },
          });

          props.onPublicChange(nextPublic);
          forceUpdate();
        }}
      >
        <Icon.Privacy height="10px" />
      </ButtonAction>
      <ButtonAction
        onClick={async () => {
          const cookies = new Cookies(null, { path: '/' });
          const key = cookies.get('elcap_txt');
          const response = await HTTP.updatePost({
            id: props.id,
            key,
            updates: {
              slug: props.slug,
              data,
            },
          });
          forceUpdate();
        }}
      >
        <Icon.Save height="10px" />
      </ButtonAction>
      <ButtonAction href={`/${props.username}`}>
        <Icon.Author height="12px" />
      </ButtonAction>
    </>
  );
};

const TopBarElements = (props) => {
  const editor = useSlate();

  let wordCount = 0;
  // @ts-ignore
  editor.children.forEach((child) => {
    // @ts-ignore
    child.children.forEach((youth) => {
      if (youth.text) {
        const words = youth.text.split(' ');
        wordCount += words.length;
      }
    });
  });

  return (
    <>
      <StatusText>[You are editing]</StatusText>
    </>
  );
};

export default function PostWithLayout(props) {
  const { post, username } = props;
  const initialValue: any = React.useMemo(() => post.data.editorContent.children, []);
  const [editor] = React.useState(() => SlateUtilities.withInlines(SlateUtilities.withImages(SlateUtilities.withShortcuts(withReact(withHistory(createEditor()))))));
  const [publicPost, setPublicPost] = React.useState(post.data.public);
  const [title, setTitle] = React.useState(post.data.title);
  const [description, setDescription] = React.useState(post.data.description);
  const [authorInfo, setAuthorInfo] = React.useState({
    author: post?.data?.authorInfo?.author || null,
    link: post?.data?.authorInfo?.link || null,
  });
  const [date, setDate] = React.useState(post.data.date || Utilities.toDateISOString(post.updated_at));
  const [slug, setSlug] = React.useState(post.slug);
  const [data, setData] = React.useState(post.data);

  const logoElement = <ElCap width="44px" />;
  const topBarElement = <TopBarElements />;
  const sideBarElement = <SidebarElements />;
  const bottomBarElement = (
    <BottomBarElements
      authorInfo={authorInfo}
      data={data}
      date={date}
      description={description}
      id={post.id}
      onPublicChange={setPublicPost}
      public={publicPost}
      slug={slug}
      title={title}
      username={username}
    />
  );

  const handleDOMBeforeInput = React.useCallback((e: InputEvent) => {
    window.queueMicrotask(() => {
      const pendingDiffs = ReactEditor.androidPendingDiffs(editor);

      let scheduleFlush = null;
      if (pendingDiffs) {
        scheduleFlush = pendingDiffs.some(({ diff, path }) => {
          if (!diff.text.endsWith(' ')) {
            return false;
          }

          const { text } = SlateNode.leaf(editor, path);
          const beforeText = text.slice(0, diff.start) + diff.text.slice(0, -1);
          if (!(beforeText in SlateUtilities.SHORTCUTS)) {
            return false;
          }

          const blockEntry = Editor.above(editor, {
            at: path,
            match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
          });
          if (!blockEntry) {
            return false;
          }

          const [, blockPath] = blockEntry;
          return Editor.isStart(editor, Editor.start(editor, path), blockPath);
        });
      }

      if (scheduleFlush) {
        ReactEditor.androidScheduleFlush(editor);
      }
    });
  }, []);

  const handleAuthorInfoChange = (updatedInfo: { author: string; link: string; date: string }) => {
    setAuthorInfo({ author: updatedInfo.author, link: updatedInfo.link });
    setDate(updatedInfo.date);
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <DefaultLayout logo={logoElement} top={topBarElement} sidebar={sideBarElement} bottombar={bottomBarElement}>
        <PostTitle value={title} onChange={setTitle} onSlugChange={setSlug} slug={slug} username={username} />
        <PostAuthorAndDate authorInfo={authorInfo} date={date} onChange={handleAuthorInfoChange} readOnly={false} />
        <PostDescription value={description} onChange={setDescription} />

        <Post
          onDOMBeforeInput={handleDOMBeforeInput}
          editor={editor}
          initialValue={initialValue}
          onKeyDown={SlateUtilities.onKeyDown}
          placeholder="Start typing..."
          spellCheck
          autoFocus
        />
      </DefaultLayout>
    </Slate>
  );
}

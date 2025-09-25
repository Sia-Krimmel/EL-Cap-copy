'use client';

import styles from '@components/PostListWithLayout.module.scss';

import ButtonAction from '@components/ButtonAction';
import Cookies from 'universal-cookie';
import DefaultLayout from '@components/DefaultLayout';
import EmptyState from '@components/EmptyState';

import * as Icon from '@components/Icon';
import * as HTTP from '@common/http';
import * as React from 'react';
import * as Utilities from '@common/utilities';
import { H4, H6 } from '@root/system/typography';
import { ElCap } from '@root/components/svgs/ElCap';
import Loader from '@root/components/Loader';

const SidebarElements = (props) => {
  return (
    <>
      {props.isViewer ? (
        <ButtonAction
          style={{ position: 'relative' }}
          onClick={async () => {
            props.setLoading(true);
            const cookies = new Cookies(null, { path: '/' });
            await HTTP.createPost({ key: cookies.get('elcap_txt') });
            const response = await HTTP.getViewerPosts({ key: cookies.get('elcap_txt'), orderBy: { column: 'created_at', value: 'desc' } });
            props.setPosts(response ? response : []);
            props.setLoading(false);
          }}
        >
          {props.loading ? (
            <div style={{ height: '100%', left: '1.8rem', position: 'absolute', top: '3.6rem', width: '40px', zIndex: 'var(--z-index-small)' }}>
              <Loader />
            </div>
          ) : (
            <Icon.Write height="16px" />
          )}
        </ButtonAction>
      ) : null}
      {props.isViewer ? (
        <ButtonAction
          onClick={async () => {
            const confirm = window.confirm('Are you sure you want to sign out?');
            if (!confirm) {
              return;
            }

            const cookies = new Cookies(null, { path: '/' });
            cookies.remove('elcap_txt');
            window.location.href = '/signin';
          }}
        >
          <Icon.Exit height="16px" />
        </ButtonAction>
      ) : null}
    </>
  );
};

export default function PostListWithLayout(props) {
  const [posts, setPosts] = React.useState(props.posts ? props.posts : []);
  const [loading, setLoading] = React.useState(false);

  let children = null;

  if (props.isViewer) {
    children = <EmptyState title="">Click the button on the left to create a post.</EmptyState>;
  }

  if (posts && posts.length) {
    children = posts.map((each) => {
      const editURL = `/${props.username}/-/${each.id}`;

      let slugURL = null;
      if (!Utilities.isEmpty(each.slug)) {
        slugURL = `/${props.username}/${each.slug}`;
      }

      if (props.isViewer) {
        return (
          <div key={each.id} className={styles.row}>
            <div className={styles.rowContent}>
              <div className={styles.articleDetails}>
                <p className={styles.item}>Created ≫ {Utilities.toDateISOString(each.created_at)}</p>
                <p className={styles.item}>Updated ≫ {Utilities.toDateISOString(each.updated_at)}</p>
              </div>
              {each?.data?.title && <H6 className={styles.title}>{each.data.title}</H6>}
            </div>
            <p className={Utilities.classNames(styles.item, styles.item2Columns)}>
              Edit ≫{' '}
              <a className={styles.link} href={editURL}>
                {each.id}
              </a>
            </p>
            {!Utilities.isEmpty(each.slug) && each.data.public ? (
              <p className={styles.item}>
                Public ≫{' '}
                <a className={styles.link} href={slugURL} target="_blank">
                  {each.slug}
                </a>
              </p>
            ) : (
              <p className={styles.item}>Private</p>
            )}
            <p className={Utilities.classNames(styles.item, styles.lastItem)}>
              <span
                className={styles.link}
                onClick={async () => {
                  const confirm = window.confirm('Are you sure you want to delete this post?');
                  if (!confirm) {
                    return null;
                  }

                  const cookies = new Cookies(null, { path: '/' });
                  const results = await HTTP.deletePost({ id: each.id, key: cookies.get('elcap_txt') });
                  if (!results || !results.success) {
                    alert('Failed to delete');
                    return;
                  }

                  const response = await HTTP.getViewerPosts({ key: cookies.get('elcap_txt'), orderBy: { column: 'created_at', value: 'desc' } });
                  setPosts(response ? response : []);
                }}
              >
                × Delete
              </span>
            </p>
          </div>
        );
      }

      return (
        <div key={each.id} className={styles.row3Columns}>
          <p className={styles.item}>Created ≫ {Utilities.toDateISOString(each.created_at)}</p>

          <p className={styles.item}>Updated ≫ {Utilities.toDateISOString(each.updated_at)}</p>
          <p className={styles.item}>
            Public ≫{' '}
            <a className={styles.link} href={slugURL} target="_blank">
              https://elcap.xyz{slugURL}
            </a>
          </p>
        </div>
      );
    });

    children = <>{children}</>;
  }

  return (
    <DefaultLayout logo={<ElCap width="44px" />} sidebar={<SidebarElements isViewer={props.isViewer} setPosts={setPosts} loading={loading} setLoading={setLoading} />}>
      {children}
    </DefaultLayout>
  );
}

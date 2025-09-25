'use client';

import '@root/global.scss';

import Cookies from 'universal-cookie';
import ButtonAction from '@components/ButtonAction';

import * as Icon from '@components/Icon';
import * as HTTP from '@common/http';
import * as React from 'react';
import * as Utilities from '@common/utilities';

export default function GeneralSidebar(props) {
  if (!props.viewer) {
    return null;
  }
  return (
    <>
      <ButtonAction
        onClick={async () => {
          const cookies = new Cookies(null, { path: '/' });
          await HTTP.createPost({ key: cookies.get('elcap_txt') });
          const response = await HTTP.getViewerPosts({ key: cookies.get('elcap_txt'), orderBy: { column: 'created_at', value: 'desc' } });

          if (props.setPosts) {
            props.setPosts(response ? response : []);
          }

          if (!Utilities.isEmpty(props.redirectURL)) {
            window.location.href = props.redirectURL;
          }
        }}
      >
        <Icon.Write height="16px" />
      </ButtonAction>
      <ButtonAction href={`/${props.viewer.username}`}>
        <Icon.Author height="16px" />
      </ButtonAction>
      <ButtonAction
        onClick={async () => {
          const confirm = window.confirm('Are you sure you want to sign out?');
          if (!confirm) {
            return;
          }

          const cookies = new Cookies(null, { path: '/' });
          cookies.remove('elcap_txt');
          window.location.href = '/';
        }}
      >
        <Icon.Exit height="16px" />
      </ButtonAction>
    </>
  );
}

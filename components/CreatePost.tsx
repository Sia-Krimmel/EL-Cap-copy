'use client';

import Cookies from 'universal-cookie';

import * as HTTP from '@common/http';
import * as Utilities from '@common/utilities';

export default function CreatePost({ children, className, style, redirectURL, setPosts }: any) {
  return (
    <div
      className={className}
      style={style}
      onClick={async () => {
        const cookies = new Cookies(null, { path: '/' });
        await HTTP.createPost({ key: cookies.get('elcap_txt') });
        const response = await HTTP.getViewerPosts({ key: cookies.get('elcap_txt'), orderBy: { column: 'created_at', value: 'desc' } });

        if (setPosts) {
          setPosts(response ? response : []);
        }

        if (!Utilities.isEmpty(redirectURL)) {
          window.location.href = redirectURL;
        }
      }}
    >
      {children}
    </div>
  );
}

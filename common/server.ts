import * as HTTP from '@common/http';

import Cookies from 'universal-cookie';
import Cors from '@modules/cors';

import { headers } from 'next/headers';

export async function setup({ emailOrUsername }) {
  const list = headers();
  const host = list.get('host');
  const cookie = list.get('cookie');
  const protocol = list.get('x-forwarded-proto');
  const cookies = new Cookies(cookie, { path: '/' });
  const key = cookies.get('elcap_txt');

  let viewer = null;

  try {
    viewer = await HTTP.getViewer({ key });
  } catch (e) {}

  return {
    host,
    cookie,
    protocol,
    viewer,
    // TODO(jimmylee)
    // Brittle, but works for now, change this to key or id based.
    isViewer: viewer && (viewer.email === emailOrUsername || viewer.username === emailOrUsername),
  };
}

export async function isAuthenticated(cookie) {
  const cookies = new Cookies(cookie, { path: '/' });
  const key = cookies.get('elcap_txt');

  try {
    return await HTTP.getViewer({ key });
  } catch (e) {
    return null;
  }
}

export async function getAllPosts(cookie) {
  const cookies = new Cookies(cookie, { path: '/' });
  const key = cookies.get('elcap_txt');

  try {
    return await HTTP.getViewerPosts({ key, orderBy: { column: 'created_at', value: 'desc' } });
  } catch (e) {
    return null;
  }
}

export async function getAllPublicPosts({ email }) {
  try {
    return await HTTP.getPublicPostsByEmail({ email });
  } catch (e) {
    return null;
  }
}

export async function getAllPublicPostsByUsername({ username }) {
  try {
    return await HTTP.getPublicPostsByUsername({ username, orderBy: { column: 'created_at', value: 'desc' } });
  } catch (e) {
    return null;
  }
}

export async function getPostById({ id }) {
  try {
    return await HTTP.getPostById({ id });
  } catch (e) {
    return null;
  }
}

export async function getPostBySlug({ slug }) {
  let user = null;
  let post = null;
  try {
    const data = await HTTP.getPostBySlug({ slug });
    user = data.user;
    post = data.post;
  } catch (e) {
    return { user: null, post: null };
  }

  return { user, post };
}

export function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

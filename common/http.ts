import * as Constants from '@common/constants';
import * as Utilities from '@common/utilities';
import { AuthorInfo } from '@root/components/PostAuthorAndDate';

import Cookies from 'universal-cookie';

const REQUEST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getHeaders = ({ key }) => {
  return { ...REQUEST_HEADERS, 'X-API-KEY': key };
};

export async function getViewer({ key }) {
  let viewer = null;
  try {
    const response = await fetch('https://api.internet.dev/api/users/viewer', {
      method: 'PUT',
      headers: getHeaders({ key }),
    });
    const result = await response.json();
    if (result && result.viewer) {
      viewer = result.viewer;
    }

    return viewer;
  } catch (e) {
    return null;
  }
}

export async function setUserUsername({ username }) {
  const cookies = new Cookies(null, { path: '/' });
  const key = cookies.get('elcap_txt');

  const response = await fetch('https://api.internet.dev/api/users/update-viewer-username', {
    method: 'POST',
    headers: getHeaders({ key }),
    body: JSON.stringify({ username }),
  });
  const json = await response.json();
  if (json && json.data) {
    return json.data;
  }
  return null;
}

export async function resendEmailVerification() {
  const cookies = new Cookies(null, { path: '/' });
  const key = cookies.get('elcap_txt');

  const response = await fetch('https://api.internet.dev/api/users/verify-resend', {
    method: 'POST',
    headers: getHeaders({ key }),
  });
  const json = await response.json();
  if (json && json.emailed) {
    return json.emailed;
  }

  return null;
}

export async function getViewerPosts({ key, orderBy }) {
  const response = await fetch('https://api.internet.dev/api/posts', {
    method: 'POST',
    headers: getHeaders({ key }),
    body: JSON.stringify({ type: 'TXT_DEV', orderBy }),
  });

  const json = await response.json();

  if (json && json.data) {
    return json.data;
  }

  return null;
}

export async function getPublicPostsByOrganization({ organization_id }) {
  try {
    const response = await fetch(`https://api.internet.dev/api/posts/public/organizations/${organization_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ organization_id }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();

    if (json && json.posts) {
      return json.posts;
    } else {
      console.log('No posts found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching public posts:', error);
    return null;
  }
}

type Post = {
  id: string;
  user_id: string;
  organization_id: string;
  type: string;
  src: string | null;
  slug: string;
  data: {
    title: string;
    public: boolean;
    description: string;
    editorContent: object;
    authorInfo?: AuthorInfo | null;
    date?: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type Article = {
  author: any;
  creationDate: string;
  date?: string;
  href: string;
  title: string;
  public: boolean;
};

export function formatBlogArticles(posts: Post[]) {
  if (!Array.isArray(posts)) {
    console.error('Invalid posts data:', posts);
    return { blogArticles: [] };
  }

  const excludedSlugs = ['el-cap-terms-of-service', 'el-cap-privacy-policy', 'el-cap-acceptable-use', 'el-cap-founders-letter'];

  const blogArticles: Article[] = posts
    .map((post): Article | null => {
      if (!post || typeof post !== 'object' || !post.data) {
        console.error('Invalid post structure:', post);
        return null;
      }

      return {
        author: post?.data?.authorInfo?.author || null,
        creationDate: post.created_at,
        date: post?.data?.date || post.created_at,
        href: `/el-cap/${post.slug}`,
        title: post.data.title || '',
        public: post.data.public,
      };
    })
    .filter((article): article is Article => !!article && article.title && !excludedSlugs.includes(article.href.split('/').pop()!))
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });

  return { blogArticles };
}

export async function getPublicPostsByUsername({ username, orderBy }: { username: string; orderBy?: any }) {
  const response = await fetch('https://api.internet.dev/api/posts', {
    method: 'POST',
    headers: REQUEST_HEADERS,
    body: JSON.stringify({ type: 'TXT_DEV', orderBy, username }),
  });
  const json = await response.json();
  if (json && json.data) {
    return json.data;
  }

  return null;
}

export async function getPublicPostsByEmail({ email, orderBy }: { email: string; orderBy?: any }) {
  const response = await fetch('https://api.internet.dev/api/posts', {
    method: 'POST',
    headers: REQUEST_HEADERS,
    body: JSON.stringify({ email, type: 'TXT_DEV', orderBy }),
  });
  const json = await response.json();
  if (json && json.data) {
    return json.data;
  }

  return null;
}

export async function authenticate(data) {
  const response = await fetch('https://api.internet.dev/api/users/authenticate', {
    method: 'POST',
    headers: REQUEST_HEADERS,
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
}

export async function createPost({ key }) {
  if (Utilities.isEmpty(key)) {
    return null;
  }

  let result;
  try {
    const response = await fetch('https://api.internet.dev/api/posts/create', {
      method: 'POST',
      headers: getHeaders({ key }),
      body: JSON.stringify({
        type: 'TXT_DEV',
        fields: { public: false },
        domain: 'elcap.xyz',
      }),
    });
    result = await response.json();
  } catch (e) {
    return null;
  }

  if (!result) {
    return null;
  }

  return result;
}

export async function deletePost({ id, key }) {
  if (Utilities.isEmpty(key)) {
    return null;
  }

  let result;
  try {
    const response = await fetch('https://api.internet.dev/api/posts/delete', {
      method: 'POST',
      headers: getHeaders({ key }),
      body: JSON.stringify({ id }),
    });
    result = await response.json();
  } catch (e) {
    return null;
  }

  if (!result) {
    return null;
  }

  return result;
}

export async function updatePost({ id, key, updates }) {
  if (Utilities.isEmpty(key)) {
    return null;
  }

  let result;
  try {
    const response = await fetch('https://api.internet.dev/api/posts/update', {
      method: 'POST',
      headers: getHeaders({ key }),
      body: JSON.stringify({ id, updates }),
    });
    result = await response.json();
  } catch (e) {
    return null;
  }
  if (!result.data) {
    return null;
  }

  return result.data;
}

export async function getPostBySlug({ slug }) {
  let result;
  try {
    const response = await fetch(`https://api.internet.dev/api/posts/public/${slug}/`, {
      method: 'GET',
      headers: REQUEST_HEADERS,
    });
    result = await response.json();
  } catch (e) {
    return null;
  }

  if (!result) {
    return null;
  }

  if (result.error) {
    return null;
  }

  return result;
}

export async function getPostById({ id }) {
  let result;
  try {
    const response = await fetch(`https://api.internet.dev/api/posts/${id}/`, {
      method: 'GET',
      headers: REQUEST_HEADERS,
    });
    result = await response.json();
  } catch (e) {
    return null;
  }

  if (!result) {
    return null;
  }

  if (!result.data) {
    return null;
  }

  return result.data;
}

export async function uploadData({ file, key }) {
  if (Utilities.isEmpty(key)) {
    return null;
  }

  let signedResult;
  const name = file.name;
  const type = file.type;
  const size = file.size;

  if (size > Constants.MAX_SIZE_BYTES) {
    return { error: 'File size exceeds 15mb limit' };
  }

  try {
    const signedResponse = await fetch(`https://api.internet.dev/api/data/generate-presigned-url`, {
      method: 'POST',
      headers: {
        'X-API-KEY': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, file: name, size }),
    });
    signedResult = await signedResponse.json();
  } catch (e) {
    return null;
  }

  if (!signedResult) {
    return null;
  }

  if (signedResult.error) {
    return signedResult;
  }

  if (!signedResult.uploadURL) {
    return null;
  }

  try {
    await fetch(signedResult.uploadURL, {
      method: 'PUT',
      body: file,
    });
  } catch (e) {
    return null;
  }

  return signedResult;
}

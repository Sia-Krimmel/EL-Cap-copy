import '@root/global.scss';

import { FOOTER, NAV_CONTENT, ORGANIZATION_ID } from '@root/common/constants';
import { formatBlogArticles, getPublicPostsByOrganization } from '@root/common/http';
import { THEME_PATH_MAP, useTheme } from '@root/components/ThemeContext';
import { THEME_TYPES } from '@root/common/types';

import BlogSection from '@root/sections/BlogSection';
import Page from '@root/components/Page';
import PageContainer from '@root/components/PageContainer';
import SectionHeading from '@root/components/SectionHeading';

export default function BlogPage({ initialTheme, blogArticles, newTheme }) {
  useTheme(initialTheme, newTheme);

  return (
    <Page title="El Cap Blog" description="We build and invest at the collision of technology shifts and behavior change." url="https://elcap.xyz/portfolio">
      <PageContainer>
        <SectionHeading navContent={NAV_CONTENT} />
        <BlogSection blogArticles={blogArticles} footer={FOOTER} />
      </PageContainer>
    </Page>
  );
}

export const getServerSideProps = async (context) => {
  const currentUrl = new URL(`http://${context.req.headers.host}${context.req.url}`);
  const refererUrl = context.req.headers.referer ? new URL(context.req.headers.referer) : null;

  let storedTheme;

  if (refererUrl && refererUrl.pathname === currentUrl.pathname) {
    // If the referer URL is the same as the current URL, use the newTheme directly
    storedTheme = THEME_TYPES.THEME_PINK;
  } else {
    // Otherwise, determine the theme based on the referer
    const pathSegments = currentUrl.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    storedTheme = THEME_PATH_MAP[lastSegment] || THEME_TYPES.THEME_PINK;
  }

  const records = await getPublicPostsByOrganization({ organization_id: ORGANIZATION_ID });
  const blogObject = formatBlogArticles(records);
  const blogArticles = blogObject?.blogArticles;

  return {
    props: {
      initialTheme: storedTheme,
      newTheme: THEME_TYPES.THEME_PINK,
      blogArticles: blogArticles,
    },
  };
};

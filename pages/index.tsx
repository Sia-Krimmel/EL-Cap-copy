import '@root/global.scss';

import { THEME_PATH_MAP, useTheme } from '@root/components/ThemeContext';
import { NAV_CONTENT } from '@root/common/constants';
import { THEME_TYPES } from '@root/common/types';

import HomeSection from '@root/sections/HomeSection';
import Page from '@root/components/Page';
import PageContainer from '@root/components/PageContainer';
import SectionHeading from '@root/components/SectionHeading';

export default function HomePage({ initialTheme, newTheme }) {
  useTheme(initialTheme, newTheme);

  return (
    <Page title="El Cap" description="We build and invest at the collision of technology shifts and behavior change." url="https://elcap.xyz/portfolio">
      <PageContainer
        style={{
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <SectionHeading navContent={NAV_CONTENT} />
        <HomeSection />
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
    storedTheme = THEME_TYPES.THEME_BEIGE;
  } else {
    // Otherwise, determine the theme based on the referer
    const pathSegments = currentUrl.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const refererValue = THEME_PATH_MAP[lastSegment];
    storedTheme = refererValue || THEME_TYPES.THEME_BEIGE;
  }

  return {
    props: {
      initialTheme: storedTheme,
      newTheme: THEME_TYPES.THEME_BEIGE,
    },
  };
};

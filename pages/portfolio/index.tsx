import '@root/global.scss';

import { NAV_CONTENT } from '@root/common/constants';
import { THEME_TYPES } from '@root/common/types';
import { INVESTMENT_PORTFOLIO_PROPS } from '@root/components/PortfolioContent';
import { THEME_PATH_MAP, useTheme } from '@root/components/ThemeContext';

import Page from '@root/components/Page';
import PageContainer from '@root/components/PageContainer';
import SectionHeading from '@root/components/SectionHeading';
import PortfolioSection from '@root/sections/PortfolioSection';

export default function PortfolioPage({ initialTheme, newTheme }) {
  useTheme(initialTheme, newTheme);

  const portfolio = INVESTMENT_PORTFOLIO_PROPS;

  return (
    <Page title="El Cap Portfolio" description=" We build and invest at the collision of technology shifts and behavior change." url="https://elcap.xyz/portfolio">
      <PageContainer>
        <SectionHeading navContent={NAV_CONTENT} />
        <PortfolioSection portfolio={portfolio} />
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
    storedTheme = THEME_TYPES.THEME_BLACK;
  } else {
    // Otherwise, determine the theme based on the referer
    const pathSegments = currentUrl.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    storedTheme = THEME_PATH_MAP[lastSegment] || THEME_TYPES.THEME_BLACK;
  }

  return {
    props: {
      initialTheme: storedTheme,
      newTheme: THEME_TYPES.THEME_BLACK,
    },
  };
};

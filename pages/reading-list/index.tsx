import '@root/global.scss';

import { FOOTER, NAV_CONTENT } from '@root/common/constants';
import { getThemeColor, useTheme } from '@root/components/ThemeContext';
import { resolveAirtableReadingsList } from '@root/resolvers/airtable';
import { THEME_TYPES } from '@root/common/types';
import { useEffect } from 'react';

import Page from '@root/components/Page';
import PageContainer from '@root/components/PageContainer';
import SectionHeading from '@root/components/SectionHeading';
import SectionReading from '@root/sections/SectionReading';

export default function ReadingListPage({ formattedReadings, initialTheme, newTheme }) {
  const footer = FOOTER;

  const { theme, updateTheme } = useTheme(initialTheme, newTheme);

  useEffect(() => {
    updateTheme(newTheme);
  }, [newTheme, updateTheme]);

  const initialColors = initialTheme === newTheme ? getThemeColor(initialTheme) : null;

  return (
    <Page title="El Cap Reading List" description="We build and invest at the collision of technology shifts and behavior change." url="https://elcap.xyz/portfolio">
      <PageContainer style={initialColors ? { background: initialColors.background, color: initialColors.text } : {}}>
        <SectionHeading navContent={NAV_CONTENT} background="var(--color-green-dark)" />
        {formattedReadings && <SectionReading footer={footer} formattedReadings={formattedReadings} />}
      </PageContainer>
    </Page>
  );
}

export async function getStaticProps(context) {
  const storedTheme = THEME_TYPES.THEME_GREEN;

  const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
  const host = process.env.NEXT_PUBLIC_HOST || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;

  const bookListEndpoint = `${baseUrl}/api/airtable/books`;
  const articleListEndpoint = `${baseUrl}/api/airtable/articles`;

  // Fetch data from both endpoints
  let bookList = [];
  let articleList = [];

  try {
    const bookListResponse = await fetch(bookListEndpoint);
    if (bookListResponse.ok) {
      bookList = await bookListResponse.json();
    } else {
      console.error('Failed to fetch book list:', bookListResponse.status);
    }
  } catch (error) {
    console.error('Error fetching book list:', error);
  }
  try {
    const articleListResponse = await fetch(articleListEndpoint);
    if (articleListResponse.ok) {
      articleList = await articleListResponse.json();
    } else {
      console.error('Failed to fetch article list:', articleListResponse.status);
    }
  } catch (error) {
    console.error('Error fetching article list:', error);
  }
  let formattedReadings;

  formattedReadings = resolveAirtableReadingsList({ bookList, articleList });

  const REVALIDATE_AIRTABLE = 259200; //3 days in seconds

  return {
    props: {
      initialTheme: storedTheme,
      newTheme: THEME_TYPES.THEME_GREEN,
      formattedReadings: formattedReadings,
    },
    revalidate: REVALIDATE_AIRTABLE,
  };
}

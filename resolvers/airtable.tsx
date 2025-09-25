import { FeaturedArticleProps } from '@root/components/FeaturedArticle';
import { ReadingNavigationProps } from '@root/components/SwipeNavigation';

export function formatAirtableBooks(books): FeaturedArticleProps[] {
  if (!books?.records) return [];

  return books?.records.map((book) => {
    return {
      title: book?.fields?.Name || null,
      authors: book?.fields?.Author || null,
      synopsis: book?.fields['Synopsis (click to expand)'] || null,
    };
  });
}

export function formatAirtableArticles(articles): FeaturedArticleProps[] {
  if (!articles?.records) return [];

  return articles?.records
    .filter((article) => article?.fields?.Name)
    .sort((a, b) => {
      const dateA = new Date(a._rawJson.createdTime);
      const dateB = new Date(b._rawJson.createdTime);
      return dateB.getTime() - dateA.getTime();
    })

    .map((article) => {
      return {
        title: article?.fields?.Name || null,
        category: article?.fields?.Topic || null,
        href: article?.fields?.Link || null,
      };
    });
}

export function resolveAirtableReadingsList({ bookList, articleList }) {
  const formattedBooks = formatAirtableBooks(bookList);
  const formattedArticles = formatAirtableArticles(articleList);

  const readingList: ReadingNavigationProps[] = [
    {
      title: 'Articles',
      items: formattedArticles,
    },
    {
      title: 'Books',
      items: formattedBooks,
    },
  ];

  return readingList;
}

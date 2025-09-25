import { PortfolioProps, PortfolioItemsProps } from '@root/components/PortfolioItems';

export const INVESTMENT_PORTFOLIO: PortfolioItemsProps[] = [
  {
    name: 'Arkestro',
    description: 'ML powered procurement for worlds largest corporations',
    href: 'https://arkestro.com/',
  },
  {
    name: 'Backdrop',
    description: 'A platform connecting frontier technology to builders',
    href: 'https://backdrop.so/',
  },
  {
    name: 'Cabin',
    description: 'DAO creating the future of places people want to live',
    href: 'https://cabin.city',
  },
  {
    name: 'GenE',
    description: 'The home for all gamers to compete, create, and learn together',
    href: 'https://www.generationesports.com/',
  },
  {
    name: 'Guru',
    description: 'AI co-pilot for multimodal foundation models',
    href: 'https://www.getguru.ai/',
  },
  {
    name: 'Loop',
    description: 'AI powered hiring tools for sales teams',
    href: 'https://www.loopsupport.com/',
  },
  {
    name: 'Redo',
    description: 'A post-purchase operations platform for eCommerce',
    href: 'https://www.getredo.com',
  },
  {
    name: 'Revive',
    description: 'Ad campaign creation with data tools and customizable intelligent workflows',
    href: 'https://www.revivemedia.us/',
  },
  {
    name: 'Rhizome',
    description: 'A resiliency SaaS platform for utilities',
    href: 'https://www.rhizomedata.com/',
  },

  {
    name: ' Unstack (Acquired)',
    description: 'High performance data-driven eCommerce sites',
  },
  {
    name: 'Verb (Acquired)',
    description: 'A data experience platform for SaaS developers',
  },
  {
    name: 'Clockwork (Shutdown)',
    description: 'Automating tasks and webhooks on the Blockchain',
  },
  {
    name: 'Friday (Shutdown)',
    description: 'Coordination and collaboration layer for remote teams',
  },
  {
    name: 'Moss (Shutdown)',
    description: 'Collaborative workflow tool for creatives',
  },
];

export const INVESTMENT_PORTFOLIO_PROPS: PortfolioProps = {
  portfolioItems: INVESTMENT_PORTFOLIO,
};

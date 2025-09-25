import { BlogArticlesProps } from "@root/components/BlogArticles";
import { FeaturedArticleProps } from "@root/components/FeaturedArticle";

export const MAX_SIZE_BYTES = 15728640;

export const CONTRIBUTORS = [
  {
    name: "Behzod Sirjani",
    imageUrl: "/media/behzod_sirjani.png",
    siteURL: " https://behzod.com/",
    twitterURL: " https://x.com/beh_zod",
    linkedinURL: "https://www.linkedin.com/in/behzodsirjani/",
  },
  {
    name: "Ben Leiken",
    imageUrl: "/media/ben_leiken.png",
    linkedinURL: "https://www.linkedin.com/in/benleiken/",
  },
  {
    name: "Colette Kolenda",
    imageUrl: "/media/colette_kolenda.png",
    twitterURL: "https://x.com/colettekolenda",
    linkedinURL: "https://www.linkedin.com/in/colettekolenda/",
  },
  {
    name: "Jasdev Singh",
    imageUrl: "/media/jasdev_singh.png",
    siteURL: " https://jasdev.me/",
    twitterURL: " https://x.com/jasdev",
  },
  {
    name: "Kevin Hanaford",
    imageUrl: "/media/kevin_hanaford.png",
    siteURL: "https://kevinhanaford.com/",
    twitterURL: "https://x.com/cmdkvn",
  },
  {
    name: "Max Di Capua",
    imageUrl: "/media/max_di_capua.png",
    siteURL: "https://www.max.lol/",
    twitterURL: "https://x.com/maxdicapua",
  },
  {
    name: "Nick Beattie",
    imageUrl: "/media/nick_beattie.png",
    siteURL: " https://www.nickbytes.com/",
    twitterURL: "https://x.com/nickbytes",
    githubURL: "https://github.com/nickbytes",
  },
  {
    name: "Parteek Saran",
    imageUrl: "/media/parteek_saran.png",
    siteURL: " https://www.teek.me/",
    twitterURL: "https://x.com/parteeksaran",
  },
  {
    name: "Woody Klementson",
    imageUrl: "/media/woody_klementson.png",
    linkedinURL: "https://www.linkedin.com/in/woody-klemetson",
  },
  {
    name: "Zakk Fleischmann",
    imageUrl: "/media/zakk_fleischmann.png",
    siteURL: " https://zkf.io/",
    twitterURL: "https://x.com/0xzakk",
  },
];

export const NAV_CONTENT = [
  { name: "About", link: "/about" },
  { name: "Blog", link: "/blog" },
  { name: "Reading List", link: "/reading-list" },
  { name: "Contributors", link: "/contributors" },
  { name: "Portfolio", link: "/portfolio" },
];

export const FOOTER = {
  tagline: "We build and invest at points of collision.",
  links: [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Reading List",
      href: "/reading-list",
    },
    {
      name: "Contributors",
      href: "/contributors",
    },
    {
      name: "Portfolio",
      href: "/portfolio",
    },
  ],
  copyright: "© 2024 El Cap",
};

export const BLOG_ARTICLES: BlogArticlesProps = {
  blogArticles: [
    {
      author: "Stew Bradley",
      date: "May 31, 2024",
      href: "https://elcap.xyz/posts_id/lessons-5-years-in",
      title: "Lessons 5 years in",
    },
    {
      author: "Stew Bradley",
      date: "November 9, 2023",
      href: "https://elcap.xyz/posts_id/analogies-are-dangerous",
      title: "Analogies are Dangerous",
    },
    {
      author: "Kunal Tandon",
      date: "February 14, 2023",
      href: "https://elcap.xyz/posts_id/dislocation",
      title: "Dislocation",
    },
    {
      author: "Stew Bradley",
      date: "February 6, 2023",
      href: "https://elcap.xyz/posts_id/chatgpt-could-never",
      title: "ChatGPT Could Never",
    },
    {
      author: "Stew Bradley",
      date: "January 31, 2023",
      href: "https://elcap.xyz/posts_id/gaming-crews-hit-different",
      title: "Gaming Crews Hit Different",
    },
    {
      author: "Kunal Tandon",
      date: "January 31, 2023",
      href: "https://elcap.xyz/posts_id/collision-conditions",
      title: "Collision Conditions",
    },
    {
      author: "Stew Bradley",
      date: "January 23, 2023",
      href: "https://elcap.xyz/posts_id/comfortably-uncomfortable",
      title: "Comfortably Uncomfortable",
    },
    {
      author: "Kunal Tandon",
      date: "January 17, 2023",
      href: "https://elcap.xyz/posts_id/unmute",
      title: "Unmute",
    },
    {
      author: "Kunal Tandon",
      date: "December 17, 2022",
      href: "https://elcap.xyz/posts_id/the-next-disney",
      title: "The Next Disney",
    },
    {
      author: "Kunal Tandon",
      date: "December 15, 2022",
      href: "https://elcap.xyz/posts_id/the-empathy-engine",
      title: "The Empathy Engine",
    },
    {
      author: "Stew Bradley",
      date: "August 18, 2022",
      href: "https://elcap.xyz/posts_id/slow-is-smooth",
      title: "Slow is Smooth",
    },
    {
      author: "Kunal Tandon",
      date: "December 15, 2021",
      href: "https://elcap.xyz/posts_id/obvious-secrets",
      title: "Obvious Secrets",
    },
    {
      author: "Stew Bradley",
      date: "July 9, 2021",
      href: "https://elcap.xyz/posts_id/the-power-of-storytelling",
      title: "The Power of Storytelling",
    },
    {
      author: "Kunal Tandon",
      date: "May 26, 2021",
      href: "https://elcap.xyz/posts_id/flexible-fences",
      title: "Flexible Fences",
    },
    {
      author: "Kunal Tandon",
      date: "April 28, 2021",
      href: "https://elcap.xyz/posts_id/rerouting",
      title: "Rerouting",
    },
    {
      author: "Stew Bradley",
      date: "April 28, 2021",
      href: "https://elcap.xyz/posts_id/best-available",
      title: "Best Available",
    },
    {
      author: "Stew Bradley",
      date: "April 3, 2021",
      href: "https://elcap.xyz/posts_id/time-to-think",
      title: "Time to Think",
    },
    {
      author: "Kunal Tandon",
      date: "April 3, 2021",
      href: "https://elcap.xyz/posts_id/stay-curious",
      title: "Stay Curious",
    },
    {
      author: "Stew Bradley",
      date: "April 3, 2021",
      href: "https://elcap.xyz/posts_id/time-to-think",
      title: "Time to Think",
    },
    {
      author: "Kunal Tandon",
      date: "March 15, 2021",
      href: "https://elcap.xyz/posts_id/firing-yourself",
      title: "Firing Yourself",
    },
    {
      author: "Kunal Tandon",
      date: "September 15, 2020",
      href: "https://elcap.xyz/posts_id/climbing-the-curve",
      title: "Climbing the Curve",
    },
    {
      author: "Kunal Tandon",
      date: "September 4, 2020",
      href: "https://elcap.xyz/posts_id/the-shift",
      title: "The Shift",
    },
    {
      author: "Kunal Tandon",
      date: "September 4, 2020",
      href: "https://elcap.xyz/posts_id/the-shift",
      title: "The Shift",
    },
    {
      author: "Kunal Tandon",
      date: "July 13, 2020",
      href: "https://elcap.xyz/posts_id/simple-starts",
      title: "Simple Starts",
    },
    {
      author: "Kunal Tandon",
      date: "June 10, 2020",
      href: "https://elcap.xyz/posts_id/the-yet-mindset",
      title: "The Yet Mindset",
    },
    {
      author: "Kunal Tandon",
      date: "May 11, 2020",
      href: "https://elcap.xyz/posts_id/engineering-serendipity",
      title: "Engineering Serendipity",
    },
    {
      author: "Kunal Tandon",
      date: "April 10, 2020",
      href: "https://elcap.xyz/posts_id/listen-closely",
      title: "Listen Closely",
    },
    {
      author: "Kunal Tandon",
      date: "March 30, 2020",
      href: "https://elcap.xyz/posts_id/live-together-die-alone",
      title: "Live Together, Die Alone",
    },
    {
      author: "El Cap",
      date: "January 2, 2020",
      href: "https://elcap.xyz/posts_id/ssg-ssr",
      title: "When to Use Static Generation v.s. Server-side Rendering",
    },
  ],
};

export const READING_ARTICLE_CONTENT: FeaturedArticleProps[] = [
  {
    authors: ["Joe Nocera"],
    title: "A Piece of the Action: How the Middle Class Joined the Money Class",
    href: "",
  },
  {
    authors: ["Khaled Hosseini"],
    title: "A Thousand Splendid Suns",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
  {
    authors: ["Joe Nocera"],
    title: "A Piece of the Action: How the Middle Class Joined the Money Class",
    href: "",
  },
  {
    authors: ["Khaled Hosseini"],
    title: "A Thousand Splendid Suns",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
  {
    authors: ["Joe Nocera"],
    title: "A Piece of the Action: How the Middle Class Joined the Money Class",
    href: "",
  },
  {
    authors: ["Khaled Hosseini"],
    title: "A Thousand Splendid Suns",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
];

export const READING_BOOKS_CONTENT: FeaturedArticleProps[] = [
  {
    authors: ["Joe Nocera"],
    title: "A Piece of the Action: How the Middle Class Joined the Money Class",
    href: "",
  },
  {
    authors: ["Khaled Hosseini"],
    title: "A Thousand Splendid Suns",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
  {
    authors: ["Joe Nocera"],
    title: "A Piece of the Action: How the Middle Class Joined the Money Class",
    href: "",
  },
  {
    authors: ["Khaled Hosseini"],
    title: "A Thousand Splendid Suns",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
  {
    authors: ["Peter Bernstein"],
    title: "Against the Gods",
    href: "",
  },
];

export const READING_LIST_NAVIGATION = [
  {
    title: "Articles",
    items: READING_ARTICLE_CONTENT,
  },
  {
    title: "Books",
    items: READING_BOOKS_CONTENT,
  },
];

export const DROPDOWN_STRING = `Teamwork has always been a central tenet of our approach. The African proverb: “If you want to go fast, go alone; but if you want to go far, go together.” encapsulates our approach with LPs, founders, and now contributors. Together doesn’t mean just sharing the workload, but sharing economics as well. Our Contributors have an abundance of options on where they focus their time and energy, so to align interests with the best people, both of us have given up a generous portion of our own economics to share them with the contributors. We only win in this business when our companies perform, and we believe contributors improve the chances of our companies winning. Said more simply, when they help us win, we want to make sure they win alongside us. We’re always looking to meet new people who might be interested in joining us.`;

export const ORGANIZATION_ID = "047e9593-2ed2-4aad-a8fe-e91592d7cadd";

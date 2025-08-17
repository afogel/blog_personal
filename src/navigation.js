import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      href: getPermalink('/#about'),
    },
    {
      text: 'Resume',
      href: getPermalink('/#resume'),
    },
    {
      text: 'Blog',
      links: [
        {
          text: 'All Posts',
          href: getBlogPermalink(),
        },
        {
          text: 'Search Posts',
          href: getPermalink('/search'),
        },
      ],
    },
    {
      text: 'Github',
      href: 'https://www.github.com/afogel',
    },
  ],
  actions: [
    {
      text: 'Contact Me',
      href: '#',
    },
  ],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/arielfogel' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://www.github.com/afogel' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
  `,
};

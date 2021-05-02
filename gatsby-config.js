module.exports = {
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typescript',
      options: {
        isTSX: true,
        jsxPragma: `jsx`,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['PT Sans:400,700'],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'page',
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'post',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 660,
              showCaptions: ['alt'],
              quality: 85,
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
  ],
  siteMetadata: {
    author: '@lyndonoc',
    banner: '/profile.png',
    description: 'Tech Enthusiast',
    headline: 'Tech Enthusiast',
    siteLanguage: 'en',
    siteUrl: 'https://lyndonoc.github.io',
    title: 'Lyndon Chun',
  },
};

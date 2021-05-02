import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocation } from '@reach/router';

interface SEOPropsType {
  article?: string;
  banner?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  node?: {
    [key: string]: never;
  };
  pathname?: string;
  title?: string;
}

export const SEO: React.FC<SEOPropsType> = ({
  article,
  banner,
  description,
  image,
  keywords = [],
  node,
  title,
}) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(graphql`
    query {
      site {
        buildTime(formatString: "YYYY-MM-DD")
        siteMetadata {
          author
          defaultBanner: banner
          defaultDescription: description
          headline
          siteLanguage
          siteUrl
          defaultTitle: title
        }
      }
    }
  `);

  const {
    buildTime,
    siteMetadata: {
      author,
      defaultBanner,
      defaultDescription,
      defaultTitle,
      headline,
      siteLanguage,
      siteUrl,
    },
  } = site;

  const seo = {
    description: description || defaultDescription,
    image: `${siteUrl}${image || banner || defaultBanner}`,
    title: title || defaultTitle,
    url: `${siteUrl}${pathname || ''}`,
  };

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: siteUrl,
    headline,
    inLanguage: siteLanguage,
    mainEntityOfPage: siteUrl,
    description: defaultDescription,
    name: defaultTitle,
    author: {
      '@type': 'Person',
      name: author,
    },
    copyrightHolder: {
      '@type': 'Person',
      name: author,
    },
    copyrightYear: '2019',
    creator: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Person',
      name: author,
    },
    datePublished: '2019-01-18T10:30:00+01:00',
    dateModified: buildTime,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}${defaultBanner}`,
    },
  };

  const itemListElement = [
    {
      '@type': 'ListItem',
      item: {
        '@id': siteUrl,
        name: 'Homepage',
      },
      position: 1,
    },
  ];

  let schemaArticle = null;

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: author,
      },
      copyrightYear: '2019',
      creator: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: author,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}${defaultBanner}`,
        },
      },
      datePublished: node?.first_publication_date,
      dateModified: node?.last_publication_date,
      description: seo.description,
      headline: seo.title,
      inLanguage: siteLanguage,
      url: seo.url,
      name: seo.title,
      image: {
        '@type': 'ImageObject',
        url: seo.image,
      },
      mainEntityOfPage: seo.url,
    };
    // Push current blogpost into breadcrumb list
    itemListElement.push({
      '@type': 'ListItem',
      item: {
        '@id': seo.url,
        name: seo.title,
      },
      position: 2,
    });
  }

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement,
  };

  return (
    <>
      <Helmet title={seo.title}>
        <html lang={siteLanguage} />
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
        <meta name="gatsby-starter" content="Gatsby Starter Prismic" />
        {keywords && keywords.length > 0 && (
          <meta name="keyworkds" content={keywords.join(',')} />
        )}
        {!article && (
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgWebPage)}
          </script>
        )}
        {article && (
          <script type="application/ld+json">
            {JSON.stringify(schemaArticle)}
          </script>
        )}
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      </Helmet>
    </>
  );
};

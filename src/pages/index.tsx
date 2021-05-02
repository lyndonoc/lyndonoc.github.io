import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { AppPaths } from '../constants/paths';
import { Layout } from '../components/common/layout';
import { PostListItemType, Posts } from '../components/posts';
import { PostTagType } from '../templates/archive';
import { SEO } from '../components/seo';
import { ThemeProps } from '../lib/theme';
import { WordCloud } from '../components/wordcloud';

interface IndexPagePropsType {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: PostListItemType;
      }>;
    };
    tagGroups: {
      group: PostTagType[];
    };
  };
}

const IndexPageStyledWrapper = styled.div<ThemeProps>`
  > h2 {
    font-size: 1.5rem;
  }
  > ul {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary_border};
    padding: 1.25rem 0;
  }
  > .posts-list {
    padding: 1.25rem 0;
    > h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    > ul {
      > li {
        > h4 {
          font-size: 1.1rem;
        }
      }
    }
  }
`;

const IndexPage: React.FC<IndexPagePropsType> = ({
  data: {
    allMarkdownRemark: { edges: posts },
    tagGroups: { group: tags },
  },
}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <IndexPageStyledWrapper>
        <h2>Writings</h2>
        <WordCloud
          items={tags.slice(0, 15).map((tag) => ({
            path: `${AppPaths.tag}/${tag.name}`,
            label: tag.name,
            subLabel: `(${tag.totalCount})`,
          }))}
          title="Topics"
        />
        <div className="posts-list">
          <h3>Recent Posts</h3>
          <Posts posts={posts} />
        </div>
      </IndexPageStyledWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "post" } } }
      sort: { fields: fields___date, order: DESC }
      limit: 5
    ) {
      edges {
        node {
          fields {
            date
            slug
          }
          frontmatter {
            title
          }
          id
          timeToRead
        }
      }
    }
    tagGroups: allMarkdownRemark {
      group(field: frontmatter___tags) {
        name: fieldValue
        totalCount
      }
    }
  }
`;

export default IndexPage;

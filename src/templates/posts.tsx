import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/common/layout';
import { Pager, PagerPropsType } from '../components/pager';
import { PostListItemType, Posts } from '../components/posts';
import { SEO } from '../components/seo';

interface PostsTemplatePropType {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: PostListItemType;
      }>;
    };
  };
  pageContext: PagerPropsType;
}

const PostsTemplate: React.FC<PostsTemplatePropType> = ({
  data: {
    allMarkdownRemark: { edges: posts },
  },
  pageContext,
}) => (
  <Layout>
    <SEO title="Blog posts" />
    <Posts posts={posts} />
    <Pager
      nextPagePath={pageContext.nextPagePath}
      previousPagePath={pageContext.previousPagePath}
    />
  </Layout>
);

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $ids: [String!]) {
    allMarkdownRemark(
      filter: { id: { in: $ids } }
      sort: { fields: [fields___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          ...PostList
        }
      }
    }
  }
`;

export default PostsTemplate;

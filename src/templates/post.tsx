import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/common/layout';
import { Pager, PagerPropsType } from '../components/pager';
import { Post, PostPropsType } from '../components/post';
import { SEO } from '../components/seo';

interface PostTemplatePropType {
  data: {
    markdownRemark: PostPropsType;
  };
  pageContext: PagerPropsType;
}

const PostTemplate: React.FC<PostTemplatePropType> = ({
  data: { markdownRemark },
  pageContext,
}) => (
  <Layout>
    <SEO
      description={markdownRemark.frontmatter.title}
      keywords={markdownRemark.frontmatter.tags}
    />
    <Post
      fields={markdownRemark.fields}
      frontmatter={markdownRemark.frontmatter}
      headings={markdownRemark.headings}
      html={markdownRemark.html}
      timeToRead={markdownRemark.timeToRead}
    />
    <Pager
      nextPagePath={pageContext.nextPagePath}
      previousPagePath={pageContext.previousPagePath}
    />
  </Layout>
);

export const pageQuery = graphql`
  query($pageId: String!) {
    markdownRemark(id: { eq: $pageId }) {
      ...Post
    }
  }
`;

export default PostTemplate;

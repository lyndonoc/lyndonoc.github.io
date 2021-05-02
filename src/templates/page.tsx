import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { Layout } from '../components/common/layout';
import { SEO } from '../components/seo';
import { ThemeProps } from '../lib/theme';

export interface MarkdownPageDataType {
  frontmatter: {
    title: string;
  };
  html: string;
  id: string;
}

interface PageTemplatePropsType {
  data: {
    markdownRemark: MarkdownPageDataType;
  };
}

const MarkdownContentStyledWrapper = styled.div<ThemeProps>`
  margin-bottom: 2rem;
  > ul {
    list-style: disc;
    padding-left: 2rem;
    > li {
      margin-bottom: 0.75rem;
    }
  }
`;

const PageTemplate: React.FC<PageTemplatePropsType> = ({
  data: {
    markdownRemark: {
      frontmatter: { title },
      html,
    },
  },
}) => (
  <Layout>
    <SEO title={title} />
    <MarkdownContentStyledWrapper
      className={title}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </Layout>
);

export const pageQuery = graphql`
  query($id: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
      }
      html
    }
  }
`;

export default PageTemplate;

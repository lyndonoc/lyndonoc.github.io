import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { Postmeta } from './postmeta';
import { SEO } from './seo';
import { TOC, TOCHeadingType } from './toc';
import { ThemeProps } from '../lib/theme';

interface PostFrontmatterType {
  categories: string[];
  featuredImage: {
    publicURL: string;
  };
  tags: string[];
  title: string;
  updatedAt: string;
}

export interface PostPropsType {
  fields: {
    date: string;
    slug: string;
  };
  frontmatter: PostFrontmatterType;
  html: string;
  headings: TOCHeadingType[];
  id?: string;
  timeToRead: number;
}

const PostContentContainerStyledWrapper = styled.div<ThemeProps>`
  > h1 {
    font-size: 1.5rem;
  }
`;

const PostContentStyledWrapper = styled.div<ThemeProps>`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.25rem;
    margin: 1.25rem 0;
  }
  > p {
    margin: 1rem 0;
  }
`;

export const Post: React.FC<PostPropsType> = ({
  fields,
  frontmatter,
  headings,
  html,
  timeToRead,
}) => (
  <>
    <TOC headings={headings} />
    {frontmatter.featuredImage && frontmatter.featuredImage.publicURL && (
      <SEO image={frontmatter.featuredImage.publicURL} />
    )}
    <PostContentContainerStyledWrapper>
      <h1>{frontmatter.title}</h1>
      <Postmeta postDate={fields.date} timeToRead={timeToRead} />
      <PostContentStyledWrapper dangerouslySetInnerHTML={{ __html: html }} />
    </PostContentContainerStyledWrapper>
  </>
);

export const query = graphql`
  fragment Post on MarkdownRemark {
    fields {
      date
      slug
    }
    frontmatter {
      categories
      featuredImage {
        publicURL
      }
      tags
      title
    }
    html
    id
    timeToRead
    ...TOC
  }
`;

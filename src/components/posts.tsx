import React from 'react';
import styled from '@emotion/styled';
import { Link, graphql } from 'gatsby';

import { Postmeta } from './postmeta';
import { ThemeProps } from '../lib/theme';

export interface PostListItemType {
  excerpt: string;
  fields: {
    date: string;
    slug: string;
  };
  frontmatter: {
    title: string;
  };
  id: string;
  timeToRead: number;
}

export interface PostsPropsType {
  posts: Array<{
    node: PostListItemType;
  }>;
}

const PostsStyledWrapper = styled.ul<ThemeProps>`
  > li {
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary_border};
    padding: 1rem 0;
    &:first-of-type {
      padding-top: 0;
    }
    &:last-child {
      border: none;
    }
    > h4 {
      font-size: 1.25rem;
    }
    > p {
      margin-top: 1rem;
    }
  }
`;

export const Posts: React.FC<PostsPropsType> = ({ posts }) => (
  <PostsStyledWrapper>
    {posts.map(({ node: post }) => (
      <li key={post.id}>
        <h4>
          <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
        </h4>
        <Postmeta postDate={post.fields.date} timeToRead={post.timeToRead} />
        {post.excerpt && <p>{post.excerpt}</p>}
      </li>
    ))}
  </PostsStyledWrapper>
);

export const query = graphql`
  fragment PostList on MarkdownRemark {
    fields {
      date
      slug
    }
    frontmatter {
      title
    }
    id
    excerpt(pruneLength: 200)
    timeToRead
  }
`;

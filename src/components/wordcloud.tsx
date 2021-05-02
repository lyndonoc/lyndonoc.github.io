import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { ThemeProps } from '../lib/theme';

interface WordCloudPropsType {
  items: Array<{
    label: string;
    path: string;
    subLabel?: string;
  }>;
  title: string;
}

const WordCloudStyledWrapper = styled.ul<ThemeProps>`
  > h3 {
    font-size: 1.25em;
    margin-bottom: 0.75rem;
  }
  > ul {
    ${({ theme }) => theme.flexBox()};
    flex-wrap: wrap;
    > li {
      margin: 0 0.5rem 0.5rem 0;
      > a {
        > span {
          font-size: 0.8rem;
          padding-left: 0.1rem;
        }
      }
    }
  }
`;

export const WordCloud: React.FC<WordCloudPropsType> = ({ items, title }) => (
  <WordCloudStyledWrapper>
    <h3>{title}</h3>
    <ul>
      {items.map((item) => (
        <li key={item.path}>
          <Link to={item.path}>
            {item.label}
            {item.subLabel && <span>{item.subLabel}</span>}
          </Link>
        </li>
      ))}
    </ul>
  </WordCloudStyledWrapper>
);

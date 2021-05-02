import React, { useEffect, useState } from 'react';
import slugger from 'github-slugger';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import { throttle } from 'lodash';

import { ThemeProps } from '../lib/theme';

interface TOCItemStyledWrapperPropsType {
  active: boolean;
  depth: number;
}

export interface TOCHeadingType {
  depth: number;
  value: string;
}

export interface TOCPropsType {
  headings: TOCHeadingType[];
}

const TOCStyledWrapper = styled.div<ThemeProps>`
  display: none;
  @media screen and (min-width: 1160px) {
    display: block;
    position: sticky;
    top: 1rem;
    width: 100%;
    ol {
      left: 100%;
      margin-left: calc(2rem - 2px);
      position: absolute;
      width: 250px;
      > li {
      }
    }
  }
`;

const TOCItemStyledWrapper = styled.li<
  ThemeProps & TOCItemStyledWrapperPropsType
>`
  border-left: 2px solid
    ${({ active, theme }) => {
      return active ? theme.colors.black_active : 'transparent';
    }};
  padding-left: ${({ depth }) => {
    return depth * 12;
  }}px;
  > a {
    color: ${({ active, theme }) => {
      return active ? theme.colors.black_active : theme.colors.black_inactive;
    }};
    font-size: 0.87rem;
    font-weight: ${({ active }) => {
      return active ? 700 : 400;
    }};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.colors.black_active};
      font-weight: 700;
    }
  }
`;

export const TOC: React.FC<TOCPropsType> = ({ headings }) => {
  let skipScrollEvent = false;
  const [currentIndex, setCurrentIndex] = useState(0);
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const targetId = target.dataset.id;

    if (!targetId) {
      return;
    }

    skipScrollEvent = true;
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
    });
    skipScrollEvent = true;
  };
  const headers = headings
    .filter(({ depth }) => depth < 3)
    .map((h) => ({ ...h, slug: slugger.slug(h.value) }));

  useEffect(() => {
    const offsets = headers.map(({ slug }) => {
      const slugTitle = document.getElementById(slug);
      return slugTitle ? Math.max(0, slugTitle.offsetTop - 250) : 0;
    });
    const onScroll = throttle(() => {
      if (skipScrollEvent) {
        return;
      }

      const headOffset = offsets[0] || 0;
      const indexCandidate = offsets.findIndex((offset) => {
        return offset > window.scrollY;
      });
      const newCurrentIndex =
        window.scrollY === 0 || window.scrollY <= headOffset
          ? 0
          : indexCandidate > -1
          ? indexCandidate
          : offsets.length - 1;

      setCurrentIndex(newCurrentIndex);
    }, 300);

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <TOCStyledWrapper>
      <ol>
        {headers.map((header, idx) => {
          const targetId = slugger.slug(header.value);
          return (
            <TOCItemStyledWrapper
              key={targetId}
              active={currentIndex === idx}
              depth={header.depth}
            >
              <a data-id={targetId} href={`#${targetId}`} onClick={onClick}>
                {header.value}
              </a>
            </TOCItemStyledWrapper>
          );
        })}
      </ol>
    </TOCStyledWrapper>
  );
};

export const query = graphql`
  fragment TOC on MarkdownRemark {
    headings {
      depth
      value
    }
  }
`;

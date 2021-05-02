import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { LeftArrowIcon } from './icons/leftArrowIcon';
import { RightArrowIcon } from './icons/rightArrowIcon';
import { ThemeProps } from '../lib/theme';

export interface NodeType {
  id: string;
  slug: string;
}

interface PageLinkButtonPropsType {
  className?: string;
  to?: string;
}

export interface PagerPropsType {
  nextPagePath: string;
  previousPagePath: string;
}

const PagerStyledWrapper = styled.ul<ThemeProps>`
  ${({ theme }) => theme.flexBox('space-between')};
  margin: 2rem 0;
  > li {
    > a,
    > span {
      ${({ theme }) => theme.flexBox()};
      font-size: 0.9rem;
      font-weight: 700;
    }
    > span {
      color: ${({ theme }) => theme.colors.black_inactive};
      > svg {
        opacity: 0.5;
      }
    }
  }
`;

const PageLinkButton: React.FC<PageLinkButtonPropsType> = ({
  children,
  className = '',
  to,
}) => {
  return to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
};

export const Pager: React.FC<PagerPropsType> = ({
  previousPagePath,
  nextPagePath,
}) => (
  <PagerStyledWrapper>
    <li>
      <PageLinkButton
        className={previousPagePath ? 'active' : 'disabled'}
        to={previousPagePath}
      >
        <LeftArrowIcon />
        Previous
      </PageLinkButton>
    </li>
    <li>
      <PageLinkButton
        className={nextPagePath ? 'active' : 'disabled'}
        to={nextPagePath}
      >
        Next
        <RightArrowIcon />
      </PageLinkButton>
    </li>
  </PagerStyledWrapper>
);

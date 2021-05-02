import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { Navigation } from './navigation';
import { ThemeProps } from '../../lib/theme';

interface HeaderPropsType {
  siteTitle: string;
}

const HeaderWrapper = styled.header<ThemeProps>`
  ${({ theme }) => theme.flexBox('flex-start', 'stretch')};
  margin-bottom: 2rem;
  > .gatsby-image-wrapper {
    ${({ theme }) => theme.rectanglify(50)};
    border-radius: 25px;
    margin-right: 1rem;
  }
  > .logo {
    background-color: ${({ theme }) => theme.colors.black_active};
    color: #fff;
    font-size: 2rem;
    height: 50px;
    margin-right: 1.5rem;
    padding: 0.25rem;
    width: 50px;
  }
  > .header-menu {
    ${({ theme }) => theme.flexBox('space-between', 'flex-start')};
    flex-direction: column;
    > h2 {
      ${({ theme }) => theme.flexBox()};
      > a {
        color: #000;
        font-size: 1.25rem;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
`;

export const Header: React.FC<HeaderPropsType> = ({ siteTitle }) => (
  <HeaderWrapper>
    <div className="logo">&#62;&#95;</div>
    <div className="header-menu">
      <h2>
        <Link to="/"> {siteTitle}</Link>
      </h2>
      <Navigation />
    </div>
  </HeaderWrapper>
);

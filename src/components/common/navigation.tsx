import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { AppMenus } from '../../constants/paths';
import { ThemeProps } from '../../lib/theme';

const NavigationWrapper = styled.nav<ThemeProps>`
  > ul {
    ${({ theme }) => theme.flexBox()};
    > li {
      margin-right: 1.5rem;
      > a {
        color: ${({ theme }) => theme.colors.black_active};
        &.active {
          text-decoration: underline;
        }
      }
    }
  }
`;

export const Navigation: React.FC = () => (
  <NavigationWrapper>
    <ul>
      {AppMenus.map((menu) => (
        <li key={menu.label + menu.path}>
          <Link activeClassName="active" to={menu.path}>
            {menu.label}
          </Link>
        </li>
      ))}
    </ul>
  </NavigationWrapper>
);

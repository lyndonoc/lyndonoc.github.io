import React from 'react';
import styled from '@emotion/styled';
import { Global, ThemeProvider } from '@emotion/react';
import { useStaticQuery, graphql } from 'gatsby';

import { Footer } from './footer';
import { Header } from './header';
import { ThemeProps, appTheme, globalStyles } from '../../lib/theme';

interface LayoutPropsType {
  hideFooter?: boolean;
  hideHeader?: boolean;
}

const LayoutWrapper = styled.div<ThemeProps>`
  background-color: #fff;
  border-left: 1px solid ${({ theme }) => theme.colors.primary_border};
  border-right: 1px solid ${({ theme }) => theme.colors.primary_border};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 660px;
  min-height: 100vh;
  min-width: 320px;
  padding: 2rem;
`;

export const Layout: React.FC<LayoutPropsType> = ({
  children,
  hideFooter,
  hideHeader,
}) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={appTheme}>
      <Global styles={globalStyles} />
      <LayoutWrapper>
        {!hideHeader && (
          <Header siteTitle={site.siteMetadata?.title || `Title`} />
        )}
        <main>{children}</main>
        {!hideFooter && <Footer />}
      </LayoutWrapper>
    </ThemeProvider>
  );
};

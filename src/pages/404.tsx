import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import { Layout } from '../components/common/layout';
import { SEO } from '../components/seo';
import { ThemeProps } from '../lib/theme';

const NotFoundPageStyledWrapper = styled.div<ThemeProps>`
  ${({ theme }) => theme.flexBox('center')};
  flex-direction: column;
  min-height: calc(100vh - 4rem);
  text-align: center;
  > h1 {
    font-size: 2.25rem;
    margin: 2rem 0;
  }
  > h2 {
    font-size: 4.5rem;
  }
`;

const NotFoundPage: React.FC = () => (
  <Layout hideHeader hideFooter>
    <SEO title="404: Not found" />
    <NotFoundPageStyledWrapper>
      <h2>(._.)?</h2>
      <h1>404 Not Found</h1>
      <Link to="/">Go to homepage</Link>
    </NotFoundPageStyledWrapper>
  </Layout>
);

export default NotFoundPage;

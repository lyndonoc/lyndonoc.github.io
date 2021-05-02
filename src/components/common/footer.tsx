import React from 'react';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';

import { GatsbyImageFixedType } from '../../lib/types';
import { ThemeProps } from '../../lib/theme';

interface FooterQueryDataType {
  githubIcon: GatsbyImageFixedType;
  linkedInIcon: GatsbyImageFixedType;
}

const FooterWrapper = styled.footer<ThemeProps>`
  ${({ theme }) => theme.flexBox('space-between')};
  margin-top: auto;
  > ul {
    ${({ theme }) => theme.flexBox('space-between')};
    > li {
      > a {
        display: block;
        padding-left: 10px;
      }
    }
  }
`;

export const Footer: React.FC = () => {
  const data = useStaticQuery<FooterQueryDataType>(graphql`
    query {
      githubIcon: file(relativePath: { eq: "github-icon.png" }) {
        childImageSharp {
          fixed(height: 20) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      linkedInIcon: file(relativePath: { eq: "linkedin-icon.png" }) {
        childImageSharp {
          fixed(height: 20) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <FooterWrapper>
      <p>© {new Date().getFullYear()}</p>
      <ul>
        <li>
          <a href="https://github.com/lyndonoc">
            <Img fixed={data.githubIcon.childImageSharp.fixed} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/lyndonoc">
            <Img fixed={data.linkedInIcon.childImageSharp.fixed} />
          </a>
        </li>
      </ul>
    </FooterWrapper>
  );
};

import React from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import { Link } from 'gatsby';

import { AppPaths } from '../constants/paths';
import { Layout } from '../components/common/layout';
import { SEO } from '../components/seo';
import { ThemeProps } from '../lib/theme';
import { WordCloud } from '../components/wordcloud';

export interface PostTagType {
  id: number;
  name: string;
  totalCount: number;
}

interface GroupType {
  groupName: string;
  list: {
    date: string;
    id: string;
    path: string;
    title: string;
  }[];
  year: number;
}

interface ArchivesTemplatePropsType {
  pageContext: {
    categories: PostTagType[];
    groups: GroupType[];
    tags: PostTagType[];
  };
}

const ArchiveBlockStyledWrapper = styled.div<ThemeProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary_border};
  padding: 1.25rem 0;
  &:last-child {
    border: none;
  }
`;

const ArchiveListBlockStyledWrapper = styled(ArchiveBlockStyledWrapper)`
  > h3 {
    margin-bottom: 0.75rem;
  }
  > ul {
    ${({ theme }) => theme.flexBox()};
    flex-wrap: wrap;
    padding-left: 1rem;
    > li {
      > h4 {
        margin-bottom: 0.75rem;
      }
      > ul {
        list-style: disc;
        padding-left: 2rem;
        > li {
          margin-bottom: 0.75rem;
          > p {
            color: ${({ theme }) => theme.colors.black_inactive};
          }
        }
      }
    }
  }
`;

const ArchivesTemplate: React.FC<ArchivesTemplatePropsType> = ({
  pageContext: { tags, categories, groups },
}) => {
  return (
    <Layout>
      <SEO title="archives" />
      <ArchiveBlockStyledWrapper>
        <WordCloud
          items={categories.map((category) => ({
            path: `${AppPaths.category}/${category.name}`,
            label: category.name,
            subLabel: `(${category.totalCount})`,
          }))}
          title="By Categories"
        />
      </ArchiveBlockStyledWrapper>
      <ArchiveBlockStyledWrapper>
        <WordCloud
          items={tags.map((tag) => ({
            path: `${AppPaths.tag}/${tag.name}`,
            label: tag.name,
            subLabel: `(${tag.totalCount})`,
          }))}
          title="By Tags"
        />
      </ArchiveBlockStyledWrapper>
      <ArchiveListBlockStyledWrapper>
        <h3>Archives</h3>
        <ul>
          {groups.map((group) => (
            <li key={group.year}>
              <h4>{group.groupName}</h4>
              <ul className="archive-list-items">
                {group.list.map((item) => (
                  <li key={item.id}>
                    <Link to={item.path}>{item.title}</Link>
                    <p>{DateTime.fromISO(item.date).toFormat('DDD')}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </ArchiveListBlockStyledWrapper>
    </Layout>
  );
};

export default ArchivesTemplate;

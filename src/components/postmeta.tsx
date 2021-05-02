import React from 'react';
import styled from '@emotion/styled';
import { DateTime } from 'luxon';

import { ThemeProps } from '../lib/theme';

interface PostmetaPropsType {
  postDate: string;
  timeToRead: number;
}

const PostmetaStyledWrapper = styled.div<ThemeProps>`
  > span {
    color: ${({ theme }) => theme.colors.black_inactive};
    font-size: 0.75rem;
    font-weight: 700;
    &.separator {
      padding: 0 0.5rem;
    }
  }
`;

export const Postmeta: React.FC<PostmetaPropsType> = ({
  postDate,
  timeToRead,
}) => (
  <PostmetaStyledWrapper>
    <span>{DateTime.fromISO(postDate).toFormat('DDD')}</span>
    <span className="separator">|</span>
    <span>{timeToRead} minute read</span>
  </PostmetaStyledWrapper>
);

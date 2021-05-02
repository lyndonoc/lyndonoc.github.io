import React from 'react';

import { BaseIconPropsType } from './types';

export const LeftArrowIcon: React.FC<BaseIconPropsType> = ({ size = 15 }) => (
  <svg
    height={size}
    width={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.842 3.135a.5.5 0 01.023.707L5.435 7.5l3.43 3.658a.5.5 0 01-.73.684l-3.75-4a.5.5 0 010-.684l3.75-4a.5.5 0 01.707-.023z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

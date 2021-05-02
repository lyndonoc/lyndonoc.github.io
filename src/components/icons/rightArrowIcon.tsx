import React from 'react';

import { BaseIconPropsType } from './types';

export const RightArrowIcon: React.FC<BaseIconPropsType> = ({ size = 15 }) => (
  <svg
    height={size}
    width={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.158 3.135a.5.5 0 01.707.023l3.75 4a.5.5 0 010 .684l-3.75 4a.5.5 0 11-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 01.023-.707z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </svg>
);

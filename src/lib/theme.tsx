import { css } from '@emotion/react';
import { BaseObject } from './types';

export const globalStyles = css`
  * {
    box-sizing: border-box;
    color: #1d1f21;
    margin: 0;
    padding: 0;
  }
  html,
  body {
    font-family: 'PT Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    height: 100%;
    max-height: 100vh;
    width: 100%;
  }
  html {
    background-color: #f9f9f9;
  }
  body {
    overflow-x: hidden;
  }
  ol,
  ul {
    list-style: none;
  }
  code {
    font-family: 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace !important;
    * {
      font-family: 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas,
        'Liberation Mono', 'Courier New', monospace !important;
    }
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const appTheme = {
  absElem(
    top: string,
    right: string,
    bottom: string,
    left: string,
    position = 'absolute' as 'absolute' | 'fixed',
  ): BaseObject {
    return {
      bottom,
      left,
      position,
      right,
      top,
    };
  },
  flexBox(
    justifyContent = 'flex-start',
    alignItems = 'center',
    display = 'flex',
  ): BaseObject {
    return {
      alignItems,
      display,
      justifyContent,
    };
  },
  rectanglify(size: number): BaseObject {
    return {
      height: `${size}px`,
      maxHeight: `${size}px`,
      maxWidth: `${size}px`,
      minHeight: `${size}px`,
      minWidth: `${size}px`,
      width: `${size}px`,
    };
  },
  colors: {
    primary_background: '#e9ecf1',
    primary_border: '#ebebeb',
    black_light: '#ebebeb',
    black_active: '#1d1f21',
    black_inactive: '#a8a8a8',
  },
  sizes: {
    gapSize: 20,
    gutter: 30,
    iconButtonHeight: 40,
    sidenav_width_medium: '75px',
    sidenav_width_large: '200px',
  },
};

export interface ThemeProps {
  theme?: typeof appTheme;
}

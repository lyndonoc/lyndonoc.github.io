import smoothscroll from 'smoothscroll-polyfill';

import './src/styles/font.css';
import './src/styles/highlight.css';
import './src/styles/prism.css';

export const onClientEntry = () => {
  smoothscroll.polyfill();
};

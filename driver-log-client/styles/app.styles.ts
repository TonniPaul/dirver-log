import getRemValue from '@/utils/getRemValue';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  :root {
    --box-shadow: 0px 3px 6px #d6d6d6;
    --max-width : ${getRemValue(1400)};
    --padding-lg: 4rem 2rem;
    --padding-sm: 3rem 1rem;
    --color-black: 0, 0, 0;
    --color-primary: 248, 141, 6;
    --color-secondary-b: 127, 27, 183;
    --color-white: 255, 255, 255;
}

*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  max-width: 100%;
  appearance: none;
  -webkit-appearance: none;
}

body {
  color: rgb(var(--color-black));
  background: rgb(var(--color-white));
  font-size: ${getRemValue(15)};
}

a {
  text-decoration: none;
  color: inherit;
  background: none;
}

button {
  background: inherit;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

button:disabled {
  cursor: not-allowed !important;
  opacity: 0.3;
}

img {
  z-index: -1;
}

`;

export default GlobalStyles;

import getRemValue from '@/utils/getRemValue';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  :root {
    --box-shadow: 0px 3px 6px #d6d6d6;
    --max-width : ${getRemValue(1400)};
    --color-black: 0, 0, 0;
    --color-primary: 84, 109, 211;
    --color-orange: 255, 171, 3;
    --color-white: 255, 255, 255;
    --color-secondary-p: 255, 244, 229;
    --color-secondary-r: 249, 5, 5;
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

`;

export default GlobalStyles;

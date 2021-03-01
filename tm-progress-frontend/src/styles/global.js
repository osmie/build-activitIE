import { createGlobalStyle, css } from 'styled-components';
import { rgba, normalize } from 'polished';

export const stylizeFunction = (fn) => {
  return (...fnArgs) => (...props) => {
    const mappedArgs = fnArgs.map(arg => typeof arg === 'function' ? arg(...props) : arg);
    return fn(...mappedArgs);
  };
};

const _rgba = stylizeFunction(rgba);

const baseStyles = css`
  html {
    box-sizing: border-box;
    font-size: 16px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    scroll-behavior: smooth;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  * {
    margin: 0;
    padding: 0;
  }

  /* Buttons
   ========================================================================== */
  [role="button"] {
    cursor: pointer;
  }
  /* Forms
     ========================================================================== */
  input, select, textarea {
    font: inherit;
    height: auto;
    width: auto;
    margin: 0;
  }
  /* Tables
   ========================================================================== */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* Lists
   ========================================================================== */
  ol, ul {
    list-style: none;
  }
  /* Blockquotes
   ========================================================================== */
  blockquote, q {
    quotes: none;
  }
  blockquote::before, blockquote::after,
  q::before, q::after {
    content: '';
    content: none;
  }

  /* Misc
     ========================================================================== */
  ::selection {
    background-color: ${_rgba('#142B58', 0.64)};
    color: #fff;
  }
  #root {
    min-height: 100vh;
  }
  .tether-element {
    z-index: 1000;
  }
`

export default createGlobalStyle`
  ${normalize()}
  ${baseStyles}
`
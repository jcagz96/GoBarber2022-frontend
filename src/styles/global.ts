/* eslint-disable prettier/prettier */
import { createGlobalStyle, css } from 'styled-components';
import darkTheme from './themes/dark';
import lightTheme from './themes/light';

interface GlobalStyleProps {
  theme: string;
}

export default createGlobalStyle<GlobalStyleProps>`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body{
    ${(props) =>
    props.theme === 'dark' &&
    css`
        background: ${darkTheme.colors.primary};
        color: ${darkTheme.colors.primaryText};
      `}
    ${(props) =>
    props.theme === 'light' &&
    css`
        background: ${lightTheme.colors.primary};
        color: ${lightTheme.colors.primaryText};
      `}
    -webkit-font-smoothing: antialiased;
  }

  body, input, button{
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1 , h2 , h3, h4, h5, h6, strong{
    font-weight: 500;
  }

  button{
    cursor: pointer;
  }
`;

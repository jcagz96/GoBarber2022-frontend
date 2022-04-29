/* eslint-disable prettier/prettier */
import { createGlobalStyle, css } from 'styled-components';
import { useTheme } from '../hooks/theme';

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
    background: #312E38;
    ${(props) =>
    props.theme === 'light' &&
    css`
        background: #c53030;
      `}
    color: #FFF;
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

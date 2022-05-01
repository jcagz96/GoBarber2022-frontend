import styled, { css } from 'styled-components';
import { shade } from 'polished';
import darkTheme from '../../styles/themes/dark';
import lightTheme from '../../styles/themes/light';

interface ContainerProps {
  theme: string;
}

export const Container = styled.button<ContainerProps>`
  ${(props) =>
    props.theme === 'dark' &&
    css`
      background: ${darkTheme.colors.accent};
      color: ${darkTheme.colors.primary};

      &:hover {
        background: ${shade(0.2, darkTheme.colors.accent)};
      }
    `}
  ${(props) =>
    props.theme === 'light' &&
    css`
      background: ${lightTheme.colors.accent};
      color: ${lightTheme.colors.primary};

      &:hover {
        background: ${shade(0.2, lightTheme.colors.accent)};
      }
    `}
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;
`;

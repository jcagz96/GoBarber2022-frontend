import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${(props) => props.theme.colors.third};
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid ${(props) => props.theme.colors.third};
  color: ${(props) => props.theme.colors.divider};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: props.theme.colors.errorColor;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: props.theme.colors.accent;
      border-color: props.theme.colors.accent;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      svg {
        color: props.theme.colors.accent;
      }
    `}



  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: ${(props) => props.theme.colors.primaryText};

    &::placeholder {
      color: ${(props) => props.theme.colors.divider};
    }
  }

  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: ${(props) => props.theme.colors.errorColor};
    color: ${(props) => props.theme.colors.text};

    &::before {
      border-color: ${(props) => props.theme.colors.errorColor} transparent;
    }
  }
`;

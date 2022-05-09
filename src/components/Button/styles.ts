import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  theme: string;
}

export const Container = styled.button<ContainerProps>`
  background: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.primary};
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => shade(0.2, props.theme.colors.accent)};
  }
`;

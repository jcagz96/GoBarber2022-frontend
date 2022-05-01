import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: ${(props) => props.theme.colors.accent};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;

    opacity: 0;
    transition: opacity 0.2s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    color: ${(props) => props.theme.colors.primary};

    &::before {
      content: '';
      border-style: solid;
      border-color: ${(props) => props.theme.colors.accent} transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;

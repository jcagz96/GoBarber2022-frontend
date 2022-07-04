import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBagroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  position: relative;

  .dark-mode-toggle {
    margin: 10px;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
  }

  .react-select-container {
    margin: 10px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 10;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX() (-50px);
  }
  to{
    opacity: 1;
    transform: translateX() (0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: ${(props) => props.theme.colors.primaryText};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${(props) => shade(0.2, props.theme.colors.primaryText)};
      }
    }
  }

  > a {
    color: ${(props) => props.theme.colors.accent};
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    transition: color 0.2s;

    &:hover {
      color: ${(props) => shade(0.2, props.theme.colors.accent)};
    }

    svg {
      margin-right: 10px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBagroundImg}) no-repeat center;
  background-size: cover;
`;

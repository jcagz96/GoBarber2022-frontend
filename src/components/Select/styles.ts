/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components';
import Select, { MenuPlacement } from 'react-select';

interface ContainerProps {
  theme: string;
  orientation: MenuPlacement;
}

export const Container = styled(Select) <ContainerProps>`


  .react-select-container{
    background: #3e3b47 !important;
  }

  .react-select__input{
    color: #fff !important;

    &--is-focused {
      background-color: red;
    }
  }

  .react-select__single-value{
    color: #fff !important;
  }

    .react-select__control {
    background: #3e3b47 !important;
    color: #fff !important;
    border-color: #ff9000 !important;
    border-radius: 3px;
    box-shadow:0 0 0 1px #ff9000;
  }

  .react-select__value-container{
    color:purple !important;

  }

  .react-select__option {
    background-color: #3e3b47;

    &--is-focused {
      background-color: #ff9000;
    }
    &:active{
      background-color: #ff9000;
    }
  }


  .react-select__indicators{
    background: #3e3b47 !important;
    color: #ff9000 !important;

  }

  .react-select__menu{
    background: pink !important;

  }

  .react-select__menu-list{
    background: #3e3b47 !important;
  }



    ${(props) =>
    props.orientation === 'top' &&
    css`
      svg {
      transform: rotate(180deg);
    }
    `}

`;

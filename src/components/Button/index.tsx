import React, { ButtonHTMLAttributes } from 'react';
import { boolean } from 'yup';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line react/require-default-props
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...rest
}) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;

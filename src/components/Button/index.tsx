import React, { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../hooks/theme';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line react/require-default-props
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  const { theme } = useTheme();

  return (
    <Container theme={theme} type="button" {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
};

export default Button;

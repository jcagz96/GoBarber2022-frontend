import React, { ButtonHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/theme';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line react/require-default-props
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Container type="button" {...rest}>
      {loading ? `${t('commun.loading')}...` : children}
    </Container>
  );
};

export default Button;

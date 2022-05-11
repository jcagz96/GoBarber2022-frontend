import React, { useCallback, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const queryString = useQuery();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required(
            `${t('pages.resetPassword.tooltipErrorPassword')}`,
          ),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            `${t('pages.resetPassword.tooltipErrorPasswordConfirm')}`,
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // const token = location.search.replace('?token=', '');
        const token = queryString.get('token');
        if (!token) {
          throw new Error();
          return;
        }

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        navigate('/');
      } catch (error: unknown) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
        // disparar um toast
        addToast({
          type: 'error',
          title: `${t('pages.resetPassword.createAccountErrorTitle')}`,
          description: `${t(
            'pages.resetPassword.createAccountErrorDescription',
          )}`,
        });
      }
    },
    [addToast, navigate, queryString, t],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>{t('pages.resetPassword.title')}</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder={t('pages.resetPassword.newPasswordPlaceholder')}
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder={t(
                'pages.resetPassword.newPasswordConfirmationPlaceholder',
              )}
            />
            <Button type="submit">
              {t('pages.resetPassword.changePassButtonText')}
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;

import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from 'react-toggle';
import { useTranslation } from 'react-i18next';
import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { useTheme } from '../../hooks/theme';
import 'react-toggle/style.css';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const { theme, switchTheme } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required(`${t('pages.forgotPassword.tooltipErrorEmail')}`)
            .email(`${t('pages.forgotPassword.tooltipErrorEmailText')}`),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: `${t('pages.forgotPassword.recoverSucessTitle')}`,
          description: `${t('pages.forgotPassword.recoverSucessDescription')}`,
        });

        // navigate('/signin');
      } catch (error: unknown) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
        // disparar um toast
        addToast({
          type: 'error',
          title: `${t('pages.forgotPassword.recoverErrorTitle')}`,
          description: `${t('pages.forgotPassword.recoverErrorDescription')}`,
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast, t],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>{t('pages.forgotPassword.recoverPass')}</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Button loading={loading} type="submit">
              {t('pages.forgotPassword.recoverPassBtnText')}
            </Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            {t('pages.forgotPassword.backToLogin')}
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
      <Toggle
        className="dark-mode-toggle"
        checked={theme === 'dark'}
        onChange={switchTheme}
        icons={{ checked: '🔆', unchecked: '🌙' }}
        aria-label="Dark mode toggle"
      />
    </Container>
  );
};

export default ForgotPassword;

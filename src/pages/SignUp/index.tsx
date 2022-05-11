import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
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
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import 'react-toggle/style.css';
import { useTheme } from '../../hooks/theme';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { theme, switchTheme } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(`${t('pages.signUp.tooltipErrorName')}`),
          email: Yup.string()
            .required(`${t('pages.signUp.tooltipErrorEmail')}`)
            .email(`${t('pages.signUp.tooltipErrorEmailText')}`),
          password: Yup.string().min(
            6,
            `${t('pages.signUp.tooltipErrorMandatoryPassword')}`,
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: `${t('pages.signUp.createAccountSucessTitle')}`,
          description: `${t('pages.signUp.createAccountSucessDescription')}`,
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
          title: `${t('pages.signUp.createAccountErrorTitle')}`,
          description: `${t('pages.signUp.createAccountErrorDescription')}`,
        });
      }
    },
    [addToast, navigate, t],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>{t('pages.signUp.title')}</h1>

            <Input
              name="name"
              icon={FiUser}
              placeholder={t('pages.signUp.namePlaceholder')}
            />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder={t('pages.signUp.passwordPlaceholder')}
            />
            <Button type="submit">{t('pages.signUp.loginButtonText')}</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            {t('pages.signUp.backToLogin')}
          </Link>
        </AnimationContainer>
      </Content>
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

export default SignUp;

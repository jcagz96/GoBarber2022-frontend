import React, { useCallback, useRef } from 'react';
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
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import 'react-toggle/style.css';
import { useTheme } from '../../hooks/theme';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { theme, switchTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });

        navigate('/dashboard');
      } catch (error: unknown) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }
        // disparar um toast
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro a fazer login, confirme as credenciais',
        });
      }
    },
    [addToast, navigate, signIn],
  );

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event.target.value);
      i18n.changeLanguage(event.target.value);
    },
    [i18n],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>{t('pages.signIn.title')}</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder={t('pages.signIn.passwordPlaceholder')}
            />
            <Button type="submit">{t('pages.signIn.loginButtonText')}</Button>
            <Link to="/forgot-password">
              {t('pages.signIn.forgotPassword')}
            </Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            {t('pages.signIn.createAccount')}
          </Link>
        </AnimationContainer>
        <select onChange={handleSelect} name="cars" id="cars">
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
        </select>
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

export default SignIn;

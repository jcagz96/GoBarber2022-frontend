import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from 'react-toggle';
import { useTranslation } from 'react-i18next';
import Select, { SingleValue } from 'react-select';
import { Container, Content, Background, AnimationContainer } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import 'react-toggle/style.css';
import { useTheme } from '../../hooks/theme';
import { changeLanguage } from '../../locales/i18n';

interface SignInFormData {
  email: string;
  password: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { theme, switchTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required(`${t('pages.signIn.tooltipErrorEmail')}`)
            .email(`${t('pages.signIn.tooltipErrorEmailText')}`),
          password: Yup.string().required(
            `${t('pages.signIn.tooltipErrorMandatoryPassword')}`,
          ),
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
          title: `${t('pages.signIn.loginErrorTitle')}`,
          description: `${t('pages.signIn.loginErrorDescription')}`,
        });
      }
    },
    [addToast, navigate, signIn, t],
  );

  const handleSelect = useCallback(
    (newSelections: SingleValue<SelectOption>) => {
      if (newSelections) {
        changeLanguage(newSelections.value);
      }
    },
    [],
  );

  const loadInitialLanguage = useCallback((): SelectOption => {
    switch (i18n.language) {
      case `${t('commun.languages.english.code')}`:
        return {
          value: `${t('commun.languages.english.code')}`,
          label: `${t('commun.languages.english.text')}`,
        };
      case `${t('commun.languages.portuguese.code')}`:
        return {
          value: `${t('commun.languages.portuguese.code')}`,
          label: `${t('commun.languages.portuguese.text')}`,
        };

      default:
        return {
          value: `${t('commun.languages.english.code')}`,
          label: `${t('commun.languages.english.text')}`,
        };
    }
  }, [i18n.language, t]);

  function handleSelect3(event: React.ChangeEvent<HTMLSelectElement>) {
    return { value: event.target.value, label: 'english' };
  }

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
        <Select
          className="react-select"
          menuPlacement="top"
          onChange={handleSelect}
          value={loadInitialLanguage()}
          options={[
            {
              value: `${t('commun.languages.english.code')}`,
              label: `${t('commun.languages.english.text')}`,
            },
            {
              value: `${t('commun.languages.portuguese.code')}`,
              label: `${t('commun.languages.portuguese.text')}`,
            },
          ]}
          theme={{
            borderRadius: 5,
            colors: {
              danger: '#ff9000',
              dangerLight: '#312E38',
              primary: '#ff9000',
              primary25: '#ff9000',
              primary50: '#ff9000',
              primary75: 'green',
              neutral0: '#312E38',
              neutral5: 'orange',
              neutral10: 'pink',
              neutral20: '#ff9000',
              neutral40: '#ff9000',
              neutral30: '#ff9000',
              neutral50: '#fff',
              neutral60: '#ff9000',
              neutral70: 'yellow',
              neutral80: '#fff',
              neutral90: 'red',
            },
            spacing: {
              baseUnit: 4,
              controlHeight: 2,
              menuGutter: 2,
            },
          }}
        />
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

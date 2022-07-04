/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from 'react-toggle';
import { useTranslation } from 'react-i18next';
import { Container, Content, AvatarInput } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomSelect from '../../components/Select';
import getValidationErrors from '../../utils/getValidationErrors';
import defaultAvatar from '../../assets/default_profile_avatar.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import 'react-toggle/style.css';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}



const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { theme, switchTheme } = useTheme();
  const { t } = useTranslation();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(`${t('pages.profile.tooltipErrorName')}`),
          email: Yup.string()
            .required(`${t('pages.profile.tooltipErrorEmail')}`)
            .email(`${t('pages.profile.tooltipErrorEmailText')}`),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required(`${t('pages.profile.tooltipMandatoryField')}`),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required(`${t('pages.profile.tooltipMandatoryField')}`),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), null],
              `${t('pages.profile.tooltipErrorConfirmPass')}`,
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, old_password, password, password_confirmation } =
          data;

        // if old_password is filled then add to the object, otherwise just send name and email
        const formData = {
          name,
          email,
          ...(data.old_password
            ? {
              old_password,
              password,
              password_confirmation,
            }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data.user);

        addToast({
          type: 'success',
          title: `${t('pages.profile.updateSucessTitle')}`,
          description: `${t('pages.profile.updateSucessDescription')}`,
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
          title: `${t('pages.profile.updateErrorTitle')}`,
          description: `${t('pages.profile.updateErrorDescription')}`,
        });
      }
    },
    [addToast, navigate, t, updateUser],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('avatar', e.target.files[0]);

        await api.patch('/users/avatar', data).then((response) => {
          updateUser(response.data.user);

          addToast({
            type: 'success',
            title: `${t('pages.profile.avatarUpdateSuccessTitle')}`,
          });
        });
      }
    },
    [addToast, t, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
          <div>
            <Toggle
              className="dark-mode-toggle"
              checked={theme === 'dark'}
              onChange={switchTheme}
              icons={{ checked: '🔆', unchecked: '🌙' }}
              aria-label="Dark mode toggle"
            />
            <CustomSelect orientation="bottom" />
          </div>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            {user.avatar_url ? <img src={user.avatar_url} alt={user.name} /> : <img src={defaultAvatar} alt={user.name} />}
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>{t('pages.profile.title')}</h1>

          <Input name="name" icon={FiUser} placeholder={t('pages.profile.namePlaceholder')} />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder={t('pages.profile.currentPassPlaceholder')}
          />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder={t('pages.profile.newPassPlaceholder')}
          />
          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder={t('pages.profile.confirmPassPlaceholder')}
          />
          <Button type="submit">{t('pages.profile.confirmChangesBtnText')}</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;

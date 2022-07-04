import React, { useCallback, useMemo } from 'react';
import { MenuPlacement } from 'react-select';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';
import { changeLanguage } from '../../locales/i18n';

type SelectProps = {
  // eslint-disable-next-line react/require-default-props
  orientation: MenuPlacement;
};

interface SelectOption {
  value: string;
  label: string;
}

const Select: React.FC<SelectProps> = ({ children, orientation, ...rest }) => {
  const { t, i18n } = useTranslation();

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

  const handleSelect = useCallback((newSelections: any) => {
    if (newSelections) {
      changeLanguage(newSelections.value);
    }
  }, []);

  return (
    <Container
      {...rest}
      orientation={orientation}
      menuPlacement={orientation}
      onChange={handleSelect}
      classNamePrefix="react-select"
      className="react-select-container"
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
    />
  );
};

export default Select;

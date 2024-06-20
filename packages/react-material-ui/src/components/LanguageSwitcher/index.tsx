import React from 'react';
import { Select, SelectProps, MenuItem } from '@mui/material';

import { useTranslation, languages } from '../../utils/i18n';

type Props = {
  languages?: string[];
} & SelectProps;

const LanguageSwitcher = (props: Props) => {
  const { i18n } = useTranslation();

  const options = props.languages || languages;

  return (
    <Select
      {...props}
      value={i18n.language}
      onChange={(event) => i18n.changeLanguage(event.target.value as string)}
    >
      {options.map((language) => (
        <MenuItem key={language} value={language}>
          {language}
        </MenuItem>
      ))}
    </Select>
  );
};

export default LanguageSwitcher;

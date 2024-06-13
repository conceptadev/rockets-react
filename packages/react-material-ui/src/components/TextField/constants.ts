import { useTranslation } from '../../utils/intl/i18n';

export const LENGTH_REGEX = new RegExp(/.{8,}$/);
export const UPPERCASE_REGEX = new RegExp(/.*[A-Z]/);
export const LOWERCASE_REGEX = new RegExp(/.*[a-z]/);
export const NUMBER_REGEX = new RegExp(/.*\d/);
export const SPECIAL_CHARS_REGEX = new RegExp(
  /.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/,
);

export const PASSWORD_MATCH_SCORE = [0, 2, 3, 5];

const getTranslatedMatchText = () => {
  const { t } = useTranslation();

  return [
    t('passwordStrength:veryWeak'),
    t('passwordStrength:weak'),
    t('passwordStrength:medium'),
    t('passwordStrength:great'),
  ];
};

export const PASSWORD_MATCH_TEXT = getTranslatedMatchText();

export const PASSWORD_MATCH_RULES = {
  text: PASSWORD_MATCH_TEXT,
  score: PASSWORD_MATCH_SCORE,
};

export type PasswordRule = {
  label: string;
  pattern: RegExp;
};

const getTranslatedDefaultRules = () => {
  const { t } = useTranslation();

  return [
    {
      label: t('passwordStrength:lengthRegex'),
      pattern: LENGTH_REGEX,
    },
    {
      label: t('passwordStrength:uppercaseRegex'),
      pattern: UPPERCASE_REGEX,
    },
    {
      label: t('passwordStrength:lowercaseRegex'),
      pattern: LOWERCASE_REGEX,
    },
    {
      label: t('passwordStrength:numberRegex'),
      pattern: NUMBER_REGEX,
    },
    {
      label: t('passwordStrength:specialCharsRegex'),
      pattern: SPECIAL_CHARS_REGEX,
    },
  ];
};

export const PASSWORD_DEFAULT_RULES: PasswordRule[] =
  getTranslatedDefaultRules();

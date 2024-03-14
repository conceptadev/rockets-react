export const LENGTH_REGEX = new RegExp(/.{8,}$/);
export const UPPERCASE_REGEX = new RegExp(/.*[A-Z]/);
export const LOWERCASE_REGEX = new RegExp(/.*[a-z]/);
export const NUMBER_REGEX = new RegExp(/.*\d/);
export const SPECIAL_CHARS_REGEX = new RegExp(
  /.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?]/,
);

export const PASSWORD_MATCH_SCORE = [0, 2, 3, 5];
export const PASSWORD_MATCH_TEXT = ['Very weak', 'Weak', 'Medium', 'Great'];

export const PASSWORD_MATCH_RULES = {
  text: PASSWORD_MATCH_TEXT,
  score: PASSWORD_MATCH_SCORE,
};

export type PasswordRule = {
  label: string;
  pattern: RegExp;
};

export const PASSWORD_DEFAULT_RULES: PasswordRule[] = [
  {
    label: '8 characters',
    pattern: LENGTH_REGEX,
  },
  {
    label: '1 Alpha Upper character',
    pattern: UPPERCASE_REGEX,
  },
  {
    label: '1 Alpha Lower character',
    pattern: LOWERCASE_REGEX,
  },
  {
    label: '1 Numeric character',
    pattern: NUMBER_REGEX,
  },
  {
    label: '1 Special character (Example: "@", "#", "*")',
    pattern: SPECIAL_CHARS_REGEX,
  },
];

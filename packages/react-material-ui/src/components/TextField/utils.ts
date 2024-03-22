import { PasswordStrengthBarVariants } from './PasswordStrengthBar';
import { PasswordStrengthConfig } from './TextField';
import { PASSWORD_DEFAULT_RULES, PasswordRule } from './constants';

export const validatePasswordScore = (
  password: string,
  // Fine to use `PASSWORD_DEFAULT_RULES` and `PASSWORD_MATCH_RULES` because this function is
  // supposed to be used outside of the component
  rules: PasswordRule[] = PASSWORD_DEFAULT_RULES,
  minValidationScore = PASSWORD_DEFAULT_RULES.length,
) => {
  const score = getPasswordScore(password, rules);

  return score >= minValidationScore;
};

export const getPasswordScore = (
  password: string | null,
  rules: PasswordRule[],
) => {
  return rules.filter((rule) => password?.match(rule.pattern)).length;
};

export const getPasswordMatchInfo = (
  score: number,
  matchRules: PasswordStrengthConfig['matchRules'],
): [string, PasswordStrengthBarVariants] => {
  const variants = Object.values(PasswordStrengthBarVariants);

  if (score === 0) return [matchRules.text[0], variants[0]];

  const scoreIndex = matchRules.score.findIndex((item, index) => {
    return item >= score || score < matchRules.score?.[index + 1];
  });

  if (scoreIndex === matchRules.score.length) {
    return [
      matchRules.text[matchRules.text.length - 1],
      variants[matchRules.text.length - 1],
    ];
  }

  return [matchRules.text[scoreIndex], variants[scoreIndex]];
};

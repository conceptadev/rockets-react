export declare const LENGTH_REGEX: RegExp;
export declare const UPPERCASE_REGEX: RegExp;
export declare const LOWERCASE_REGEX: RegExp;
export declare const NUMBER_REGEX: RegExp;
export declare const SPECIAL_CHARS_REGEX: RegExp;
export declare const PASSWORD_MATCH_SCORE: number[];
export declare const PASSWORD_MATCH_TEXT: string[];
export declare const PASSWORD_MATCH_RULES: {
    text: string[];
    score: number[];
};
export type PasswordRule = {
    label: string;
    pattern: RegExp;
};
export declare const PASSWORD_DEFAULT_RULES: PasswordRule[];

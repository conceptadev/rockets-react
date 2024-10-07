/// <reference types="react" />
export declare enum PasswordStrengthBarVariants {
    VeryWeak = "veryWeak",
    Weak = "weak",
    Medium = "medium",
    Great = "great"
}
export type PasswordStrengthBarProps = {
    variant: PasswordStrengthBarVariants;
};
declare const PasswordStrengthBar: ({ variant, }: PasswordStrengthBarProps) => JSX.Element;
export default PasswordStrengthBar;

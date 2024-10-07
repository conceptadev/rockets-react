/// <reference types="react" />
export type AvatarProps = {
    src?: string;
    alt?: string;
    size?: number;
    initials?: string;
    onClick?: () => void;
    backgroundColor?: string;
};
export declare const Avatar: (props: AvatarProps) => JSX.Element;

import { PropsWithChildren } from 'react';
export type FormFieldSkeletonProps = {
    isLoading?: boolean;
    hideLabel?: boolean;
};
export declare const FormFieldSkeleton: ({ isLoading, children, hideLabel, }: PropsWithChildren<FormFieldSkeletonProps>) => JSX.Element;

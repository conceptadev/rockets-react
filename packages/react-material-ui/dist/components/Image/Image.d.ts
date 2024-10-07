import React from 'react';
import { BoxProps } from '@mui/material';
export type ImageProps = BoxProps & {
    src: string;
    alt?: string;
    imgFluid?: boolean;
    defaultImage?: string;
    onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
    onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};
export declare const Image: (props: ImageProps) => JSX.Element;

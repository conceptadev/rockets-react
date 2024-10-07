import { PropsWithChildren } from 'react';
import { RocketsAuthProps, RocketsDataProviderProps, RocketsLayoutProps } from './types';
import { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
export type RocketsProps = {
    auth: Partial<RocketsAuthProps>;
    dataProvider: Partial<RocketsDataProviderProps>;
    layout?: RocketsLayoutProps;
    theme?: ThemeProviderProps['theme'];
};
declare const RocketsProvider: ({ children, auth, dataProvider, theme, }: PropsWithChildren<RocketsProps>) => JSX.Element;
export default RocketsProvider;

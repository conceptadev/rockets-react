import { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { RocketsAuthProps, RocketsDataProviderProps } from './types';
type RocketsConfig = {
    dataProvider: Partial<RocketsDataProviderProps>;
    auth: Partial<RocketsAuthProps>;
    theme?: ThemeProviderProps['theme'];
};
declare const createConfig: (config: RocketsConfig) => RocketsConfig;
export default createConfig;

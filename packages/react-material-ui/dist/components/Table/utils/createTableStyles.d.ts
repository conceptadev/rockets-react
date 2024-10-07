import { SxProps, Theme } from '@mui/material';
type StyleDefinition = {
    [key: string]: SxProps<Theme>;
};
declare const createTableStyles: <T extends StyleDefinition>(styles: T) => T;
export default createTableStyles;

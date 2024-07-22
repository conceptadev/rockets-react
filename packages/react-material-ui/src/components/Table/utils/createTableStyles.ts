import { SxProps, Theme } from '@mui/material/styles';

type StyleDefinition = {
  [key: string]: SxProps<Theme>;
};

/**
 * Generates a style object based on the provided style definitions.
 *
 * @param styles - An object containing style definitions.
 * @returns The generated style object with keys and corresponding style definitions.
 */
const createTableStyles = <T extends StyleDefinition>(styles: T): T => {
  const generatedStyles: T = styles;

  return generatedStyles;
};

export default createTableStyles;

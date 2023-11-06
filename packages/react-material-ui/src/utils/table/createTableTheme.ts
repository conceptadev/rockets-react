import { SxProps, Theme } from '@mui/material';

type StyleDefinition = {
  [key: string]: SxProps<Theme>;
};

/**
 * Generates a style object based on the provided style definitions.
 *
 * @param {StyleDefinition} styles - An object containing style definitions.
 * @returns The generated style object with keys and corresponding style definitions.
 */
const createTableTheme = (
  styles: StyleDefinition,
): Record<string, SxProps<Theme> | undefined> => {
  const generatedStyles: Record<string, SxProps<Theme> | undefined> = {};

  for (const key in styles) {
    if ('key' in styles) {
      generatedStyles[key] = styles[key];
    }
  }

  return generatedStyles;
};

export default createTableTheme;

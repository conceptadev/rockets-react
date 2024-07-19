import React from 'react';
import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

import { ThemeProvider } from '@concepta/react-material-ui/dist/styles';
import { themeLight } from '@concepta/react-material-ui/dist/styles/theme';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => (
      <ThemeProvider theme={themeLight}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;

import { ThemeProvider } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
const theme = {};

export const parameters = {
  layout: 'centered',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Story />
      </ChakraProvider>
    </ThemeProvider>
  ),
];

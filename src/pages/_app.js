import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
const theme = {};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default MyApp;

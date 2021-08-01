import { ThemeProvider } from 'styled-components';
import { ChakraProvider } from '@chakra-ui/react';
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

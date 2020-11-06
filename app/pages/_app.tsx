<<<<<<< HEAD
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
=======
import {ThemeProvider} from 'styled-components';
>>>>>>> 3452ce2... Lint stuff

import theme from 'styles/theme';
import '../styles/index.css';

<<<<<<< HEAD
const App = ({ Component, pageProps }: AppProps) => (
=======
const App = ({Component, pageProps}) => (
>>>>>>> 3452ce2... Lint stuff
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;

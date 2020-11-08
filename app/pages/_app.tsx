import { AppProps } from 'next/app';
import Page404 from 'pages/404';
import { ErrorBoundary } from 'react-error-boundary';
import { queryCache } from 'react-query';
import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

import '../styles/index.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <ErrorBoundary
      FallbackComponent={Page404}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries();
      }}
      onError={(err) => console.log(err)}
    >
      <Component {...pageProps} />
    </ErrorBoundary>
  </ThemeProvider>
);

export default App;

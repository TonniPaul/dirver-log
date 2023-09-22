import { montserrat } from '@/helpers/fonts';
import GlobalStyles from '@/styles/app.styles';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToastContainer from '@/components/toast-container/toast-container';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const queryClient = new QueryClient();

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ToastContainer />
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </>
  );
}

import { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import '../src/assets/scss/index.scss';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import AdapterDateFns from '@mui/lab/AdapterDateFns';;
import { ThemeProvider } from 'next-themes';
import { useTranslation } from 'react-i18next';
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function App(props: AppProps) {
  
  const router = useRouter();
  const { t } = useTranslation("");
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  useEffect(() => {
    let dir = router.locale == "fa" ? "rtl" : "ltr";
    let lang = router.locale == "fa" ? "fa" : "en";
    document.querySelector("html").setAttribute("dir", dir);
    document.querySelector("html").setAttribute("lang", lang);
  }, [router.locale]);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>User Settings</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
        <ThemeProvider>
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    </CacheProvider>
  );
}

export default App;

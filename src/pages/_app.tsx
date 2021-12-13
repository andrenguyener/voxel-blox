import { AppProps } from "next/app";
import Head from "next/head";

import { ChakraProvider } from "@chakra-ui/react";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import "@fontsource/lexend/latin.css";

import Layout from "../components/layout";
import { customTheme, createEmotionCache } from "../styles";
import "../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) => {
    return (
        <CacheProvider value={emotionCache}>
            <ChakraProvider theme={customTheme}>
                <Head>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                    />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </CacheProvider>
    );
};

export default MyApp;

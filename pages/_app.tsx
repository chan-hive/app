import App, { AppContext } from "next/app";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "@mui/material";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apollo";

import Layout from "@components/Layout";

import { theme } from "@styles/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@fontsource/roboto-mono/400.css";
import { AppProps } from "@utils/types";

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <RecoilRoot>
                    <Layout {...pageProps.layoutProps}>
                        <Component {...pageProps} />
                    </Layout>
                </RecoilRoot>
            </ThemeProvider>
        </ApolloProvider>
    );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
};

export default MyApp;

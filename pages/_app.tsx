import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import { ThemeProvider } from "@mui/material";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@lib/apollo";

import { theme } from "@styles/theme";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "@fontsource/roboto-mono/400.css";

function MyApp({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <RecoilRoot>
                    <Component {...pageProps} />
                </RecoilRoot>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default MyApp;

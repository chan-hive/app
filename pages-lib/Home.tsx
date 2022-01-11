import React from "react";

import Head from "next/head";

import { Root } from "@routes/Home.styles";

interface HomeRouteProps {}
interface HomeRouteStates {}

class HomeRoute extends React.Component<HomeRouteProps, HomeRouteStates> {
    public state: HomeRouteStates = {};

    public render() {
        return (
            <>
                <Head>
                    <title>Chanhive</title>
                </Head>
                <Root>Hello world!</Root>
            </>
        );
    }
}

export default HomeRoute;

import React from "react";
import Head from "next/head";

import { Container } from "@mui/material";
import Masonry from "@mui/lab/Masonry";

import ThreadCard from "@components/ThreadCard";

import { Root } from "@routes/Home.styles";

import { ThreadListComponent, ThreadListQueryResult } from "@query";

interface HomeRouteProps {}
interface HomeRouteStates {}

class HomeRoute extends React.Component<HomeRouteProps, HomeRouteStates> {
    public state: HomeRouteStates = {};

    private renderContent = ({ data, loading }: ThreadListQueryResult) => {
        if (!data || loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Masonry spacing={2} columns={4}>
                    {data.threads.map(thread => (
                        <ThreadCard key={thread.id} thread={thread} />
                    ))}
                </Masonry>
            </div>
        );
    };
    public render() {
        return (
            <>
                <Head>
                    <title>Chanhive</title>
                </Head>
                <Root>
                    <Container>
                        <ThreadListComponent variables={{ count: 15 }}>{this.renderContent}</ThreadListComponent>
                    </Container>
                </Root>
            </>
        );
    }
}

export default HomeRoute;

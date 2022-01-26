import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { Container, Grid } from "@mui/material";

import ThreadCard from "@components/ThreadCard";

import { Root } from "@routes/Home.styles";

import { ThreadListComponent, ThreadListDocument, ThreadListQuery, ThreadListQueryVariables } from "@query";

import { reactNoop } from "@utils/noop";
import { ThreadListItem } from "@utils/types";

interface HomeRouteProps {}
interface HomeRouteStates {
    threads: ThreadListItem[] | null;
    threadCount: number | null;
    hasMore: boolean;
}

class HomeRoute extends React.Component<WithApolloClient<HomeRouteProps>, HomeRouteStates> {
    public state: HomeRouteStates = {
        threads: null,
        threadCount: null,
        hasMore: true,
    };

    private handleQueryCompleted = ({ threads, threadCount }: ThreadListQuery) => {
        this.setState({
            threads,
            threadCount,
        });
    };

    private handleFetch = async () => {
        const { threads } = this.state;
        if (!this.props.client) {
            throw new Error("Couldn't find an instance of Apollo Client.");
        }

        const { data } = await this.props.client.query<ThreadListQuery, ThreadListQueryVariables>({
            query: ThreadListDocument,
            variables: {
                count: 16,
                before: threads && threads.length > 0 ? threads[threads.length - 1].createdAt : undefined,
            },
        });

        this.setState((prevStates: HomeRouteStates) => ({
            threads: prevStates.threads ? [...prevStates.threads, ...data.threads] : [...data.threads],
            hasMore: data.threads.length >= 16,
        }));
    };

    private renderThread = (thread: ThreadListItem) => {
        return (
            <Grid key={thread.id} item xs={3}>
                <ThreadCard thread={thread} />
            </Grid>
        );
    };
    private renderContent = () => {
        const { threads, threadCount, hasMore } = this.state;
        if (!threads || !threadCount) {
            return <span>Loading...</span>;
        }

        return (
            <>
                <InfiniteScroll hasMore={hasMore} next={this.handleFetch} loader={<h4>loading</h4>} dataLength={threads.length}>
                    <Grid container spacing={2} alignItems="stretch">
                        {threads.map(this.renderThread)}
                    </Grid>
                </InfiniteScroll>
            </>
        );
    };
    public render() {
        return (
            <>
                <Head>
                    <title>Chanhive</title>
                </Head>
                <ThreadListComponent variables={{ count: 16 }} onCompleted={this.handleQueryCompleted}>
                    {reactNoop}
                </ThreadListComponent>
                <Root>
                    <Container>{this.renderContent()}</Container>
                </Root>
            </>
        );
    }
}

export default withApollo<HomeRouteProps>(HomeRoute);

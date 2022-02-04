import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { withApollo, WithApolloClient } from "@apollo/client/react/hoc";

import { Container, Grid } from "@mui/material";

import ThreadListLoader from "@components/Thread/ListLoader";
import ThreadCard from "@components/Thread/Card";

import { Root, SkeletonContainer } from "@routes/Threads.styles";

import { ThreadListComponent, ThreadListDocument, ThreadListQuery, ThreadListQueryVariables } from "@query";

import { reactNoop } from "@utils/noop";
import { ThreadListItem } from "@utils/types";
import { DesktopOnly, MobileOnly } from "@styles/utils";

interface HomeRouteProps {
    boardId?: string;
}
interface HomeRouteStates {
    threads: ThreadListItem[] | null;
    threadCount: number | null;
    hasMore: boolean;
}

const EMPTY_ARRAY = new Array(16).fill(null);

class ThreadsRoute extends React.Component<WithApolloClient<HomeRouteProps>, HomeRouteStates> {
    public state: HomeRouteStates = {
        threads: null,
        threadCount: null,
        hasMore: true,
    };

    public componentDidUpdate(prevProps: Readonly<WithApolloClient<HomeRouteProps>>) {
        if (this.props.boardId !== prevProps.boardId) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                threads: null,
                threadCount: null,
                hasMore: true,
            });
        }
    }

    private handleQueryCompleted = ({ threads, threadCount }: ThreadListQuery) => {
        this.setState({
            threads,
            threadCount,
            hasMore: threads.length >= 16 && threadCount >= 16,
        });
    };

    private handleFetch = async () => {
        const { threads } = this.state;
        const { boardId } = this.props;
        if (!this.props.client) {
            throw new Error("Couldn't find an instance of Apollo Client.");
        }

        const { data } = await this.props.client.query<ThreadListQuery, ThreadListQueryVariables>({
            query: ThreadListDocument,
            variables: {
                count: 16,
                before: threads && threads.length > 0 ? threads[threads.length - 1].createdAt : undefined,
                boardId,
            },
        });

        this.setState((prevStates: HomeRouteStates) => ({
            threads: prevStates.threads ? [...prevStates.threads, ...data.threads] : [...data.threads],
            hasMore: data.threads.length >= 16,
        }));
    };

    private renderSkeletonThreadCard = (_: any, index: number) => {
        return (
            <Grid key={+index} item xs={12} sm={6} md={6} lg={3}>
                <ThreadCard />
            </Grid>
        );
    };
    private renderSkeletons = (withMargin?: boolean) => {
        const content = (
            <Grid container spacing={2} alignItems="stretch">
                {EMPTY_ARRAY.map(this.renderSkeletonThreadCard)}
            </Grid>
        );

        if (withMargin) {
            return <SkeletonContainer>{content}</SkeletonContainer>;
        }

        return content;
    };
    private renderThread = (thread: ThreadListItem) => {
        return (
            <Grid key={thread.id} item xs={12} sm={6} md={4} lg={3}>
                <ThreadCard thread={thread} />
            </Grid>
        );
    };
    private renderContent = () => {
        const { threads, threadCount, hasMore } = this.state;
        if (!threads || !threadCount) {
            return this.renderSkeletons();
        }

        return (
            <>
                <InfiniteScroll hasMore={hasMore} next={this.handleFetch} loader={<ThreadListLoader />} dataLength={threads.length}>
                    <Grid container spacing={2} alignItems="stretch">
                        {threads.map(this.renderThread)}
                    </Grid>
                </InfiniteScroll>
            </>
        );
    };
    public render() {
        const { boardId } = this.props;
        const content = this.renderContent();

        return (
            <>
                <ThreadListComponent variables={{ count: 16, boardId }} onCompleted={this.handleQueryCompleted}>
                    {reactNoop}
                </ThreadListComponent>
                <Root>
                    <DesktopOnly>
                        <Container>{content}</Container>
                    </DesktopOnly>
                    <MobileOnly>{content}</MobileOnly>
                </Root>
            </>
        );
    }
}

export default withApollo<HomeRouteProps>(ThreadsRoute);

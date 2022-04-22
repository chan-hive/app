import React from "react";
import { IntersectionObserverProps, InView } from "react-intersection-observer";

import CollectionsIcon from "@mui/icons-material/Collections";

import Post from "@components/Post";
import ThreadProvider from "@components/Thread/ThreadProvider";
import { withLayout, WithLayoutProps } from "@components/Layout.hoc";

import { Root, WidthWrapper } from "@routes/Thread.styles";

import { ThreadInformationQuery, ThreadWithPostsComponent, ThreadWithPostsQuery } from "@query";

import { reactNoop } from "@utils/noop";

export interface ThreadRouteProps {
    threadId: number;
    boardId: string;
    postCount: number;
    thread: ThreadInformationQuery["thread"];
}
export interface ThreadRouteStates {
    thread: ThreadWithPostsQuery["thread"] | null;
    currentCount: number;
    galleryOpen: boolean;
}

class ThreadRoute extends React.Component<ThreadRouteProps & WithLayoutProps, ThreadRouteStates> {
    public state: ThreadRouteStates = {
        thread: null,
        currentCount: 0,
        galleryOpen: false,
    };

    public componentDidMount() {
        this.props.setNavigationButtonItems([
            {
                name: "open-gallery",
                label: "갤러리 모드",
                icon: CollectionsIcon,
                onClick: () => {
                    this.setState({
                        galleryOpen: true,
                    });
                },
            },
        ]);
    }
    public componentWillUnmount() {
        this.props.setNavigationButtonItems([]);
    }

    private get hasMore() {
        if (!this.state.thread) {
            return false;
        }

        return this.state.currentCount < this.props.postCount;
    }

    private handleLoaderInViewChange = (inView: boolean) => {
        if (!inView || !this.hasMore) {
            return;
        }

        this.setState(prevState => ({
            currentCount: prevState.currentCount + 15,
        }));
    };
    private handleComplete = ({ thread }: ThreadWithPostsQuery) => {
        this.setState({
            thread,
        });
    };
    private handleCloseGallery = () => {
        this.setState({
            galleryOpen: false,
        });
    };

    private renderPost = (post: ThreadWithPostsQuery["thread"]["posts"][0]) => {
        return <Post key={post.id} post={post} />;
    };
    private renderLoader: IntersectionObserverProps["children"] = ({ ref }) => {
        return <div ref={ref}>123</div>;
    };
    public render() {
        const { threadId, boardId } = this.props;
        const { thread, currentCount, galleryOpen } = this.state;
        const content = thread && thread.posts.slice(0, currentCount).map(this.renderPost);

        return (
            <Root>
                <ThreadWithPostsComponent variables={{ threadId, boardId }} onCompleted={this.handleComplete}>
                    {reactNoop}
                </ThreadWithPostsComponent>
                {thread && (
                    <ThreadProvider posts={thread.posts} thread={thread} galleryOpen={galleryOpen} onCloseGallery={this.handleCloseGallery}>
                        <WidthWrapper>
                            {content}
                            {this.hasMore && <InView onChange={this.handleLoaderInViewChange}>{this.renderLoader}</InView>}
                        </WidthWrapper>
                    </ThreadProvider>
                )}
            </Root>
        );
    }
}

export default withLayout(ThreadRoute);

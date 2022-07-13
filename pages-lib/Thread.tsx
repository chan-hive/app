import React from "react";

import CollectionsIcon from "@mui/icons-material/Collections";

import { withLayout, WithLayoutProps } from "@components/Layout.hoc";

import { Root, WidthWrapper } from "@routes/Thread.styles";

import { ThreadPost, ThreadWithPosts } from "@utils/types";
import PostCard from "@components/Post/Card";

export interface ThreadRouteProps {
    thread: ThreadWithPosts;
}

export interface ThreadRouteStates {}

class ThreadRoute extends React.Component<ThreadRouteProps & WithLayoutProps, ThreadRouteStates> {
    public state: ThreadRouteStates = {};

    public componentDidMount() {
        this.props.setNavigationButtonItems([
            {
                name: "open-gallery",
                label: "갤러리 모드",
                icon: CollectionsIcon,
                onClick: () => {},
            },
        ]);
    }

    public componentWillUnmount() {
        this.props.setNavigationButtonItems([]);
    }

    private renderPost = (post: ThreadPost) => {
        return <PostCard key={post.id} post={post} />;
    };

    public render() {
        const { thread } = this.props;

        return (
            <Root>
                <WidthWrapper>{thread.posts.map(this.renderPost)}</WidthWrapper>
            </Root>
        );
    }
}

export default withLayout(ThreadRoute);

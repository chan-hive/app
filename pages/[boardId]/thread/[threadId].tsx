import React from "react";
import type { NextPage } from "next";

import { useTheme } from "@mui/material";

import ThreadRoute from "@routes/Thread";
import { useLayout } from "@components/Layout";

import { initializeApollo } from "@lib/apollo";

import { ThreadInformationDocument, ThreadInformationQuery, ThreadInformationQueryVariables, useThreadWithPostsQuery } from "@query";

import { BasePageProps } from "@utils/types";
import CollectionsIcon from "@mui/icons-material/Collections";

export interface ThreadPageProps extends BasePageProps {
    threadId: number;
    boardId: string;
}

const Thread: NextPage<ThreadPageProps> = ({ threadId, boardId }) => {
    const theme = useTheme();
    const layout = useLayout();
    const [galleryOpened, setGalleryOpened] = React.useState(false);
    const { data, loading } = useThreadWithPostsQuery({
        variables: {
            threadId,
            boardId,
        },
    });

    React.useEffect(() => {
        layout.setNavigationButtonItems([
            {
                name: "open-gallery",
                label: "갤러리 모드",
                icon: CollectionsIcon,
                onClick: () => {
                    setGalleryOpened(true);
                },
            },
        ]);

        return () => {
            layout.setNavigationButtonItems([]);
        };
    }, [setGalleryOpened]);

    const handleGalleryClose = React.useCallback(() => {
        setGalleryOpened(false);
    }, [setGalleryOpened]);

    if (!data || loading) {
        return null;
    }

    return <ThreadRoute onGalleryClose={handleGalleryClose} galleryOpened={galleryOpened} theme={theme} thread={data.thread} />;
};

Thread.getInitialProps = async ({ query, req }) => {
    if (!query.threadId || !query.boardId) {
        // TODO: Handle this.
        throw new Error();
    }

    if (Array.isArray(query.threadId) || Array.isArray(query.boardId)) {
        // TODO: Handle this.
        throw new Error();
    }

    const apollo = initializeApollo({ headers: req?.headers });
    const { data } = await apollo.query<ThreadInformationQuery, ThreadInformationQueryVariables>({
        query: ThreadInformationDocument,
        variables: {
            boardId: query.boardId,
            threadId: parseInt(query.threadId, 10),
        },
    });

    if (!data.thread) {
        // TODO: Should change this to show 404 pages to users.
        throw new Error();
    }

    return {
        threadId: parseInt(query.threadId, 10),
        boardId: query.boardId,
        postCount: data.thread.postCount,
        thread: data.thread,
        layoutProps: {
            title: `/${query.boardId}/ - ${data.thread.opPost.title || `Thread #${data.thread.id}`}`,
            withoutPadding: true,
        },
    };
};

export default Thread;

import React from "react";
import type { NextPage } from "next";

import ThreadRoute from "@routes/Thread";

import { initializeApollo } from "@lib/apollo";

import { ThreadInformationDocument, ThreadInformationQuery, ThreadInformationQueryVariables, useThreadWithPostsQuery } from "@query";

import { BasePageProps } from "@utils/types";

export interface ThreadPageProps extends BasePageProps {
    threadId: number;
    boardId: string;
}

const Thread: NextPage<ThreadPageProps> = ({ threadId, boardId }) => {
    const { data, loading } = useThreadWithPostsQuery({
        variables: {
            threadId,
            boardId,
        },
    });

    if (!data || loading) {
        return null;
    }

    return <ThreadRoute thread={data.thread} />;
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

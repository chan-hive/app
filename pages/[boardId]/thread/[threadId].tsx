import type { NextPage } from "next";

import Layout from "@components/Layout";

import ThreadRoute, { ThreadRouteProps } from "@routes/Thread";

import { initializeApollo } from "@lib/apollo";

import { ThreadInformationDocument, ThreadInformationQuery, ThreadInformationQueryVariables } from "@query";

const Thread: NextPage<ThreadRouteProps> = ({ threadId, boardId, thread }) => {
    return (
        <Layout withoutPadding title={`/${boardId}/ - ${thread.opPost.title || `Thread #${thread.id}`}`}>
            <ThreadRoute threadId={threadId} boardId={boardId} thread={thread} />
        </Layout>
    );
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
        thread: data.thread,
    };
};

export default Thread;

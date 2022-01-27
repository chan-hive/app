import type { NextPage } from "next";

import Layout from "@components/Layout";

import ThreadRoute, { ThreadRouteProps } from "@routes/Thread";

const Thread: NextPage<ThreadRouteProps> = ({ threadId, boardId }) => {
    return (
        <Layout>
            <ThreadRoute threadId={threadId} boardId={boardId} />
        </Layout>
    );
};

Thread.getInitialProps = async ({ query }) => {
    if (!query.threadId || !query.boardId) {
        // TODO: Handle this.
        throw new Error();
    }

    if (Array.isArray(query.threadId) || Array.isArray(query.boardId)) {
        // TODO: Handle this.
        throw new Error();
    }

    return {
        threadId: parseInt(query.threadId, 10),
        boardId: query.boardId,
    };
};

export default Thread;

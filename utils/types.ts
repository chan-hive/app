import type { BoardListQuery, BoardsQuery, FileInformationFragment, ThreadListQuery, ThreadWithPostsQuery } from "@query";
import type { AppProps as NextAppProps } from "next/app";
import type { RecoilState } from "recoil";
import type { LayoutProps } from "@components/Layout";
import type { PostContent } from "@utils/parsePostContent";

export type RecoilStateValue<T> = T extends RecoilState<infer K> ? K : never;

export type ThreadListItem = ThreadListQuery["threads"][0];
export type FileInformation = FileInformationFragment;
export type ThreadWithPosts = Exclude<ThreadWithPostsQuery["thread"], null | undefined>;
export type RawThreadPost = ThreadWithPosts["posts"][0];
export type ThreadPost = Omit<RawThreadPost, "content"> & { content: PostContent };
export type Board = BoardsQuery["boards"][0];
export type BoardListItem = BoardListQuery["boards"][0];

export interface BasePageProps {
    layoutProps?: Omit<LayoutProps, "children">;
}

export interface AppProps extends Omit<NextAppProps, "pageProps" | "Component"> {
    pageProps: BasePageProps;
    Component: React.ComponentType<any>;
}

import type {
    BoardListQuery,
    BoardsQuery,
    FileInformationFragment,
    QuoteContent,
    QuoteLinkContent,
    TextContent,
    ThreadListQuery,
    ThreadWithPostsQuery,
} from "@query";
import type { AppProps as NextAppProps } from "next/app";
import type { RecoilState } from "recoil";
import type { LayoutProps } from "@components/Layout";

export type RecoilStateValue<T> = T extends RecoilState<infer K> ? K : never;

export type ThreadListItem = ThreadListQuery["threads"][0];
export type FileInformation = FileInformationFragment;
export type ThreadWithPosts = Exclude<ThreadWithPostsQuery["thread"], null | undefined>;
export type ThreadPost = ThreadWithPosts["posts"][0];
export type ThreadPostContent = ThreadPost["content"];
export type PostContentRow = ThreadPost["content"][0];
export type PostContentItem = PostContentRow["contents"][0];
export type QuoteLinkContentItem = QuoteLinkContent;
export type QuoteContentItem = QuoteContent;
export type TextContentItem = TextContent;
export type Board = BoardsQuery["boards"][0];
export type BoardListItem = BoardListQuery["boards"][0];
export type PostFile = Exclude<ThreadPost["file"], null | undefined>;

export interface BasePageProps {
    layoutProps?: Omit<LayoutProps, "children">;
}

export interface AppProps extends Omit<NextAppProps, "pageProps" | "Component"> {
    pageProps: BasePageProps;
    Component: React.ComponentType<any>;
}

import type { FileInformationFragment, ThreadListQuery, ThreadWithPostsQuery } from "@query";
import type { RecoilState } from "recoil";
import type { PostContent } from "@utils/parsePostContent";

export type RecoilStateValue<T> = T extends RecoilState<infer K> ? K : never;

export type ThreadListItem = ThreadListQuery["threads"][0];
export type FileInformation = FileInformationFragment;
export type ThreadWithPosts = Exclude<ThreadWithPostsQuery["thread"], null | undefined>;
export type RawThreadPost = ThreadWithPosts["posts"][0];
export type ThreadPost = Omit<RawThreadPost, "content"> & { content: PostContent };

import type { FileInformationFragment, ThreadListQuery } from "@query";
import { RecoilState } from "recoil";

export type RecoilStateValue<T> = T extends RecoilState<infer K> ? K : never;

export type ThreadListItem = ThreadListQuery["threads"][0];
export type FileInformation = FileInformationFragment;

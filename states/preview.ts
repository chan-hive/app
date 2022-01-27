import { atom } from "recoil";
import { FileInformation } from "@utils/types";

export const previewState = atom<FileInformation | null>({
    key: "previewState", // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});

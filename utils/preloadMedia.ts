import { PostFile } from "@utils/types";

const PRELOAD_MAP: Record<string, boolean> = {};

export function isMediaCached(file: PostFile) {
    return PRELOAD_MAP[file.id];
}

export async function preloadMedia(file: PostFile) {
    if (PRELOAD_MAP[file.id]) {
        return Promise.resolve(file.url);
    }

    if (file.isVideo) {
        return new Promise<string>((resolve, reject) => {
            const video = document.createElement("video");
            video.addEventListener("error", e => {
                reject(e.error);
            });
            video.addEventListener("canplaythrough", () => {
                PRELOAD_MAP[file.id] = true;
                resolve(file.url);
            });
            video.src = file.url;
        });
    }

    return new Promise<string>((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => {
            PRELOAD_MAP[file.id] = true;
            resolve(file.url);
        });
        image.addEventListener("error", e => {
            reject(e.error);
        });
        image.src = file.url;
    });
}

import { PostFile } from "@utils/types";

export async function preloadMedia(file: PostFile) {
    if (file.isVideo) {
        return new Promise<string>((resolve, reject) => {
            const video = document.createElement("video");
            video.addEventListener("error", e => {
                reject(e.error);
            });
            video.addEventListener("canplaythrough", () => {
                resolve(file.url);
            });
            video.src = file.url;
        });
    }

    return new Promise<string>((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => {
            resolve(file.url);
        });
        image.addEventListener("error", e => {
            reject(e.error);
        });
        image.src = file.url;
    });
}

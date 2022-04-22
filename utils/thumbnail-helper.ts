import { VideoHelper } from "@utils/video-helper";

import { FileInformation } from "@utils/types";

interface SubscribeEntry {
    dom: HTMLAnchorElement | HTMLDivElement | HTMLVideoElement;
    file: FileInformation;
    wheelListener(this: Omit<SubscribeEntry, "wheelListener">, e: Event): void;
}

export class ThumbnailHelper {
    public static readonly instance: ThumbnailHelper = new ThumbnailHelper();

    private readonly subscribedMap: Map<FileInformation["id"], SubscribeEntry> = new Map<FileInformation["id"], SubscribeEntry>();

    // eslint-disable-next-line no-useless-constructor,no-empty-function
    private constructor() {}

    public subscribe(dom: HTMLAnchorElement | HTMLDivElement | HTMLVideoElement, file: FileInformation) {
        const wheelListener = this.handleWheel.bind({ dom, file });
        this.subscribedMap.set(file.id, { dom, file, wheelListener });

        console.info(dom, file);

        dom.addEventListener("wheel", wheelListener, false);
    }
    public unsubscribe(file: FileInformation) {
        const entry = this.subscribedMap.get(file.id);
        if (!entry) {
            return;
        }

        entry.dom.removeEventListener("wheel", entry.wheelListener, false);

        this.subscribedMap.delete(file.id);
    }

    private handleWheel(this: Omit<SubscribeEntry, "wheelListener">, e: Event) {
        if (!this.file.isVideo) {
            return;
        }

        if (e instanceof WheelEvent) {
            const currentVolume = VideoHelper.instance.volume;
            if (e.deltaY > 0) {
                VideoHelper.instance.setVolume(Math.max(currentVolume - 0.1, 0));
            } else {
                VideoHelper.instance.setVolume(Math.min(currentVolume + 0.1, 1));
            }
        }

        e.preventDefault();
    }
}

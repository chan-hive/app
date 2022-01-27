import { FileInformation } from "@utils/types";

interface SubscribeEntry {
    dom: HTMLAnchorElement | HTMLDivElement;
    file: FileInformation;
    wheelListener(this: Omit<SubscribeEntry, "wheelListener">, e: Event): void;
}

export class ThumbnailHelper {
    public static readonly instance: ThumbnailHelper = new ThumbnailHelper();

    private readonly subscribedMap: Map<FileInformation["id"], SubscribeEntry> = new Map<FileInformation["id"], SubscribeEntry>();

    // eslint-disable-next-line no-useless-constructor,no-empty-function
    private constructor() {}

    public subscribe(dom: HTMLAnchorElement | HTMLDivElement, file: FileInformation) {
        const wheelListener = this.handleWheel.bind({ dom, file });
        this.subscribedMap.set(file.id, { dom, file, wheelListener });

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
        if (!this.file.extension.endsWith("webm")) {
            return;
        }

        e.preventDefault();
    }
}

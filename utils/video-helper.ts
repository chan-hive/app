/* eslint-disable no-restricted-syntax */
import { FileInformation } from "@utils/types";

export class VideoHelper {
    public static readonly instance = new VideoHelper();

    private elements: Map<FileInformation["id"], HTMLVideoElement[]> = new Map<FileInformation["id"], HTMLVideoElement[]>();
    private lastTimes: Map<FileInformation["id"], number> = new Map<FileInformation["id"], number>();
    private actualVolume: number = parseFloat(typeof localStorage === "undefined" ? "1" : localStorage.getItem("volume") || "1.0");

    public get volume() {
        return this.actualVolume;
    }

    private constructor() {
        if (typeof window !== "undefined") {
            setInterval(this.handleRefresh, 100);
            setInterval(this.handleSave, 500);
        }
    }

    public saveCurrentTime = (file: FileInformation | number) => {
        const target = typeof file === "number" ? file : file.id;
        const elements = this.elements.get(target);
        if (!elements) {
            return;
        }

        const currentTime = Math.max(...elements.map(e => e.currentTime));

        this.lastTimes.set(target, currentTime);
    };
    public addElement = (file: FileInformation | number, element: HTMLVideoElement) => {
        const target = typeof file === "number" ? file : file.id;
        const lastTime = this.lastTimes.get(target);
        if (lastTime) {
            // eslint-disable-next-line no-param-reassign
            element.currentTime = lastTime;
        }

        if (!this.elements.has(target)) {
            this.elements.set(target, []);
        }

        element.play();

        const lastElements = this.elements.get(target)!;
        this.elements.set(target, [...lastElements, element]);
    };
    public removeDOMElement = (element: HTMLVideoElement) => {
        for (const [fileId, elements] of this.elements.entries()) {
            if (elements.some(elem => elem === element)) {
                this.removeElement(fileId, element);
            }
        }
    };
    public removeElement = (file: FileInformation | number, element: HTMLVideoElement) => {
        const target = typeof file === "number" ? file : file.id;
        const lastElements = this.elements.get(target);
        if (!lastElements) {
            return;
        }

        if (lastElements && lastElements.length > 0) {
            this.saveCurrentTime(target);
        }

        this.elements.set(
            target,
            lastElements.filter(e => e !== element),
        );
    };
    public removeAllElement = () => {
        this.elements.clear();
    };

    public setVolume = (volume: number) => {
        this.actualVolume = volume;
    };

    private handleRefresh = () => {
        for (const [, elements] of this.elements.entries()) {
            for (const element of elements) {
                element.volume = this.actualVolume;
            }
        }
    };
    private handleSave = () => {
        localStorage.setItem("volume", this.actualVolume.toString());
    };
}

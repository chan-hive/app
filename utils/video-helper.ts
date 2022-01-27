import { FileInformation } from "@utils/types";

export class VideoHelper {
    public static readonly instance = new VideoHelper();

    private elements: Map<FileInformation["id"], HTMLVideoElement> = new Map<FileInformation["id"], HTMLVideoElement>();
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

    public addElement = (file: FileInformation, element: HTMLVideoElement) => {
        const lastTime = this.lastTimes.get(file.id);
        if (lastTime) {
            // eslint-disable-next-line no-param-reassign
            element.currentTime = lastTime;
        }

        element.play();

        this.elements.set(file.id, element);
    };
    public removeElement = (file: FileInformation) => {
        const element = this.elements.get(file.id);
        if (element) {
            this.lastTimes.set(file.id, element.currentTime);
        }

        this.elements.delete(file.id);
    };
    public removeAllElement = () => {
        this.elements.clear();
    };

    public setVolume = (volume: number) => {
        this.actualVolume = volume;
    };

    private handleRefresh = () => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [, element] of this.elements.entries()) {
            element.volume = this.actualVolume;
        }
    };
    private handleSave = () => {
        localStorage.setItem("volume", this.actualVolume.toString());
    };
}

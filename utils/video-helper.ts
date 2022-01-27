import { FileInformation } from "@utils/types";

export class VideoHelper {
    public static readonly instance = new VideoHelper();

    private elements: Map<FileInformation["id"], HTMLVideoElement>;
    private actualVolume: number = parseFloat(typeof localStorage === "undefined" ? "1" : localStorage.getItem("volume") || "1.0");

    public get volume() {
        return this.actualVolume;
    }

    private constructor() {
        this.elements = new Map<FileInformation["id"], HTMLVideoElement>();

        if (typeof window !== "undefined") {
            setInterval(this.handleRefresh, 100);
            setInterval(this.handleSave, 500);
        }
    }

    public addElement = (file: FileInformation, element: HTMLVideoElement) => {
        this.elements.set(file.id, element);
    };
    public removeElement = (file: FileInformation) => {
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

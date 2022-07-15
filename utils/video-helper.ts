import { PostFile } from "@utils/types";

export default class VideoHelper {
    public static readonly Instance = new VideoHelper();

    private readonly videos: Record<PostFile["id"], [HTMLVideoElement, HTMLDivElement | null]> = {};
    private readonly playbackPositions: Record<PostFile["id"], number> = {};
    private volume = 1;

    private constructor() {
        if (typeof window !== "undefined") {
            const volumeData = window.localStorage.getItem("globalVolume") || "1";
            this.volume = parseFloat(volumeData);

            setInterval(() => {
                this.monitor();
            }, 100);
        }
    }

    private monitor = () => {
        const entries = Object.entries(this.videos) as unknown as [number, [HTMLVideoElement, HTMLDivElement | null]][];

        // eslint-disable-next-line no-restricted-syntax
        for (const [id, [dom]] of entries) {
            this.playbackPositions[id] = dom.currentTime;

            dom.volume = this.volume;
        }

        window.localStorage.setItem("globalVolume", this.volume.toString());
    };

    private handleWheel = (e: WheelEvent) => {
        this.volume = Math.max(0, Math.min(1, this.volume - (e.deltaY / 100) * 0.05));
        e.preventDefault();
    };

    public getVolume = () => {
        return this.volume;
    };
    public getLastPosition = (id: PostFile["id"]): number | undefined => {
        return this.playbackPositions[id];
    };

    public register(id: PostFile["id"], dom: HTMLVideoElement, thumbnailDom?: HTMLDivElement) {
        dom.addEventListener("wheel", this.handleWheel, false);
        if (thumbnailDom) {
            thumbnailDom.addEventListener("wheel", this.handleWheel, false);
        }

        this.videos[id] = [dom, thumbnailDom || null];
    }
    public unregister(id: PostFile["id"]) {
        if (id in this.videos) {
            const [dom, thumbnail] = this.videos[id];
            dom.removeEventListener("wheel", this.handleWheel, false);
            if (thumbnail) {
                thumbnail.removeEventListener("wheel", this.handleWheel, false);
            }
        }

        delete this.videos[id];
    }
}

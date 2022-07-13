import { PostFile } from "@utils/types";

export default class VideoHelper {
    public static readonly Instance = new VideoHelper();

    private readonly videos: Record<PostFile["id"], HTMLVideoElement> = {};
    private readonly playbackPositions: Record<PostFile["id"], number> = {};

    private constructor() {
        if (typeof window !== "undefined") {
            setInterval(() => {
                this.monitor();
            }, 100);
        }
    }

    private monitor = () => {
        const entries = Object.entries(this.videos) as unknown as [number, HTMLVideoElement][];

        // eslint-disable-next-line no-restricted-syntax
        for (const [id, dom] of entries) {
            this.playbackPositions[id] = dom.currentTime;
        }
    };

    public getLastPosition = (id: PostFile["id"]): number | undefined => {
        return this.playbackPositions[id];
    };

    public register(id: PostFile["id"], dom: HTMLVideoElement) {
        this.videos[id] = dom;
    }
    public unregister(id: PostFile["id"]) {
        delete this.videos[id];
    }
}

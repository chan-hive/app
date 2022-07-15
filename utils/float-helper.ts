export class FloatHelper {
    public static readonly Instance = new FloatHelper();

    private mouseX: number = 0;
    private mouseY: number = 0;
    private targetElements: [dom: HTMLElement, isVideo: boolean][] = [];

    private constructor() {
        if (typeof window === "undefined") {
            return;
        }

        window.requestAnimationFrame(this.handleFrame);
        window.addEventListener("mousemove", this.handleMouseMove, false);
    }

    public register = (dom: HTMLElement, isVideo = false) => {
        this.targetElements.push([dom, isVideo]);
    };
    public unregister = (dom: HTMLElement) => {
        this.targetElements = this.targetElements.filter(s => s[0] !== dom);
    };

    private handleMouseMove = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    };
    private handleFrame = () => {
        window.requestAnimationFrame(this.handleFrame);
        if (!this.targetElements) {
            return;
        }

        const { clientWidth, clientHeight } = document.documentElement;
        // eslint-disable-next-line no-restricted-syntax
        for (const [dom, isVideo] of this.targetElements) {
            const height = dom.offsetHeight + 16;
            const width = dom.offsetWidth;
            const top = !isVideo
                ? Math.max(0, (this.mouseY * (clientHeight - height)) / clientHeight)
                : Math.max(0, Math.min(clientHeight - height, this.mouseY - 120));

            const threshold = clientWidth / 2;
            let marginX = (this.mouseX <= threshold ? this.mouseX : clientWidth - this.mouseX) + 45;
            marginX = Math.min(marginX, clientWidth - width);

            const { style } = dom;
            style.top = `${top.toFixed(2)}px`;
            if (this.mouseX <= threshold) {
                style.left = `${marginX}px`;
                style.right = "";
            } else {
                style.left = "";
                style.right = `${marginX}px`;
            }
        }
    };
}

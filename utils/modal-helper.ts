import { isTouchDevice } from "@utils/isTouchDevice";

export class ModalHelper {
    public static readonly instance = new ModalHelper();

    private readonly clientWidth: number = 0;
    private readonly clientHeight: number = 0;
    private entries: HTMLElement[] = [];
    private mouseX: number = 0;
    private mouseY: number = 0;

    private constructor() {
        if (typeof window === "undefined" || isTouchDevice()) {
            return;
        }

        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;

        window.addEventListener("mousemove", this.handleMouseMove, false);
        window.requestAnimationFrame(this.handleAnimationFrame);
    }

    public register = (element: HTMLElement) => {
        this.entries.push(element);
    };
    public unregister = (element: HTMLElement) => {
        this.entries = this.entries.filter(elem => elem !== element);
    };

    private calculatePosition = (dom: HTMLElement) => {
        const height = dom.offsetHeight + 16;
        const width = dom.offsetWidth;
        const top = Math.max(0, (this.mouseY * (this.clientHeight - height)) / this.clientHeight);
        const threshold = this.clientWidth / 2;
        const marginX = Math.min((this.mouseX <= threshold ? this.mouseX : this.clientWidth - this.mouseX) + 45, this.clientWidth - width);

        return [marginX, top, this.mouseX > threshold];
    };

    private handleMouseMove = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    };
    private handleAnimationFrame = () => {
        for (let i = 0; i < this.entries.length; i++) {
            const element = this.entries[i];
            const [x, y, isRight] = this.calculatePosition(this.entries[i]);

            if (isRight) {
                element.style.top = `${y}px`;
                element.style.right = `${x}px`;
                element.style.transform = "";
            } else {
                element.style.top = "";
                element.style.right = "";
                element.style.transform = `translate(${x}px, ${y}px)`;
            }
        }

        window.requestAnimationFrame(this.handleAnimationFrame);
    };
}

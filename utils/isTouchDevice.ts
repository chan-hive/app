export function isTouchDevice() {
    // @ts-ignore
    // eslint-disable-next-line compat/compat
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

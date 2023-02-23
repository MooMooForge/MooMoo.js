/**
 * Tokenizes the given script by splitting it into lines and returning an array of strings.
 * @param script The script to tokenize.
 * @returns An array of strings representing the individual lines of the script.
 */
function tokenize(script: string): string[] {
    const lines: string[] = [];

    let lineStart = 0;

    for (let i = 0; i < script.length; i++) {
        const char = script[i];

        if (char === "\n") {
            const line = script.substring(lineStart, i);
            lines.push(line);

            lineStart = i + 1;
        }
    }

    // Handle the last line, if there is one.
    if (lineStart < script.length) {
        const line = script.substring(lineStart);
        lines.push(line);
    }
    return lines;
}
export default tokenize
function parse(tokens: string[]): FunctionNode[] | CustomError {
    const ast: FunctionNode[] = [];
    let currentFunction: FunctionNode | null = null;

    for (const token of tokens) {
        if (token.endsWith("<<<")) {
            currentFunction = {
                type: "function",
                name: token.replace(/</g, ""),
                body: [],
            };
        } else if (token === ">>>") {
            if (!currentFunction) {
                const error: ParseError = {
                    type: "ParseError",
                    message: "Unexpected token >>>. No function found.",
                };
                return error;
            }
            currentFunction!.body.push({
                type: "command",
                command: "enddef",
                args: [],
                body: [],
            });
            ast.push(currentFunction!);
            currentFunction = null;
        } else if (currentFunction) {
            const [command, ...args] = token.split(" ");
            currentFunction.body.push({
                type: "command",
                command,
                args,
                body: [],
            });
        } // Ignore tokens that are not inside a function
    }

    if (currentFunction) {
        const error: ParseError = {
            type: "ParseError",
            message: "Unexpected end of input. Function definition not closed.",
        };
        return error;
    }

    return ast;
}

export default parse;
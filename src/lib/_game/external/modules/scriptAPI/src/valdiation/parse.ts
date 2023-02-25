function parse(tokens: string[]): FunctionNode[] | CustomError {
    const ast: FunctionNode[] = [];
    let currentFunction: FunctionNode | null = null;

    for (const token of tokens) {
        if (token.endsWith("<<<")) {
            currentFunction = {
                type: "function",
                name: token.replace(/[ <]/g, ""),
                body: [],
            };
        } else if (token.includes(">>>")) {
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
                args: []
            });
            ast.push(currentFunction!);
            currentFunction = null;
        } else if (currentFunction) {
            const commandline = token.split(" ");
            let command: string;
            let args: string[];

            for (let i = 0; i < commandline.length; i++) {
                let currentElement: string = commandline[i];
                if (currentElement !== "") {
                    command = currentElement
                    args = commandline.slice(i + 1)
                    if (command == "chat") {
                        args = [args.join(" ")]
                    }
                    break
                }
            }
            currentFunction.body.push({
                type: "command",
                command,
                args
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
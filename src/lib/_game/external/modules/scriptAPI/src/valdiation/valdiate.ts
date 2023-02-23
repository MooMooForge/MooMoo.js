import commands from "../../lib/commands";

class InvalidNodeTypeError extends Error { }
class InvalidCommandError extends Error { }

function validate(ast: FunctionNode[]): void {
    for (const node of ast) {
        if (node.type !== "function") {
            throw new InvalidNodeTypeError(`Unexpected node type: ${node.type}`);
        }

        for (const cmdNode of node.body) {
            if (cmdNode.type !== "command") {
                throw new InvalidNodeTypeError(`Unexpected node type: ${cmdNode.type}`);
            }

            if (!commands.hasOwnProperty(cmdNode.command)) {
                throw new InvalidCommandError(`Invalid command: ${cmdNode.command}`);
            }
        }
    }
}

export default validate

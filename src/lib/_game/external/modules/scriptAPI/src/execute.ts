import commands from "../lib/commands";

function execute(ast: FunctionNode[]): {
    get: Function
} {
    const functionTable: FunctionTable = {};

    for (const node of ast) {
        const fn = () => {
            for (const cmdNode of node.body) {
                commands[cmdNode.command].exec(cmdNode.args);
            }
        };

        functionTable[node.name] = {
            call: fn,
        };
    }

    return {
        get: function get(name: string) {
            return functionTable[name]
        }
    }
}

export default execute
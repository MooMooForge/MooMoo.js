import commands from "../lib/commands";

function execute(ast: FunctionNode[]): FunctionTable {
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

    return functionTable;
}

export default execute
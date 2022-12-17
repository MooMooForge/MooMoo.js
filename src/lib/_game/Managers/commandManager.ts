import Command from "../types/Command";

class CommandManager {
    public prefix: string;
    public commands: { [key: string]: Command } = {};

    public constructor() {
        this.prefix = "/";
    }

    public setPrefix(prefix: string) {
        this.prefix = prefix;
    }
    public registerCommand(name: string, run: Function) {
        let command = new Command(name, run);
        this.commands[name] = command;
    }
    public unregisterCommand(name: string) {
        delete this.commands[name];
    }
}

export default CommandManager;

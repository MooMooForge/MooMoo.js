import { MooMoo } from "../../../../app"

function sendChat (message: string) {
    let commandManager = MooMoo.CommandManager;
    let prefix = commandManager.prefix;
    if (message.startsWith(prefix)) {
        let commands = commandManager.commands;
        let command = message.split(" ")[0].slice(prefix.length);
        let args = message.split(" ").slice(1);

        let Command = commands[command];
        if (Command) {
            Command.run(Command, args);
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

export default sendChat
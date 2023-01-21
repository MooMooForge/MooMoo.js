import Server from "./types/Server/Server";
import EventEmitter from "../../funcs/EventEmitter";

interface Bot {
    name: string;
    skin: number;
    moofoll: boolean;
    join(server: Server): void;
    spawn(): void;
    chat(message: string): void;
}

class Bot extends EventEmitter {
    constructor(options: { name: string, skin: number, moofoll: boolean }) {
        super();
        this.name = options.name;
        this.skin = options.skin;
        this.moofoll = options.moofoll;
    }
    join(server: Server) {
        // ...
    }
    spawn() {
        // ...
    }
    chat(message: string) {
        // ...
    }
}

export default Bot;
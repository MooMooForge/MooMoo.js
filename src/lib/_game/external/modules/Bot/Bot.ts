import EventEmitter from "../../funcs/EventEmitter";

interface Server {
    // ...
}

interface Bot {
    name: string;
    skin: number;
    moofoll: boolean;
    id: number;
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
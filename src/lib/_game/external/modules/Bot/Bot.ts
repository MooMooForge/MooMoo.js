import Server from "./types/Server/Server";

interface Bot {
    server: Server;
    name: string;
    skin: string;
    spawnRes: boolean;
}

class Bot {
    constructor(server: Server, name: string, skin: string, spawnRes: boolean) {
        this.server = server;
        this.name = name;
        this.skin = skin;
        this.spawnRes = spawnRes;
    }
}

export default Bot;
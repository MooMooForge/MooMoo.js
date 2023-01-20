import Server from "./types/Server/Server";

interface Bot {
    server: Server;
    name: string;
    skin: string;
    spawnRes: boolean;
    ws: WebSocket;
}

class Bot {
    constructor(server: Server, name: string, skin: string, spawnRes: boolean) {
        this.server = server;
        this.name = name;
        this.skin = skin;
        this.spawnRes = spawnRes;
        this.ws = null;
    }

    public async connect() {
        
    }
}

export default Bot;
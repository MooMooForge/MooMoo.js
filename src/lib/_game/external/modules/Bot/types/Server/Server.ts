interface Server {
    rawServer: string;
    playerCount: number;
    maxPlayers: number;
    index: number;
    region: string | number;
    wsURL: string;
    type: "sandbox" | "dev" | "mm_beta" | "";
}

class Server {
    constructor(server: string, type: "sandbox" | "dev" | "mm_beta" | "") {
        this.rawServer = server;
        this.type = type;
    }

    parseServer() {

    }
}

export default Server;
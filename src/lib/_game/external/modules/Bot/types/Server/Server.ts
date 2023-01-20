interface Server {
    rawServer: string;
    playerCount: number;
    maxPlayers: number;
    index: number;
    region: string | number
}

class Server {
    constructor(server: string) {
        this.rawServer = server;
    }
}

export default Server;
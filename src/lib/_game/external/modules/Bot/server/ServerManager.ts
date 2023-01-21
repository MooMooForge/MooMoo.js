import Server from "./Server";

interface IServerManager {
    currentServer: Server | undefined;
    index: number;
    region: number;
    name: string;
    ip: string;
    players: number;
    wsurl: string;
}

class ServerManager implements IServerManager {
    currentServer: Server | undefined;
    index: number = 0;
    region: number = 0;
    name: string = "";
    ip: string = "";
    players: number = 0;
    wsurl: string = "";

    private static _instance: ServerManager | undefined;

    private constructor() {}

    public static get instance(): ServerManager {
        if (!ServerManager._instance) {
            ServerManager._instance = new ServerManager();
        }
        return ServerManager._instance;
    }

    public initalize(): void {
        this.calculateServer();
    }

    public getCurrentServer(): Server | undefined {
        let server: Server | undefined;
        // ...
        return server;
    }

    private calculateServer(): void {
        let urlData = this.extractRegionAndIndex();
        if (urlData.region && urlData.index) {
            this.region = urlData.region;
            this.index = urlData.index;
        }
    }

    private extractRegionAndIndex(): { region: number | null, index: number | null } {
        const match = window.location.href.match(/server=(\d+):(\d+)/);
        if (match) {
            const region = parseInt(match[1], 10)
            const index = parseInt(match[2], 10)
            return { region, index };
        }
        return { region: null, index: null };
    }
}
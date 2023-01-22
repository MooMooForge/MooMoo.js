interface IServer {
    region: number;
    index: number;
    name: string;
    ip: string;
}


class Server implements IServer {
    private _region: number;
    private _index: number;
    public name: string;
    public ip: string;

    constructor(region: number, index: number) {
        this._region = region;
        this._index = index;
        this.parseServerData();
    }

    public get region(): number {
        return this._region;
    }
    public set region(value: number) {
        this._region = value;
    }

    public get index(): number {
        return this._index;
    }
    public set index(value: number) {
        this._index = value;
    }

    private parseServerData(): void {
        let region = "vultr:" + this._region.toString();
        let servers = window.vultr.servers;
        let targetServer;
        for (let i = 0; i < servers.length; i++) {
            let currentServer = servers[i];
            if (currentServer.region === region && currentServer.index === this._index) {
                targetServer = currentServer;
                break;
            }
        }
        if (!targetServer) {
            console.log("Server not found");
            return;
        }
        this.name = targetServer.scheme;
        this.ip = targetServer.ip;
    }
}

export default Server;

import ServerManager from "./ServerManager";
import Bot from "../Bot";
import { MooMoo } from "../../../../../../../app";

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
        this.name = targetServer.region + ":" + targetServer.index;
        this.ip = targetServer.ip;
    }

    public getWebSocketUrl(token: string): string {
        if (this.ip && token) {
            return "wss://ip_" + this.ip + ".moomoo.io:8008/?gameIndex=0&token=" + token;
        } else {
            let server = ServerManager.instance.getCurrentServer();
            if (server) {
                return "wss://ip_" + server.ip + ".moomoo.io:8008/?gameIndex=0&token=" + token;
            }
        }
    }

    public joinServer(instance: Bot) {
        let wsURL = this.getWebSocketUrl(instance.recaptchaToken);
        const ws = new WebSocket(wsURL);
        ws.binaryType = "arraybuffer";
        ws.onopen = () => {
            instance.ws = ws;
        }
        ws.addEventListener("message", (event) => {
            let data = new Uint8Array(event.data);
            let encoded = MooMoo.msgpack.decode(data);
            let [packet, [...packetData]] = encoded;
            if (packet == "io-init") {
                instance.onConnect(this);
            }
        });
    }
}

export default Server;

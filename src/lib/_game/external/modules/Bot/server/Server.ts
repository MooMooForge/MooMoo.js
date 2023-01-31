import ServerManager from "./ServerManager";
import Bot from "../Bot";
import { MooMoo } from "../../../../../../../app";
import chunk from "../../../funcs/chunk";

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
        if (!window.vultr || !window.vultr.servers) {
            console.log("vultr or vultr.servers object not found in window");
            return;
        }
        let region = "vultr:" + this._region.toString();
        let servers = window.vultr.servers;
        let targetServer;
        for (let i = 0; i < servers.length; i++) {
            let currentServer = servers[i];
            if (!currentServer.region || !currentServer.index) {
                console.log("currentServer missing required properties");
                continue;
            }
            if (currentServer.region === region && currentServer.index === this._index) {
                targetServer = currentServer;
                break;
            }
        }
        if (!targetServer) {
            console.log("Server not found");
            return;
        }
        if (!targetServer.region || !targetServer.index) {
            console.log("targetServer missing required properties");
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
            instance.emit("packet", {
                packet: packet,
                data: packetData
            })
            if (packet == "io-init") {
                instance.onConnect(this);
            }
            if (packet == "2") {
                if (!instance.gameID) {
                    instance.gameID = packetData[0][1]
                }
            }
            if (packet == "33") {
                let players = chunk(packetData[0], 13)
                players.forEach((player) => {
                    if (player[0] == instance.gameID) {
                        instance.x = player[1];
                        instance.y = player[2];
                    }
                })
            }
        });
    }
}

export default Server;

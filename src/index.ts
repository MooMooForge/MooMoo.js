import EventEmitter from "./lib/EventEmitter";

// import { encode } from "./lib/encode.js";
import  decode  from "./lib/decode.js";
import { handlePacket } from "./ws/handlePacket";

export type array = Array<any>;

class Game extends EventEmitter {
    constructor() {
        super();
    }

    public start() {
        console.log("Game started!");
    }

    public debug(message : any) {
        console.log(message);
    }
}

export let ws: WebSocket = null;

window.WebSocket = new Proxy(WebSocket, {
    construct(target: any, args) {
        ws = Reflect.construct(target, args);
        ws.addEventListener("message", (e: MessageEvent) => {
            let data = e.data;
            try {
                let decoded = decode(data);
                let [packet, [...packetData]] = decoded;
                handlePacket(packet, packetData);
            } catch (e) {
                throw new Error(e);
            }
        });
        return ws
    }
});

export default Game;

import EventEmitter from "./lib/EventEmitter";
import hookWS from "./ws/hookWS";

export type array = Array<any>;
export type MessageEvent = Event

export default class Game extends EventEmitter {
    ws: WebSocket;
    teams: any[];
    sendPacket: Function;

    constructor() {
        super();
    }
    debug(message : any) {
        this.emit("debug", message);
    }
}

hookWS();


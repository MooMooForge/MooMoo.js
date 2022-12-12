import EventEmitter from "./lib/EventEmitter";
import hookWS from "./ws/hookWS";

import PlayerManager from "./lib/_game/PlayerManager";

export type array = Array<any>;
export type MessageEvent = Event

export default class Game extends EventEmitter {
    // websocket
    ws: WebSocket;

    // idk random variables
    teams: any = [];
    GamePlayerManager: PlayerManager = new PlayerManager();
    ActivePlayerManager: PlayerManager = new PlayerManager();
    myPlayer: any;


    // lib functions
    sendPacket: Function;

    // lib vars
    vars: any = <any>{};

    constructor() {
        super();
    }
    debug(message : any) {
        this.emit("debug", message);
    }
}

hookWS();


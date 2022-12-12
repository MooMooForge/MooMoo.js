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
    players: any = [];
    nearPlayers: any = [];
    myPlayer: any;

    // managers
    playerManager: PlayerManager = new PlayerManager();

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


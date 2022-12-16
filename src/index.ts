import EventEmitter from "./lib/EventEmitter";
import hookWS from "./ws/hookWS";

import PlayerManager from "./lib/_game/Managers/PlayerManager";
import Leaderboardmanager from "./lib/_game/Managers/LeaderboardManager";
import ObjectManager from "./lib/_game/Managers/ObjectManager";

import decode from "./lib/decode.js";
import encode from "./lib/encode.js";

export type array = Array<any>;
export type MessageEvent = Event

export default class Game extends EventEmitter {
    // websocket
    ws: WebSocket;

    // idk random variables
    teams: any = [];
    myPlayer: any

    // managers
    GamePlayerManager: PlayerManager = new PlayerManager();
    ActivePlayerManager: PlayerManager = new PlayerManager();
    LeaderboardManager: Leaderboardmanager = new Leaderboardmanager();
    GameObjectManager: ObjectManager = new ObjectManager();
    
    // lib functions
    sendPacket: Function;

    // lib vars
    vars: any = <any>{};

    // msgpack vars
    msgpack: any = <any>{};
    constructor() {
        super();
        this.msgpack.decode = decode;
        this.msgpack.encode = encode;
    }
    debug(message : any) {
        this.emit("debug", message);
    }
}

hookWS();


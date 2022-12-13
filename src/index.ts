import EventEmitter from "./lib/EventEmitter";
import hookWS from "./ws/hookWS";

import PlayerManager from "./lib/_game/Managers/PlayerManager";
import Leaderboardmanager from "./lib/_game/Managers/LeaderboardManager";

export type array = Array<any>;
export type MessageEvent = Event

export default class Game extends EventEmitter {
    // websocket
    ws: WebSocket;

    // idk random variables
    teams: any = [];
    myPlayer: any;

    // managers
    GamePlayerManager: PlayerManager = new PlayerManager();
    ActivePlayerManager: PlayerManager = new PlayerManager();
    LeaderboardManager: Leaderboardmanager = new Leaderboardmanager();

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


import EventEmitter from "./lib/_game/external/funcs/EventEmitter";
import hookWS from "./ws/hookWS";
import PlayerManager from "./lib/_game/Managers/PlayerManager";
import Leaderboardmanager from "./lib/_game/Managers/LeaderboardManager";
import ObjectManager from "./lib/_game/Managers/ObjectManager";
import CommandManager from "./lib/_game/Managers/commandManager";
import PacketManager from "./lib/_game/Managers/PacketManager";

import decode from "./lib/_game/external/funcs/msgpack/decode.js";
import encode from "./lib/_game/external/funcs/msgpack/encode.js";

import UTILS from "./lib/_game/Managers/UTILS";

export type array = Array<any>;
export type MessageEvent = Event

export default class Game extends EventEmitter {
    // websocket
    ws: WebSocket;

    // idk random variables
    teams: any = [];
    myPlayer: any
    statistics: any = <any>{};
    DidInit: boolean = false;

    // managers
    GamePlayerManager: PlayerManager = new PlayerManager();
    ActivePlayerManager: PlayerManager = new PlayerManager();
    LeaderboardManager: Leaderboardmanager = new Leaderboardmanager();
    GameObjectManager: ObjectManager = new ObjectManager();
    CommandManager: CommandManager = new CommandManager();
    PacketManager: PacketManager = new PacketManager();

    // UTILS
    UTILS: UTILS = new UTILS();

    // lib functions
    sendPacket: Function;

    // lib vars
    vars: any = <any>{};

    // funcs
    onGameLoad: Function;
    onPositionUpdate: Function;
    onClientPacket: Function;

    // msgpack vars
    msgpack: any = <any>{};
    constructor() {
        super();
        this.msgpack.decode = decode;
        this.msgpack.encode = encode;

        this.vars.gameLoaded = false;
    }
    debug(message: any) {
        this.emit("debug", message);
    }
}


hookWS();
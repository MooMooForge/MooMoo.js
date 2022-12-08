import EventEmitter from "./lib/EventEmitter";
import hookWS from "./ws/hookWS";

export type array = Array<any>;
export type MessageEvent = Event

class Game extends EventEmitter {
    static ws: any;
    teams: any[];

    constructor() {
        super();
        this.teams = [];
    }
    debug(message : any) {
        this.emit("debug", message);
    }
}

hookWS();
export default Game;


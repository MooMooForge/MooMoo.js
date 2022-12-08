import EventEmitter from "./lib/EventEmitter";
import hookWS from "./ws/hookWS";

export let ws: any = {}

export type array = Array<any>;
export type MessageEvent = Event

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

hookWS();
export default Game;

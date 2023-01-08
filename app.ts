import Game from "./src/index";

import { updateHookPosition } from "./src/ws/packets/server/updatePlayers";
import initRendering from "./src/lib/rendering/initRendering";

let func: any = Function.prototype;

export let MooMoo = func[69];
if (!MooMoo) {
    MooMoo = new Game();
    Object.defineProperty(Function.prototype, 69, {
        get() {
            return MooMoo;
        }
    })
}

let sym = Symbol();

Object.defineProperty(Object.prototype, "x", {
    set(data) {
        this[sym] = data;
        updateHookPosition.call(this, data);
    },
    get() {
        return this[sym];
    }
})

initRendering();

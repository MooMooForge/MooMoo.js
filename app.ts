import Game from "./src/index";

import { updateHookPosition } from "./src/ws/packets/server/updatePlayers";
import initRendering from "./src/lib/rendering/initRendering";

export const MooMoo = new Game();


Object.defineProperty(Function.prototype, 69, {
    get() {
        switch (this.name) {
            case "MooMooJS_beta":
                return MooMoo
            default:
                return null;
        }
    }
})

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

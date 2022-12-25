import Game from "./main/index";

import { updateHookPosition } from "./ws/packets/server/updatePlayers";

export const MooMoo = new Game();
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

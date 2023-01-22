let func: any = Function.prototype;

export let MooMoo = func[69];
if (!MooMoo) {
    const Game = require("./src/index").default;
    const updateHookPosition = require("./src/ws/packets/server/updatePlayers").updateHookPosition;
    const initRendering = require("./src/lib/rendering/initRendering").default;
    MooMoo = new Game();
    Object.defineProperty(Function.prototype, 69, {
        get() {
            return MooMoo;
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
} 


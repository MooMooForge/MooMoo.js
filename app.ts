import Game from "./src/index";

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

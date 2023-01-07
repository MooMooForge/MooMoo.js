import { MooMoo } from "../../../../app";
import chunk from "../../../lib/_game/external/funcs/chunk";

function loadAI(data: any) {
    if(data) {
        let animals = chunk(data, 7);
        MooMoo.emit("loadAI", data)
        MooMoo.emit("loadAi", data)
        MooMoo.emit("loadaI", data)
        MooMoo.emit("a", data)
        // sid, type, x, y, dir, health, index
    }
}

export default loadAI;
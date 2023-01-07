import { MooMoo } from "../../../../app";

function updateMinimap(data: any) {
    MooMoo.emit("updateMinimap", data);
    MooMoo.emit("updateminimap", data);
    MooMoo.emit("mm", data);
}

export default updateMinimap;
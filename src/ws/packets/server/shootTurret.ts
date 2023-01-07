import { MooMoo } from "../../../../app"

function shootTurret(data: any) {
    // idk
    MooMoo.emit("shootTurret", data);
    MooMoo.emit("shootturret", data);
    MooMoo.emit("sp", data);
}

export default shootTurret
import { MooMoo } from "../../../../app";

function updateHealth(data: Array<2>) {
    let sid = data[0];
    let value = data[1];
    let tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(sid);
    if (tmpPlayer) {
        tmpPlayer.health = value;
    }
    
    MooMoo.emit("updateHealth", data);
    MooMoo.emit("updatehealth", data);
    MooMoo.emit("h", data);
}

export default updateHealth;
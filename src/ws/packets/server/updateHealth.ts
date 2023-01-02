import { MooMoo } from "../../../../app";

function updateHealth(sid: number, value: number) {
    let tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(sid);
    if (tmpPlayer) {
        tmpPlayer.health = value;
    }
}

export default updateHealth;
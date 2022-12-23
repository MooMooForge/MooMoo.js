import { MooMoo } from "../../../app";

function updateHealth(sid: number, value: number) {
    console.debug("Updating health of player with sid " + sid + " to " + value)
    let tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(sid);
    if (tmpPlayer) {
        tmpPlayer.health = value;
    }
}

export default updateHealth;
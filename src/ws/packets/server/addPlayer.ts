import { MooMoo } from "../../../../app";
import Player from "../../../lib/_game/types/Player";

function addPlayer (dta: any) {
    let data = dta[0];
    let isYou = dta[1];
    let tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(data[1]);
    if (!tmpPlayer) {
        tmpPlayer = new Player(data[1])
        tmpPlayer.name = data[2];
        tmpPlayer.id = data[0];
        MooMoo.GamePlayerManager.addPlayer(tmpPlayer);
    }

    MooMoo.debug("Player " + tmpPlayer.name + " has joined the game.");

    if (isYou) {
        console.log("You are now in game!");
    }
    MooMoo.emit("addPlayer", dta);
    MooMoo.emit("addplayer", dta);
    MooMoo.emit("2", dta)
}

export default addPlayer;
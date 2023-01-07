import { MooMoo } from "../../../../app";

function removePlayer(data: any) {
    let id = data[0];
    MooMoo.GamePlayerManager.removePlayerById(id);
    MooMoo.debug("Player " + id + " has left the game.");

    MooMoo.emit("removePlayer", data);
    MooMoo.emit("removeplayer", data);
    MooMoo.emit("4", data);
}

export default removePlayer;
import { MooMoo } from "../../../../app";

function removePlayer(id: string) {
    MooMoo.GamePlayerManager.removePlayerById(id);
    MooMoo.debug("Player " + id + " has left the game.");
}

export default removePlayer;
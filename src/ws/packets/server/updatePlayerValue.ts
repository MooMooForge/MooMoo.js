import { MooMoo } from "../../../../app";

function updatePlayerValue(data: Array<1>) {
    let id = data[0];
    let value = data[1];
    let player = MooMoo.myPlayer.resources;
    player[id] = value;
    MooMoo.myPlayer.resources = player;

    MooMoo.emit("updatePlayerValue", data);
    MooMoo.emit("updateplayervalue", data);
    MooMoo.emit("9", data);
}

export default updatePlayerValue;
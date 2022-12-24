import { MooMoo } from "../../../app";

function updatePlayerValue(id: any, value: any) {
    let player = MooMoo.myPlayer.resources;
    player[id] = value;
    MooMoo.myPlayer.resources = player;
    console.log(MooMoo.myPlayer.resources)
}

export default updatePlayerValue;
import { MooMoo } from "../../../../app";

function killPlayer(data: any) {
    // idk
    MooMoo.emit("killPlayer", data);
    MooMoo.emit("killplayer", data);
    MooMoo.emit("11", data);
}

export default killPlayer;
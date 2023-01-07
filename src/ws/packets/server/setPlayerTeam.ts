import { MooMoo } from "../../../../app";

function setPlayerTeam(data: any) {
    MooMoo.emit("setPlayerTeam", data);
    MooMoo.emit("setplayerteam", data);
    MooMoo.emit("st", data);
}

export default setPlayerTeam;
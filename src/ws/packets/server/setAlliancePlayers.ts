import { MooMoo } from "../../../../app";

function setAlliancePlayers(data: any) {
    MooMoo.emit("setAlliancePlayers", data);
    MooMoo.emit("setallianceplayers", data);
    MooMoo.emit("sa", data);
}

export default setAlliancePlayers;
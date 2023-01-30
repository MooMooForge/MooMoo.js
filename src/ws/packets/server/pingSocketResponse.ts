import { MooMoo } from "../../../../app";
import ServerManager from "../../../lib/_game/external/modules/Bot/server/ServerManager";
function pingSocketResponse(data: any) {
    let sm = MooMoo.ServerManager
    if (!sm) {
        MooMoo.ServerManager = ServerManager.instance;
    }
    sm = MooMoo.ServerManager
    if(sm) {
        MooMoo.ServerManager.initalize()
    }

    MooMoo.emit("pingSocketResponse", data);
    MooMoo.emit("pingsocketresponse", data);
    MooMoo.emit("pp", data);
}

export default pingSocketResponse;
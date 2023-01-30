import { MooMoo } from "../../../../app";
import ServerManager from "../../../lib/_game/external/modules/Bot/server/ServerManager";
function pingSocketResponse(data: any) {

    MooMoo.ServerManager = ServerManager.instance;
    MooMoo.ServerManager.initialize();

    MooMoo.emit("pingSocketResponse", data);
    MooMoo.emit("pingsocketresponse", data);
    MooMoo.emit("pp", data);
}

export default pingSocketResponse;
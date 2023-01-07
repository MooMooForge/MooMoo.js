import { MooMoo } from "../../../../app";

function addAlliance(data: any) {
    // fix alliances

    MooMoo.emit("addAlliance", data);
    MooMoo.emit("addalliance", data);
    MooMoo.emit("ac", data);
}

export default addAlliance;
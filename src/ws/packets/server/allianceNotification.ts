import { MooMoo } from "../../../../app";

function allianceNotification(data: any) {
    // idk

    MooMoo.emit("allianceNotification", data);
    MooMoo.emit("alliancenotification", data);
    MooMoo.emit("an", data)
}

export default allianceNotification;
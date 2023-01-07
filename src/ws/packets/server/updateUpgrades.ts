import { MooMoo } from "../../../../app";

function updateUpgrades (data: any) {
    MooMoo.emit("updateUpgrades", data);
    MooMoo.emit("updateupgrades", data);
    MooMoo.emit("16", data);
}

export default updateUpgrades;
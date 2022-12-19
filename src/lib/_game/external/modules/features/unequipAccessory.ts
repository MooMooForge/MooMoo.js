import { MooMoo } from "../../../../../../app";

function unequipAccessory() {
    MooMoo.sendPacket("13c", 0, 0, 1);
}

export default unequipAccessory;
import { MooMoo } from "../../../../../app";

import hats from "../../../../storage/hats";

function unequipHat() {
    MooMoo.sendPacket("13c", 0, 0, 0);
}

export default unequipHat;
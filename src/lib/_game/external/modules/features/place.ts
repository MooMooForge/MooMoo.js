import { MooMoo } from "../../../../../../app";

function place (id: Number, angle: Number) {
    let inventory = MooMoo.myPlayer.inventory;
    MooMoo.sendPacket("5", id, angle)
    MooMoo.sendPacket("c", 1, angle)
    MooMoo.sendPacket("c", 0, angle)
    MooMoo.sendPacket("5", inventory.primary, true)
}

export default place
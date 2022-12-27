import { MooMoo } from "../../../../../../app";

function place (id: Number, angle: Number) {
    let weapon = MooMoo.myPlayer.weaponIndex
    MooMoo.sendPacket("5", id, angle)
    MooMoo.sendPacket("c", 1, angle)
    MooMoo.sendPacket("c", 0, angle)
    MooMoo.sendPacket("5", weapon, true)
}

export default place
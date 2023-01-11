import { MooMoo } from "../../../../../../app";

function hit(angle: number = null) {
    MooMoo.sendPacket("c", 1, angle)
    MooMoo.sendPacket("c", 0, angle)
}


export default hit
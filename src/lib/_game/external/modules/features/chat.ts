import { MooMoo } from "../../../../../app";

function chat (message: string) {
    MooMoo.sendPacket("ch", message);
}

export default chat;
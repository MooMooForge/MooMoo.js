import sendChat from "./packets/client/sendChat"
import { MooMoo } from "../../app";

function handleClientPackets (packet: string, data: Array<any>) {
    let PacketManager = MooMoo.PacketManager;
    PacketManager.addPacket();
    let doSend: boolean = true;
    switch (packet) {
        case "ch": {
            doSend = sendChat(data[0]);
        }
    }
    
    return doSend;
}

export default handleClientPackets
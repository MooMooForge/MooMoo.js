import { MooMoo } from "../../../../app";

function receiveChat(data: any) {
    MooMoo.emit("receiveChat", data);
    MooMoo.emit("receivechat", data);
    MooMoo.emit("ch", data);
}

export default receiveChat;
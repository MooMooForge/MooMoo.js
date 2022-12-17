import sendChat from "./packets/client/sendChat"

function handleClientPackets (packet: string, data: Array<any>) {
    let doSend: boolean = true;
    switch (packet) {
        case "ch": {
            doSend = sendChat(data[0]);
        }
    }
    return doSend;
}

export default handleClientPackets
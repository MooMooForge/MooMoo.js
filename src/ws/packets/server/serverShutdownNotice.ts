import { MooMoo } from "../../../../app";

function serverShutdownNotice(data: any) {
    // idk
    MooMoo.emit("serverShutdownNotice", data);
    MooMoo.emit("servershutdownnotice", data);
    MooMoo.emit("20", data);
}

export default serverShutdownNotice;
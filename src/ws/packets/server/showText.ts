import { MooMoo } from "../../../../app";

function showText(data: any) {
    MooMoo.emit("showText", data);
    MooMoo.emit("showtext", data);
    MooMoo.emit("t", data);
}

export default showText;
import { MooMoo } from "../../../../app";

function pingMap(data: any) {
    MooMoo.emit("pingMap", data);
    MooMoo.emit("pingmap", data);
    MooMoo.emit("p", data);
}

export default pingMap;
import { MooMoo } from "../../../../app";

function pingSocketResponse(data: any) {
    MooMoo.emit("pingSocketResponse", data);
    MooMoo.emit("pingsocketresponse", data);
    MooMoo.emit("pp", data);
}

export default pingSocketResponse;
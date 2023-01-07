import { MooMoo } from "../../../../app";

function updateAge(data: any) {
    // idk

    MooMoo.emit("updateAge", data);
    MooMoo.emit("updateage", data);
    MooMoo.emit("15", data);
} 

export default updateAge;
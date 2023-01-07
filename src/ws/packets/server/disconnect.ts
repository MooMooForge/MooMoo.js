import { MooMoo } from "../../../../app";

function disconnect () {
    // some code here

    MooMoo.emit("disconnect", MooMoo.ws);
}

export default disconnect;
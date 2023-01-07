import { MooMoo } from "../../../../app";

function animeAI(data: any) {
    let sid = data[0]

    MooMoo.emit("animateAI", data);
    MooMoo.emit("animateAi", data);
    MooMoo.emit("animateai", data);
    MooMoo.emit("aa", sid)
}

export default animeAI;
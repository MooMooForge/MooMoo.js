import { MooMoo } from "../../../app";

class Command {
    public name: string;
    public run: Function;

    public constructor(name: string, run: Function) {
        this.name = name;
        this.run = run;
    }

    reply(message: string) {
        MooMoo.myPlayer.chat(message);
    }

}

export default Command
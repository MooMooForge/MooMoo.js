import EventEmitter from "../../funcs/EventEmitter";
import ServerManager from "./server/ServerManager";
import Server from "./server/Server";


class Bot extends EventEmitter {
    name: string;
    skin: number;
    moofoll: boolean;
    id: number;
    ws: WebSocket | undefined;
    recaptchaToken: string | undefined;

    constructor(configurable: boolean = false, options: { name: string, skin: number | undefined, moofoll: boolean | undefined }) {
        super();
        if (!configurable) {
            this.name = "Bot";
            this.skin = 0;
            this.moofoll = false;
        } else {
            this.name = options.name;
            this.skin = options.skin;
            this.moofoll = options.moofoll;
        }
    }

    private async generateToken(): Promise<string> {
        try {
            const token = await window.grecaptcha.execute("6LevKusUAAAAAAFknhlV8sPtXAk5Z5dGP5T2FYIZ", { action: "homepage" });
            return token;
        } catch (error) {
            throw error;
        }
    }

    async join(server: Server | string | [number, number] | { region: number, index: number }) {
        switch (typeof server) {
            case "string": {
                let { region, index } = ServerManager.parseServer(server);
                let targetserver = new Server(region, index);
                this.recaptchaToken = await this.generateToken();
                targetserver.joinServer(this);
                break;
            }
            case "object": {
                if (Array.isArray(server)) {
                    let [region, index] = server;
                    let targetserver = new Server(region, index);
                    this.recaptchaToken = await this.generateToken();
                    targetserver.joinServer(this);
                } else {
                    let { region, index } = server;
                    let targetserver = new Server(region, index);
                    this.recaptchaToken = await this.generateToken();
                    targetserver.joinServer(this);
                    
                }
                break;
            }
        }
    }
    spawn() {
        // ...
    }
    chat(message: string) {
        // ...
    }
}

export default Bot;

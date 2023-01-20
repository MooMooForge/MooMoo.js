import Bot from './Bot';

class BotManager {
    private static _instance: BotManager;

    private _bots: Bot[] = [];

    private constructor() {
        // ...
    }

    public static get instance(): BotManager {
        if (!BotManager._instance) {
            BotManager._instance = new BotManager();
        }

        return BotManager._instance;
    }

    public addBot(bot: Bot): void {
        this._bots.push(bot);
    }

    public removeBot(bot: Bot): void {
        const index = this._bots.indexOf(bot);
        if (index > -1) {
            this._bots.splice(index, 1);
        }
    }
}

export default BotManager;
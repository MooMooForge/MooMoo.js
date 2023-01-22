import Bot from './Bot';

class BotManager {
    private static _instance: BotManager | undefined;
    private _bots: Map<number, Bot> = new Map<number, Bot>();
    private _botIdCounter = 0;

    public Bot = Bot;

    private constructor() {}

    public static get instance(): BotManager {
        if (!BotManager._instance) {
            BotManager._instance = new BotManager();
        }
        return BotManager._instance;
    }

    public addBot(bot: Bot): number {
        const botId = this._botIdCounter++;
        bot.id = botId;
        this._bots.set(botId, bot);
        return botId;
    }

    public removeBot(botId: number): void {
        this._bots.delete(botId);
    }

    public getBot(botId: number): Bot | undefined {
        return this._bots.get(botId);
    }
}


export default BotManager;
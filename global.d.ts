interface IVultr {
    readonly servers: ReadonlyArray<{
        ip: string;
        scheme: string;
        region: string;
        index: number;
        games: ReadonlyArray<{
            playerCount: number;
            isPrivate: boolean;
        }>;
    }>;
}

interface IRecaptchaExecute {
    execute(token: string, action: { action: string }): Promise<string>;
}

interface Window {
    readonly vultr: IVultr;
    readonly grecaptcha: IRecaptchaExecute
}

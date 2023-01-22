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

interface Window {
    readonly vultr: IVultr;
}
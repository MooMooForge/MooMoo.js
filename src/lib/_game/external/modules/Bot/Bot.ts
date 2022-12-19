class Bot {
    private adress : any;
    private ws: WebSocket;

    constructor(adress : any) {
        this.adress = adress;
        this.ws = new WebSocket(adress);
    }
}
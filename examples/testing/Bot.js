const MooMoo = Function.prototype[69];

const ServerManager = MooMoo.ServerManager;
const Server = MooMoo.Server;

const Bot = new MooMoo.Bot({
    name: "Bot",
    skin: 1, // 1-7,
    moofoll: true,
})

Bot.join(Server);

Bot.once("connect", () => {
    console.log("Connected to server!");

    Bot.spawn();
    Bot.chat("Hello World!");

    Bot.addEventListener("packet", (packetData) => {
        let packet = packetData.packet;
        let data = packetData.data;

        console.log(packet, data);
    })
})



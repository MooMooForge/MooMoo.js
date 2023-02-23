const commands: CommandTable = {
    hit: {
        exec: () => console.log("Hit!"),
    },
    wait: {
        exec: (args) =>
            new Promise((resolve) => setTimeout(resolve, parseInt(args[0], 10))),
    },
    chat: {
        exec: (args) => console.log(args.join(" ")),
    },
    enddef: {
        exec: () => { },
    }, // no-op command
};

export default commands
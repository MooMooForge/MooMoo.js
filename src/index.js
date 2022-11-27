let init = false;
let ws = null;

WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
    apply(target, thisArg, argumentsList) {
        send(argumentsList)

        if(!init) {
            init = true;
            console.log("New WebSocket with the url " + thisArg.url);
            ws = thisArg;

            ws.addEventListener("message", e => {
                let data = e.data;
                console.log(data)
            })
        }

        return Reflect.apply(target, thisArg, argumentsList)
    }
})

function send() {
   // console.log(arguments)
}

// ^ temporary code from the tutorial i just uploaded lol
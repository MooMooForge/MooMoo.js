import { MooMoo } from "../app";
import { array } from "../main/index";

// packets
import setInitData from "./packets/server/setInitData";
import setUpGame from "./packets/server/setupGame";
import addPlayer from "./packets/server/addPlayer";
import removePlayer from "./packets/server/removePlayer";
import updatePlayers from "./packets/server/updatePlayers";
import updateLeaderboard from "./packets/server/updateLeaderboard";
import loadGameObject from "./packets/server/loadGameObject";
import killObject from "./packets/server/killObject";
import killObjects from "./packets/server/killObjects";
import updateHealth from "./packets/server/updateHealth";

export default function handleServerPackets(packet: string, data: array) {
    switch (packet) {
        case "id": // setInitData
            setInitData(data[0]);
            break;
        case "d": // disconnect
            break;
        case "1": // setUpGame
            setUpGame(data[0]);
            break;
        case "2": // addPlayer
            addPlayer(data[0], data[1]);
            break;
        case "4": // removePlayer
            removePlayer(data[0]);
            break;
        case "33": // updatePlayers
            updatePlayers(data[0]);
            break;
        case "5": // updateLeaderboard
            updateLeaderboard(data[0]);
            break;
        case "6": // load game object
            loadGameObject(data[0]);
            break;
        case "a": // load game AI
            break;
        case "aa": // animate AI
            break;
        case "7": // gather animation
            break;
        case "8": // wiggle game object
            break;
        case "sp": // shoot turret
            break;
        case "9": // update player value
            break;
        case "h": // update health
        console.log(data)
            updateHealth(data[0], data[1]);
            break;
        case "11": // kill player
            break;
        case "12": // kill object
            killObject(data[0]);
            break;
        case "13": // kill objects
            killObjects(data[0]);
            break;
        case "14": // update item count
            break;
        case "15": // update age
            break;
        case "16": // update upgrades
            break;
        case "17": // update items
            break;
        case "18": // add projectile
            break;
        case "19": // remove projectile
            break;
        case "20": // server shutdown notice
            break;
        case "ac": // add alliance
            break;
        case "ad": // remove alliance
            break;
        case "an": // alliance invite request
            break;
        case "st": // set player team
            break;
        case "sa": // set alliance players
            break;
        case "us": // update store items
            break;
        case "ch": // receive chat
            break;
        case "mm": // update minimap
            break;
        case "t": // show text
            break;
        case "p": // ping minimap
            break;
        case "pp": // ping socket response
            break;

        default:
            console.log("Unknown packet: " + packet);
    }

    MooMoo.emit("packet", {
        packet: packet,
        data: data
    });
}

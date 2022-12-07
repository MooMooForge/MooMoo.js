import { MooMoo } from "../../app";
import { array } from "../index";

export function handlePacket(packet: string, data: array) {
    switch (packet) {
        case "id": // setInitData
            break;
        case "d": // disconnect
            break;
        case "1": // setUpGame
            break;
        case "2": // addPlayer
            break;
        case "4": // removePlayer
            break;
        case "33": // updatePlayers
            break;
        case "5": // updateLeaderboard
            break;
        case "6": // load game object
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
            break;
        case "11": // kill player
            break;
        case "12": // kill object
            break;
        case "13": // kill objects
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

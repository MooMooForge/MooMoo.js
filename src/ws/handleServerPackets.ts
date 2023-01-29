import { MooMoo } from "../../app";
import { array } from "../index";

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
import updatePlayerValue from "./packets/server/updatePlayerValue";
import loadAI from "./packets/server/loadAI";
import animateAI from "./packets/server/animateAI";
import gatherAnimation from "./packets/server/gatherAnimation";
import disconnect from "./packets/server/disconnect";
import wiggleGameObject from "./packets/server/wiggleGameObject";
import shootTurret from "./packets/server/shootTurret";
import killPlayer from "./packets/server/killPlayer";
import updateItemCounts from "./packets/server/updateItemCounts";
import updateAge from "./packets/server/updateAge";
import updateUpgrades from "./packets/server/updateUpgrades";
import updateItems from "./packets/server/updateItems";
import addProjectile from "./packets/server/addProjectile";
import remProjectile from "./packets/server/remProjectile";
import serverShutdownNotice from "./packets/server/serverShutdownNotice";
import addAlliance from "./packets/server/addAlliance";
import deleteAlliance from "./packets/server/deleteAlliance";
import allianceNotification from "./packets/server/allianceNotification";
import setPlayerTeam from "./packets/server/setPlayerTeam";
import setAlliancePlayers from "./packets/server/setAlliancePlayers";
import updateStoreItems from "./packets/server/updateStoreItems";
import receiveChat from "./packets/server/receiveChat";
import updateMinimap from "./packets/server/updateMinimap";
import showText from "./packets/server/showText";
import pingMap from "./packets/server/pingMap";
import pingSocketResponse from "./packets/server/pingSocketResponse";

import ServerManager from "../lib/_game/external/modules/Bot/server/ServerManager";

export default function handleServerPackets(packet: string, data: array) {
    switch (packet) {
        case "io-init": {
            let PacketManager = MooMoo.PacketManager;
            PacketManager.initialize();
            PacketManager.addPacket();
            break;
        }
        case "id": // setInitData
            setInitData(data);
            break;
        case "d": // disconnect
            disconnect();
            break;
        case "1": // setUpGame
            setUpGame(data);
            break;
        case "2": // addPlayer
            addPlayer(data);
            break;
        case "4": // removePlayer
            removePlayer(data);
            break;
        case "33": // updatePlayers
            updatePlayers(data);
            break;
        case "5": // updateLeaderboard
            updateLeaderboard(data);
            break;
        case "6": // load game object
            loadGameObject(data);
            break;
        case "a": // load game AI
            loadAI(data[0]);
            break;
        case "aa": // animate AI
            animateAI(data);
            break;
        case "7": // gather animation
            gatherAnimation(data);
            break;
        case "8": // wiggle game object
            wiggleGameObject(data)
            break;
        case "sp": // shoot turret
            shootTurret(data);
            break;
        case "9": // update player value
            updatePlayerValue(data);
            break;
        case "h": // update health
            updateHealth(data);
            break;
        case "11": // kill player
            killPlayer(data)
            break;
        case "12": // kill object
            killObject(data);
            break;
        case "13": // kill objects
            killObjects(data[0]);
            break;
        case "14": // update item count
            updateItemCounts(data)
            break;
        case "15": // update age
            updateAge(data)
            break;
        case "16": // update upgrades
            updateUpgrades(data)
            break;
        case "17": // update items
            updateItems(data)
            break;
        case "18": // add projectile
            addProjectile(data)
            break;
        case "19": // remove projectile
            remProjectile(data)
            break;
        case "20": // server shutdown notice
            serverShutdownNotice(data)
            break;
        case "ac": // add alliance
            addAlliance(data)
            break;
        case "ad": // remove alliance
            deleteAlliance(data)
            break;
        case "an": // alliance invite request
            allianceNotification(data)
            break;
        case "st": // set player team
            setPlayerTeam(data)
            break;
        case "sa": // set alliance players
            setAlliancePlayers(data)
            break;
        case "us": // update store items
            updateStoreItems(data)
            break;
        case "ch": // receive chat
            receiveChat(data)
            break;
        case "mm": // update minimap
            updateMinimap(data)
            break;
        case "t": // show text
            showText(data)
            break;
        case "p": // ping minimap
            pingMap(data)
            break;
        case "pp": // ping socket response
            pingSocketResponse(data)
            break;

        default:
            console.log("Unknown packet: " + packet);
    }

    MooMoo.emit("packet", {
        packet: packet,
        data: data
    });
}

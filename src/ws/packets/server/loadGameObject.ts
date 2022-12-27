import { MooMoo } from "../../../../app";
import chunk from "../../../lib/_game/external/funcs/chunk";
import GameObject from "../../../lib/_game/types/GameObject";

function loadGameObject(data: any) {
    let arr = chunk(data, 8);
    arr.forEach((obj: any) => {
        let tmpObj = MooMoo.GameObjectManager.getGameObjectBySid(obj[0]);
        if (!tmpObj) {
            tmpObj = new GameObject(obj[0]);
        }

        tmpObj.x = obj[1];
        tmpObj.y = obj[2];
        tmpObj.ownerSid = obj[3];
        tmpObj.type = obj[4];
        tmpObj.sid = obj[0];
        tmpObj.dir = obj[5];
        tmpObj.scale = obj[6];
        tmpObj.idk = obj[7];

        MooMoo.GameObjectManager.addObject(tmpObj);
    })
}

export default loadGameObject;
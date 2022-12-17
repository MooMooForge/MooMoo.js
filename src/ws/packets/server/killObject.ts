import { MooMoo } from "../../../../app";

function killObject(sid: number) {
    MooMoo.GameObjectManager.removeObjectBySid(sid);
}

export default killObject;
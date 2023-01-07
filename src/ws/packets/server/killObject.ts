import { MooMoo } from "../../../../app";

function killObject(data: Array<1>) {
    let sid = data[0];
    
    MooMoo.GameObjectManager.removeObjectBySid(sid);

    MooMoo.emit("killObject", data);
    MooMoo.emit("killobject", data);
    MooMoo.emit("12", sid);
}

export default killObject;
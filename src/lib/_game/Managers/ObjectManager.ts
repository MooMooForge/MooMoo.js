import { MooMoo } from "../../../app";
import GameObject from "../types/GameObject";

class ObjectManager {

    objects: Map<any, any>;

    constructor() {
        this.objects = new Map();
    }

    addObject(obj: GameObject) {
        let tmpObj = MooMoo.GameObjectManager.getGameObjectBySid(obj.sid);

        if (!tmpObj) {
            tmpObj = new GameObject(obj.sid);
        }

        tmpObj.x = obj.x;
        tmpObj.y = obj.y;
        tmpObj.ownerSid = obj.ownerSid;
        tmpObj.type = obj.type;
        tmpObj.sid = obj.sid;

        this.objects.set(obj.sid, tmpObj);
    }

    getGameObjectBySid(sid: number) {
        return this.objects.get(sid);
    }
    
    getObjectsByOwnerSid(sid: number) {
        let objs: Array<any> = [];

        this.objects.forEach((obj: GameObject) => {
            if (obj.ownerSid == sid) {
                objs.push(obj);
            }
        })

        return objs;
    }

    removeObjectBySid(sid: number) {
        this.objects.delete(sid);
    }

    removeObjectsByOwnerSid(sid: number) {
        this.objects.forEach((obj: GameObject) => {
            if (obj.ownerSid == sid) {
                this.objects.delete(obj.sid);
            }
        })
    }
}

export default ObjectManager;
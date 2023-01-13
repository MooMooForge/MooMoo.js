class UTILS {
    getDistanceBetweenTwoPoints: Function;
    dist: Function;
    distance: Function;
    atan2: Function;
    angle: Function;
    getAngleBetweenTwoPoints: Function;
    
    static getDistanceBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    static getAngleBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    static atan2 (x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    constructor() {
        this.getDistanceBetweenTwoPoints = UTILS.getDistanceBetweenTwoPoints;
        this.dist = UTILS.getDistanceBetweenTwoPoints;
        this.distance = UTILS.getDistanceBetweenTwoPoints;
        this.atan2 = UTILS.atan2;
        this.angle = UTILS.atan2;
        this.getAngleBetweenTwoPoints = UTILS.getAngleBetweenTwoPoints;
    }   
}

export default UTILS;
class UTILS {
    getDistanceBetweenTwoPoints: Function;
    dist: Function;
    distance: Function;

    static getDistanceBetweenTwoPoints(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    constructor() {
        this.getDistanceBetweenTwoPoints = UTILS.getDistanceBetweenTwoPoints;
        this.dist = UTILS.getDistanceBetweenTwoPoints;
        this.distance = UTILS.getDistanceBetweenTwoPoints;
    }   
}

export default UTILS;
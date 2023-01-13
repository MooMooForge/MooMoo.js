import Player from "../types/Player";
import { MooMoo } from "../../../../app";

class PlayerManager {

    players:Player[];

    constructor() {
        this.players = [];
    }

    addPlayer(player:Player) {
        this.players.push(player);
    }

    removePlayer(player:Player) {
        this.players.splice(this.players.indexOf(player), 1);
    }

    removePlayerBySid(sid: number) {
        this.players.splice(this.players.findIndex(player => player.sid === sid), 1);
    }

    removePlayerById(id: string) {
        this.players.splice(this.players.findIndex(player => player.id === id), 1);
    }

    getPlayerBySid(sid: number) {
        return this.players.find(player => player.sid === sid);
    }

    getPlayerById(id: string) {
        return this.players.find(player => player.id === id);
    }

    getPlayerByName(name: string) {
        let players = this.players.filter(player => player.name === name);
        if (players.length > 1) {
            return players;
        } else return players[0];
    }

    clearPlayers() {
        this.players = [];
    }

    updatePlayer(sid: number, data: Player) {
        let player = this.getPlayerBySid(sid);
        if (player) {
            Object.assign(player, data);
        }
    }

    getEnemies() {
        return this.players.filter(player => {
            if (player.id !== MooMoo.myPlayer.id) {
                if (player.team === null) {
                    return true;
                }
                if (player.team !== MooMoo.myPlayer.team) {
                    return true;
                }
            }
        });
    }

    getTeammates() {
        return this.players.filter(player => {
            if (player.id !== MooMoo.myPlayer.id) {
                if (player.team === MooMoo.myPlayer.team) {
                    return true;
                }
            }
        });
    }

    getClosestEnemy() {
        let enemies = this.getEnemies();
        let closest = enemies[0];
        if(!enemies) return null;
        enemies.forEach(enemy => {
            if (MooMoo.UTILS.getDistanceBetweenTwoPoints(MooMoo.myPlayer.x, MooMoo.myPlayer.y, enemy.x, enemy.y) < MooMoo.UTILS.getDistanceBetweenTwoPoints(MooMoo.myPlayer.x, MooMoo.myPlayer.y, closest.x, closest.y)) {
                closest = enemy;
            }
        });
        return closest;
    }

    getClosestTeammate() {
        let teammates = this.getTeammates();
        let closest = teammates[0];
        if (!teammates) return null;
        teammates.forEach(teammate => {
            if (MooMoo.UTILS.getDistanceBetweenTwoPoints(MooMoo.myPlayer.x, MooMoo.myPlayer.y, teammate.x, teammate.y) < MooMoo.UTILS.getDistanceBetweenTwoPoints(MooMoo.myPlayer.x, MooMoo.myPlayer.y, closest.x, closest.y)) {
                closest = teammate;
            }
        });
        return closest;
    }

    getClosestPlayer() {
        let closest = this.players[0];
        if (!this.players) return null;
        this.players.forEach(player => {
            if (MooMoo.UTILS.getDistanceBetweenTwoPoints(MooMoo.myPlayer.x, MooMoo.myPlayer.y, player.x, player.y) < MooMoo.UTILS.getDistanceBetweenTwoPoints(MooMoo.myPlayer.x, MooMoo.myPlayer.y, closest.x, closest.y)) {
                closest = player;
            }
        });
        return closest;
    }

    getClosestEnemyToPlayer(player: Player) {
        let enemies = this.getEnemies();
        let closest = enemies[0];
        if (!enemies) return null;
        enemies.forEach(enemy => {
            if (MooMoo.UTILS.getDistanceBetweenTwoPoints(player.x, player.y, enemy.x, enemy.y) < MooMoo.UTILS.getDistanceBetweenTwoPoints(player.x, player.y, closest.x, closest.y)) {
                closest = enemy;
            }
        });
        return closest;
    }

    getClosestEnemyAngle() {
        let enemy = this.getClosestEnemy();
        if (!enemy) return null;
        return MooMoo.UTILS.getAngleBetweenTwoPoints(MooMoo.myPlayer.x, MooMoo.myPlayer.y, enemy.x, enemy.y);
    }

    getClosestEnemyDistance() {
        let enemy = this.getClosestEnemy();
        if (!enemy) return null;
        return MooMoo.UTILS.getDistanceBetweenTwoPoints(MooMoo.myPlayer.x, MooMoo.myPlayer.y, enemy.x, enemy.y);
    }
}

export default PlayerManager;
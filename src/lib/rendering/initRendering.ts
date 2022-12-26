import { MooMoo } from "../../app";

var delta = 0;
var now = Date.now();
var lastupdate = Date.now();

function initRendering() {

    MooMoo.vars.camX = 0;
    MooMoo.vars.camY = 0;
    MooMoo.vars.offsetX = 0;
    MooMoo.vars.offsetY = 0;
    MooMoo.vars.maxScreenWidth = 1920;
    MooMoo.vars.maxScreenHeight = 1080;
    MooMoo.vars.canvas = null;
    MooMoo.vars.ctx = null;

    MooMoo.addEventListener("gameLoad", function () {
        MooMoo.vars.canvas = document.getElementsByTagName("canvas")[1];
        MooMoo.vars.ctx = MooMoo.vars.canvas.getContext("2d");
        MooMoo.emit("renderingInit", {
            canvas: MooMoo.vars.canvas,
            ctx: MooMoo.vars.ctx
        });
    })

    function doUpdate() {
        now = Date.now();
        delta = now - lastupdate;
        lastupdate = now;
        requestAnimationFrame(doUpdate);
    }
    doUpdate();

    Object.defineProperty(Object.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (data) {
            if (MooMoo.myPlayer && this.id == MooMoo.myPlayer.id) {
                MooMoo.vars.playerx = this.x;
                MooMoo.vars.playery = this.y;

                MooMoo.vars.offsetX = MooMoo.vars.camX - (MooMoo.vars.maxScreenWidth / 2);
                MooMoo.vars.offsetY = MooMoo.vars.camY - (MooMoo.vars.maxScreenHeight / 2);

                MooMoo.emit("updateOffsets", MooMoo.vars.offsetX, MooMoo.vars.offsetY);
            }
            this._y = data;
        }
    });

    function tick() {
        if (MooMoo.myPlayer) {
            let player = {
                x: MooMoo.vars.playerx,
                y: MooMoo.vars.playery
            };

            let tmpDist = Math.sqrt(Math.pow(player.x - MooMoo.vars.camX, 2) + Math.pow(player.y - MooMoo.vars.camY, 2));
            let tmpDir = Math.atan2(player.y - MooMoo.vars.camY, player.x - MooMoo.vars.camX);
            let camSpeed = Math.min(tmpDist * 0.01 * delta, tmpDist);
            if (tmpDist > 0.05) {
                MooMoo.vars.camX += Math.cos(tmpDir) * camSpeed;
                MooMoo.vars.camY += Math.sin(tmpDir) * camSpeed;
            } else {
                MooMoo.vars.camX = player.x;
                MooMoo.vars.camY = player.y;
            }
        }
    }

    CanvasRenderingContext2D.prototype.clearRect = new Proxy(CanvasRenderingContext2D.prototype.clearRect, {
        apply: function (target, thisArg, argumentsList) {
            target.apply(thisArg, argumentsList);
            tick();
            MooMoo.emit("renderTick", MooMoo.vars.offsetX, MooMoo.vars.offsetY)
        }
    });
}

export default initRendering;
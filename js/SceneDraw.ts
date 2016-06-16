//class SceneDraw


class SceneDraw extends PIXI.Container {
    _draw: Draw;
    _drawDown: boolean=false;

    constructor() {
        super();
        this.setListeners();
    }

    setListeners():void {
        var drawStart = (data: Data) => {
            var loc: Loc = {
                x: data.data.global.x,
                y: data.data.global.y
            }
            this._draw = new Draw(loc);
            this.addChild(this._draw)
            this._drawDown = true;
        }
        this.on("mousedown", drawStart);
        this.on("touchstart", drawStart);

        var draw = (data: Data) => {
            if (this._drawDown) {
                this._draw.addPathPoint(data.data.global.x, data.data.global.y)
                this._draw.lineStyle(2, 0x000000, 1)
                this._draw.moveTo(this._draw.getPreviousPoint().x, this._draw.getPreviousPoint().y)
                this._draw.lineTo(this._draw.getLastPoint().x, this._draw.getLastPoint().y)
                //this._draw.drawPolygon(this._draw.getPath())
                this._draw.endFill();
            }


        }
        this.on("mousemove", draw);
        this.on("touchmove", draw);

        var drawStop = () => {
            this._drawDown = false;

        }
        this.on("mouseup", drawStop);
        this.on("mouseupoutside", drawStop);
        this.on("touchend", drawStop);
        this.on("touchendoutside", drawStop);
    }
    static toggleDrawingMode() {
        if (!drawBool) {
            drawBool = true;
            Rezo.sceneDraw.interactive = true;
            Rezo.upperScene.interactive = false;
            Rezo.sensorZoomScene.interactive = false;
            Rezo.stage.swapChildren(Rezo.sensorZoomScene, Rezo.sceneDraw)
        } else {
            drawBool = false;
            Rezo.sceneDraw.interactive = false;
            Rezo.upperScene.interactive = true;
            Rezo.sensorZoomScene.interactive = true;
            Rezo.stage.swapChildren(Rezo.sensorZoomScene, Rezo.sceneDraw)

        }
    }
}
//class SceneDraw
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneDraw = (function (_super) {
    __extends(SceneDraw, _super);
    function SceneDraw() {
        _super.call(this);
        this._drawDown = false;
        this.setListeners();
    }
    SceneDraw.prototype.setListeners = function () {
        var _this = this;
        var drawStart = function (data) {
            var loc = {
                x: data.data.global.x,
                y: data.data.global.y
            };
            _this._draw = new Draw(loc);
            _this.addChild(_this._draw);
            _this._drawDown = true;
        };
        this.on("mousedown", drawStart);
        this.on("touchstart", drawStart);
        var draw = function (data) {
            if (_this._drawDown) {
                _this._draw.addPathPoint(data.data.global.x, data.data.global.y);
                _this._draw.lineStyle(2, 0x000000, 1);
                _this._draw.moveTo(_this._draw.getPreviousPoint().x, _this._draw.getPreviousPoint().y);
                _this._draw.lineTo(_this._draw.getLastPoint().x, _this._draw.getLastPoint().y);
                //this._draw.drawPolygon(this._draw.getPath())
                _this._draw.endFill();
            }
        };
        this.on("mousemove", draw);
        this.on("touchmove", draw);
        var drawStop = function () {
            _this._drawDown = false;
        };
        this.on("mouseup", drawStop);
        this.on("mouseupoutside", drawStop);
        this.on("touchend", drawStop);
        this.on("touchendoutside", drawStop);
    };
    SceneDraw.toggleDrawingMode = function () {
        if (!drawBool) {
            drawBool = true;
            Rezo.sceneDraw.interactive = true;
            Rezo.upperScene.interactive = false;
            Rezo.sensorZoomScene.interactive = false;
            Rezo.stage.swapChildren(Rezo.sensorZoomScene, Rezo.sceneDraw);
        }
        else {
            drawBool = false;
            Rezo.sceneDraw.interactive = false;
            Rezo.upperScene.interactive = true;
            Rezo.sensorZoomScene.interactive = true;
            Rezo.stage.swapChildren(Rezo.sensorZoomScene, Rezo.sceneDraw);
        }
    };
    return SceneDraw;
}(PIXI.Container));
//# sourceMappingURL=SceneDraw.js.map
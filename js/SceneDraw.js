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
        this._drawPause = false;
        this.setListeners();
    }
    SceneDraw.prototype.setListeners = function () {
        var _this = this;
        var drawStart = function (data) {
            _this._drawDown = true;
            if (SceneDraw.isWriting) {
                _this.drawWriteStart(data);
            }
            else if (SceneDraw.isBulling) {
                _this.drawBulleStart(data);
            }
        };
        this.on("mousedown", drawStart);
        this.on("touchstart", drawStart);
        var draw = function (data) {
            if (_this._drawDown) {
                if (SceneDraw.isWriting) {
                    if (_this._drawPause) {
                        _this._draw.addPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
                        _this._drawPause = false;
                    }
                    _this.drawWrite(data);
                }
                else if (SceneDraw.isBulling) {
                    _this.drawBulle(data);
                }
            }
        };
        this.on("mousemove", draw);
        this.on("touchmove", draw);
        var drawStop = function () {
            _this._drawDown = false;
            if (SceneDraw.isWriting) {
                if (_this._draw) {
                    _this._drawPause = true;
                    _this._draw.drawLine();
                }
            }
            else {
                _this._drawBulle = _this._draw;
                if (_this._drawText) {
                    _this.createDrawBulle();
                }
                _this.cleanSceneDraw();
            }
        };
        this.on("mouseup", drawStop);
        this.on("mouseupoutside", drawStop);
        this.on("touchend", drawStop);
        this.on("touchendoutside", drawStop);
    };
    SceneDraw.prototype.createDrawBulle = function () {
        console.log("createBulle");
        var x = this._drawBulle.getLocalBounds().x;
        var y = this._drawBulle.getLocalBounds().y;
        this._drawBulle.setPathNumber(this.correctDrawingPathNumber(this._drawBulle.getPathNumber(), x, y));
        this._drawBulle.setPath(this.correctDrawingPath(this._drawBulle.getPath(), x, y));
        this._drawText.setPathNumber(this.correctDrawingPathNumber(this._drawText.getPathNumber(), x, y));
        this._drawText.setPath(this.correctDrawingPath(this._drawText.getPath(), x, y));
        Rezo.sceneBulle.addChild(new Bulle(x, y, "", bulleColor, defaultScale, ShapeEnum.poly, this._drawBulle, this._drawText));
        SceneDraw.toggleDrawingWrite();
    };
    SceneDraw.prototype.correctDrawingPathNumber = function (path, x, y) {
        var newPath = [];
        for (var i = 0; i < path.length; i++) {
            if (i % 2 == 0) {
                newPath.push(path[i] - x);
            }
            else {
                newPath.push(path[i] - y);
            }
        }
        return newPath;
    };
    SceneDraw.prototype.correctDrawingPath = function (path, x, y) {
        var newPath = [];
        for (var i = 0; i < path.length; i++) {
            newPath.push({ x: path[i].x - x, y: path[i].y - y });
        }
        return newPath;
    };
    SceneDraw.prototype.drawWriteStart = function (data) {
        var loc = {
            x: data.data.global.x,
            y: data.data.global.y
        };
        if (!this._draw)
            this._draw = new Draw(loc, 0);
        this.addChild(this._draw);
        this._drawDown = true;
    };
    SceneDraw.prototype.drawBulleStart = function (data) {
        var loc = {
            x: data.data.global.x,
            y: data.data.global.y
        };
        if (!this._draw)
            this._draw = new Draw(loc, data.data.originalEvent.timeStamp);
        this.addChild(this._draw);
        this._drawDown = true;
    };
    SceneDraw.prototype.drawWrite = function (data) {
        this._draw.addPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
        this._draw.lineStyle(3, 0x000000, 1);
        this._draw.moveTo(this._draw.getPreviousPoint().x, this._draw.getPreviousPoint().y);
        this._draw.lineTo(this._draw.getLastPoint().x, this._draw.getLastPoint().y);
        this._draw.endFill();
    };
    SceneDraw.prototype.drawBulle = function (data) {
        this._draw.addPolyPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
        this._draw.drawPoly();
    };
    SceneDraw.toggleDrawingMode = function () {
        if (!drawBool) {
            drawBool = true;
            $("#drawBulle").addClass("buttonOpened");
            $(".drawBTN").addClass("drawBTNFloat");
            $("#drawing").addClass("drawingExpend");
            $("#circleBulle").removeClass("hiddenButton");
            $("#writeBulle").removeClass("hiddenButton");
            $("#scriptToTypeBulle").removeClass("hiddenButton");
            SceneDraw.toggleDrawingWrite();
            setBackground(Ressource.pathImgPen);
            Rezo.sceneDraw.interactive = true;
            Rezo.upperScene.interactive = false;
            Rezo.sensorZoomScene.interactive = false;
            Rezo.stage.swapChildren(Rezo.sensorZoomScene, Rezo.sceneDraw);
        }
        else {
            drawBool = false;
            $("#drawBulle").removeClass("buttonOpened");
            $(".drawBTN").removeClass("drawBTNFloat");
            $("#drawing").removeClass("drawingExpend");
            $("#circleBulle").addClass("hiddenButton");
            $("#writeBulle").addClass("hiddenButton");
            $("#scriptToTypeBulle").addClass("hiddenButton");
            setBackground();
            Rezo.sceneDraw.interactive = false;
            Rezo.upperScene.interactive = true;
            Rezo.sensorZoomScene.interactive = true;
            Rezo.stage.swapChildren(Rezo.sensorZoomScene, Rezo.sceneDraw);
        }
    };
    SceneDraw.toggleDrawingWrite = function () {
        if (!SceneDraw.isWriting) {
            SceneDraw.isWriting = true;
            $("#writeBulle").addClass("whiteBackground");
            if (SceneDraw.isBulling) {
                SceneDraw.toggleDrawingBulle();
            }
        }
        else {
            $("#writeBulle").removeClass("whiteBackground");
            SceneDraw.isWriting = false;
        }
    };
    SceneDraw.toggleDrawingBulle = function () {
        if (!SceneDraw.isBulling) {
            SceneDraw.isBulling = true;
            $("#circleBulle").addClass("whiteBackground");
            Rezo.sceneDraw._drawText = Rezo.sceneDraw._draw;
            if (Rezo.sceneDraw._drawText) {
                Rezo.sceneDraw._draw.drawLine();
            }
            Rezo.sceneDraw._draw = null;
            if (SceneDraw.isWriting) {
                SceneDraw.toggleDrawingWrite();
            }
        }
        else {
            $("#circleBulle").removeClass("whiteBackground");
            SceneDraw.isBulling = false;
        }
    };
    SceneDraw.prototype.cleanSceneDraw = function () {
        this.removeChild(this._drawText);
        this._drawText = null;
        this.removeChild(this._drawBulle);
        this._drawBulle = null;
        this._draw = null;
        this._drawDown = false;
    };
    SceneDraw.scriptToTypeBulle = function () {
        if (Rezo.selectedBulle.text.textDraw) {
            var textDraw = Rezo.selectedBulle.text.textDraw;
            textDraw.setRecoPath(textDraw.getPath(), textDraw.getTimeStamps());
            var textReco = new TextRecognition();
            var data = textReco.createDataRequest(textReco.createRequestInputParams(textReco.createInput(textDraw.getRecoPath())));
            textReco.xhr("POST", Ressource.urlReco, data, Rezo.selectedBulle.text);
        }
    };
    SceneDraw.isWriting = false;
    SceneDraw.isBulling = false;
    return SceneDraw;
}(PIXI.Container));
//# sourceMappingURL=SceneDraw.js.map
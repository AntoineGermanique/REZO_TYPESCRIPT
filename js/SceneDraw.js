"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//class SceneDraw
const _1 = require("./");
class SceneDraw extends PIXI.Container {
    constructor() {
        super();
        this._drawDown = false;
        this._drawPause = false;
        this.setListeners();
    }
    setListeners() {
        var drawStart = (data) => {
            this._drawDown = true;
            if (SceneDraw.isWriting) {
                this.drawWriteStart(data);
            }
            else if (SceneDraw.isBulling) {
                this.drawBulleStart(data);
            }
        };
        this.on("mousedown", drawStart);
        this.on("touchstart", drawStart);
        var draw = (data) => {
            if (this._drawDown) {
                if (SceneDraw.isWriting) {
                    if (this._drawPause) {
                        this._draw.addPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
                        this._drawPause = false;
                    }
                    this.drawWrite(data);
                }
                else if (SceneDraw.isBulling) {
                    this.drawBulle(data);
                }
            }
        };
        this.on("mousemove", draw);
        this.on("touchmove", draw);
        var drawStop = () => {
            this._drawDown = false;
            if (SceneDraw.isWriting) {
                if (this._draw) {
                    this._drawPause = true;
                    this._draw.drawLine();
                }
                //this._drawText = this._draw;
                //Rezo.sceneDraw._draw = null;
            }
            else {
                this._drawBulle = this._draw;
                if (this._drawText && this._draw) {
                    this.createDrawBulle();
                }
                this.cleanSceneDraw();
            }
        };
        this.on("mouseup", drawStop);
        this.on("mouseupoutside", drawStop);
        this.on("touchend", drawStop);
        this.on("touchendoutside", drawStop);
    }
    createDrawBulle() {
        console.log("createBulle");
        var x = this._drawBulle.getLocalBounds().x;
        var y = this._drawBulle.getLocalBounds().y;
        this._drawBulle.setPathNumber(this.correctDrawingPathNumber(this._drawBulle.getPathNumber(), x, y));
        this._drawBulle.setPath(this.correctDrawingPath(this._drawBulle.getPath(), x, y));
        x = (x - _1.Rezo.scene.x); // Rezo.scaleScene.scale.x;
        y = (y - _1.Rezo.scene.y); // Rezo.scaleScene.scale.x ;
        this._drawText.setPathNumber(this.correctDrawingPathNumber(this._drawText.getPathNumber(), x, y));
        this._drawText.setPath(this.correctDrawingPath(this._drawText.getPath(), x, y));
        this._drawText.drawLine();
        var bulleScale = _1.Bulle.defaultScale / _1.Rezo.scaleScene.scale.x;
        _1.Rezo.sceneBulle.addChild(new _1.Bulle(x, y, "", _1.Bulle.bulleColor, bulleScale, _1.ShapeEnum.poly, this._drawBulle, this._drawText));
        SceneDraw.toggleDrawingWrite();
    }
    correctDrawingPathNumber(path, x, y) {
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
    }
    correctDrawingPath(path, x, y) {
        var newPath = [];
        for (var i = 0; i < path.length; i++) {
            newPath.push({ x: path[i].x - x, y: path[i].y - y });
        }
        return newPath;
    }
    drawWriteStart(data) {
        var loc = {
            x: data.data.global.x,
            y: data.data.global.y
        };
        if (!this._draw)
            this._draw = new _1.Draw(loc, 0);
        this.addChild(this._draw);
        this._drawDown = true;
    }
    drawBulleStart(data) {
        var loc = {
            x: data.data.global.x,
            y: data.data.global.y
        };
        if (!this._draw)
            this._draw = new _1.Draw(loc, data.data.originalEvent.timeStamp);
        this.addChild(this._draw);
        this._drawDown = true;
    }
    drawWrite(data) {
        this._draw.addPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
        this._draw.lineStyle(3, 0x000000, 1);
        this._draw.moveTo(this._draw.getPreviousPoint().x, this._draw.getPreviousPoint().y);
        this._draw.lineTo(this._draw.getLastPoint().x, this._draw.getLastPoint().y);
        this._draw.endFill();
    }
    drawBulle(data) {
        this._draw.addPolyPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
        this._draw.drawPoly();
    }
    static toggleDrawingMode() {
        if (!_1.Menu.drawBool) {
            _1.Menu.drawBool = true;
            $("#drawBulle").addClass("buttonOpened");
            $(".drawBTN").addClass("drawBTNFloat");
            $("#drawing").addClass("drawingExpend");
            $("#circleBulle").removeClass("hiddenButton");
            $("#writeBulle").removeClass("hiddenButton");
            $("#scriptToTypeBulle").removeClass("hiddenButton");
            $("#supprDrawBulle").removeClass("hiddenButton");
            $("#undoDrawBulle").removeClass("hiddenButton");
            if (!SceneDraw.isWriting) {
                SceneDraw.toggleDrawingWrite();
            }
            ;
            _1.Menu.setBackground(_1.Ressource.pathImgPen);
            _1.Rezo.sceneDraw.interactive = true;
            _1.Rezo.upperScene.interactive = false;
            _1.Rezo.sensorZoomScene.interactive = false;
            _1.Rezo.stage.swapChildren(_1.Rezo.sensorZoomScene, _1.Rezo.sceneDraw);
        }
        else {
            _1.Menu.drawBool = false;
            $("#drawBulle").removeClass("buttonOpened");
            $(".drawBTN").removeClass("drawBTNFloat");
            $("#drawing").removeClass("drawingExpend");
            $("#circleBulle").addClass("hiddenButton");
            $("#writeBulle").addClass("hiddenButton");
            $("#scriptToTypeBulle").addClass("hiddenButton");
            $("#supprDrawBulle").addClass("hiddenButton");
            $("#undoDrawBulle").addClass("hiddenButton");
            if (SceneDraw.isWriting) {
                SceneDraw.toggleDrawingWrite();
            }
            ;
            if (SceneDraw.isBulling) {
                SceneDraw.toggleDrawingBulle();
            }
            ;
            _1.Menu.setBackground();
            _1.Rezo.sceneDraw.interactive = false;
            _1.Rezo.upperScene.interactive = true;
            _1.Rezo.sensorZoomScene.interactive = true;
            _1.Rezo.stage.swapChildren(_1.Rezo.sensorZoomScene, _1.Rezo.sceneDraw);
        }
    }
    static toggleDrawingWrite() {
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
    }
    static toggleDrawingBulle() {
        if (!SceneDraw.isBulling) {
            SceneDraw.isBulling = true;
            $("#circleBulle").addClass("whiteBackground");
            _1.Rezo.sceneDraw._drawText = _1.Rezo.sceneDraw._draw;
            if (_1.Rezo.sceneDraw._drawText) {
                _1.Rezo.sceneDraw._draw.drawLine();
                //var texture = Rezo.sceneDraw._drawText.generateTexture(Rezo.renderer); var shapeSprite = new PIXI.Sprite(texture);
                //Rezo.scene.addChild(shapeSprite)
                //Rezo.sceneDraw._drawText._bmp = shapeSprite;
                //    var bezier = new Bezier();
                //    bezier.drawQuadraticCurve(Rezo.sceneDraw._drawText.getPath(), Rezo.sceneDraw._drawText)
            }
            _1.Rezo.sceneDraw._draw = null;
            if (SceneDraw.isWriting) {
                SceneDraw.toggleDrawingWrite();
            }
        }
        else {
            $("#circleBulle").removeClass("whiteBackground");
            SceneDraw.isBulling = false;
            //Rezo.sceneDraw._draw = null;
        }
    }
    cleanSceneDraw() {
        this.removeChild(this._drawText);
        this._drawText = null;
        this.removeChild(this._drawBulle);
        this._drawBulle = null;
        this._draw = null;
        this._drawDown = false;
    }
    static scriptToTypeBulle() {
        if (_1.Rezo.selectedBulle.text.textDraw) {
            var textDraw = _1.Rezo.selectedBulle.text.textDraw;
            textDraw.setRecoPath(textDraw.getPath(), textDraw.getTimeStamps());
            var textReco = new _1.TextRecognition();
            var data = textReco.createDataRequest(textReco.createRequestInputParams(textReco.createInput(textDraw.getRecoPath())));
            textReco.xhr("POST", _1.Ressource.urlReco, data, _1.Rezo.selectedBulle.text);
        }
    }
    static supprDraw() {
        if (_1.Rezo.sceneDraw._draw) {
            _1.Rezo.sceneDraw.removeChild(_1.Rezo.sceneDraw._draw);
            _1.Rezo.sceneDraw._draw = null;
        }
        if (_1.Rezo.sceneDraw._drawText) {
            _1.Rezo.sceneDraw.removeChild(_1.Rezo.sceneDraw._draw);
            _1.Rezo.sceneDraw._draw = null;
        }
    }
    static undoDraw() {
        if (SceneDraw.isWriting && _1.Rezo.sceneDraw._draw) {
            var bezier = new _1.Bezier();
            var pathPath = bezier.slicePath(_1.Rezo.sceneDraw._draw.getPath());
            pathPath.pop();
            var newPath = [];
            for (var i = 0; i < pathPath.length; i++) {
                newPath = newPath.concat(pathPath[i]);
            }
            _1.Rezo.sceneDraw._draw.setPath(newPath);
            _1.Rezo.sceneDraw._draw.drawLine();
        }
    }
}
SceneDraw.isWriting = false;
SceneDraw.isBulling = false;
exports.SceneDraw = SceneDraw;

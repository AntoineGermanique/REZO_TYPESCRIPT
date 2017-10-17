//class SceneDraw
import { Rezo } from './rezo'
import * as $ from 'jquery' 
import {TextRecognition,Draw, dragScene, Bulle, Loc, ShapeEnum, Menu, Bezier, Ressource} from './index'

export class SceneDraw extends PIXI.Container {
    _draw: Draw;
    _drawText: Draw;
    _drawBulle: Draw;
    _drawDown: boolean = false;
    _drawPause: boolean = false;
    static isWriting: boolean = false;
    static isBulling: boolean = false;

    constructor() {
        super();
        this.setListeners();
    }

    setListeners():void {
        var drawStart = (data:dragScene.Data) => {
            this._drawDown = true;
            if (SceneDraw.isWriting) {
                this.drawWriteStart(data);
            } else if (SceneDraw.isBulling) {
                this.drawBulleStart(data);
            }

           
        }
        this.on("mousedown", drawStart);
        this.on("touchstart", drawStart);

        var draw = (data: dragScene.Data) => {
            if (this._drawDown) {
                if (SceneDraw.isWriting) {
                    if (this._drawPause) {
                        this._draw.addPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
                        this._drawPause = false;
                    }
                    this.drawWrite(data);
                } else if (SceneDraw.isBulling) {
                    this.drawBulle(data);
                }
            }


        }
        this.on("mousemove", draw);
        this.on("touchmove", draw);

        var drawStop = () => {
            this._drawDown = false;
            if (SceneDraw.isWriting) {
                if (this._draw){
                    this._drawPause = true
                    this._draw.drawLine();
                }
                //this._drawText = this._draw;
                //Rezo.sceneDraw._draw = null;
            } else {
                this._drawBulle = this._draw;
                if (this._drawText && this._draw) {
                    this.createDrawBulle();
                }
                this.cleanSceneDraw();

            }

        }
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
        x = (x - Rezo.scene.x) // Rezo.scaleScene.scale.x;
        y = (y - Rezo.scene.y) // Rezo.scaleScene.scale.x ;
        this._drawText.setPathNumber(this.correctDrawingPathNumber(this._drawText.getPathNumber(), x, y));
        this._drawText.setPath(this.correctDrawingPath(this._drawText.getPath(), x, y));
        this._drawText.drawLine();
        var bulleScale = Bulle.defaultScale / Rezo.scaleScene.scale.x;

        Rezo.sceneBulle.addChild(new Bulle(x, y, "", Bulle.bulleColor, bulleScale, ShapeEnum.poly, this._drawBulle, this._drawText))
        SceneDraw.toggleDrawingWrite();
    }

    private correctDrawingPathNumber(path: number[], x: number, y: number): number[] {
        var newPath: number[] = [];
        for (var i = 0; i < path.length; i++) {
            if (i % 2 == 0) {
                newPath.push(path[i] - x);
            } else {
                newPath.push(path[i] - y);
            }
        }
        return newPath;
    }
    private correctDrawingPath(path: Loc[], x: number, y: number): Loc[] {
        var newPath: Loc[] = [];
        for (var i = 0; i < path.length; i++) {
            newPath.push({ x: path[i].x - x, y: path[i].y - y });
        }
        return newPath;
    }



    drawWriteStart(data:dragScene.Data) {
        var loc: Loc = {
            x: data.data.global.x,
            y: data.data.global.y
        }
        if (!this._draw)
            this._draw = new Draw(loc,0);
        this.addChild(this._draw)
        this._drawDown = true;
    }
    drawBulleStart(data: dragScene.Data) {
        var loc: Loc = {
            x: data.data.global.x,
            y: data.data.global.y
        }
        if (!this._draw)
            this._draw = new Draw(loc, data.data.originalEvent.timeStamp);
        this.addChild(this._draw);
        this._drawDown = true;
    }
    drawWrite(data: dragScene.Data) {

        this._draw.addPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
        this._draw.lineStyle(3, 0x000000, 1);
        this._draw.moveTo(this._draw.getPreviousPoint().x, this._draw.getPreviousPoint().y);
        this._draw.lineTo(this._draw.getLastPoint().x, this._draw.getLastPoint().y);
        this._draw.endFill();
    }
    drawBulle(data: dragScene.Data) {
        this._draw.addPolyPathPoint(data.data.global.x, data.data.global.y, data.data.originalEvent.timeStamp);
        this._draw.drawPoly();
    }
    static toggleDrawingMode() {
        if (!Menu.drawBool) {
            Menu.drawBool = true;
            $("#drawBulle").addClass("buttonOpened");
            $(".drawBTN").addClass("drawBTNFloat");
            $("#drawing").addClass("drawingExpend");
            $("#circleBulle").removeClass("hiddenButton");
            $("#writeBulle").removeClass("hiddenButton");
            $("#scriptToTypeBulle").removeClass("hiddenButton");
            $("#supprDrawBulle").removeClass("hiddenButton");
            $("#undoDrawBulle").removeClass("hiddenButton");
            if (!SceneDraw.isWriting) { SceneDraw.toggleDrawingWrite() };
            Menu.setBackground(Ressource.pathImgPen);
            Rezo.sceneDraw.interactive = true;
            Rezo.upperScene.interactive = false;
            Rezo.sensorZoomScene.interactive = false;
            Rezo.stage.swapChildren(Rezo.sensorZoomScene, Rezo.sceneDraw);
        } else {
            Menu.drawBool = false;
            $("#drawBulle").removeClass("buttonOpened");
            $(".drawBTN").removeClass("drawBTNFloat");
            $("#drawing").removeClass("drawingExpend");
            $("#circleBulle").addClass("hiddenButton");
            $("#writeBulle").addClass("hiddenButton");
            $("#scriptToTypeBulle").addClass("hiddenButton");
            $("#supprDrawBulle").addClass("hiddenButton");
            $("#undoDrawBulle").addClass("hiddenButton");
            if (SceneDraw.isWriting) { SceneDraw.toggleDrawingWrite() };
            if (SceneDraw.isBulling) { SceneDraw.toggleDrawingBulle() };

            Menu.setBackground();
            Rezo.sceneDraw.interactive = false;
            Rezo.upperScene.interactive = true;
            Rezo.sensorZoomScene.interactive = true;
            Rezo.stage.swapChildren(Rezo.sensorZoomScene, Rezo.sceneDraw);

        }
    }
    static toggleDrawingWrite() {
        if (!SceneDraw.isWriting) {
            SceneDraw.isWriting = true;
            $("#writeBulle").addClass("whiteBackground");
            if (SceneDraw.isBulling) {
                SceneDraw.toggleDrawingBulle();
            }
        } else {
            $("#writeBulle").removeClass("whiteBackground");
            SceneDraw.isWriting = false;
        }
    }
    static toggleDrawingBulle() {
        if (!SceneDraw.isBulling) {
            SceneDraw.isBulling = true;
            $("#circleBulle").addClass("whiteBackground");

            Rezo.sceneDraw._drawText = Rezo.sceneDraw._draw;
            if (Rezo.sceneDraw._drawText) {
                Rezo.sceneDraw._draw.drawLine();
                //var texture = Rezo.sceneDraw._drawText.generateTexture(Rezo.renderer); var shapeSprite = new PIXI.Sprite(texture);
                //Rezo.scene.addChild(shapeSprite)
                //Rezo.sceneDraw._drawText._bmp = shapeSprite;
            //    var bezier = new Bezier();
            //    bezier.drawQuadraticCurve(Rezo.sceneDraw._drawText.getPath(), Rezo.sceneDraw._drawText)
            }
            Rezo.sceneDraw._draw = null;
            if (SceneDraw.isWriting) {
                SceneDraw.toggleDrawingWrite();
            }
        } else {
            $("#circleBulle").removeClass("whiteBackground");
            SceneDraw.isBulling = false;
            //Rezo.sceneDraw._draw = null;
        }
    }
    private cleanSceneDraw() {
        this.removeChild(this._drawText)
        this._drawText = null;
        this.removeChild(this._drawBulle);
        this._drawBulle = null;
        this._draw = null;
        this._drawDown = false;
    }
    static scriptToTypeBulle() {
        if (Rezo.selectedBulle.text.textDraw) {
            var textDraw = Rezo.selectedBulle.text.textDraw;
            textDraw.setRecoPath(textDraw.getPath(), textDraw.getTimeStamps());
            var textReco = new TextRecognition();
            var data = textReco.createDataRequest(textReco.createRequestInputParams(textReco.createInput(textDraw.getRecoPath())));
            textReco.xhr("POST", Ressource.urlReco, data, Rezo.selectedBulle.text);

        }
    }
    static supprDraw() {
        if (Rezo.sceneDraw._draw) {
            Rezo.sceneDraw.removeChild(Rezo.sceneDraw._draw);
            Rezo.sceneDraw._draw = null;
        }
        if (Rezo.sceneDraw._drawText) {
            Rezo.sceneDraw.removeChild(Rezo.sceneDraw._draw);
            Rezo.sceneDraw._draw = null;
        }
    }
    static undoDraw() {
        if (SceneDraw.isWriting && Rezo.sceneDraw._draw) {
            var bezier = new Bezier();
            var pathPath = bezier.slicePath(Rezo.sceneDraw._draw.getPath());
            pathPath.pop();
            var newPath:Loc[] = [];
            for (var i = 0; i < pathPath.length; i++) {
                newPath=newPath.concat(pathPath[i]);
            }
            Rezo.sceneDraw._draw.setPath(newPath);
            Rezo.sceneDraw._draw.drawLine();
        }
    }
}
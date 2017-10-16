/////////////bulle.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
var dataFake;
var startDragBulle;
var stopDragBulle;
class Bulle extends PIXI.Graphics {
    constructor(X, Y, bulleText, color, scale, shapeEnum, bulleDraw, textDraw) {
        super();
        //init and set Bulle params
        if (shapeEnum) {
            if (shapeEnum === ShapeEnum.circle) {
                this.createCircleBulle(X, Y, bulleText, color, scale);
            }
            else if (shapeEnum == ShapeEnum.poly) {
                this.createPolyBulle(X, Y, color, scale, bulleDraw, textDraw);
            }
        }
        else {
            this.createCircleBulle(X, Y, bulleText, color, scale);
        }
    }
    createPolyBulle(posX, posY, color, scale, bulleDraw, textDraw) {
        color = color || Bulle.bulleColor;
        this.lineStyle(16, color, 0.5);
        this.drawPolygon(bulleDraw.getPathNumber());
        var pointPath = this.numberPathToPointPath(bulleDraw.getPathNumber());
        this.polyPathNumber = bulleDraw.getPathNumber();
        this.hitArea = new PIXI.Polygon(pointPath);
        this.interactive = true;
        this.x = posX;
        this.y = posY;
        this.pivot.x = this.getBounds().width / 2;
        this.pivot.y = this.getBounds().height / 2;
        if (scale == undefined) {
            scale = 1;
        }
        this.scale.x = scale;
        this.scale.y = scale;
        var shape;
        shape = new Shape(ShapeEnum.poly, Bulle.bulleDefaultSize, color, bulleDraw.getPathNumber());
        shape.endFill();
        var text = new _1.TextRezo("", _1.TextRezoType.codex);
        text.setTextDraw(textDraw);
        this.shape = shape;
        this.text = text;
        if (this.text.textDraw.getBounds().x != 0 && this.text.textDraw.getBounds().y != 0)
            this.text.textDraw.setTransform(-_1.Rezo.scene.x, -_1.Rezo.scene.y);
        this.addChild(this.shape);
        if (!this.text.textDraw._bmp) {
            this.addChild(this.text.textDraw);
        }
        else {
            this.addChild(this.text.textDraw._bmp);
        }
        this.dragBulle();
        _1.array(this);
        var selectedBulle = _1.Rezo.selectedBulle;
        if (!selectedBulle) {
            _1.Rezo.selectedBulle = this;
        }
        else if (_1.Menu.multBool) {
            Bulle.fakeClickFun(this);
        }
        else {
            Bulle.lastBulleSelected = selectedBulle;
            _1.Rezo.selectedBulle = this;
            Bulle.lastBulleSelected.clear();
        }
    }
    numberPathToPointPath(path) {
        var pathPoint = [];
        for (var i = 0; i < path.length; i++) {
            if (i % 2 == 0) {
                pathPoint.push(new PIXI.Point(path[i], path[i + 1]));
            }
        }
        return pathPoint;
    }
    createCircleBulle(posX, posY, bulleText, color, scale) {
        color = color || Bulle.bulleColor;
        this.lineStyle(16, color, 0.5);
        this.drawCircle(0, 0, Bulle.bulleDefaultSize);
        this.hitArea = new PIXI.Circle(0, 0, Bulle.bulleDefaultSize);
        this.interactive = true;
        this.x = posX;
        this.y = posY;
        if (scale == undefined) {
            scale = 1;
        }
        this.scale.x = scale;
        this.scale.y = scale;
        //createShape
        var shape;
        shape = new Shape(ShapeEnum.circle, Bulle.bulleDefaultSize, color);
        //check special case for white bulle
        if (color == 0xffffff) {
            console.log(color);
            shape.lineStyle(1, 0x000000, 1);
            this.lineStyle(16, 0x000000, 0.5);
            this.drawCircle(0, 0, Bulle.bulleDefaultSize);
        }
        shape.endFill();
        var text = new _1.TextRezo(_1.wordwrap(bulleText), _1.TextRezoType.type);
        this.text = text;
        this.shape = shape;
        this.addChild(shape);
        this.addChild(text);
        this.dragBulle();
        _1.array(this);
        text.autoSizeText(Bulle.bulleDefaultSize);
        var selectedBulle = _1.Rezo.selectedBulle;
        if (!selectedBulle) {
            _1.Rezo.selectedBulle = this;
        }
        else if (_1.Menu.multBool) {
            Bulle.fakeClickFun(this);
        }
        else {
            Bulle.lastBulleSelected = selectedBulle;
            _1.Rezo.selectedBulle = this;
            Bulle.lastBulleSelected.clear();
        }
        text.textDesign(text);
    }
    dragBulle() {
        startDragBulle = (data) => {
            var bulle;
            if (_1.Menu.multBool) {
                if (!data) {
                    data = { data: dataFake };
                }
                bulle = data.data.target;
                if (bulle == null)
                    bulle = data.target;
                this.selectBulleFun(bulle, data);
                _1.Multi.multiSelect(bulle);
            }
            else {
                if (data == undefined) {
                    data = { data: dataFake };
                }
                bulle = data.data.target;
                if (bulle == null)
                    bulle = data.target;
                this.selectBulleFun(bulle, data);
                bulle.dragging = true;
                this.lastSelectedBulleFun();
                _1.Motion.linkSelection(bulle);
                _1.Link.linkFun();
            }
        };
        this.on("mousedown", startDragBulle);
        this.on("touchstart", startDragBulle);
        // set the events for when the mouse is released or a touch is released
        stopDragBulle = (data) => {
            if (_1.Menu.multBool) {
            }
            else {
                if (!data) {
                    data = { data: dataFake };
                }
                var bulle = data.data.target;
                if (bulle == null)
                    bulle = data.target;
                this.releaseBulle(bulle);
            }
        };
        this.on("mouseup", stopDragBulle);
        this.on("mouseupoutside", stopDragBulle);
        this.on("touchend", stopDragBulle);
        this.on("touchendoutside", stopDragBulle);
        // set the callbacks for when the mouse or a touch moves
        var drag = () => {
            if (_1.Menu.multBool) {
            }
            else if (this.dragging) {
                this.bulleDragging(this);
            }
        };
        this.on("mousemove", drag);
        this.on("touchmove", drag);
    }
    selectBulleFun(clickedBulle, data) {
        data.data.originalEvent.preventDefault();
        if (data.stopPropagation) {
            data.stopPropagation();
        }
        var selectedBulle = _1.Rezo.selectedBulle;
        clickedBulle.data = data;
        //upperScene.dragging = false;
        if (selectedBulle != clickedBulle) {
            Bulle.lastBulleSelected = selectedBulle;
        }
        _1.Rezo.selectedBulle = clickedBulle;
        selectedBulle = _1.Rezo.selectedBulle;
        Bulle.bulleDefaultSize = _1.bulleSize(selectedBulle);
        var color = selectedBulle.shape.rezoColor;
        if (selectedBulle.lineAlpha == 0) {
            if (selectedBulle.shape.kind == ShapeEnum.circle) {
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawCircle(0, 0, Bulle.bulleDefaultSize);
                if (color == 0xffffff) {
                    selectedBulle.lineStyle(16, 0x000000, 0.5);
                    selectedBulle.drawCircle(0, 0, Bulle.bulleDefaultSize);
                }
            }
            else if (selectedBulle.shape.kind == ShapeEnum.poly) {
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawPolygon(selectedBulle.polyPathNumber);
                selectedBulle.endFill();
            }
        }
        else {
            if (selectedBulle.shape.kind == ShapeEnum.circle) {
                selectedBulle.clear();
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawCircle(0, 0, Bulle.bulleDefaultSize);
                if (color == 0xffffff) {
                    selectedBulle.lineStyle(16, 0x000000, 0.5);
                    selectedBulle.drawCircle(0, 0, Bulle.bulleDefaultSize);
                }
            }
            else if (selectedBulle.shape.kind == ShapeEnum.poly) {
                selectedBulle.clear();
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawPolygon(selectedBulle.polyPathNumber);
                selectedBulle.endFill();
            }
        }
    }
    lastSelectedBulleFun() {
        if (Bulle.lastBulleSelected) {
            Bulle.lastBulleSelected.clear();
            Bulle.lastBulleSelected.lineAlpha = 0;
        }
    }
    releaseBulle(releasedBulle) {
        //var positionTemp = releasedBulle.data.getLocalPosition(releasedBulle.parent)
        releasedBulle.dragging = false;
        releasedBulle.data = null;
        _1.Motion.clearMotion();
    }
    bulleDragging(draggedBulle) {
        if (draggedBulle.dragging && _1.Link.linkBool == false) {
            var newPosition = draggedBulle.data.data.getLocalPosition(draggedBulle.parent);
            draggedBulle.position.x = newPosition.x;
            draggedBulle.position.y = newPosition.y;
            _1.Motion.motion(newPosition.x, newPosition.y);
        }
    }
    static fakeClickFun(fakeBulle) {
        dataFake = new PIXI.interaction.InteractionData();
        dataFake.target = fakeBulle;
        var evt = new MouseEvent("mousedown", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: 20,
        });
        dataFake.originalEvent = evt;
        startDragBulle();
        stopDragBulle();
    }
}
Bulle.bulleX = _1.Rezo.windowW / 2;
Bulle.bulleY = _1.Rezo.windowH / 2;
Bulle.defaultScale = 1;
Bulle.bulleDefaultSize = 50;
Bulle.bulleColor = parseInt("#FF00CC".replace(/^#/, ''), 16);
exports.Bulle = Bulle;
var ShapeEnum;
(function (ShapeEnum) {
    ShapeEnum[ShapeEnum["circle"] = 0] = "circle";
    ShapeEnum[ShapeEnum["square"] = 1] = "square";
    ShapeEnum[ShapeEnum["roundedSquare"] = 2] = "roundedSquare";
    ShapeEnum[ShapeEnum["poly"] = 3] = "poly";
    ShapeEnum[ShapeEnum["draw"] = 4] = "draw";
})(ShapeEnum = exports.ShapeEnum || (exports.ShapeEnum = {}));
class Shape extends PIXI.Graphics {
    constructor(shape, size, color, path) {
        super();
        this.polyPathNumber = [];
        this.kind = shape;
        this.rezoColor = color;
        this.drawRezoShape(shape, size, path);
    }
    drawRezoShape(shape, size, path) {
        switch (shape) {
            case ShapeEnum.circle:
                this.beginFill(this.rezoColor, 1);
                this.drawCircle(0, 0, size);
                break;
            case ShapeEnum.poly:
                this.beginFill(this.rezoColor, 1);
                this.drawPolygon(path);
                this.polyPathNumber = path;
                break;
            default:
                this.beginFill(this.rezoColor, 1);
                this.drawCircle(0, 0, size);
                break;
        }
    }
}
exports.Shape = Shape;
//# sourceMappingURL=bulle.js.map
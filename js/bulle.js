/////////////bulle.js
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bulleX = Rezo.windowW / 2;
var bulleY = Rezo.windowH / 2;
var bulleDefaultSize = 50;
var bulleColor = parseInt("#FF00CC".replace(/^#/, ''), 16);
var defaultScale = 1;
var lastBulleSelected;
var dataFake;
var startDragBulle;
var stopDragBulle;
var Bulle = (function (_super) {
    __extends(Bulle, _super);
    function Bulle(X, Y, bulleText, color, scale, shapeEnum, bulleDraw, textDraw) {
        _super.call(this);
        //init and set Bulle params
        if (shapeEnum) {
            if (shapeEnum == ShapeEnum.circle) {
                this.createCircleBulle(X, Y, bulleText, color, scale, shapeEnum);
            }
            else if (shapeEnum == ShapeEnum.poly) {
                this.createPolyBulle(X, Y, bulleText, color, scale, shapeEnum, bulleDraw, textDraw);
            }
        }
        else {
            this.createCircleBulle(X, Y, bulleText, color, scale, shapeEnum);
        }
    }
    Bulle.prototype.createPolyBulle = function (posX, posY, bulleText, color, scale, shapeEnum, bulleDraw, textDraw) {
        color = color || bulleColor;
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
        shape = new Shape(ShapeEnum.poly, bulleDefaultSize, color, bulleDraw.getPathNumber());
        shape.endFill();
        var text = new TextRezo("", TextRezoType.codex);
        text.setTextDraw(textDraw);
        this.shape = shape;
        this.text = text;
        if (this.text.textDraw.getBounds().x != 0 && this.text.textDraw.getBounds().y != 0)
            this.text.textDraw.setTransform(-posX, -posY);
        this.addChild(this.shape);
        if (!this.text.textDraw._bmp) {
            this.addChild(this.text.textDraw);
        }
        else {
            this.addChild(this.text.textDraw._bmp);
        }
        this.dragBulle();
        array(this);
        var selectedBulle = Rezo.selectedBulle;
        if (!selectedBulle) {
            Rezo.selectedBulle = this;
        }
        else if (multBool) {
            Bulle.fakeClickFun(this);
        }
        else {
            lastBulleSelected = selectedBulle;
            Rezo.selectedBulle = this;
            lastBulleSelected.clear();
        }
    };
    Bulle.prototype.numberPathToPointPath = function (path) {
        var pathPoint = [];
        for (var i = 0; i < path.length; i++) {
            if (i % 2 == 0) {
                pathPoint.push(new PIXI.Point(path[i], path[i + 1]));
            }
        }
        return pathPoint;
    };
    Bulle.prototype.createCircleBulle = function (posX, posY, bulleText, color, scale, shapeEnum) {
        color = color || bulleColor;
        this.lineStyle(16, color, 0.5);
        this.drawCircle(0, 0, bulleDefaultSize);
        this.hitArea = new PIXI.Circle(0, 0, bulleDefaultSize);
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
        shape = new Shape(ShapeEnum.circle, bulleDefaultSize, color);
        //check special case for white bulle
        if (color == 0xffffff) {
            console.log(color);
            shape.lineStyle(1, 0x000000, 1);
            this.lineStyle(16, 0x000000, 0.5);
            this.drawCircle(0, 0, bulleDefaultSize);
        }
        shape.endFill();
        var text = new TextRezo(wordwrap(bulleText, 10), TextRezoType.type);
        this.text = text;
        this.shape = shape;
        this.addChild(shape);
        this.addChild(text);
        this.dragBulle();
        array(this);
        text.autoSizeText(bulleDefaultSize);
        var selectedBulle = Rezo.selectedBulle;
        if (!selectedBulle) {
            Rezo.selectedBulle = this;
        }
        else if (multBool) {
            Bulle.fakeClickFun(this);
        }
        else {
            lastBulleSelected = selectedBulle;
            Rezo.selectedBulle = this;
            lastBulleSelected.clear();
        }
        text.textDesign(text);
    };
    Bulle.prototype.dragBulle = function () {
        var _this = this;
        startDragBulle = function (data) {
            var bulle;
            if (multBool) {
                if (!data) {
                    data = { data: dataFake };
                }
                bulle = data.data.target;
                if (bulle == null)
                    bulle = data.target;
                _this.selectBulleFun(bulle, data);
                multiSelect(bulle);
            }
            else {
                if (data == undefined) {
                    data = { data: dataFake };
                }
                bulle = data.data.target;
                if (bulle == null)
                    bulle = data.target;
                _this.selectBulleFun(bulle, data);
                bulle.dragging = true;
                _this.lastSelectedBulleFun();
                linkSelection(bulle);
                Link.linkFun();
            }
        };
        this.on("mousedown", startDragBulle);
        this.on("touchstart", startDragBulle);
        // set the events for when the mouse is released or a touch is released
        stopDragBulle = function (data) {
            if (multBool) {
            }
            else {
                if (!data) {
                    data = { data: dataFake };
                }
                var bulle = data.data.target;
                if (bulle == null)
                    bulle = data.target;
                _this.releaseBulle(bulle);
            }
        };
        this.on("mouseup", stopDragBulle);
        this.on("mouseupoutside", stopDragBulle);
        this.on("touchend", stopDragBulle);
        this.on("touchendoutside", stopDragBulle);
        // set the callbacks for when the mouse or a touch moves
        var drag = function (data) {
            if (multBool) {
            }
            else if (_this.dragging) {
                _this.bulleDragging(_this);
            }
        };
        this.on("mousemove", drag);
        this.on("touchmove", drag);
    };
    Bulle.prototype.selectBulleFun = function (clickedBulle, data) {
        data.data.originalEvent.preventDefault();
        if (data.stopPropagation) {
            data.stopPropagation();
        }
        var selectedBulle = Rezo.selectedBulle;
        clickedBulle.data = data;
        //upperScene.dragging = false;
        if (selectedBulle != clickedBulle) {
            lastBulleSelected = selectedBulle;
        }
        Rezo.selectedBulle = clickedBulle;
        selectedBulle = Rezo.selectedBulle;
        bulleDefaultSize = bulleSize(selectedBulle);
        var color = selectedBulle.shape.rezoColor;
        if (selectedBulle.lineAlpha == 0) {
            if (selectedBulle.shape.kind == ShapeEnum.circle) {
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawCircle(0, 0, bulleDefaultSize);
                if (color == 0xffffff) {
                    selectedBulle.lineStyle(16, 0x000000, 0.5);
                    selectedBulle.drawCircle(0, 0, bulleDefaultSize);
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
                selectedBulle.drawCircle(0, 0, bulleDefaultSize);
                if (color == 0xffffff) {
                    selectedBulle.lineStyle(16, 0x000000, 0.5);
                    selectedBulle.drawCircle(0, 0, bulleDefaultSize);
                }
            }
            else if (selectedBulle.shape.kind == ShapeEnum.poly) {
                selectedBulle.clear();
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawPolygon(selectedBulle.polyPathNumber);
                selectedBulle.endFill();
            }
        }
    };
    Bulle.prototype.lastSelectedBulleFun = function () {
        if (lastBulleSelected) {
            lastBulleSelected.clear();
            lastBulleSelected.lineAlpha = 0;
        }
    };
    Bulle.prototype.releaseBulle = function (releasedBulle) {
        //var positionTemp = releasedBulle.data.getLocalPosition(releasedBulle.parent)
        releasedBulle.dragging = false;
        releasedBulle.data = null;
        clearMotion();
    };
    Bulle.prototype.bulleDragging = function (draggedBulle) {
        if (draggedBulle.dragging && Link.linkBool == false) {
            var newPosition = draggedBulle.data.data.getLocalPosition(draggedBulle.parent);
            draggedBulle.position.x = newPosition.x;
            draggedBulle.position.y = newPosition.y;
            motion(newPosition.x, newPosition.y);
        }
    };
    Bulle.fakeClickFun = function (fakeBulle) {
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
    };
    return Bulle;
}(PIXI.Graphics));
var ShapeEnum;
(function (ShapeEnum) {
    ShapeEnum[ShapeEnum["circle"] = 0] = "circle";
    ShapeEnum[ShapeEnum["square"] = 1] = "square";
    ShapeEnum[ShapeEnum["roundedSquare"] = 2] = "roundedSquare";
    ShapeEnum[ShapeEnum["poly"] = 3] = "poly";
    ShapeEnum[ShapeEnum["draw"] = 4] = "draw";
})(ShapeEnum || (ShapeEnum = {}));
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape(shape, size, color, path) {
        _super.call(this);
        this.polyPathNumber = [];
        this.kind = shape;
        this.rezoColor = color;
        this.drawRezoShape(shape, size, path);
    }
    Shape.prototype.drawRezoShape = function (shape, size, path) {
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
    };
    return Shape;
}(PIXI.Graphics));
//# sourceMappingURL=bulle.js.map
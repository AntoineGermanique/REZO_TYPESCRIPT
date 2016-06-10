/////////////bulle.js
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var circleX = Rezo.windowW / 2;
var circleY = Rezo.windowH / 2;
var circleSize = 50;
var circleColor = parseInt("#FF00CC".replace(/^#/, ''), 16);
var circleScale = 1;
var lastBulleSelected;
var dataFake;
var startDragBulle;
var stopDragBulle;
var Bulle = (function (_super) {
    __extends(Bulle, _super);
    function Bulle(circleX, circleY, bulleText, circleColor, circleScale, shapeEnum) {
        _super.call(this);
        //init and set Bulle params
        this.lineStyle(16, circleColor, 0.5);
        this.drawCircle(0, 0, circleSize);
        this.hitArea = new PIXI.Circle(0, 0, circleSize);
        this.interactive = true;
        this.x = circleX;
        this.y = circleY;
        if (circleScale == undefined) {
            circleScale = 1;
        }
        this.scale.x = circleScale;
        this.scale.y = circleScale;
        //createShape
        var shape;
        if (shapeEnum) {
            shape = new Shape(shapeEnum, circleSize, circleColor);
        }
        else {
            shape = new Shape(ShapeEnum.circle, circleSize, circleColor);
        }
        //check special case for white bulle
        if (circleColor == 0xffffff) {
            console.log(circleColor);
            shape.lineStyle(1, 0x000000, 1);
            this.lineStyle(16, 0x000000, 0.5);
            this.drawCircle(0, 0, circleSize);
        }
        shape.endFill();
        var text = new TextRezo(wordwrap(bulleText, 10), TextRezoType.type);
        this.text = text;
        this.shape = shape;
        this.addChild(shape);
        this.addChild(text);
        this.dragBulle();
        array(this);
        text.autoSizeText(circleSize);
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
    }
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
        circleSize = bulleSize(selectedBulle);
        circleColor = selectedBulle.shape.rezoColor;
        if (selectedBulle.lineAlpha == 0) {
            selectedBulle.lineStyle(16, circleColor, 0.5);
            selectedBulle.drawCircle(0, 0, circleSize);
            if (circleColor == 0xffffff) {
                selectedBulle.lineStyle(16, 0x000000, 0.5);
                selectedBulle.drawCircle(0, 0, circleSize);
            }
        }
        else {
            selectedBulle.clear();
            selectedBulle.lineStyle(16, circleColor, 0.5);
            selectedBulle.drawCircle(0, 0, circleSize);
            if (circleColor == 0xffffff) {
                selectedBulle.lineStyle(16, 0x000000, 0.5);
                selectedBulle.drawCircle(0, 0, circleSize);
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
    function Shape(shape, size, color) {
        _super.call(this);
        this.shape = shape;
        this.rezoColor = color;
        this.drawRezoShape(shape, size);
    }
    Shape.prototype.drawRezoShape = function (shape, size) {
        switch (shape) {
            case ShapeEnum.circle:
                this.beginFill(this.rezoColor, 1);
                this.drawCircle(0, 0, size);
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
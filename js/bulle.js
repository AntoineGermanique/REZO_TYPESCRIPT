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
            fakeClickFun(this);
        }
        else {
            lastBulleSelected = selectedBulle;
            Rezo.selectedBulle = this;
            lastBulleSelected.clear();
        }
        text.textDesign(text);
    }
    Bulle.prototype.dragBulle = function () {
        startDragBulle = function (data) {
            var bulle;
            if (multBool) {
                if (!data) {
                    data = { data: dataFake };
                }
                bulle = data.data.target;
                if (bulle == null)
                    bulle = data.target;
                selectBulleFun(bulle, data);
                multiSelect(bulle);
            }
            else {
                if (data == undefined) {
                    data = { data: dataFake };
                }
                bulle = data.data.target;
                if (bulle == null)
                    bulle = data.target;
                selectBulleFun(bulle, data);
                bulle.dragging = true;
                lastSelectedBulleFun();
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
                releaseBulle(bulle);
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
            else if (this.dragging) {
                bulleDragging(this);
            }
        };
        this.on("mousemove", drag);
        this.on("touchmove", drag);
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
//function bulle(circleX: number, circleY: number, bulleText: string, circleColor?: number, circleScale?: number) {
//    var circle// = new Bulle();
//    //circle.beginFill(circleColor, 1);
//    circle.lineStyle(16, circleColor, 0.5);
//    circle.drawCircle(0, 0, circleSize);
//	circle.hitArea = new PIXI.Circle(0, 0, circleSize);
//	circle.interactive=true
//    circle.x = circleX;
//    circle.y = circleY;
//	if(circleScale==undefined){
//        circleScale = 1;
//	}
//    circle.scale.x = circleScale; 
//    circle.scale.y = circleScale;
//    //circle.endFill();
//    var shape = new Shape();
//    shape.beginFill(circleColor, 1);
//    shape.rezoColor = circleColor;
//	//color.alpha=0.5;
//	if(circleColor==0xffffff){
//        console.log(circleColor);
//        shape.lineStyle(1, 0x000000, 1);
//        circle.lineStyle(16, 0x000000, 0.5);
//        circle.drawCircle(0, 0, circleSize);
//    }
//    shape.drawCircle(0, 0, circleSize);
//    shape.endFill();
//    var text = new PIXI.Text(wordwrap(bulleText, 10));
//    circle.shape = shape;
//    circle.addChild(shape);
//    circle.addChild(text);
//	dragBulle();
//	// selectBulle()
//    array(circle);
//	sceneBulle.addChild(circle);
//	autoSizeText(circle,circleSize);
//	// dispatchMouseEvent(circle, 'mousedown', true, true);
//	if(!selectedBulle){
//        selectedBulle = circle;
//		// selectedBulle.getChildAt(0).alpha=1;
//	}else if(multBool){
//        fakeClickFun(circle);
//	}else{
//        lastBulleSelected = selectedBulle;
//        selectedBulle = circle;
//        lastBulleSelected.clear();
//		// lastBulleSelected.getChildAt(0).alpha=0.5;
//		// selectedBulle.getChildAt(0).alpha=1;
//	}
//    textDesign(text);
//}
//# sourceMappingURL=bulle.js.map
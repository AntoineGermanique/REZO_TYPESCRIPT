/////////////bulle.js
"use strict";


var circleX=Rezo.windowW/2;
var circleY = Rezo.windowH/2;
var circleSize = 50
var circleColor: number = parseInt("#FF00CC".replace(/^#/, ''), 16);
var circleScale = 1
var lastBulleSelected: Bulle;
var dataFake;
var startDragBulle: (data?: any) => void;
var stopDragBulle: (data?: any) => void;






class Bulle extends PIXI.Graphics {
    data: any;
    lineAlpha: number;
    shape: Shape;
    text: TextRezo;
    link;
    dragging: boolean;
    constructor(circleX: number, circleY: number, bulleText: string, circleColor?: number, circleScale?: number, shapeEnum?: ShapeEnum) {
        super();
        //init and set Bulle params
        this.lineStyle(16, circleColor, 0.5);
        this.drawCircle(0, 0, circleSize);
        this.hitArea = new PIXI.Circle(0, 0, circleSize);
        this.interactive = true
        this.x = circleX;
        this.y = circleY;
        if (circleScale == undefined) {
            circleScale = 1;
        }
        this.scale.x = circleScale;
        this.scale.y = circleScale;
        //createShape

        var shape: Shape;
        if (shapeEnum) {
            shape = new Shape(shapeEnum, circleSize, circleColor);
        } else {
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
        } else if (multBool) {
            Bulle.fakeClickFun(this);
        } else {
            lastBulleSelected = selectedBulle;
            Rezo.selectedBulle = this;
            lastBulleSelected.clear();

        }

        text.textDesign(text);

    }

    dragBulle():void {
        startDragBulle = (data) => {
            var bulle
            if (multBool) {
                if (!data) {
                    data = { data: dataFake }
                }
                bulle = <Bulle>data.data.target
                if (bulle == null) bulle = <Bulle>data.target;

                this.selectBulleFun(bulle, data)
                multiSelect(bulle)

            } else {
                if (data == undefined) {
                    data = { data: dataFake }
                }
                bulle = <Bulle>data.data.target
                if (bulle == null) bulle = <Bulle>data.target;

                this.selectBulleFun(bulle, data)
                bulle.dragging = true

                this.lastSelectedBulleFun()

                linkSelection(bulle)
                Link.linkFun()
            }

        };

        this.on("mousedown", startDragBulle);
        this.on("touchstart", startDragBulle);

        // set the events for when the mouse is released or a touch is released
        stopDragBulle =(data)=> {
            if (multBool) {
            } else {
                if (!data) {
                    data = { data: dataFake }
                }
                var bulle = <Bulle>data.data.target;
                if (bulle == null) bulle = <Bulle>data.target;
               this.releaseBulle(bulle)
            }
        };
        this.on("mouseup", stopDragBulle);
        this.on("mouseupoutside", stopDragBulle);
        this.on("touchend", stopDragBulle);
        this.on("touchendoutside", stopDragBulle);

        // set the callbacks for when the mouse or a touch moves
        var drag = (data)=> {
            if (multBool) {

            } else if (this.dragging) {
                this.bulleDragging(this)

            }
        }
        this.on("mousemove", drag);
        this.on("touchmove", drag);
    }
    selectBulleFun(clickedBulle, data) {
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
        circleSize = bulleSize(selectedBulle)
        circleColor = selectedBulle.shape.rezoColor;

        if (selectedBulle.lineAlpha == 0) {
            selectedBulle.lineStyle(16, circleColor, 0.5);
            selectedBulle.drawCircle(0, 0, circleSize);
            if (circleColor == 0xffffff) {
                selectedBulle.lineStyle(16, 0x000000, 0.5);
                selectedBulle.drawCircle(0, 0, circleSize);
            }

        } else {
            selectedBulle.clear();
            selectedBulle.lineStyle(16, circleColor, 0.5);
            selectedBulle.drawCircle(0, 0, circleSize);
            if (circleColor == 0xffffff) {
                selectedBulle.lineStyle(16, 0x000000, 0.5);
                selectedBulle.drawCircle(0, 0, circleSize);
            }
        }
    }

    lastSelectedBulleFun() {
        if (lastBulleSelected) {
            lastBulleSelected.clear();
            lastBulleSelected.lineAlpha = 0
        }
    }
    releaseBulle(releasedBulle) {
        //var positionTemp = releasedBulle.data.getLocalPosition(releasedBulle.parent)
        releasedBulle.dragging = false;
        releasedBulle.data = null;
        clearMotion()
    }
    bulleDragging(draggedBulle) {
        if (draggedBulle.dragging && Link.linkBool == false) {
            var newPosition = draggedBulle.data.data.getLocalPosition(draggedBulle.parent);
            draggedBulle.position.x = newPosition.x;
            draggedBulle.position.y = newPosition.y;
            motion(newPosition.x, newPosition.y)
        }
    }
    static fakeClickFun(fakeBulle: Bulle) {
        dataFake = new PIXI.interaction.InteractionData()
        dataFake.target = fakeBulle
        var evt = new MouseEvent("mousedown", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: 20,
        });
        dataFake.originalEvent = evt
        startDragBulle();
        stopDragBulle();
    }
}

enum ShapeEnum {
    circle,square,roundedSquare,poly,draw
}
class Shape extends PIXI.Graphics {
    rezoColor: number;
    shape: ShapeEnum;

    constructor(shape: ShapeEnum, size: number, color: number) {
        super();
        this.shape = shape;
        this.rezoColor = color
        this.drawRezoShape(shape,size)
    }

    drawRezoShape(shape: ShapeEnum, size: number) {
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
    }
    

}

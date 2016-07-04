/////////////bulle.js
"use strict";


var bulleX=Rezo.windowW/2;
var bulleY = Rezo.windowH/2;
var bulleDefaultSize = 50
var bulleColor: number = parseInt("#FF00CC".replace(/^#/, ''), 16);
var defaultScale = 1
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
    polyPathNumber: number[];

    constructor(X: number, Y: number, bulleText: string, color?: number, scale?: number, shapeEnum?: ShapeEnum, bulleDraw?: Draw, textDraw?: Draw) {
        super();
        //init and set Bulle params
        if (shapeEnum) {
            if (shapeEnum == ShapeEnum.circle) {
                this.createCircleBulle(X, Y, bulleText, color, scale, shapeEnum)
            } else if (shapeEnum == ShapeEnum.poly) {
                this.createPolyBulle(X, Y, bulleText, color, scale, shapeEnum, bulleDraw, textDraw);
            }
        } else {
            this.createCircleBulle(X, Y, bulleText, color, scale, shapeEnum)
        }
       
    }
    private createPolyBulle(posX: number, posY: number, bulleText: string, color?: number, scale?: number, shapeEnum?: ShapeEnum, bulleDraw?: Draw, textDraw?: Draw) {
        color = color || bulleColor;
        this.lineStyle(16, color, 0.5);
        this.drawPolygon(bulleDraw.getPathNumber());
        var pointPath = this.numberPathToPointPath(bulleDraw.getPathNumber());
        this.polyPathNumber = bulleDraw.getPathNumber();
        this.hitArea = new PIXI.Polygon(pointPath);
        this.interactive = true
        this.x = posX;
        this.y = posY;
        this.pivot.x = this.getBounds().width / 2;
        this.pivot.y = this.getBounds().height / 2;
        if (scale == undefined) {
            scale = 1;
        }
        this.scale.x = scale;
        this.scale.y = scale;
        var shape: Shape;
        shape = new Shape(ShapeEnum.poly, bulleDefaultSize, color, bulleDraw.getPathNumber());
        shape.endFill();
        var text = new TextRezo("", TextRezoType.codex);
        text.setTextDraw(textDraw);
        this.shape = shape;
        this.text = text;
        if (this.text.textDraw.getBounds().x != 0 && this.text.textDraw.getBounds().y != 0)
            this.text.textDraw.setTransform(-Rezo.scene.x,  -Rezo.scene.y);
        this.addChild(this.shape);
        if (!this.text.textDraw._bmp) {
            this.addChild(this.text.textDraw);
        } else {
            this.addChild(this.text.textDraw._bmp);

        }
        this.dragBulle();
        array(this);
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

    }
    private numberPathToPointPath(path: number[]): PIXI.Point[] {
        var pathPoint: PIXI.Point[]=[]
        for (var i = 0; i < path.length; i++) {
            if (i % 2 == 0) {
                pathPoint.push( new PIXI.Point(path[i], path[i + 1]));

            }
        }
        return pathPoint
    }
    private createCircleBulle(posX: number, posY: number, bulleText: string, color?: number, scale?: number, shapeEnum?: ShapeEnum) {
        color = color || bulleColor;
        this.lineStyle(16, color, 0.5);
        this.drawCircle(0, 0, bulleDefaultSize);
        this.hitArea = new PIXI.Circle(0, 0, bulleDefaultSize);
        this.interactive = true
        this.x = posX;
        this.y = posY;
        if (scale == undefined) {
            scale = 1;
        }
        this.scale.x = scale;
        this.scale.y = scale;
        //createShape

        var shape: Shape;
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
        bulleDefaultSize = bulleSize(selectedBulle)
        var color = selectedBulle.shape.rezoColor;

        if (selectedBulle.lineAlpha == 0) {
            if (selectedBulle.shape.kind == ShapeEnum.circle) {
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawCircle(0, 0, bulleDefaultSize);
                if (color == 0xffffff) {
                    selectedBulle.lineStyle(16, 0x000000, 0.5);
                    selectedBulle.drawCircle(0, 0, bulleDefaultSize);
                }
            } else if (selectedBulle.shape.kind == ShapeEnum.poly) {
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawPolygon(selectedBulle.polyPathNumber);
                selectedBulle.endFill()
            }

        } else {
            if (selectedBulle.shape.kind == ShapeEnum.circle) {
                selectedBulle.clear();
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawCircle(0, 0, bulleDefaultSize);
                if (color == 0xffffff) {
                    selectedBulle.lineStyle(16, 0x000000, 0.5);
                    selectedBulle.drawCircle(0, 0, bulleDefaultSize);
                }
            } else if (selectedBulle.shape.kind == ShapeEnum.poly) {
                selectedBulle.clear();
                selectedBulle.lineStyle(16, color, 0.5);
                selectedBulle.drawPolygon(selectedBulle.polyPathNumber);
                selectedBulle.endFill()
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
    kind: ShapeEnum;
    polyPathNumber: number[]=[];

    constructor(shape: ShapeEnum, size: number, color: number, path?: number[]) {
        super();
        this.kind = shape;
        this.rezoColor = color;
        this.drawRezoShape(shape, size, path);
    }

    drawRezoShape(shape: ShapeEnum, size: number, path?: number[]) {
        switch (shape) {
            case ShapeEnum.circle:
                this.beginFill(this.rezoColor, 1);
                this.drawCircle(0, 0, size);
                break;
            case ShapeEnum.poly:
                this.beginFill(this.rezoColor, 1);
                this.drawPolygon(path);
                this.polyPathNumber = path;
                break
            default:
                this.beginFill(this.rezoColor, 1);
                this.drawCircle(0, 0, size);
                break;
        }
    }
    

}

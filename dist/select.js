//////////////////select.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class Select {
    constructor() {
        this.path = [];
        this.rectTestArray = [];
        this.clockwiseSelect = true;
        this.counterClockwiseSelect = false;
        this.currentPathX = [];
        this.currentPathY = [];
        this.arrayDetect = [];
        this.isDetect = false;
        Select.drawnGraphics.alpha = 0.2;
        Select.detectPathGraphics.alpha = 0.3;
    }
    static selectIntercative() {
        Select.sceneSelect.addChild(Select.drawnGraphics);
        this.sceneMulti.addChild(Select.detectPathGraphics);
        this.sceneMulti.addChild(this.rectTestGraph);
        var selectStart = function () {
            console.log("select");
            _1.updateWindowSize();
            Select.drawnGraphics.clear();
            this.selectDown = true;
            this.path = [];
            this.color = 0x5D0776;
        };
        Select.sceneSelect.on("mousedown", selectStart);
        Select.sceneSelect.on("touchstart", selectStart);
        var select = function (data) {
            if (!this.selectDown)
                return;
            this.path.push(data.data.global.x);
            this.path.push(data.data.global.y);
            Select.drawnGraphics.clear();
            Select.drawnGraphics.lineStyle(5, 0x000000, 1);
            Select.drawnGraphics.drawPolygon(this.path);
            Select.drawnGraphics.endFill();
        };
        Select.sceneSelect.on("mousemove", select);
        Select.sceneSelect.on("touchmove", select);
        var selectStop = function () {
            this.selectDown = false;
            Select.drawnGraphics.beginFill(this.color);
            Select.drawnGraphics.drawPolygon(this.path);
            Select.drawnGraphics.endFill();
            Select.drawnGraphics.hitArea = new PIXI.Polygon(this.path);
            Select.drawnGraphics.interactive = true;
            this.rectCollisionTest(Select.drawnGraphics, this.path);
            this.path = [];
        };
        Select.sceneSelect.on("mouseup", selectStop);
        Select.sceneSelect.on("mouseupoutside", selectStop);
        Select.sceneSelect.on("touchend", selectStop);
        Select.sceneSelect.on("touchendoutside", selectStop);
    }
    static select() {
        if (_1.Menu.selectBool) {
            console.log("it's on!!!");
            _1.Rezo.sensorZoomScene.interactive = false;
            _1.Rezo.upperScene.interactive = false;
            Select.sceneSelect.interactive = true;
        }
        else {
            console.log("it's off...");
            _1.Rezo.upperScene.interactive = true;
            _1.Rezo.sensorZoomScene.interactive = true;
            Select.sceneSelect.interactive = false;
            Select.drawnGraphics.clear();
        }
    }
    rectCollisionTest(rectTest, currentPath) {
        var windowH = _1.Rezo.windowH;
        var windowW = _1.Rezo.windowW;
        var scaleScene = _1.Rezo.scaleScene;
        this.diffScaleX = ((windowW - windowW * scaleScene.scale.x) / 2) / scaleScene.scale.x;
        this.diffScaleY = ((windowH - windowH * scaleScene.scale.x) / 2) / scaleScene.scale.x;
        console.log(scaleScene.scale.x + "<----scaleScene.scale.x");
        console.log(this.diffScaleX + "<----this.diffScaleX");
        console.log(rectTest);
        var rectZoneTest = rectTest.getBounds();
        var allBulle = scaleScene.scene.sceneBulle.children;
        var x1 = rectZoneTest.x / scaleScene.scale.x - scaleScene.scene.x - this.diffScaleX;
        var x2 = x1 + rectZoneTest.width / scaleScene.scale.x;
        var y1 = rectZoneTest.y / scaleScene.scale.x - scaleScene.scene.y - this.diffScaleY;
        var y2 = y1 + rectZoneTest.height / scaleScene.scale.x;
        // this.rectTestGraph.clear()
        // this.rectTestGraph.beginFill(0x373173,0.3)
        // this.rectTestGraph.drawPolygon(x1,y1,x2,y1,x2,y2,x1,y2)
        console.log(Select.rectTestGraph.x);
        for (var i = 0; i < allBulle.length; i++) {
            console.log("bulle test par rectTest");
            var bx = allBulle[i].x;
            var by = allBulle[i].y;
            console.log(bx + ">" + x1 + "&&" + bx + "<" + x2 + "&&" + by + ">" + y1 + "&&" + by + "<" + y2);
            if (bx > x1 && bx < x2 && by > y1 && by < y2) {
                this.rectTestArray.push(allBulle[i]);
            }
        }
        if (this.rectTestArray.length > 0) {
            console.log("au moins Une bulle dans la selection");
            this.polygonCollisionTest(this.rectTestArray, currentPath);
        }
        Select.drawnGraphics.clear();
    }
    polygonCollisionTest(rectTestArray, currentPath) {
        /* a = $('#canvasId')[0];
        b = document.getElementById("b");
        gl = a.getContext("webgl");
        ctx = b.getContext("2d");
    
    
        ctx.drawImage(a,0,0);
    
        for(i=0;i<rectTestArray.length;i++){
            goodPixelX=Math.round(rectTestArray[i].x)
            goodPixelY=Math.round(rectTestArray[i].y)
            pixelData=ctx.getImageData(goodPixelX, goodPixelY, 1, 1).data;
            console.log(pixelData)
        } */
        // console.log(currentPath)
        for (var i = 0; i < currentPath.length; i++) {
            var scaleScene = _1.Rezo.scaleScene;
            if (i % 2 == 1) {
                this.currentPathY.push(currentPath[i] / scaleScene.scale.x - scaleScene.scene.y - this.diffScaleY);
            }
            else {
                this.currentPathX.push(currentPath[i] / scaleScene.scale.x - scaleScene.scene.x - this.diffScaleX);
                if (i == 0) {
                    this.smallestX = currentPath[i];
                    this.smallestXIndex = i / 2;
                }
                else if (currentPath[i] < this.smallestX) {
                    this.smallestX = currentPath[i];
                    this.smallestXIndex = i / 2;
                }
            }
        }
        var endCurrentPathX = this.currentPathX.splice(0, this.smallestXIndex);
        this.pathX = $.merge(this.currentPathX, endCurrentPathX);
        var endCurrentPathY = this.currentPathY.splice(0, this.smallestXIndex);
        this.pathY = $.merge(this.currentPathY, endCurrentPathY);
        if (this.pathY[0] < this.pathY[1] && this.pathY[0] < this.pathY[10]) {
            this.clockwiseSelect = false;
            this.counterClockwiseSelect = true;
        }
        else {
            this.clockwiseSelect = true;
            this.counterClockwiseSelect = false;
        }
        for (var j = 0; j < rectTestArray.length; j++) {
            console.log(rectTestArray);
            var detectbulleX = rectTestArray[j].x;
            var detectbulleY = rectTestArray[j].y;
            this.yOfSmallestX = this.pathY[0];
            for (i = 0; i < this.pathX.length; i++) {
                if (this.pathX[i] != this.pathX[i + 1]) {
                    if (this.pathY[i] > this.yOfSmallestX) {
                        if (this.pathX[i] < this.pathX[i + 1]) {
                            if (this.pathX[i] < detectbulleX && detectbulleX < this.pathX[i + 1]) {
                                if (this.pathY[i] > detectbulleY && this.pathY[i + 1] > detectbulleY && detectbulleY > this.yOfSmallestX) {
                                    console.log("detection y- this.path++ Clock--");
                                    this.arrayDetect.push([this.counterClockwiseSelect, this.pathY[i]]);
                                }
                                else if (this.pathY[i] > detectbulleY && detectbulleY > this.yOfSmallestX || this.pathY[i + 1] > detectbulleY && detectbulleY > this.yOfSmallestX) {
                                    ////go to border detect function
                                }
                            }
                        }
                        else if (this.pathX[i] > this.pathX[i + 1]) {
                            if (this.pathX[i] > detectbulleX && detectbulleX > this.pathX[i + 1]) {
                                if (this.pathY[i] > detectbulleY && this.pathY[i + 1] > detectbulleY && detectbulleY > this.yOfSmallestX) {
                                    console.log("detection y- this.path-- Clock++");
                                    this.arrayDetect.push([this.clockwiseSelect, this.pathY[i]]);
                                }
                                else if (this.pathY[i] > detectbulleY && detectbulleY > this.yOfSmallestX || this.pathY[i + 1] > detectbulleY && detectbulleY > this.yOfSmallestX) {
                                    ////go to border detect function
                                }
                            }
                        }
                    }
                    else if (this.pathY[i] < this.yOfSmallestX) {
                        if (this.pathX[i] < this.pathX[i + 1]) {
                            if (this.pathX[i] < detectbulleX && detectbulleX < this.pathX[i + 1]) {
                                if (this.pathY[i] < detectbulleY && this.pathY[i + 1] < detectbulleY && detectbulleY < this.yOfSmallestX) {
                                    this.arrayDetect.push([this.clockwiseSelect, this.pathY[i]]);
                                    console.log("detection y+ this.path++ Clock++");
                                }
                                else if (this.pathY[i] > detectbulleY && detectbulleY > this.yOfSmallestX || this.pathY[i + 1] > detectbulleY && detectbulleY > this.yOfSmallestX) {
                                    ////go to border detect function
                                }
                            }
                        }
                        else if (this.pathX[i] > this.pathX[i + 1]) {
                            if (this.pathX[i] > detectbulleX && detectbulleX > this.pathX[i + 1]) {
                                if (this.pathY[i] < detectbulleY && this.pathY[i + 1] < detectbulleY && detectbulleY < this.yOfSmallestX) {
                                    this.arrayDetect.push([this.counterClockwiseSelect, this.pathY[i]]);
                                    console.log("detection y+ this.path-- Clock--");
                                }
                                else if (this.pathY[i] > detectbulleY && detectbulleY > this.yOfSmallestX || this.pathY[i + 1] > detectbulleY && detectbulleY > this.yOfSmallestX) {
                                    ////go to border detect function
                                }
                            }
                        }
                    }
                }
                else {
                    //tour pour rien
                }
            }
            this.z = 0;
            this.funDelay();
            //Select.drawnGraphics.clear();
            console.log(this.arrayDetect[0]);
            if (this.arrayDetect.length == 1) {
                this.isDetect = this.arrayDetect[0][0];
                console.log("une détéction dans arraydetect");
                console.log("cette detection est_" + this.isDetect);
            }
            else if (this.arrayDetect.length > 1) {
                for (i = 0; i < this.arrayDetect.length; i++) {
                    var diffTemp = Math.abs(this.arrayDetect[i][1] - detectbulleY);
                    this.arrayDetect[i][1] = diffTemp;
                    if (i > 0) {
                        if (this.arrayDetect[i][1] > this.arrayDetect[i - 1][1]) {
                            this.isDetect = this.arrayDetect[i - 1][0];
                        }
                        else {
                            this.isDetect = this.arrayDetect[i][0];
                        }
                    }
                }
            }
            else {
                this.isDetect = false;
            }
            while (this.arrayDetect.length > 0) {
                this.arrayDetect.pop();
            }
            // while(this.pathX.length>0){
            // this.pathX.pop()
            // }
            // while(this.pathY.length>0){
            // this.pathY.pop()
            // }
            if (this.isDetect) {
                var selectedBulle = _1.Rezo.selectedBulle;
                _1.Multi.multiArray.push({
                    bulle: rectTestArray[j],
                    loc: {
                        x: _1.Multi.spriteMove.x - rectTestArray[j].x,
                        y: _1.Multi.spriteMove.y - rectTestArray[j].y
                    },
                    links: [],
                    linksIndex: []
                });
                selectedBulle = rectTestArray[j];
                _1.Bulle.bulleDefaultSize = _1.bulleSize(selectedBulle);
                this.color = selectedBulle.shape.rezoColor;
                selectedBulle.lineStyle(16, this.color, 0.5);
                selectedBulle.drawCircle(0, 0, _1.Bulle.bulleDefaultSize);
                if (this.color == 0xffffff) {
                    selectedBulle.lineStyle(16, 0x000000, 0.5);
                    selectedBulle.drawCircle(0, 0, _1.Bulle.bulleDefaultSize);
                }
            }
            else {
            }
        }
        _1.Multi.multiLinkSelect();
        while (rectTestArray.length > 0) {
            rectTestArray.pop();
        }
    }
    funDelay() {
        if (this.z < this.pathX.length) {
            this.path.push(this.pathX[this.z]);
            this.path.push(this.pathY[this.z]);
            //console.log(this.pathY[this.z])
            Select.detectPathGraphics.clear();
            Select.detectPathGraphics.lineStyle(5, 0x000000, 1);
            Select.detectPathGraphics.beginFill(this.color);
            Select.detectPathGraphics.drawPolygon(this.path);
            Select.detectPathGraphics.endFill();
            this.z += 5;
            window.setTimeout(this.funDelay, 2);
        }
        else {
            this.path = [];
            while (this.pathX.length > 0) {
                this.pathX.pop();
            }
            while (this.pathY.length > 0) {
                this.pathY.pop();
            }
        }
    }
}
Select.rectTestGraph = new PIXI.Graphics();
Select.drawnGraphics = new PIXI.Graphics();
Select.detectPathGraphics = new PIXI.Graphics();
Select.selectDown = false;
exports.Select = Select;
//# sourceMappingURL=select.js.map
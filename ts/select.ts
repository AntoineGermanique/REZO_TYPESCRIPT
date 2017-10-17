//////////////////select.js
"use strict";
import { Rezo } from './rezo'
import * as $ from 'jquery'
import {  updateWindowSize, Menu, Multi, Bulle, bulleSize } from './index'
export class Select {
	static rectTestGraph: PIXI.Graphics = new PIXI.Graphics();
	static path = [];
	static color: number;
	static drawnGraphics = new PIXI.Graphics();
	static detectPathGraphics = new PIXI.Graphics();
	static rectTestArray = [];
	static selectDown = false;
	static clockwiseSelect = true;
	static counterClockwiseSelect = false;
	static diffScaleX
	static diffScaleY

	constructor() {
		Select.drawnGraphics.alpha = 0.2;
		Select.detectPathGraphics.alpha = 0.3;

	}

	static selectIntercative() {
		Rezo.sceneSelect.addChild(Select.drawnGraphics);
		Rezo.sceneMulti.addChild(Select.detectPathGraphics);
		Rezo.sceneMulti.addChild(Select.rectTestGraph);
		var selectStart = function () {
			console.log("select")
			updateWindowSize();
			Select.drawnGraphics.clear();
			Select.selectDown = true;
			Select.path = [];
			Select.color = 0x5D0776;
		}
		Rezo.sceneSelect.on("mousedown", selectStart);
		Rezo.sceneSelect.on("touchstart", selectStart);

		var select = function (data) {
			if (!Select.selectDown) return;

			Select.path.push(data.data.global.x);
			Select.path.push(data.data.global.y);
			Select.drawnGraphics.clear()
			Select.drawnGraphics.lineStyle(5, 0x000000, 1)
			Select.drawnGraphics.drawPolygon(Select.path)
			Select.drawnGraphics.endFill();


		}
		Rezo.sceneSelect.on("mousemove", select);
		Rezo.sceneSelect.on("touchmove", select);

		var selectStop = function () {
			Select.selectDown = false;
			Select.drawnGraphics.beginFill(Select.color);
			Select.drawnGraphics.drawPolygon(Select.path);
			Select.drawnGraphics.endFill();
			Select.drawnGraphics.hitArea = new PIXI.Polygon(Select.path);
			Select.drawnGraphics.interactive = true;
			Select.rectCollisionTest(Select.drawnGraphics, Select.path);
			Select.path = [];
		}
		Rezo.sceneSelect.on("mouseup", selectStop);
		Rezo.sceneSelect.on("mouseupoutside", selectStop);
		Rezo.sceneSelect.on("touchend", selectStop);
		Rezo.sceneSelect.on("touchendoutside", selectStop);
	}
static select() {
	if (Menu.selectBool) {
		console.log("it's on!!!");
		Rezo.sensorZoomScene.interactive = false;

		Rezo.upperScene.interactive = false
		Rezo.sceneSelect.interactive = true
	} else {
		console.log("it's off...")
		Rezo.upperScene.interactive = true
		Rezo.sensorZoomScene.interactive = true;

		Rezo.sceneSelect.interactive = false
		Select.drawnGraphics.clear()
	}
}
static rectCollisionTest(rectTest, currentPath) {
	var windowH = Rezo.windowH;
	var windowW = Rezo.windowW;
	var scaleScene = Rezo.scaleScene;
	Select.diffScaleX = ((windowW - windowW * scaleScene.scale.x) / 2) / scaleScene.scale.x
	Select.diffScaleY = ((windowH - windowH * scaleScene.scale.x) / 2) / scaleScene.scale.x
	console.log(scaleScene.scale.x + "<----scaleScene.scale.x")
	console.log(Select.diffScaleX + "<----Select.diffScaleX")
	console.log(rectTest)
	var rectZoneTest = rectTest.getBounds()
	var allBulle = scaleScene.scene.sceneBulle.children;
	var x1 = rectZoneTest.x / scaleScene.scale.x - scaleScene.scene.x - Select.diffScaleX;
	var x2 = x1 + rectZoneTest.width / scaleScene.scale.x;
	var y1 = rectZoneTest.y / scaleScene.scale.x - scaleScene.scene.y - Select.diffScaleY;
	var y2 = y1 + rectZoneTest.height / scaleScene.scale.x;

	// Select.rectTestGraph.clear()
	// Select.rectTestGraph.beginFill(0x373173,0.3)
	// Select.rectTestGraph.drawPolygon(x1,y1,x2,y1,x2,y2,x1,y2)
	console.log(Select.rectTestGraph.x)
	for (var i = 0; i < allBulle.length; i++) {
		console.log("bulle test par rectTest")
		var bx = allBulle[i].x
		var by = allBulle[i].y
		console.log(bx + ">" + x1 + "&&" + bx + "<" + x2 + "&&" + by + ">" + y1 + "&&" + by + "<" + y2)
		if (bx > x1 && bx < x2 && by > y1 && by < y2) {
			Select.rectTestArray.push(allBulle[i])
		}
	}
	if (Select.rectTestArray.length > 0) {
		console.log("au moins Une bulle dans la selection")
		Select.polygonCollisionTest(Select.rectTestArray, currentPath)
	}
	Select.drawnGraphics.clear();
}

static currentPathX = []
static currentPathY = []
static smallestX
static yOfSmallestX
static smallestXIndex
static arrayDetect = []
static isDetect = false
static pathX;
static pathY;
static z;
static polygonCollisionTest(rectTestArray, currentPath) {
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
		var scaleScene = Rezo.scaleScene;
		if (i % 2 == 1) {
			Select.currentPathY.push(currentPath[i] / scaleScene.scale.x - scaleScene.scene.y - Select.diffScaleY)
		} else {
			Select.currentPathX.push(currentPath[i] / scaleScene.scale.x - scaleScene.scene.x - Select.diffScaleX)
			if (i == 0) {
				Select.smallestX = currentPath[i]
				Select.smallestXIndex = i / 2
			} else if (currentPath[i] < Select.smallestX) {
				Select.smallestX = currentPath[i]
				Select.smallestXIndex = i / 2
			}
		}
	}
	var endCurrentPathX = Select.currentPathX.splice(0, Select.smallestXIndex)
	Select.pathX = $.merge(Select.currentPathX, endCurrentPathX);
	var endCurrentPathY = Select.currentPathY.splice(0, Select.smallestXIndex)
	Select.pathY = $.merge(Select.currentPathY, endCurrentPathY);
	if (Select.pathY[0] < Select.pathY[1] && Select.pathY[0] < Select.pathY[10]) {////////////////clockwise or counterClockwise
		Select.clockwiseSelect = false
		Select.counterClockwiseSelect = true
	} else {
		Select.clockwiseSelect = true
		Select.counterClockwiseSelect = false
	}
	for (var j = 0; j < rectTestArray.length; j++) {
		console.log(rectTestArray)
		var detectbulleX = rectTestArray[j].x
		var detectbulleY = rectTestArray[j].y
		Select.yOfSmallestX = Select.pathY[0]
		for (i = 0; i < Select.pathX.length; i++) {

			if (Select.pathX[i] != Select.pathX[i + 1]) {//si Select.pathX et Select.pathX+1 sont différent
				if (Select.pathY[i] > Select.yOfSmallestX) {//si Select.pathY est "negatif"
					if (Select.pathX[i] < Select.pathX[i + 1]) {/////////si Select.pathX++
						if (Select.pathX[i] < detectbulleX && detectbulleX < Select.pathX[i + 1]) {//si bulle dans interval Select.pathX et Select.pathX+1
							if (Select.pathY[i] > detectbulleY && Select.pathY[i + 1] > detectbulleY && detectbulleY > Select.yOfSmallestX) {
								console.log("detection y- Select.path++ Clock--")
								Select.arrayDetect.push([Select.counterClockwiseSelect, Select.pathY[i]])
							} else if (Select.pathY[i] > detectbulleY && detectbulleY > Select.yOfSmallestX || Select.pathY[i + 1] > detectbulleY && detectbulleY > Select.yOfSmallestX) {
								////go to border detect function
							}
						}
					} else if (Select.pathX[i] > Select.pathX[i + 1]) {////si PathX-- 
						if (Select.pathX[i] > detectbulleX && detectbulleX > Select.pathX[i + 1]) {//si bulle dans interval Select.pathX et Select.pathX+1
							if (Select.pathY[i] > detectbulleY && Select.pathY[i + 1] > detectbulleY && detectbulleY > Select.yOfSmallestX) {
								console.log("detection y- Select.path-- Clock++")
								Select.arrayDetect.push([Select.clockwiseSelect, Select.pathY[i]])
							} else if (Select.pathY[i] > detectbulleY && detectbulleY > Select.yOfSmallestX || Select.pathY[i + 1] > detectbulleY && detectbulleY > Select.yOfSmallestX) {
								////go to border detect function
							}
						}
					}

				} else if (Select.pathY[i] < Select.yOfSmallestX) {//si Select.pathY est "positif"
					if (Select.pathX[i] < Select.pathX[i + 1]) {/////////si Select.pathX++
						if (Select.pathX[i] < detectbulleX && detectbulleX < Select.pathX[i + 1]) {//si bulle dans interval Select.pathX et Select.pathX+1
							if (Select.pathY[i] < detectbulleY && Select.pathY[i + 1] < detectbulleY && detectbulleY < Select.yOfSmallestX) {
								Select.arrayDetect.push([Select.clockwiseSelect, Select.pathY[i]])
								console.log("detection y+ Select.path++ Clock++")
							} else if (Select.pathY[i] > detectbulleY && detectbulleY > Select.yOfSmallestX || Select.pathY[i + 1] > detectbulleY && detectbulleY > Select.yOfSmallestX) {
								////go to border detect function
							}
						}
					} else if (Select.pathX[i] > Select.pathX[i + 1]) {////si PathX-- 
						if (Select.pathX[i] > detectbulleX && detectbulleX > Select.pathX[i + 1]) {//si bulle dans interval Select.pathX et Select.pathX+1
							if (Select.pathY[i] < detectbulleY && Select.pathY[i + 1] < detectbulleY && detectbulleY < Select.yOfSmallestX) {
								Select.arrayDetect.push([Select.counterClockwiseSelect, Select.pathY[i]])
								console.log("detection y+ Select.path-- Clock--")
							} else if (Select.pathY[i] > detectbulleY && detectbulleY > Select.yOfSmallestX || Select.pathY[i + 1] > detectbulleY && detectbulleY > Select.yOfSmallestX) {
								////go to border detect function
							}
						}
					}
				}

			} else {////si Select.pathX et Select.pathX+1 sont égaux
				//tour pour rien
			}
		}

		Select.z = 0;

		Select.funDelay()
		//Select.drawnGraphics.clear();
		console.log(Select.arrayDetect[0])
		if (Select.arrayDetect.length == 1) {//si une detection
			Select.isDetect = Select.arrayDetect[0][0]
			console.log("une détéction dans arraydetect")
			console.log("cette detection est_" + Select.isDetect)
		} else if (Select.arrayDetect.length > 1) {//si plusieurs detection 
			for (i = 0; i < Select.arrayDetect.length; i++) {
				var diffTemp = Math.abs(Select.arrayDetect[i][1] - detectbulleY)
				Select.arrayDetect[i][1] = diffTemp
				if (i > 0) {
					if (Select.arrayDetect[i][1] > Select.arrayDetect[i - 1][1]) {
						Select.isDetect = Select.arrayDetect[i - 1][0]
					} else {
						Select.isDetect = Select.arrayDetect[i][0]
					}
				}
			}
		} else {//si pas detection
			Select.isDetect = false
		}
		while (Select.arrayDetect.length > 0) {
			Select.arrayDetect.pop()
		}
		// while(Select.pathX.length>0){
		// Select.pathX.pop()
		// }
		// while(Select.pathY.length>0){
		// Select.pathY.pop()
		// }


		if (Select.isDetect) {
			var selectedBulle = Rezo.selectedBulle;
			Multi.multiArray.push({
				bulle: rectTestArray[j],
				loc: {
					x: Multi.spriteMove.x - rectTestArray[j].x,
					y: Multi.spriteMove.y - rectTestArray[j].y
				},
				links: [],
				linksIndex: []
			});
			selectedBulle = rectTestArray[j];
			Bulle.bulleDefaultSize = bulleSize(selectedBulle)
			Select.color = (<Bulle>selectedBulle).shape.rezoColor;
			selectedBulle.lineStyle(16, Select.color, 0.5)
			selectedBulle.drawCircle(0, 0, Bulle.bulleDefaultSize)
			if (Select.color == 0xffffff) {
				selectedBulle.lineStyle(16, 0x000000, 0.5)
				selectedBulle.drawCircle(0, 0, Bulle.bulleDefaultSize)
			}

		} else {

		}

	}
	Multi.multiLinkSelect()
	while (rectTestArray.length > 0) {
		rectTestArray.pop()
	}
}
static funDelay() {

	if (Select.z < Select.pathX.length) {
		Select.path.push(Select.pathX[Select.z])
		Select.path.push(Select.pathY[Select.z])
		//console.log(Select.pathY[Select.z])
		Select.detectPathGraphics.clear();
		Select.detectPathGraphics.lineStyle(5, 0x000000, 1)
		Select.detectPathGraphics.beginFill(Select.color);
		Select.detectPathGraphics.drawPolygon(Select.path)
		Select.detectPathGraphics.endFill();

		Select.z += 5
		window.setTimeout(Select.funDelay, 2);
	} else {
		Select.path = []
		while (Select.pathX.length > 0) {
			Select.pathX.pop()
		}
		while (Select.pathY.length > 0) {
			Select.pathY.pop()
		}
	}
} 
}
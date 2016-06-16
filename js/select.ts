//////////////////draw.js
"use strict";
var rectTestGraph: PIXI.Graphics = new PIXI.Graphics();
var sceneMulti: PIXI.Container;
var sceneDraw: PIXI.Container;
var path = [];
var color: number;
var drawnGraphics = new PIXI.Graphics();
var detectPathGraphics = new PIXI.Graphics();
drawnGraphics.alpha = 0.2;
detectPathGraphics.alpha = 0.3;
var rectTestArray = [];
var selectDown = false;
var clockwiseSelect = true;
var counterClockwiseSelect = false;

function selectIntercative(){
    sceneDraw.addChild(drawnGraphics);
    sceneMulti.addChild(detectPathGraphics);
    sceneMulti.addChild(rectTestGraph);
    var selectStart = function (data) {
        console.log("select")
        updateWindowSize();
        drawnGraphics.clear();
		selectDown = true;
		path = [];
        color = 0x5D0776;
    }
    sceneDraw.on("mousedown", selectStart);
    sceneDraw.on("touchstart", selectStart);

	var select = function(data)
	{
        if (!selectDown)return;
		
		path.push(data.data.global.x);
		path.push(data.data.global.y);
		drawnGraphics.clear()
		drawnGraphics.lineStyle(5,0x000000,1) 
		drawnGraphics.drawPolygon(path)
		drawnGraphics.endFill();


    }
    sceneDraw.on("mousemove", select);
    sceneDraw.on("touchmove", select); 

	var selectStop = function()
	{
        selectDown = false;
		drawnGraphics.beginFill(color);
        drawnGraphics.drawPolygon(path);
		drawnGraphics.endFill();
		drawnGraphics.hitArea=new PIXI.Polygon(path);
		drawnGraphics.interactive=true;
        rectCollisionTest(drawnGraphics, path);
		path = [];
	}
    sceneDraw.on("mouseup", selectStop);
    sceneDraw.on("mouseupoutside", selectStop);
    sceneDraw.on("touchend", selectStop);
    sceneDraw.on("touchendoutside", selectStop);
}
function select(){
    if (selectBool){
        console.log("it's on!!!");
        Rezo.sensorZoomScene.interactive = false;

		Rezo.upperScene.interactive=false
		sceneDraw.interactive=true
	}else{
		console.log("it's off...")
        Rezo.upperScene.interactive = true
        Rezo.sensorZoomScene.interactive = true;

		sceneDraw.interactive=false
		drawnGraphics.clear()
	}
}
var diffScaleX
var diffScaleY
function rectCollisionTest(rectTest, currentPath) {
    var windowH = Rezo.windowH;
    var windowW = Rezo.windowW;
    var scaleScene = Rezo.scaleScene;
	diffScaleX=((windowW-windowW*scaleScene.scale.x)/2)/scaleScene.scale.x
	diffScaleY=((windowH-windowH*scaleScene.scale.x)/2)/scaleScene.scale.x
	console.log(scaleScene.scale.x+"<----scaleScene.scale.x")
	console.log(diffScaleX+"<----diffScaleX")
	console.log(rectTest)
    var rectZoneTest = rectTest.getBounds()
    var allBulle = scaleScene.scene.sceneBulle.children;
    var x1 = rectZoneTest.x / scaleScene.scale.x -scaleScene.scene.x-diffScaleX;
    var x2 = x1 + rectZoneTest.width / scaleScene.scale.x;
    var y1 = rectZoneTest.y / scaleScene.scale.x -scaleScene.scene.y-diffScaleY;
    var y2 = y1 + rectZoneTest.height / scaleScene.scale.x;
	
	// rectTestGraph.clear()
	// rectTestGraph.beginFill(0x373173,0.3)
	// rectTestGraph.drawPolygon(x1,y1,x2,y1,x2,y2,x1,y2)
	console.log(rectTestGraph.x)
	for(var i=0;i<allBulle.length;i++){
		console.log("bulle test par rectTest")
		var bx=allBulle[i].x
		var by=allBulle[i].y
		console.log(bx+">"+x1+"&&"+bx+"<"+x2+"&&"+by+">"+y1+"&&"+by+"<"+y2)
		if(bx>x1&&bx<x2&&by>y1&&by<y2){
			rectTestArray.push(allBulle[i])
		}
	}
	if(rectTestArray.length>0){
		console.log("au moins Une bulle dans la selection")
		polygonCollisionTest(rectTestArray,currentPath)
	}
	drawnGraphics.clear();
}

var currentPathX=[]
var currentPathY=[]
var smallestX
var yOfSmallestX
var smallestXIndex
var arrayDetect=[]
var isDetect=false
function polygonCollisionTest(rectTestArray,currentPath){
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
    for (var i = 0; i < currentPath.length; i++){
        var scaleScene = Rezo.scaleScene;
		if(i % 2==1){
            currentPathY.push(currentPath[i] / scaleScene.scale.x -scaleScene.scene.y-diffScaleY)
		}else{
            currentPathX.push(currentPath[i] / scaleScene.scale.x -scaleScene.scene.x-diffScaleX)
			if(i==0){
				smallestX=currentPath[i]
				smallestXIndex=i/2
			}else if(currentPath[i]<smallestX){
				smallestX=currentPath[i]
				smallestXIndex=i/2
			}
		}	
	}
	var endCurrentPathX=currentPathX.splice(0,smallestXIndex)
	var pathX=$.merge(currentPathX,endCurrentPathX);
	var endCurrentPathY=currentPathY.splice(0,smallestXIndex)
	var pathY=$.merge(currentPathY,endCurrentPathY);
	if(pathY[0]<pathY[1]&&pathY[0]<pathY[10]){////////////////clockwise or counterClockwise
		clockwiseSelect=false
		counterClockwiseSelect=true
	}else{
		clockwiseSelect=true
		counterClockwiseSelect=false
	}
	for(var j=0;j<rectTestArray.length;j++){
		console.log(rectTestArray)
		var detectbulleX=rectTestArray[j].x
		var detectbulleY=rectTestArray[j].y
		yOfSmallestX=pathY[0]
		for(i=0;i<pathX.length;i++){
			
			if(pathX[i]!=pathX[i+1]){//si pathX et pathX+1 sont différent
				if(pathY[i]>yOfSmallestX){//si pathY est "negatif"
					if(pathX[i]<pathX[i+1]){/////////si pathX++
						if(pathX[i]<detectbulleX&&detectbulleX<pathX[i+1]){//si bulle dans interval pathX et pathX+1
							if(pathY[i]>detectbulleY&&pathY[i+1]>detectbulleY&&detectbulleY>yOfSmallestX){
								console.log("detection y- path++ Clock--")
								arrayDetect.push([counterClockwiseSelect,pathY[i]])
							}else if(pathY[i]>detectbulleY&&detectbulleY>yOfSmallestX||pathY[i+1]>detectbulleY&&detectbulleY>yOfSmallestX){
								////go to border detect function
							}
						}
					}else if(pathX[i]>pathX[i+1]){////si PathX-- 
						if(pathX[i]>detectbulleX&&detectbulleX>pathX[i+1]){//si bulle dans interval pathX et pathX+1
							if(pathY[i]>detectbulleY&&pathY[i+1]>detectbulleY&&detectbulleY>yOfSmallestX){
							console.log("detection y- path-- Clock++")
								arrayDetect.push([clockwiseSelect,pathY[i]])
							}else if(pathY[i]>detectbulleY&&detectbulleY>yOfSmallestX||pathY[i+1]>detectbulleY&&detectbulleY>yOfSmallestX){
								////go to border detect function
							}
						}
					}
					
				}else if(pathY[i]<yOfSmallestX){//si pathY est "positif"
					if(pathX[i]<pathX[i+1]){/////////si pathX++
						if(pathX[i]<detectbulleX&&detectbulleX<pathX[i+1]){//si bulle dans interval pathX et pathX+1
							if(pathY[i]<detectbulleY&&pathY[i+1]<detectbulleY&&detectbulleY<yOfSmallestX){
								arrayDetect.push([clockwiseSelect,pathY[i]])
								console.log("detection y+ path++ Clock++")
							}else if(pathY[i]>detectbulleY&&detectbulleY>yOfSmallestX||pathY[i+1]>detectbulleY&&detectbulleY>yOfSmallestX){
								////go to border detect function
							}
						}
					}else if(pathX[i]>pathX[i+1]){////si PathX-- 
						if(pathX[i]>detectbulleX&&detectbulleX>pathX[i+1]){//si bulle dans interval pathX et pathX+1
							if(pathY[i]<detectbulleY&&pathY[i+1]<detectbulleY&&detectbulleY<yOfSmallestX){
								arrayDetect.push([counterClockwiseSelect,pathY[i]])
								console.log("detection y+ path-- Clock--")
							}else if(pathY[i]>detectbulleY&&detectbulleY>yOfSmallestX||pathY[i+1]>detectbulleY&&detectbulleY>yOfSmallestX){
								////go to border detect function
							}
						}
					}
				}
				
			}else{////si pathX et pathX+1 sont égaux
			//tour pour rien
			}
		}
		
		var z=0;
		function funDelay(){
			
			if(z<pathX.length){
				path.push(pathX[z])
				path.push(pathY[z])
				//console.log(pathY[z])
				detectPathGraphics.clear();
				detectPathGraphics.lineStyle(5,0x000000,1)
				detectPathGraphics.beginFill(color);
				detectPathGraphics.drawPolygon(path)
				detectPathGraphics.endFill();
				
				z+=5
				window.setTimeout(funDelay, 2);
			}else{
				path=[]
				while(pathX.length>0){
					pathX.pop()
				}
				while(pathY.length>0){
					pathY.pop()
				}
			}
		} 
		funDelay()
		//drawnGraphics.clear();
		console.log(arrayDetect[0])
		if(arrayDetect.length==1){//si une detection
			isDetect=arrayDetect[0][0]
			console.log("une détéction dans arraydetect")
			console.log("cette detection est_"+isDetect)
		}else if(arrayDetect.length>1){//si plusieurs detection 
			for(i=0;i<arrayDetect.length;i++){
				var diffTemp=Math.abs(arrayDetect[i][1]-detectbulleY)
				arrayDetect[i][1]=diffTemp
				if(i>0){
					if(arrayDetect[i][1]>arrayDetect[i-1][1]){
						isDetect=arrayDetect[i-1][0]
					}else{
						isDetect=arrayDetect[i][0]
					}
				}	
			}
		}else{//si pas detection
			isDetect=false
		}
		while(arrayDetect.length>0){
		arrayDetect.pop()
		}
		// while(pathX.length>0){
			// pathX.pop()
		// }
		// while(pathY.length>0){
			// pathY.pop()
		// }
		
		
        if (isDetect) {
            var selectedBulle = Rezo.selectedBulle;
            multiArray.push({
                bulle: rectTestArray[j],
                loc: {
                    x: spriteMove.x - rectTestArray[j].x,
                    y: spriteMove.y - rectTestArray[j].y
                },
                links: [],
                linksIndex: []
            });
			selectedBulle=rectTestArray[j];
            circleSize = bulleSize(selectedBulle)
            circleColor = (<Bulle>selectedBulle).shape.rezoColor;
			selectedBulle.lineStyle(16,circleColor,0.5)
			selectedBulle.drawCircle(0,0,circleSize)
			if(circleColor==0xffffff){
				selectedBulle.lineStyle(16,0x000000,0.5)
				selectedBulle.drawCircle(0,0,circleSize)
			}
			
		}else{
		
		}
		
	}
	multiLinkSelect()
	while(rectTestArray.length>0){
		rectTestArray.pop()
	}
}


/////////////////////////scale.js
"use strict";

var scalBullFirstPo
var tempScaleArray: MultiBulleArray[] = []
function scaleBulle() {
    var selectedBulle = Rezo.selectedBulle;
	var startZoom=function(data){
		data.originalEvent.preventDefault();
		this.dragging = true
		//upperScene.dragging = false;
		scalBullFirstPo=data.getLocalPosition(this.parent)
		if(multBool){
			tempScaleArray=multiArray
		}else{
            tempScaleArray.push({
                bulle: selectedBulle,
                loc:{
                    x: selectedBulle.x,
                    y: selectedBulle.y
                },
                links: [],
                linksIndex: []
            })
		}
    }
    var sensorScaleBulleScene = Rezo.sensorScaleBulleScene
    sensorScaleBulleScene.on("touchstart", startZoom);
	var stopZoom=function (data){
		this.dragging = false;
		tempScaleArray=[]
    }
    sensorScaleBulleScene.on("touchend", stopZoom);
    sensorScaleBulleScene.on("touchendouside", stopZoom);
	var zoomTouch = function (data){
		if(this.dragging&&drawBool==false){
			
			var newPosition = data.getLocalPosition(this.parent);
			
			if(newPosition.y<scalBullFirstPo.y){
                for (var i = 0; i < tempScaleArray.length; i++){
                    tempScaleArray[i].bulle.scale.x *= 1.03;
                    tempScaleArray[i].bulle.scale.y *= 1.03;
				}
			}else{
                for (var i = 0; i < tempScaleArray.length; i++){
                    tempScaleArray[i].bulle.scale.x /= 1.03;
                    tempScaleArray[i].bulle.scale.y /= 1.03;
				}
			}
			
		}
    }
    sensorScaleBulleScene.on("touchmove", zoomTouch);
	sensorScaleBulleScene.interactive=false
}
function scaleBulleScroll(scrollEvent){
	if(multBool){
        tempScaleArray = multiArray;
	}else{
        tempScaleArray.push({
            bulle: Rezo.selectedBulle,
            loc: {
                x: Rezo.selectedBulle.x,
                y: Rezo.selectedBulle.y
            },
            links: [],
            linksIndex: []
        });
	}
	if(scrollEvent.deltaY<0){
        for (var i = 0; i < tempScaleArray.length; i++){
            tempScaleArray[i].bulle.scale.x /= 1.1
            tempScaleArray[i].bulle.scale.y /= 1.1
		}		
	}else{
        for (var i = 0; i < tempScaleArray.length; i++){
            tempScaleArray[i].bulle.scale.x *= 1.1
            tempScaleArray[i].bulle.scale.y *= 1.1
		}
	}
	tempScaleArray=[]
}
function scaleBullePlus(bulleToScale){
	bulleToScale.scale.x*=1.5
	bulleToScale.scale.y*=1.5	
}
function scaleBulleMoins(bulleToScale){
	bulleToScale.scale.x/=1.5
	bulleToScale.scale.y/=1.5	
}

function scaleBulleTouch(){
    var stage = Rezo.stage;
    if (scalBool) {
		Rezo.sensorScaleBulleScene.interactive=true
		stage.swapChildren(stage.sensorZoomScene,stage.sensorScaleBulleScene)
	}else{
		stage.sensorScaleBulleScene.interactive=false
		stage.swapChildren(stage.sensorZoomScene,stage.sensorScaleBulleScene)
	}
}
function multiScaleBullePlus(scaleMultiArray: BulleArray[]) {
	for(var i=0;i<scaleMultiArray.length;i++){
		scaleBullePlus(scaleMultiArray[i].bulle)
	}
}
function multiScaleBulleMoins(scaleMultiArray: BulleArray[]) {
	for(var i=0;i<scaleMultiArray.length;i++){
		scaleBulleMoins(scaleMultiArray[i].bulle)
	}
}
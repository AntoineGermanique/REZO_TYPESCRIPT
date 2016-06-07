///////////// interactiveBulle.js
"use strict";

var lastBulleSelected : Bulle;
var dataFake
function dragBulle(){
	var startDrag = function(data){
		console.log(this.x)
		if(multBool){
			if(!data){
			    data = {data: dataFake }
			}
			selectBulleFun(this,data)
			multiSelect(this)
			
		}else{
			if(data==undefined){
			    data = { data: dataFake }
			}
			console.log(data)
			selectBulleFun(this,data)
			this.dragging = true

			lastSelectedBulleFun()
		
			linkSelection(this)
			linkFun()
		}
		
    };

    circle.on("mousedown", startDrag);
    circle.on("touchstart", startDrag);

	// set the events for when the mouse is released or a touch is released
    var stopDrag = function (data){
		if(multBool){
		}else{
			releaseBulle(this)
		}
    };
    circle.on("mouseup", stopDrag);
    circle.on("mouseupoutside", stopDrag);
    circle.on("touchend", stopDrag);
    circle.on("touchendoutside", stopDrag);

	// set the callbacks for when the mouse or a touch moves
	var drag = function(data){
		if(multBool){
		
		}else if(this.dragging){
			bulleDragging(this)
			
		}
    }
    circle.on("mousemove", drag);
    circle.on("touchmove", drag);
}
function selectBulleFun(clickedBulle,data){
    data.data.originalEvent.preventDefault();
    if (data.stopPropagation) {
        data.stopPropagation();
    }
	clickedBulle.data = data;
	//upperScene.dragging = false;
	if(selectedBulle!=clickedBulle){
		lastBulleSelected=selectedBulle;
	}
	selectedBulle=clickedBulle;
    circleSize = bulleSize(selectedBulle)
    var circleGraphicsColor = <PIXI.Graphics>selectedBulle.getChildAt(0);
    circleColor = circleGraphicsColor.tint;

    if (selectedBulle.lineAlpha == 0) {
		selectedBulle.lineStyle(16,circleColor,0.5)
		selectedBulle.drawCircle(0,0,circleSize)
		if(circleColor==0xffffff){
			selectedBulle.lineStyle(16,0x000000,0.5)
			selectedBulle.drawCircle(0,0,circleSize)
		}
		
	}else{
		selectedBulle.clear();
		selectedBulle.lineStyle(16,circleColor,0.5)
		selectedBulle.drawCircle(0,0,circleSize)
		if(circleColor==0xffffff){
			selectedBulle.lineStyle(16,0x000000,0.5)
			selectedBulle.drawCircle(0,0,circleSize)
		}
	}
}
function lastSelectedBulleFun(){
	if(lastBulleSelected){
        lastBulleSelected.clear();
        lastBulleSelected.lineAlpha = 0
	}
}

function releaseBulle(releasedBulle){
	//var positionTemp = releasedBulle.data.getLocalPosition(releasedBulle.parent)
	releasedBulle.dragging = false;
	releasedBulle.data = null;
	clearMotion()
}
function bulleDragging(draggedBulle){
	if(draggedBulle.dragging&&linkBool==false){
		var newPosition = draggedBulle.data.data.getLocalPosition(draggedBulle.parent);
		draggedBulle.position.x = newPosition.x;
		draggedBulle.position.y = newPosition.y;
		motion(newPosition.x,newPosition.y)
	}
}

function fakeClickFun(fakeBulle){
	dataFake=new PIXI.interaction.InteractionData()
	dataFake.target=fakeBulle
	// dataFake.target=multiArray[multiArray.length-1]
	var evt = new MouseEvent("mousedown", {
		view: window,
		bubbles: true,
		cancelable: true,
		clientX: 20,
	});
	dataFake.originalEvent=evt
	fakeBulle.mousedown();
	fakeBulle.mouseup();
}

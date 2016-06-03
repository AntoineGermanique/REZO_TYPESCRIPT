///////////// interactiveBulle.js
var lastBulleSelected=''
var selectedBulle=""
var dataFake
function dragBulle(){
	circle.mousedown = circle.touchstart = function(data){
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

	// set the events for when the mouse is released or a touch is released
	circle.mouseup = circle.mouseupoutside = circle.touchend = circle.touchendoutside = function(data){
		if(multBool){
		}else{
			releaseBulle(this)
		}
	};

	// set the callbacks for when the mouse or a touch moves
	circle.mousemove = circle.touchmove = function(data){
		if(multBool){
		
		}else if(this.dragging){
			bulleDragging(this)
			
		}
	}
}
function selectBulleFun(clickedBulle,data){
    data.data.originalEvent.preventDefault();
    if (data.stopPropagation) {
        data.stopPropagation();
    }
	clickedBulle.data = data;
	upperScene.dragging = false;
	if(selectedBulle!=clickedBulle){
		lastBulleSelected=selectedBulle;
	}
	selectedBulle=clickedBulle;
	circleSize=bulleSize(selectedBulle)
	circleColor=selectedBulle.getChildAt(0).graphicsData[0].fillColor;
	if(selectedBulle.lineAlpha==0){
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
		lastBulleSelected.lineAlpha=0
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
	evt = new MouseEvent("mousedown", {
		view: window,
		bubbles: true,
		cancelable: true,
		clientX: 20,
	});
	dataFake.originalEvent=evt
	fakeBulle.mousedown();
	fakeBulle.mouseup();
}

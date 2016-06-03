///////interactiveHyper.js

function hyperInteractiveFun(){
	hyperHandler.mousedown=hyperHandler.touchstart=function(data){
		this.dragging=true
		selectHyperFun(this,data)
	}
	hyperHandler.mouseup=hyperHandler.mouseupoutside=hyperHandler.touchend=hyperHandler.touchendoutside=function(data){
		releaseHyper(this)
	}
	hyperHandler.mousemove=hyperHandler.touchmove=function(data){
		dragHyper(this)
	}
}

function selectHyperFun(clickedHyper,data){
    data.data.originalEvent.preventDefault();
    data.stopPropagation();
	clickedHyper.data = data;
	upperScene.dragging = false;
}
function releaseHyper(releasedHyper){
	releasedHyper.dragging=false;
	releasedHyper.data=null;
	
}
function dragHyper(draggedHyper){
	if(draggedHyper.dragging){
		var newPosition = draggedHyper.data.data.getLocalPosition(draggedHyper.parent.parent);
		draggedHyper.parent.position.x = newPosition.x;
		draggedHyper.parent.position.y = newPosition.y;
	}
}
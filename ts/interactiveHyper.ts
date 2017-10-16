///////interactiveHyper.js

import { Hyper } from './'

export function hyperInteractiveFun() {
	var dragStart = function (data) {
		this.dragging = true
		selectHyperFun(this, data)
	}
	Hyper.hyperHandler.on("mousedown", dragStart);
	Hyper.hyperHandler.on("touchstart", dragStart);

	var dragStop = () => {
		releaseHyper(this)
	}
	Hyper.hyperHandler.on("mouseup", dragStop);
	Hyper.hyperHandler.on("mouseupoutside", dragStop);
	Hyper.hyperHandler.on("touchend", dragStop);
	Hyper.hyperHandler.on("touchendoutside", dragStop);
	var drag = () => {
		dragHyper(this)
	}
	Hyper.hyperHandler.on("mousemove", drag);
	Hyper.hyperHandler.on("touchmove", drag);
}

function selectHyperFun(clickedHyper, data) {
	data.data.originalEvent.preventDefault();
	data.stopPropagation();
	clickedHyper.data = data;
	//upperScene.dragging = false;
}
function releaseHyper(releasedHyper) {
	releasedHyper.dragging = false;
	releasedHyper.data = null;

}
function dragHyper(draggedHyper) {
	if (draggedHyper.dragging) {
		var newPosition = draggedHyper.data.data.getLocalPosition(draggedHyper.parent.parent);
		draggedHyper.parent.position.x = newPosition.x;
		draggedHyper.parent.position.y = newPosition.y;
	}
}
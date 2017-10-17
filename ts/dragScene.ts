//////////////////dragScene.js
import * as PIXI from 'pixi.js'

"use strict";
export namespace dragScene {
    export var oldPosition: PIXI.Point;
    export var oldX: number;
    export var oldY: number;
    export interface Data {
        data: PIXI.interaction.InteractionData;
    }
}

//function dragScene() {
//    var startDrag =function (data: Data)
//	{	
//		// stop the default event...
//		data.data.originalEvent.preventDefault();
//		// store a reference to the data
//		// The reason for this is because of multitouch
//		// we want to track the movement of this particular touch
//		this.data = data;
//		this.dragging = true;
//        oldX = scene.position.x * scaleScene.scale.x;
//        oldY = scene.position.y * scaleScene.scale.x;
//		oldPosition = data.data.getLocalPosition(this.parent);
//    };
//    upperScene.on("mousedown", startDrag);
//    upperScene.on("touchstart", startDrag);


//	// set the events for when the mouse is released or a touch is released
//	var stopDrag = function(data)
//	{
//		this.dragging = false;
//		// set the interaction data to null
//		this.data = null;
//		// scene.pivot.x+=scene.position.x-oldX;
//		// scene.pivot.y+=scene.position.y-oldY;
//    };
//    upperScene.on("mouseup", stopDrag);
//    upperScene.on("mouseupoutside", stopDrag);
//    upperScene.on("touchend", stopDrag);
//    upperScene.on("touchendoutside", stopDrag);
//	// set the callbacks for when the mouse or a touch moves

//    var drag = function(data)
//	{
//		if(this.dragging)
//		{
//			var newPosition = this.data.data.getLocalPosition(this.parent);
//			scene.position.x = (newPosition.x-oldPosition.x+oldX)/scaleScene.scale.x
//			scene.position.y = (newPosition.y-oldPosition.y+oldY)/scaleScene.scale.x


//			// this.hitArea.x=-this.position.x+windowW/2*this.scale.x
//			// this.hitArea.y=-this.position.y+windowH/2*this.scale.y

//			// this.clear();
//			// updateWindowSize()
//			// this.beginFill(0xFF5500, 0.2)
//			// this.drawRect(-this.position.x/this.scale.x,-this.position.y/this.scale.y,windowW/this.scale.x,windowH/this.scale.x)


//		}
//    }
//    upperScene.on("mousemove", drag);
//    upperScene.on("touchmove",drag)
//}

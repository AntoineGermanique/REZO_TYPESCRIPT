/////////////////////zoom.js
"use strict"

import { Rezo, Menu, Scale } from './'

interface JQueryEventObject {
	deltaY: number;
}
export class Zoom {
	static zoomScenePlus() {
		Rezo.scaleScene.scale.x *= 2
		Rezo.scaleScene.scale.y *= 2



	}
	static zoomSceneMoins() {
		Rezo.scaleScene.scale.x /= 2
		Rezo.scaleScene.scale.y /= 2


	}

	static scrollZoom() {
		var scaleScene = Rezo.scaleScene;
		var elem = $('#canvasContainer')
		$(elem).on('mousewheel', function (event) {
			if (Menu.scalBool) {
				Scale.scaleBulleScroll(event)
			} else {
				if ((<any>event).deltaY < 0) {
					scaleScene.scale.x /= 1.1
					scaleScene.scale.y /= 1.1


				} else {
					scaleScene.scale.x *= 1.1
					scaleScene.scale.y *= 1.1
					console.log(scaleScene.x)

				}
			}
		});
	}
	static touchZoomCounter = 0
	static touch1MoveX1 = 0
	static touch1MoveY1 = 0
	static touch1MoveX2 = 0
	static touch1MoveY2 = 0
	static touch2MoveX1 = 0
	static touch2MoveY1 = 0
	static touch2MoveX2 = 0
	static touch2MoveY2 = 0
	static squeze1 = 0
	static squeze2 = 0
	static newPosition1
	static newPosition2
	static calculable1 = false
	static calculable2 = false
	static diffX1 = ""
	static diffX2 = ""
	static diffY1 = ""
	static diffY2 = ""


	static touchZoom() {
		var sensorZoomScene2 = Rezo.sensorZoomScene2;
		var sensorZoomScene = Rezo.sensorZoomScene;
		var upperScene = Rezo.upperScene
		var touch1Start = (data) => {
			if (Zoom.touchZoomCounter == 0) {
				data.data.originalEvent.preventDefault();
				sensorZoomScene.data = data;
				//Zoom.interactive=false
				Zoom.touchZoomCounter += 1;
				console.log(Zoom.touchZoomCounter)
				sensorZoomScene.dragging = true;
				if (Zoom.touchZoomCounter == 1) {
					sensorZoomScene2.interactive = true
				}
			}
		}
		sensorZoomScene.on("touchstart", touch1Start);

		var touch1Stop = (data) => {
			Zoom.touchZoomCounter = 0
			sensorZoomScene.dragging = false;
			Zoom.touch1MoveX1 = Zoom.touch1MoveY1 = Zoom.touch1MoveX2 = Zoom.touch1MoveY2 = 0
			Zoom.diffX1 = Zoom.diffX2 = Zoom.diffY1 = Zoom.diffY2 = ""
			Zoom.squeze1 = 0
			upperScene.interactive = true;
			if (Menu.selectBool) {
				upperScene.interactive = false;
			}
			sensorZoomScene2.interactive = false
		}
		sensorZoomScene.on("touchend", touch1Stop);
		sensorZoomScene.on("touchendoutside", touch1Stop);


		var touch1Move = (data) => {
			if (sensorZoomScene.dragging && Zoom.touchZoomCounter == 2) {
				Zoom.squeze1 += 1
				Zoom.newPosition1 = data.data.getLocalPosition(sensorZoomScene.parent);

				if (Zoom.squeze1 == 1) {
					Zoom.touch1MoveX1 = Zoom.newPosition1.x
					Zoom.touch1MoveY1 = Zoom.newPosition1.y
				} else if (Zoom.squeze1 == 2) {
					Zoom.touch1MoveX2 = Zoom.touch1MoveX1
					Zoom.touch1MoveY2 = Zoom.touch1MoveY1
					Zoom.touch1MoveX1 = Zoom.newPosition1.x
					Zoom.touch1MoveY1 = Zoom.newPosition1.y
					Zoom.squeze1 = 1;
					Zoom.calculable1 = true
					Zoom.squezeZoomCalc()
				}

			}
		}
		sensorZoomScene.on("touchmove", touch1Move);


		var touch2Start = (data) => {
			console.log("sensor2 Touch")
			if (Zoom.touchZoomCounter == 1) {
				data.data.originalEvent.preventDefault();
				sensorZoomScene2.data = data;
				//Zoom.interactive=false
				Zoom.touchZoomCounter += 1;
				sensorZoomScene2.dragging = true;
				upperScene.interactive = false;
				// if(scaleBool){sensorScaleBulleScene.interactive=false}
				Zoom.calculable1 = false
				console.log("touched for the second time")

			}
		}
		sensorZoomScene2.on("touchstart", touch2Start);

		var touch2Stop = (data) => {
			sensorZoomScene2.interactive = false

			sensorZoomScene2.dragging = false;
			Zoom.touchZoomCounter = 0;
			upperScene.interactive = true;
			if (Menu.selectBool) {
				upperScene.interactive = false;
			}
			Zoom.touch2MoveX1 = Zoom.touch2MoveY1 = Zoom.touch2MoveX2 = Zoom.touch2MoveY2 = 0;
			Zoom.diffX1 = Zoom.diffX2 = Zoom.diffY1 = Zoom.diffY2 = "";
			Zoom.squeze2 = 0;
			Zoom.calculable2 = false;
		}
		sensorZoomScene2.on("touchend", touch2Stop);
		sensorZoomScene2.on("touchendoutside", touch2Stop);

		var touch2Move = (data) => {
			if (sensorZoomScene2.dragging && Zoom.touchZoomCounter == 2) {
				console.log("zooming double touch")
				Zoom.squeze2 += 1
				Zoom.newPosition2 = sensorZoomScene2.data.data.getLocalPosition(sensorZoomScene2.parent);





				if (Zoom.squeze2 == 1) {
					Zoom.touch2MoveX1 = Zoom.newPosition2.x
					Zoom.touch2MoveY1 = Zoom.newPosition2.y
				} else if (Zoom.squeze2 == 2) {
					Zoom.touch2MoveX2 = Zoom.touch2MoveX1
					Zoom.touch2MoveY2 = Zoom.touch2MoveY1
					Zoom.touch2MoveX1 = Zoom.newPosition2.x
					Zoom.touch2MoveY1 = Zoom.newPosition2.y
					Zoom.squeze2 = 1;
					Zoom.calculable2 = true
					Zoom.squezeZoomCalc()
				}

			}
		}
		sensorZoomScene2.on("touchmove", touch2Move);

	}

	static squezeZoomCalc() {
		var scaleScene = Rezo.scaleScene;
		if (Rezo.sensorZoomScene2.dragging && Rezo.sensorZoomScene.dragging && Zoom.calculable2 && Zoom.calculable1) {
			var diffX1 = Zoom.touch1MoveX1 - Zoom.touch2MoveX1
			var diffX2 = Zoom.touch1MoveX2 - Zoom.touch2MoveX2
			var diffY1 = Zoom.touch1MoveY1 - Zoom.touch2MoveY1
			var diffY2 = Zoom.touch1MoveY2 - Zoom.touch2MoveY2
			if (Math.abs(diffX1) < Math.abs(diffX2) || Math.abs(diffY1) < Math.abs(diffY2)) {
				scaleScene.scale.x /= 1.02
				scaleScene.scale.y /= 1.02
			} else if (Math.abs(diffX1) > Math.abs(diffX2) || Math.abs(diffY1) > Math.abs(diffY2)) {
				scaleScene.scale.x *= 1.02
				scaleScene.scale.y *= 1.02
			}
		}
	}
}
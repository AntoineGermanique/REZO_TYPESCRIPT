////////rezo.js
var stage
var scene
var sceneLink
var rezoName=""
var opened=false;
var windowH=window.innerHeight;
var windowW=window.innerWidth;
var renderer

if(windowH>screen.height){
	windowH=screen.height;
	windowW=screen.width;
}

function rezo(){
	//////MENU
	menu();
	//////STAGE CREATION
	var interactive = false;
	stage = new PIXI.Container(0xFFFFFF, interactive);

	// console.log(screen.height+"_screen.height  "+screen.width+"_screen.width")
	// console.log( window.innerHeight+"_window.innerHeight  "+window.innerWidth+"_window.innerWidth")
	
	
	renderer = new PIXI.autoDetectRenderer(windowW, windowH, {transparent:true,antialias:true});
	renderer.transparent = true;
	renderer.view.style.position = "absolute"
    renderer.view.style.width = windowW + "px";
    renderer.view.style.height = windowH + "px";
    renderer.view.style.display = "block";
    renderer.view.id = "canvasId";
	//var renderer = new PIXI.CanvasRenderer(windowW, windowH, null, true, true);
	document.body.appendChild(renderer.view);
	upperScene= new PIXI.Graphics();
	// upperScene.beginFill(0xFF5500, 0.2)
	// upperScene.drawRect(0,0,windowW,windowH)
	upperScene.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
	upperScene.interactive=true
	sensorScaleBulleScene=new PIXI.Container();
	sensorScaleBulleScene.hitArea=new PIXI.Rectangle(0, 0, windowW, windowH);
	sensorScaleBulleScene.interactive=true
	sensorDrawBulleScene=new PIXI.Container();
	sensorDrawBulleScene.hitArea=new PIXI.Rectangle(0, 0, windowW, windowH);
	sensorDrawBulleScene.interactive=false
	scaleScene=  new PIXI.Graphics();
	// scaleScene.beginFill(0x0055FF, 0.2)
	// scaleScene.drawRect(0,0,windowW,windowH)
	scaleScene.pivot.x=windowW/2
	scaleScene.pivot.y=windowH/2	
	scaleScene.x=windowW/2
	scaleScene.y=windowH/2
	sensorZoomScene= new PIXI.Graphics();
	sensorZoomScene.hitArea=new PIXI.Rectangle(0, 0, windowW, windowH);
	sensorZoomScene.interactive=true
	sensorZoomScene2= new PIXI.Container();
	sensorZoomScene2.hitArea=new PIXI.Rectangle(0, 0, windowW, windowH);
	sensorZoomScene2.interactive=false
	scene = new PIXI.Graphics();
	// scene.beginFill(0x0055FF, 0.2)
	// scene.drawRect(0,0,windowW,windowH)
	sceneMulti = new PIXI.Container();
	//sceneMulti.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
	sceneDraw = new PIXI.Container();
	sceneDraw.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
	sceneBulle = new PIXI.Container();
	// sceneBulle.width=windowW;
	// sceneBulle.height=windowH;
	//sceneBulle.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
	sceneLink = new PIXI.Container();
	//sceneLink.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
	//scene.interactive=true
	sceneHyper= new PIXI.Container();
	scene.filterArea = new PIXI.Rectangle(0, 0, windowW, windowH);
	console.log(stage)
	stage.addChild(sensorZoomScene)
	stage.addChild(sensorZoomScene2)
	stage.addChild(sensorScaleBulleScene)
	stage.addChild(sceneDraw)
	sensorZoomScene.addChild(upperScene)
	
	upperScene.addChild(scaleScene)
	scaleScene.addChild(scene)
	scene.addChild(sceneHyper)
	scene.addChild(sceneLink)
	scene.addChild(sceneBulle)
	scene.addChild(sceneMulti)
	
	bulle(circleX,circleY,"rezo",circleColor,circleScale);
	requestAnimationFrame(animate);
	function animate() {
	    requestAnimationFrame(animate);
		renderer.render(stage);
	}
	$("canvas").appendTo("#canvasContainer");
	dragScene();
	scrollZoom();
	touchZoom();
	resizeFun();
	scaleBulle();
	drawIntercative();
	
	
	$("#fakeclicktrigger").click(function(){
		// console.log("yoh")
		// var event = jQuery.Event( "mousedown", {
		// which: 1,
		// pageX: 0,
		// pageY: 0
		// })
		// console.log(event)
		// $("#fakeclicktrigger").trigger(event);
		// console.log("test fake click")
		
		/* x=windowW/2
		y=windowH/2
		
		canvas=$("#canvasId")
		el = document.elementFromPoint(x,y);
		ev = document.createEvent("MouseEvent");
		ev.initMouseEvent(
			"mousedown",
			//true , true ,
			// window, null,
			// x, y, x, y, /* coordinates */
			// false, false, false, false, /* modifier keys */
			// 0 /*left*/, null
		// );
		// el.dispatchEvent(ev); */
		// ev = document.createEvent("MouseEvent");
		// x=windowH/2
		// y=windowW/2
		// el = document.elementFromPoint(x,y);
		
		// ev.initMouseEvent(
			// "mouseup",
			// true /* bubble */, true /* cancelable */,
			// window, null,
			// x, y, 0, 0, /* coordinates */
			// false, false, false, false, /* modifier keys */
			// 0 /*left*/, null
		// );
		// el.dispatchEvent(ev);
		//console.log(el)
	});
}




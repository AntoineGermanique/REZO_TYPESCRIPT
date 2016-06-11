////////rezo.js
"use strict";

function init() {
    new Rezo();
}

class Rezo {
    static isDriveConnected: boolean=false;
    static stage: Stage;
    static scene: Scene;
    static sceneLink: SceneLink;
    static scaleScene: ScaleScene;
    static sceneHyper: PIXI.Container;
    static rezoName = "";
    static opened = false;;
    static windowH = window.innerHeight;
    static windowW = window.innerWidth;
    static renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    static sceneBulle: SceneBulle;
    static upperScene: UpperScene;
    static selectedBulle: Bulle;
    static sensorZoomScene: SensorZoomScene;
    static sensorZoomScene2: SensorZoomScene;
    static sensorScaleBulleScene: PIXI.Graphics;
    constructor() {
        if (Rezo.windowH > screen.height) {
            Rezo.windowH = screen.height;
            Rezo.windowW = screen.width;
        }
        //////STAGE CREATION
        var interactive = false;
        var stage = new Stage();
        Rezo.stage = stage;
        // console.log(screen.height+"_screen.height  "+screen.width+"_screen.width")
        // console.log( window.innerHeight+"_window.innerHeight  "+window.innerWidth+"_window.innerWidth")

        var windowW = Rezo.windowW;
        var windowH = Rezo.windowH;
        var renderer = PIXI.autoDetectRenderer(windowW, windowH, { transparent: true, antialias: true });
        Rezo.renderer = renderer;
        renderer.transparent = true;
        renderer.view.style.position = "absolute"
        renderer.view.style.width = windowW + "px";
        renderer.view.style.height = windowH + "px";
        renderer.view.style.display = "block";
        renderer.view.id = "canvasId";

        document.body.appendChild(renderer.view);

        //upperScene
        var upperScene = new UpperScene();
        Rezo.upperScene = upperScene;

        upperScene.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        upperScene.interactive = true;

        //sensors
        var sensorScaleBulleScene = new PIXI.Graphics();
        Rezo.sensorScaleBulleScene = sensorScaleBulleScene;
        sensorScaleBulleScene.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        sensorScaleBulleScene.interactive = true
        var sensorDrawBulleScene = new PIXI.Container();
        sensorDrawBulleScene.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        sensorDrawBulleScene.interactive = false
        var sensorZoomScene = new SensorZoomScene();
        Rezo.sensorZoomScene = sensorZoomScene;
        sensorZoomScene.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        sensorZoomScene.interactive = true;
        var sensorZoomScene2 = new SensorZoomScene();
        Rezo.sensorZoomScene2 = sensorZoomScene2;
        sensorZoomScene2.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        sensorZoomScene2.interactive = false;

        // scaleScene
        var scaleScene = new ScaleScene();
        scaleScene.pivot.x = windowW / 2
        scaleScene.pivot.y = windowH / 2
        scaleScene.x = windowW / 2
        scaleScene.y = windowH / 2
        Rezo.scaleScene = scaleScene;
        //scene
        var scene = new Scene();
        Rezo.scene = scene;

        //sceneMulti
        sceneMulti = new PIXI.Container();

        //sceneDraw
        sceneDraw = new PIXI.Container();
        sceneDraw.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);

        //sceneBulle;
        var sceneBulle = new PIXI.Container();
        Rezo.sceneBulle = sceneBulle;

        //sceneLink;
        var sceneLink = new PIXI.Container();
        Rezo.sceneLink = sceneLink;

        //sceneHyper
        var sceneHyper = new PIXI.Container();
        Rezo.sceneHyper = sceneHyper;

        scene.filterArea = new PIXI.Rectangle(0, 0, windowW, windowH);

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

        stage.sensorScaleBulleScene = sensorScaleBulleScene;
        stage.sensorZoomScene = sensorZoomScene;
        stage.sensorZoomScene2 = sensorZoomScene2;
        sensorZoomScene.upperScene = upperScene;
        upperScene.scaleScene = scaleScene;
        scaleScene.scene = scene;
        scene.sceneBulle = sceneBulle;
        scene.sceneHyper = sceneHyper;
        scene.sceneLink = sceneLink;
        scene.sceneMulti = sceneMulti;


        var primaryBulle = new Bulle(circleX, circleY, "rezo", circleColor, circleScale);
        Rezo.sceneBulle.addChild(primaryBulle);

        requestAnimationFrame(animate);
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(stage);
        }
        $("canvas").appendTo("#canvasContainer");
        upperScene.dragScene();
        scrollZoom();
        touchZoom();
        resizeFun();
        scaleBulle();
        drawIntercative();
        menu();

    }
}

//function rezo(){
//	//////MENU
//	menu();
//	//////STAGE CREATION
//	var interactive = false;
//	stage = new PIXI.Container();

//	// console.log(screen.height+"_screen.height  "+screen.width+"_screen.width")
//	// console.log( window.innerHeight+"_window.innerHeight  "+window.innerWidth+"_window.innerWidth")
	
	
//    renderer = PIXI.autoDetectRenderer(windowW, windowH, { transparent: true, antialias: true });
//	renderer.transparent = true;
//	renderer.view.style.position = "absolute"
//    renderer.view.style.width = windowW + "px";
//    renderer.view.style.height = windowH + "px";
//    renderer.view.style.display = "block";
//    renderer.view.id = "canvasId";
//	//var renderer = new PIXI.CanvasRenderer(windowW, windowH, null, true, true);
//	document.body.appendChild(renderer.view);
//	upperScene= new PIXI.Graphics();
//	// upperScene.beginFill(0xFF5500, 0.2)
//	// upperScene.drawRect(0,0,windowW,windowH)
//	upperScene.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
//	upperScene.interactive=true
//	sensorScaleBulleScene=new PIXI.Container();
//	sensorScaleBulleScene.hitArea=new PIXI.Rectangle(0, 0, windowW, windowH);
//	sensorScaleBulleScene.interactive=true
//	var sensorDrawBulleScene=new PIXI.Container();
//	sensorDrawBulleScene.hitArea=new PIXI.Rectangle(0, 0, windowW, windowH);
//	sensorDrawBulleScene.interactive=false
//	scaleScene=  new PIXI.Graphics();
//	// scaleScene.beginFill(0x0055FF, 0.2)
//	// scaleScene.drawRect(0,0,windowW,windowH)
//	scaleScene.pivot.x=windowW/2
//	scaleScene.pivot.y=windowH/2	
//	scaleScene.x=windowW/2
//	scaleScene.y=windowH/2
//	sensorZoomScene= new PIXI.Graphics();
//	sensorZoomScene.hitArea=new PIXI.Rectangle(0, 0, windowW, windowH);
//    sensorZoomScene.interactive = true
//    sensorZoomScene2 = new PIXI.Graphics();
//	sensorZoomScene2.hitArea=new PIXI.Rectangle(0, 0, windowW, windowH);
//	sensorZoomScene2.interactive=false
//	scene = new PIXI.Graphics();
//	// scene.beginFill(0x0055FF, 0.2)
//	// scene.drawRect(0,0,windowW,windowH)
//	sceneMulti = new PIXI.Container();
//	//sceneMulti.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
//	sceneDraw = new PIXI.Container();
//	sceneDraw.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
//	sceneBulle = new PIXI.Container();
//	// sceneBulle.width=windowW;
//	// sceneBulle.height=windowH;
//	//sceneBulle.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
//	sceneLink = new PIXI.Container();
//	//sceneLink.hitArea = new PIXI.Rectangle(0, 0, 0, 0);
//	//scene.interactive=true
//	sceneHyper= new PIXI.Container();
//	scene.filterArea = new PIXI.Rectangle(0, 0, windowW, windowH);
//	console.log(stage)
//	stage.addChild(sensorZoomScene)
//	stage.addChild(sensorZoomScene2)
//	stage.addChild(sensorScaleBulleScene)
//	stage.addChild(sceneDraw)
//	sensorZoomScene.addChild(upperScene)
	
//	upperScene.addChild(scaleScene)
//	scaleScene.addChild(scene)
//	scene.addChild(sceneHyper)
//	scene.addChild(sceneLink)
//	scene.addChild(sceneBulle)
//	scene.addChild(sceneMulti)
	
//	new Bulle(circleX,circleY,"rezo",circleColor,circleScale);
//	requestAnimationFrame(animate);
//	function animate() {
//	    requestAnimationFrame(animate);
//		renderer.render(stage);
//	}
//	$("canvas").appendTo("#canvasContainer");
//	dragScene();
//	scrollZoom();
//	touchZoom();
//	resizeFun();
//	scaleBulle();
//	drawIntercative();
	
	
//	$("#fakeclicktrigger").click(function(){
//		// console.log("yoh")
//		// var event = jQuery.Event( "mousedown", {
//		// which: 1,
//		// pageX: 0,
//		// pageY: 0
//		// })
//		// console.log(event)
//		// $("#fakeclicktrigger").trigger(event);
//		// console.log("test fake click")
		
//		/* x=windowW/2
//		y=windowH/2
		
//		canvas=$("#canvasId")
//		el = document.elementFromPoint(x,y);
//		ev = document.createEvent("MouseEvent");
//		ev.initMouseEvent(
//			"mousedown",
//			//true , true ,
//			// window, null,
//			// x, y, x, y, /* coordinates */
//			// false, false, false, false, /* modifier keys */
//			// 0 /*left*/, null
//		// );
//		// el.dispatchEvent(ev); */
//		// ev = document.createEvent("MouseEvent");
//		// x=windowH/2
//		// y=windowW/2
//		// el = document.elementFromPoint(x,y);
		
//		// ev.initMouseEvent(
//			// "mouseup",
//			// true /* bubble */, true /* cancelable */,
//			// window, null,
//			// x, y, 0, 0, /* coordinates */
//			// false, false, false, false, /* modifier keys */
//			// 0 /*left*/, null
//		// );
//		// el.dispatchEvent(ev);
//		//console.log(el)
//	});
//}




////////rezo.js
"use strict";

function init() {
    new Rezo();
}

class Rezo {
    static load: HTMLElement = <HTMLElement>document.getElementById("loading");
    static rezoId: string;
    static isDriveConnected: boolean = false;
    static stage: Stage;
    static scene: Scene;
    static sceneLink: SceneLink;
    static scaleScene: ScaleScene;
    static sceneHyper: PIXI.Container;
    static rezoName = "Nouveau Rezo";
    static rezoNameDiv = $("#rezoName");
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
    static sceneDraw: SceneDraw;
    constructor() {
        Rezo.rezoNameDiv.html(Rezo.rezoName);
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

        //sceneSelect
        sceneSelect = new PIXI.Container();
        sceneSelect.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);

        //sceneDraw

        sceneDraw = new SceneDraw();
        sceneDraw.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        Rezo.sceneDraw = sceneDraw;

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
        stage.addChildAt(sceneSelect, 0);
        stage.addChild(sceneDraw);
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
        selectIntercative();
        menu();
        setSortingListener() 

    }
    static newRezo = function () {
        Rezo.rezoName = "Nouveau Rezo";
        Rezo.rezoNameDiv.html(Rezo.rezoName);
        Rezo.opened = false;
        while (bubbleArray.length > 0) {
            bubbleArray.pop();
        }
        while (Link.linkArray.length > 0) {
            Link.linkArray.pop();
        }

        Rezo.sceneBulle.removeChildren();
        Rezo.sceneLink.removeChildren();

        circleX = Rezo.windowW / 2;
        circleY = Rezo.windowH / 2;
        Rezo.sceneBulle.addChild(new Bulle(circleX, circleY, "rezo", circleColor, circleScale, ShapeEnum.circle));
        Rezo.scaleScene.scale.x = 1
        Rezo.scaleScene.scale.y = 1
        Rezo.scene.position.x = 0
        Rezo.scene.position.y = 0
        $("img#closeOpen").trigger("click");

    }
}



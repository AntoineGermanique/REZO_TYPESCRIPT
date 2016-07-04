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
    static initialRezo: string;
    static autoSaveRezo: string;
    static hasRecoveryAvailable: boolean
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


        var primaryBulle = new Bulle(bulleX, bulleY, "rezo", color, defaultScale);
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
        setSortingListener();
        $("#loading").hide();
        Rezo.initialRezo = JSON.stringify(nullifyTimeStamp(createJsonRezo(Rezo.rezoName)));
        //$(window).on('beforeunload', function () {
        //    return 'Are you sure you want to leave?';
        //});
        if (document.cookie.indexOf("hasRecoveryAvailable=false") == -1) {
            if (document.cookie.indexOf("hasRecoveryAvailable=true") != -1) {
                Rezo.hasRecoveryAvailable = true;
            } else {
                Rezo.hasRecoveryAvailable = false;
                document.cookie = "hasRecoveryAvailable=false";
            }
        } else {
            Rezo.hasRecoveryAvailable = false;
        }
        

        if (Rezo.hasRecoveryAvailable) {
            //this.suggestRecovery();
        }else{
            saveLocal("AutoSave");
        }
        window.setInterval(this.checkAutoSave, 30000);

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

        bulleX = Rezo.windowW / 2;
        bulleY = Rezo.windowH / 2;
        var bulle=
        Rezo.sceneBulle.addChild(new Bulle(bulleX, bulleY, "rezo", bulleColor, defaultScale, ShapeEnum.circle));

        Rezo.scaleScene.scale.x = 1
        Rezo.scaleScene.scale.y = 1
        Rezo.scene.position.x = 0
        Rezo.scene.position.y = 0
        $("img#closeOpen").trigger("click");

    }

    static checkSaveStatus() {
        var rezoSaveToCompare = JSON.stringify(nullifyTimeStamp(createJsonRezo(Rezo.rezoName)));
        if (Rezo.isSaved(rezoSaveToCompare)){

        } else {
            if (confirm("le rezo n'est apparement pas sauver, faut-il le faire?")) {
                if (Rezo.isDriveConnected) {
                    saveDrive();
                } else {
                    saveLocal();
                }
            }
        }
    }
    static isSaved(rezoSaveToCompare: string): boolean{
        if (rezoSaveToCompare == Rezo.initialRezo) {
            return true;
        }
        return false
    }
    checkAutoSave() {
        if (!Rezo.hasRecoveryAvailable) {

                saveLocal("AutoSave");
            
        }
    }
    suggestRecovery() {
        if (confirm("un rezo non sauver est récupérable, le restaurer ?")) {
            localLoad("AutoSave")
            Rezo.hasRecoveryAvailable = false;
        } else {

        }
    }
}



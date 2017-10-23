////////rezo.js
"use strict";
import {
    Menu,
    Stage,
    Scene,
    SceneLink,
    SceneDraw,
    ScaleScene,
    SceneBulle,
    UpperScene, Bulle,
    SensorZoomScene,
    Zoom, resizeFun,
    Scale, setSortingListener, Save,
    bubbleArray, Link,
    ShapeEnum, LocalStorage,
    Select, background

} from './index'
import * as PIXI from 'pixi.js'
import * as $ from 'jquery'

declare const ENV
console.log(ENV);

(() => {
    window.addEventListener('load', () => new Rezo(), false);
})()

export class Rezo {
    static load: HTMLElement = <HTMLElement>document.getElementById("loading");
    static rezoId: string;
    static isDriveConnected: boolean = false;
    static stage: Stage;
    static scene: Scene;
    static sceneSelect: PIXI.Container
    static sceneMulti: PIXI.Container
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
    static menu = new Menu()
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
        Rezo.sceneMulti = new PIXI.Container();

        //sceneSelect
        Rezo.sceneSelect = new PIXI.Container();
        Rezo.sceneSelect.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);

        //sceneDraw

        Rezo.sceneDraw = new SceneDraw();
        Rezo.sceneDraw.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        Rezo.sceneDraw = Rezo.sceneDraw;

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
        stage.addChildAt(Rezo.sceneSelect, 0);
        stage.addChild(Rezo.sceneDraw);
        sensorZoomScene.addChild(upperScene)

        upperScene.addChild(scaleScene)

        scaleScene.addChild(scene)

        scene.addChild(sceneHyper)
        scene.addChild(sceneLink)
        scene.addChild(sceneBulle)
        scene.addChild(Rezo.sceneMulti)

        stage.sensorScaleBulleScene = sensorScaleBulleScene;
        stage.sensorZoomScene = sensorZoomScene;
        stage.sensorZoomScene2 = sensorZoomScene2;
        sensorZoomScene.upperScene = upperScene;
        upperScene.scaleScene = scaleScene;
        scaleScene.scene = scene;
        scene.sceneBulle = sceneBulle;
        scene.sceneHyper = sceneHyper;
        scene.sceneLink = sceneLink;
        scene.sceneMulti = Rezo.sceneMulti;
        // let images = ['../assets/upper.png', '../assets/sensor1.png', '../assets/stage.png', '../assets/scale.png']
        // background.loadImages(images).then(() => {
        //     sensorZoomScene.addChild(background.makeBgContainer(new PIXI.Point(100, 100), PIXI.Sprite.fromImage('../assets/sensor1.png')))
        //     stage.addChild(background.makeBgContainer(new PIXI.Point(100, 100), PIXI.Sprite.fromImage('../assets/stage.png')))
        //     upperScene.addChild(background.makeBgContainer(new PIXI.Point(100, 100), PIXI.Sprite.fromImage('../assets/upper.png')))
        //     scaleScene.addChild(background.makeBgContainer(new PIXI.Point(100, 100), PIXI.Sprite.fromImage('../assets/scale.png')))
        // })

        var primaryBulle = new Bulle(Rezo.windowW / 2, Rezo.windowH / 2, "rezo", Bulle.bulleColor, Bulle.defaultScale);
        Rezo.sceneBulle.addChild(primaryBulle);

        requestAnimationFrame(animate);
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(stage);
        }
        $("canvas").appendTo("#canvasContainer");
        upperScene.dragScene();
        Zoom.scrollZoom();
        Zoom.touchZoom();
        resizeFun();
        Scale.scaleBulle();
        Select.selectIntercative();
        Menu.menu();
        setSortingListener();
        $("#loading").hide();
        Rezo.initialRezo = JSON.stringify(Save.nullifyTimeStamp(Save.createJsonRezo(Rezo.rezoName)));
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
        } else {
            Save.saveLocal("AutoSave");
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

        Bulle.bulleX = Rezo.windowW / 2;
        Bulle.bulleY = Rezo.windowH / 2;
        var bulle =
            Rezo.sceneBulle.addChild(new Bulle(Bulle.bulleX, Bulle.bulleY, "rezo", Bulle.bulleColor, Bulle.defaultScale, ShapeEnum.circle));

        Rezo.scaleScene.scale.x = 1
        Rezo.scaleScene.scale.y = 1
        Rezo.scene.position.x = 0
        Rezo.scene.position.y = 0
        $("img#closeOpen").trigger("click");

    }

    static checkSaveStatus() {
        var rezoSaveToCompare = JSON.stringify(Save.nullifyTimeStamp(Save.createJsonRezo(Rezo.rezoName)));
        if (Rezo.isSaved(rezoSaveToCompare)) {

        } else {
            if (confirm("le rezo n'est apparement pas sauver, faut-il le faire?")) {
                if (Rezo.isDriveConnected) {
                    Save.saveDrive();
                } else {
                    Save.saveLocal();
                }
            }
        }
    }
    static isSaved(rezoSaveToCompare: string): boolean {
        if (rezoSaveToCompare == Rezo.initialRezo) {
            return true;
        }
        return false
    }
    checkAutoSave() {
        if (!Rezo.hasRecoveryAvailable) {

            Save.saveLocal("AutoSave");

        }
    }
    suggestRecovery() {
        if (confirm("un rezo non sauver est r�cup�rable, le restaurer ?")) {
            LocalStorage.localLoad("AutoSave")
            Rezo.hasRecoveryAvailable = false;
        } else {

        }
    }
}



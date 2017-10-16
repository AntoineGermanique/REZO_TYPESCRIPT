"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//////////resizeFun.js
const _1 = require("./");
function resizeFun() {
    $(window).resize(function () {
        updateWindowSize();
        var renderer = _1.Rezo.renderer;
        var windowW = _1.Rezo.windowW;
        var windowH = _1.Rezo.windowH;
        var scaleScene = _1.Rezo.scaleScene;
        var upperScene = _1.Rezo.upperScene;
        renderer.resize(windowW, windowH);
        renderer.view.style.width = windowW + "px";
        renderer.view.style.height = windowH + "px";
        scaleScene.pivot.x = windowW / 2;
        scaleScene.pivot.y = windowH / 2;
        scaleScene.x = windowW / 2;
        scaleScene.y = windowH / 2;
        upperScene.clear();
        // upperScene.beginFill(0xFF5500, 0.2)
        // upperScene.drawRect(0,0,windowW,windowH)
        //upperScene.hitArea.width = windowW;//old way
        //upperScene.hitArea.height = windowH;
        upperScene.width = windowW;
        upperScene.height = windowH;
        _1.Rezo.sensorZoomScene.width = windowW;
        _1.Rezo.sensorZoomScene.height = windowH;
        _1.Rezo.sensorZoomScene2.width = windowW;
        _1.Rezo.sensorZoomScene2.height = windowH;
        scaleScene.scene.filterArea.width = windowW;
        scaleScene.scene.filterArea.height = windowH;
    });
}
exports.resizeFun = resizeFun;
function updateWindowSize() {
    var windowH = window.innerHeight;
    var windowW = window.innerWidth;
    if (windowH > screen.height) {
        windowH = screen.height;
        windowW = screen.width;
    }
    _1.Rezo.windowW = windowW;
    _1.Rezo.windowH = windowH;
}
exports.updateWindowSize = updateWindowSize;

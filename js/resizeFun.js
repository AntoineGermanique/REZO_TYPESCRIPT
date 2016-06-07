//////////resizeFun.js
function resizeFun() {
    $(window).resize(function () {
        updateWindowSize();
        renderer.width = windowW;
        renderer.height = windowH;
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
        sensorZoomScene.width = windowW;
        sensorZoomScene.height = windowH;
        sensorZoomScene2.width = windowW;
        sensorZoomScene2.height = windowH;
        scene.filterArea.width = windowW;
        scene.filterArea.height = windowH;
    });
}
function updateWindowSize() {
    windowH = window.innerHeight;
    windowW = window.innerWidth;
    if (windowH > screen.height) {
        windowH = screen.height;
        windowW = screen.width;
    }
}
//# sourceMappingURL=resizeFun.js.map
//////////resizeFun.js
function resizeFun(){
	$( window ).resize(function() {
        updateWindowSize();
        var renderer = Rezo.renderer
        var windowW = Rezo.windowW;
        var windowH = Rezo.windowH;
        var scaleScene = Rezo.scaleScene;
        var upperScene = Rezo.upperScene;
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
        Rezo.sensorZoomScene.width = windowW;
        Rezo.sensorZoomScene.height = windowH;
        Rezo.sensorZoomScene2.width = windowW;
        Rezo.sensorZoomScene2.height = windowH;
        scaleScene.scene.filterArea.width = windowW;
        scaleScene.scene.filterArea.height = windowH;
		
	});
}

function updateWindowSize() {
    
	var windowH=window.innerHeight;
	var windowW=window.innerWidth;
	if(windowH>screen.height){
		windowH=screen.height;
		windowW=screen.width;
    }
    Rezo.windowW = windowW;
    Rezo.windowH = windowH;
}
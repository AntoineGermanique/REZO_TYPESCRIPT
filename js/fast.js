///////////////////////////fast.js
var sensorFast;
function fastFun() {
    if (!fastBool) {
        $("#fastBulle").css({ "box-shadow": "lime 0px 0px 20px inset", "border-radius": "20px", "padding": "3px" });
        $("body").css({ "border": "lime 1em dashed" });
        renderer.transparent = true;
        //console.log(renderer)
        console.log(sceneBulle);
        sensorFast = new PIXI.Graphics();
        sensorFast.beginFill(0x00ff06, 0);
        sensorFast.drawRect(0, 0, windowW, windowH);
        sensorFast.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH),
            sensorFast.interactive = true;
        stage.addChild(sensorFast);
        sensorFast.mousedown = sensorFast.touchstart = function (data) {
            data.data.originalEvent.preventDefault();
            this.data = data;
            console.log(this.data);
            var newPosition = this.data.data.getLocalPosition(this.parent);
            var newFastBulleText = prompt('Text nouvelle bulle');
            if (newFastBulleText) {
                updateWindowSize();
                var fastPoX = newPosition.x / scaleScene.scale.x - scene.x - (windowW / scaleScene.scale.x - windowW) / 2;
                var fastPoY = newPosition.y / scaleScene.scale.x - scene.y - (windowH / scaleScene.scale.x - windowH) / 2;
                bulle(fastPoX, fastPoY, newFastBulleText, circleColor);
                linkBool = true;
                link3Bool = true;
                link2Bool = false;
                linkFun();
            }
        };
        fastBool = true;
    }
    else {
        $("body").css({ "border": "0em" });
        $("#fastBulle").css({ "box-shadow": "none", "border-radius": "20px", "padding": "0px" });
        renderer.transparent = true;
        //console.log(renderer)
        stage.removeChild(sensorFast);
        linkBool = false;
        var linkBool3 = false;
        emptyLinkArray();
        //sceneBulle.mousedown = sceneBulle.touchstart = function () { };
        fastBool = false;
    }
}
//# sourceMappingURL=fast.js.map
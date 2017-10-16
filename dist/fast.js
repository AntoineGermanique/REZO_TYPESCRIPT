"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///////////////////////////fast.js
var sensorFast;
const _1 = require("./");
function fastFun() {
    if (!_1.Menu.fastBool) {
        if (_1.Menu.editBool) {
            $("#editBulle").trigger("click");
        }
        _1.Menu.disableButton($("#editBulle"));
        _1.Menu.setBackground(_1.Ressource.pathImgFast);
        $("#fastBulle").css({ "box-shadow": "lime 0px 0px 20px inset", "border-radius": "20px", "padding": "3px" });
        //$( "body" ).css({"border": "lime 1em dashed"})
        //renderer.transparent=true
        //console.log(renderer)
        var windowH = _1.Rezo.windowH;
        var windowW = _1.Rezo.windowW;
        sensorFast = new PIXI.Graphics();
        sensorFast.beginFill(0x00ff06, 0);
        sensorFast.drawRect(0, 0, windowW, windowH);
        sensorFast.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        sensorFast.interactive = true;
        var stage = _1.Rezo.stage;
        stage.addChild(sensorFast);
        sensorFast.mousedown = sensorFast.touchstart = function (data) {
            data.data.originalEvent.preventDefault();
            this.data = data;
            console.log(this.data);
            var newPosition = this.data.data.getLocalPosition(this.parent);
            var newFastBulleText = prompt('Text nouvelle bulle');
            if (newFastBulleText) {
                _1.updateWindowSize();
                var scaleScene = _1.Rezo.scaleScene;
                var fastPoX = newPosition.x / scaleScene.scale.x - scaleScene.scene.x - (windowW / scaleScene.scale.x - windowW) / 2;
                var fastPoY = newPosition.y / scaleScene.scale.x - scaleScene.scene.y - (windowH / scaleScene.scale.x - windowH) / 2;
                _1.Rezo.sceneBulle.addChild(new _1.Bulle(fastPoX, fastPoY, newFastBulleText, _1.Bulle.bulleColor));
                _1.Link.linkBool = true;
                _1.Link.link3Bool = true;
                _1.Link.link2Bool = false;
                _1.Link.linkFun();
            }
        };
        _1.Menu.fastBool = true;
    }
    else {
        _1.Menu.enableButton($("#editBulle"), _1.Menu.editButton);
        _1.Menu.setBackground();
        $("body").css({ "border": "0em" });
        $("#fastBulle").css({ "box-shadow": "none", "border-radius": "20px", "padding": "0px" });
        //console.log(renderer)
        _1.Rezo.stage.removeChild(sensorFast);
        _1.Link.linkBool = false;
        _1.Link.link3Bool = false;
        _1.Link.emptyLinkArray();
        //sceneBulle.mousedown = sceneBulle.touchstart = function () { };
        _1.Menu.fastBool = false;
    }
}
exports.fastFun = fastFun;
//# sourceMappingURL=fast.js.map
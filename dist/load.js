"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////////////load.js
const _1 = require("./");
class Load {
    static load2(rezoSave, title) {
        _1.Rezo.sceneBulle.removeChildren();
        _1.Rezo.sceneLink.removeChildren();
        while (_1.bubbleArray.length > 0) {
            _1.bubbleArray.pop();
        }
        while (_1.Link.linkArray.length > 0) {
            _1.Link.linkArray.pop();
        }
        _1.Rezo.rezoName = title;
        _1.Rezo.rezoNameDiv.html(title);
        _1.Save.ResetAutoSaveCookie(rezoSave);
        for (var i = 0; i < rezoSave.bullesArray.length; i++) {
            var bulleInfo = rezoSave.bullesArray[i];
            if (bulleInfo.shape == _1.ShapeEnum.circle) {
                _1.Rezo.sceneBulle.addChild(new _1.Bulle(bulleInfo.loc.x, bulleInfo.loc.y, bulleInfo.text, parseInt(bulleInfo.color.replace(/^#/, ''), 16), bulleInfo.scale.x, bulleInfo.shape));
            }
            else if (bulleInfo.shape == _1.ShapeEnum.poly) {
                var timeStamps = (bulleInfo.timeStamps) ? bulleInfo.timeStamps[0] : null;
                var drawText = new _1.Draw(bulleInfo.polyTextPath[0], timeStamps);
                drawText.setPath(bulleInfo.polyTextPath);
                var drawBulle = new _1.Draw({ x: bulleInfo.polyPath[0], y: bulleInfo.polyPath[0] }, null, true);
                drawBulle.setPathNumber(bulleInfo.polyPath);
                var bulle = new _1.Bulle(bulleInfo.loc.x, bulleInfo.loc.y, bulleInfo.text, parseInt(bulleInfo.color.replace(/^#/, ''), 16), bulleInfo.scale.x, bulleInfo.shape, drawBulle, drawText);
                _1.Rezo.sceneBulle.addChild(bulle);
                drawText.drawLine();
                //drawText.setTransform(0, 0);
            }
        }
        for (var i = 0; i < rezoSave.linkSave.length; i++) {
            var lastBulleSelectedIndex = rezoSave.linkSave[i].indexBulle1;
            _1.Bulle.lastBulleSelected = _1.Rezo.sceneBulle.getChildAt(lastBulleSelectedIndex);
            var selectedBulleIndex = rezoSave.linkSave[i].indexBulle2;
            _1.Rezo.selectedBulle = _1.Rezo.sceneBulle.getChildAt(selectedBulleIndex);
            _1.Link.bubbleLinked.push(_1.Bulle.lastBulleSelected);
            _1.Link.linkBool = true;
            _1.Link.link2Bool = true;
            _1.Link.linkFun();
        }
        _1.Link.linkBool = false;
        _1.Link.link2Bool = false;
        _1.Rezo.scene.position.x = rezoSave.loc.x;
        _1.Rezo.scene.position.y = rezoSave.loc.y;
        _1.Rezo.scaleScene.scale.x = rezoSave.scale.x;
        _1.Rezo.scaleScene.scale.y = rezoSave.scale.y;
        $('#loading').css("display", "none");
        //setTimeout(SceneBulle.bitmapDraw(),1000);
    }
    static load(bubble, linkLoad, title, scenePo, scalePo) {
        while (_1.bubbleArray.length > 0) {
            _1.bubbleArray.pop();
        }
        while (_1.Link.linkArray.length > 0) {
            _1.Link.linkArray.pop();
        }
        //console.log(bubble)
        _1.Rezo.rezoName = title;
        _1.Rezo.opened = true;
        var scaleScene = _1.Rezo.scaleScene;
        for (var i = 0; i < bubble.length; i++) {
            if (bubble[i][2]) {
                scaleScene.scene.sceneBulle.addChild(new _1.Bulle(bubble[i][0][0], bubble[i][0][1], bubble[i][2][0], bubble[i][2][1], bubble[i][2][2]));
            }
            else {
                scaleScene.scene.sceneBulle.addChild(new _1.Bulle(bubble[i][0][0], bubble[i][0][1], "txt"));
            }
        }
        ///////////////////////////////////load link
        for (var z = 0; z < linkLoad.length; z++) {
            var lastBulleSelectedIndex = linkLoad[z][0];
            _1.Bulle.lastBulleSelected = scaleScene.scene.sceneBulle.getChildAt(lastBulleSelectedIndex);
            var selectedBulleIndex = linkLoad[z][1];
            _1.Rezo.selectedBulle = scaleScene.scene.sceneBulle.getChildAt(selectedBulleIndex);
            _1.Link.bubbleLinked.push(_1.Bulle.lastBulleSelected);
            _1.Link.linkBool = true;
            _1.Link.link2Bool = true;
            console.log("test");
            _1.Link.linkFun();
            console.log("test");
        }
        _1.Link.linkBool = false;
        var linkBool2 = false;
        scaleScene.scene.position.x = parseInt(scenePo[0]);
        scaleScene.scene.position.y = parseInt(scenePo[1]);
        var scaleX = parseFloat(scalePo[0]);
        var scaleY = parseFloat(scalePo[1]);
        if (isNaN(scaleX) || isNaN(scaleY)) {
            scaleX = 1;
            scaleY = 1;
        }
        scaleScene.scale.x = scaleX;
        scaleScene.scale.y = scaleY;
        if (_1.Bulle.bubbleTemp != null) {
            while (_1.Bulle.bubbleTemp.length > 0) {
                _1.Bulle.bubbleTemp.pop();
            }
        }
    }
}
exports.Load = Load;
//# sourceMappingURL=load.js.map
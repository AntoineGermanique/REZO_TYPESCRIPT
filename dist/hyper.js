"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//////////////////////hyper.js
const _1 = require("./");
class Hyper {
    constructor() {
        this.hyperSize = 200;
        this.hyperColor = 0x00FFCC;
        this.hyperScale = 1;
        this.hyperX = _1.Rezo.windowW / 2;
        this.hyperY = _1.Rezo.windowH / 2;
        this.hyperHandlerSize = 40;
        this.hyperText = "texte long pour voir ce que �a donne'";
    }
    hyperPlusFun() {
        this.hyper = new PIXI.Container();
        this.hyper.x = this.hyperX;
        this.hyper.y = this.hyperY;
        // hyper.pivot.x=-hyper.x/2
        this.hyper.pivot.y = -this.hyperSize + this.hyperHandlerSize;
        var hyperBelly = new PIXI.Graphics();
        // hyperBelly.lineStyle(16,hyperColor,0.5)
        hyperBelly.beginFill(this.hyperColor, 0.2);
        hyperBelly.drawCircle(0, 0, this.hyperSize);
        Hyper.hyperHandler = new PIXI.Graphics();
        Hyper.hyperHandler.beginFill(this.hyperColor, 1);
        // hyperHandler.drawCircle(2*hyperHandlerSize,0,hyperHandlerSize)
        // hyperHandler.drawCircle(-2*hyperHandlerSize,0,hyperHandlerSize)
        Hyper.hyperHandler.drawRoundedRect(0, 0, this.hyperHandlerSize * 4, this.hyperHandlerSize * 2, this.hyperHandlerSize / 1.1);
        Hyper.hyperHandler.hitArea = new PIXI.Rectangle(0, 0, this.hyperHandlerSize * 4, this.hyperHandlerSize * 2);
        Hyper.hyperHandler.interactive = true;
        Hyper.hyperHandler.x = -2 * this.hyperHandlerSize;
        Hyper.hyperHandler.y = -this.hyperSize;
        Hyper.hyperHandler.endFill();
        var text = new _1.TextRezo(_1.wordwrap(this.hyperText), _1.TextRezoType.type);
        Hyper.hyperHandler.addChild(text);
        Hyper.hyperHandler.addChild(text);
        this.hyper.addChild(hyperBelly);
        this.hyper.addChild(Hyper.hyperHandler);
        _1.Rezo.sceneHyper.addChild(this.hyper);
        console.log(Hyper.hyperHandler);
        text.autoSizeTextHyperHandler(Hyper.hyperHandler);
        text.textDesign(text);
        _1.hyperInteractiveFun();
    }
}
exports.Hyper = Hyper;
//# sourceMappingURL=hyper.js.map
//////////////////////hyper.js
import { Rezo, TextRezo, TextRezoType, wordwrap, hyperInteractiveFun } from './'
import * as PIXI from 'pixi.js'


export class Hyper {
    hyper
    hyperSize = 200
    hyperColor = 0x00FFCC
    hyperScale = 1
    hyperX = Rezo.windowW / 2;
    hyperY = Rezo.windowH / 2;
    hyperHandlerSize = 40
    static hyperHandler: PIXI.Graphics;
    hyperText = "texte long pour voir ce que �a donne'"
    static selectedHyper;


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
        var text = new TextRezo(wordwrap(this.hyperText), TextRezoType.type);
        Hyper.hyperHandler.addChild(text);
        Hyper.hyperHandler.addChild(text);
        this.hyper.addChild(hyperBelly);
        this.hyper.addChild(Hyper.hyperHandler);
        Rezo.sceneHyper.addChild(this.hyper);
        console.log(Hyper.hyperHandler);
        text.autoSizeTextHyperHandler(Hyper.hyperHandler);
        text.textDesign(text);
        hyperInteractiveFun();
    }
}
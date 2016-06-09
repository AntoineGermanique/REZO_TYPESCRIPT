//////////////////////hyper.js
var hyper;
var hyperSize = 200;
var hyperColor = 0x00FFCC;
var hyperScale = 1;
var hyperX = Rezo.windowW / 2;
var hyperY = Rezo.windowH / 2;
var hyperHandlerSize = 40;
var hyperHandler;
var hyperText = "texte long pour voir ce que �a donne'";
var selectedHyper;
function hyperPlusFun() {
    hyper = new PIXI.Container();
    hyper.x = hyperX;
    hyper.y = hyperY;
    // hyper.pivot.x=-hyper.x/2
    hyper.pivot.y = -hyperSize + hyperHandlerSize;
    var hyperBelly = new PIXI.Graphics();
    // hyperBelly.lineStyle(16,hyperColor,0.5)
    hyperBelly.beginFill(hyperColor, 0.2);
    hyperBelly.drawCircle(0, 0, hyperSize);
    hyperHandler = new PIXI.Graphics();
    hyperHandler.beginFill(hyperColor, 1);
    // hyperHandler.drawCircle(2*hyperHandlerSize,0,hyperHandlerSize)
    // hyperHandler.drawCircle(-2*hyperHandlerSize,0,hyperHandlerSize)
    hyperHandler.drawRoundedRect(0, 0, hyperHandlerSize * 4, hyperHandlerSize * 2, hyperHandlerSize / 1.1);
    hyperHandler.hitArea = new PIXI.Rectangle(0, 0, hyperHandlerSize * 4, hyperHandlerSize * 2);
    hyperHandler.interactive = true;
    hyperHandler.x = -2 * hyperHandlerSize;
    hyperHandler.y = -hyperSize;
    hyperHandler.endFill();
    var text = new TextRezo(wordwrap(hyperText, 15), TextRezoType.type);
    hyperHandler.addChild(text);
    hyperHandler.addChild(text);
    hyper.addChild(hyperBelly);
    hyper.addChild(hyperHandler);
    Rezo.sceneHyper.addChild(hyper);
    console.log(hyperHandler);
    text.autoSizeTextHyperHandler(hyperHandler);
    text.textDesign(text);
    hyperInteractiveFun();
}
//# sourceMappingURL=hyper.js.map
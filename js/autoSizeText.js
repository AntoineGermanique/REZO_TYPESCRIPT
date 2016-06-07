/////////////////////autoSizeText.js
'use strict';
function autoSizeText(circleTxt, oldCircleSize) {
    var text = circleTxt.getChildAt(1);
    var circleTxtWidth = text.width / text.scale.x;
    var circleTxtHeight = text.height / text.scale.x;
    var longHypotenus = Math.sqrt(Math.pow(circleTxtWidth / 2, 2) + Math.pow(circleTxtHeight / 2, 2));
    var facText = longHypotenus / oldCircleSize;
    text.scale.x = 1 / facText;
    text.scale.y = 1 / facText;
    console.log(facText);
}
function autoSizeTextHyperHandler(handler, text) {
    var handlerFact = handler.width / handler.height;
    var textFact = text.width / text.height;
    if (handlerFact < textFact) {
        var sizeFact = handler.width / text.width;
        sizeFact *= 0.9;
        text.scale.x *= sizeFact;
        text.scale.y *= sizeFact;
    }
    else {
        var sizeFact = handler.height / text.height;
        sizeFact *= 0.9;
        text.scale.x *= sizeFact;
        text.scale.y *= sizeFact;
    }
}
//# sourceMappingURL=autoSizeText.js.map
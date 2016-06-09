/////////////////////autoSizeText.js
'use strict';
//function autoSizeText(circleTxt: PIXI.Graphics, oldCircleSize: number) {
//    var text: PIXI.Text = <PIXI.Text>circleTxt.getChildAt(1);
//    var circleTxtWidth: number = text.width / text.scale.x;
//    var circleTxtHeight: number = text.height / text.scale.x;
//    var longHypotenus: number = Math.sqrt(Math.pow(circleTxtWidth / 2, 2) + Math.pow(circleTxtHeight / 2, 2));
//    var facText: number = longHypotenus / oldCircleSize;
//    text.scale.x=1/facText;
//    text.scale.y=1/facText;
//	console.log(facText)
//}
//function autoSizeTextHyperHandler(handler,text){
//    var handlerFact: number = handler.width / handler.height
//    var textFact: number = text.width / text.height
//    if (handlerFact < textFact) {
//        var sizeFact: number = handler.width / text.width
//		sizeFact*=0.9
//		text.scale.x*=sizeFact
//		text.scale.y*=sizeFact
//	}else{
//        var sizeFact: number=handler.height/text.height
//		sizeFact*=0.9
//		text.scale.x*=sizeFact
//		text.scale.y*=sizeFact
//	}
//} 
//# sourceMappingURL=autoSizeText.js.map
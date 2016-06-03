/////////////////////autoSizeText.js
function autoSizeText(circleTxt,oldCircleSize){
	circleTxtWidth=circleTxt.getChildAt(1).width/circleTxt.getChildAt(1).scale.x;
	circleTxtHeight=circleTxt.getChildAt(1).height/circleTxt.getChildAt(1).scale.x;
	
	longHypotenus=Math.sqrt(Math.pow(circleTxtWidth/2, 2)+Math.pow(circleTxtHeight/2, 2))
	facText=longHypotenus/oldCircleSize
	circleTxt.getChildAt(1).scale.x=1/facText;
	circleTxt.getChildAt(1).scale.y=1/facText;
	console.log(facText)
	
}
function autoSizeTextHyperHandler(handler,text){
	handlerFact=handler.width/handler.height
	textFact=text.width/text.height
	if(handlerFact<textFact){
		sizeFact=handler.width/text.width
		sizeFact*=0.9
		text.scale.x*=sizeFact
		text.scale.y*=sizeFact
		
	}else{
		sizeFact=handler.height/text.height
		sizeFact*=0.9
		text.scale.x*=sizeFact
		text.scale.y*=sizeFact
	}
}
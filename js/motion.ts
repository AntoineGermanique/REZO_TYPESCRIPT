/////////motion.js
var selectedLink=new Array;
var stillBubbleArray=new Array;
var stillBuble
function linkSelection(data){
	for(var i=0;i<bubbleArray.length;i++){
		if(bubbleArray[i][0]==data){
			if(bubbleArray[i][1]!=""){
				selectedLink.push(bubbleArray[i][1])
			}
			
		}
	}
	if(selectedLink.length>0){
		for(var i=0;i<selectedLink[0].length;i++){
			var indexLink=sceneLink.getChildIndex(selectedLink[0][i])
			
			if(linkArray[indexLink][1]==data){	
				stillBubbleArray.push(linkArray[indexLink][2])
			}else{
				stillBubbleArray.push(linkArray[indexLink][1])
			}
		}
	}
}

function motion(bulleX0,bulleY0){
	if(selectedLink.length>0){
		for(var i=0;i<selectedLink[0].length;i++){
			var bulleX1=Number(stillBubbleArray[i].x);
			var bulleY1=Number(stillBubbleArray[i].y);
			selectedLink[0][i].clear();
			selectedLink[0][i].beginFill(0x00FF00);
			if(selectedLink[0][i].data){
				selectedLink[0][i].lineStyle(10, 0xFF0000);
			}else{
				selectedLink[0][i].lineStyle(10, 0x333333);
			}
			
			selectedLink[0][i].moveTo(bulleX0,bulleY0);
			selectedLink[0][i].lineTo(bulleX1,bulleY1);
			selectedLink[0][i].hitArea=new PIXI.Polygon(bulleX0-lineHitFact,bulleY0-lineHitFact, bulleX0+lineHitFact,bulleY0+lineHitFact, bulleX1+lineHitFact,bulleY1+lineHitFact, bulleX1-lineHitFact,bulleY1-lineHitFact)
			console.log(selectedLink[0][i].getBounds())
		}	
	}
}

function clearMotion(){
	
	while(selectedLink.length > 0) {
		selectedLink.pop();
	}
	while(stillBubbleArray.length > 0) {
		stillBubbleArray.pop();
	}
}

function multiLinkMotionFun(){
	
}
////////////////////////////////link.js
var linkBool=false;
var link2Bool=false;
var link3Bool=false;
var optimizeCounter=0
var bubbleLinked = new Array;
var linkArray = new Array;
var lineHitFact=8
var linkSelected = false
var linkOptimizedArray=[]

function linkFun(){
	if(linkBool==true){
		if(bubbleLinked.length==0){
			bubbleLinked.push(selectedBulle)
			console.log("aller encore un ptt effort")
		}else{	
			bubbleLinked.push(selectedBulle)
			bulleX0=Number(lastBulleSelected.x)
			bulleY0=Number(lastBulleSelected.y)
			bulleX1=Number(selectedBulle.x)
			bulleY1=Number(selectedBulle.y)
			link = new PIXI.Graphics()
			link.beginFill(0x00FF00);
			link.lineStyle(10, 0x333333);
			link.moveTo(bulleX0,bulleY0);
			link.lineTo(bulleX1,bulleY1);
			console.log(link)
			console.log("hitarea link!!!!")
			link.hitArea=new PIXI.Polygon(bulleX0-lineHitFact,bulleY0-lineHitFact, bulleX0+lineHitFact,bulleY0+lineHitFact, bulleX1+lineHitFact,bulleY1+lineHitFact, bulleX1-lineHitFact,bulleY1-lineHitFact)
			link.endFill();
			link.data=false;
			if(sceneLink.addChild(link)){console.log("link added")};
			link.interactive=true
			interactiveLink()
			linkArray.push([link,"","","",""]);
			linkArray[linkArray.length-1][1]=lastBulleSelected;
			linkArray[linkArray.length-1][2]=selectedBulle;
			linkArray[linkArray.length-1][3]=sceneBulle.getChildIndex(lastBulleSelected);
			linkArray[linkArray.length-1][4]=sceneBulle.getChildIndex(selectedBulle);
			
			saveBubbleLinked()
			if(link2Bool==true){
				emptyLinkArray()
				return true
			}else if(link3Bool==true){	
			}else{
				$( "#linkBulle" ).trigger( "click" );
				emptyLinkArray()
				
			}
		}
	}
}
function saveBubbleLinked(){
	for(i=0;i<bubbleArray.length;i++){
		if(bubbleArray[i][0]==lastBulleSelected){
			bubbleArray[i][1].push(link)
			bubbleArray[i][2].push(sceneLink.getChildIndex(link))
		}
		if(bubbleArray[i][0]==selectedBulle){
			bubbleArray[i][1].push(link)
			bubbleArray[i][2].push(sceneLink.getChildIndex(link))
		}
	}	
}
function emptyLinkArray(){
	while(bubbleLinked.length > 0) {
		bubbleLinked.pop();
	}
}

function optimiseLink(){
	for(i=0;i<linkArray.length;i++){
		indexI1=sceneBulle.getChildIndex(linkArray[i][1])
		indexI2=sceneBulle.getChildIndex(linkArray[i][2])
		for(j=0;j<linkArray.length;j++){
			indexJ1=sceneBulle.getChildIndex(linkArray[j][1])
			indexJ2=sceneBulle.getChildIndex(linkArray[j][2])
			if(indexI1==indexJ1&&indexI2==indexJ2||indexI1==indexJ2&&indexI2==indexJ1){
				optimizeCounter++
				if(optimizeCounter>1){
					if(linkOptimizedArray.length==0){
						linkOptimizedArray.push(linkArray[j][0])
					}else{
						indexLinkJ=sceneLink.getChildIndex(linkArray[j][0])
						for(k=0;k<linkOptimizedArray.length;k++){
							indexLinkK=sceneLink.getChildIndex(linkOptimizedArray[k])
							if(indexLinkK==indexLinkJ){
								break
							}else if (k==linkOptimizedArray.length-1){
								linkOptimizedArray.push(linkArray[j][0])
							}
						}
					}	
				}
			}
		}
		optimizeCounter=0
	}
	console.log(linkOptimizedArray.length)
	for(ii=0;ii<linkOptimizedArray.length;ii++){
		clickLink(linkOptimizedArray[ii])
		supprFun()
		console.log("suppr")
	}
	while(linkOptimizedArray.length>0){
		linkOptimizedArray.pop()
	}
	
}
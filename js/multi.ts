////////multi.js
var multiArray=[];
var multiLinkArray=[];
var multiExist=false;
var spriteMove = PIXI.Sprite.fromImage('./images/MOVE.png');
var nbrDetect = 0

function multi(){
	if(multBool){
        sceneMulti.addChild(spriteMove)
        spriteMove.x = selectedBulle.x - (<PIXI.Graphics>selectedBulle.getChildAt(0)).width / 2
        spriteMove.y = selectedBulle.y - (<PIXI.Graphics>selectedBulle.getChildAt(0)).width/2
		console.log(selectedBulle)
		spriteMove.pivot.x=spriteMove.width/2
		spriteMove.pivot.y=spriteMove.width/2
		spriteMove.interactive=true
		multiArray.push([selectedBulle,spriteMove.x-selectedBulle.x,spriteMove.y-selectedBulle.y])
		multiLinkSelect()
	}else{
		spriteMove.interactive=false
		sceneMulti.removeChild(spriteMove)
		while(multiArray.length>0){
			fakeClickFun($(multiArray[multiArray.length-1]))
			multiArray.pop()
		}
		while(multiLinkArray.length>0){
			multiLinkArray.pop()
		}
		
	}
	
}
function multiSelect(multiBulle){
	
	for(var i=0;i<multiArray.length;i++){
		//console.log(sceneBulle.getChildIndex(multiBulle))
		
		if(multiBulle==multiArray[i][0]){
			console.log(sceneBulle.getChildIndex(multiArray[i][0]))
			multiExist=true;
			multiArray.splice(i,1);
			multiBulle.clear();
			break;
		}
	}
	if(multiExist){
		multiExist=false
	}else{
		multiArray.push([multiBulle,spriteMove.x-multiBulle.x,spriteMove.y-multiBulle.y])
	}
	multiLinkSelect()
}

function multiLinkSelect(){
	for(var i=0;i<multiArray.length;i++){
	console.log('multiarray ok')
		for(var j=0;j<linkArray.length;j++){
			if(multiArray[i][0]==linkArray[j][1]||multiArray[i][0]==linkArray[j][2]){
				
				if(multiLinkArray.length==0){
					multiLinkArray.push(linkArray[j])
				}else{
					for(var k=0;k<multiLinkArray.length;k++){
						if(multiLinkArray[k]==linkArray[j]){
							break
						}else if(k==multiLinkArray.length-1){
							multiLinkArray.push(linkArray[j])
						}
					}
				}
			}
		}
	}	
}

function multiMove(moveX,moveY){
	for(var ii=0;ii<multiArray.length;ii++){
		multiArray[ii][0].x=moveX-multiArray[ii][1]
		multiArray[ii][0].y=moveY-multiArray[ii][2]
	}
	for(var ii=0;ii<multiLinkArray.length;ii++){
		var currentLink=multiLinkArray[ii][0]
		var bulleX0=parseInt(multiLinkArray[ii][1].x)
		var bulleY0=parseInt(multiLinkArray[ii][1].y)
		var bulleX1=parseInt(multiLinkArray[ii][2].x)
		var bulleY1=parseInt(multiLinkArray[ii][2].y)
		currentLink.clear()
		currentLink.beginFill(0x00FF00)
		if(currentLink.data){
			currentLink.lineStyle(10, 0xFF0000);
		}else{
			currentLink.lineStyle(10, 0x333333);
		}
		console.log(ii+"__link")
		console.log(bulleX0+"_bulleX0_"+bulleY0+"_bulleY0_"+bulleX1+"_bulleX1_"+bulleY1+"_bulleY1_")
		currentLink.moveTo(bulleX0,bulleY0);
		currentLink.lineTo(bulleX1,bulleY1);
		currentLink.hitArea=new PIXI.Polygon(bulleX0-lineHitFact,bulleY0-lineHitFact, bulleX0+lineHitFact,bulleY0+lineHitFact, bulleX1+lineHitFact,bulleY1+lineHitFact, bulleX1-lineHitFact,bulleY1-lineHitFact)
		currentLink.endFill
	}
	
}


var startDrag = function(data){
	detectPathGraphics.clear()
	if(drawBool){
		drawBool=false
		draw()
		drawBool=true
	}
	data.data.originalEvent.preventDefault();
	data.stopPropagation();
	this.dragging = true
	this.data=data
	//upperScene.dragging = false;
	console.log("wouf")
}

spriteMove.on("mousedown", startDrag);
spriteMove.on("touchstart", startDrag);

var stopDrag = function(data){
	this.dragging = false;
	this.data = null;
	if(drawBool){
		drawDown=false
		draw()
	}
	multiLinkMotionFun()//motion.js
}

spriteMove.on("mouseup", stopDrag);
spriteMove.on("mouseupoutside", stopDrag);
spriteMove.on("touchend", stopDrag);
spriteMove.on("touchendoutside", stopDrag);

var drag = function(data){
	if(this.dragging){
		var newPosition = this.data.data.getLocalPosition(this.parent);
		this.position.x = newPosition.x;
		this.position.y = newPosition.y;
		//motion(newPosition.x,newPosition.y)
		multiMove(newPosition.x,newPosition.y)
	}
}
spriteMove.on("mousemove", drag);
spriteMove.on("touchmove", drag);






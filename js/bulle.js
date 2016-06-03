/////////////bulle.js
var circle
var circleX=windowW/2;
var circleY=windowH/2;
var circleSize=50
var circleColor=0xFF00CC
var circleScale=1

function bulle(circleX,circleY,bulleText,circleColor,circleScale){
	circle = new PIXI.Graphics()
	circle.beginFill(0xFFFFFF, 1)
	circle.lineStyle(16,circleColor,0.5)
	circle.drawCircle(0,0,circleSize)
	circle.hitArea = new PIXI.Circle(0, 0, circleSize);
	circle.interactive=true
	circle.x=circleX
	circle.y=circleY
	if(circleScale==undefined){
		circleScale=1
	}
	circle.scale.x=circleScale
	circle.scale.y=circleScale
	color= new PIXI.Graphics()
	color.beginFill(circleColor, 1)
	//color.alpha=0.5;
	if(circleColor==0xffffff){
		console.log(circleColor)
		color.lineStyle(1,0x000000,1) 
		circle.lineStyle(16,0x000000,0.5)
		circle.drawCircle(0,0,circleSize)
			
	}
	color.drawCircle(0,0,circleSize)
	text= new PIXI.Text(wordwrap(bulleText,10))
	circle.addChild(color)
	circle.addChild(text)
	console.log(color.width)
	dragBulle();
	// selectBulle()
	array(circle)
	sceneBulle.addChild(circle);
	autoSizeText(circle,circleSize);
	// dispatchMouseEvent(circle, 'mousedown', true, true);
	
	if(selectedBulle==""){
		selectedBulle=circle
		// selectedBulle.getChildAt(0).alpha=1;
	}else if(multBool){
		fakeClickFun(circle)
	}else{
		lastBulleSelected=selectedBulle
		selectedBulle=circle
		lastBulleSelected.clear()
		// lastBulleSelected.getChildAt(0).alpha=0.5;
		// selectedBulle.getChildAt(0).alpha=1;
	}
	
	textDesign(text)

}


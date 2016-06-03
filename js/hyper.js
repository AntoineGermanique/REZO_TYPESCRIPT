//////////////////////hyper.js
var hyper
var hyperSize=200
var hyperColor=0x00FFCC
var hyperScale=1
var hyperX=windowW/2;
var hyperY=windowH/2;
var hyperHandlerSize=40
var hyperText="texte long pour voir ce que ça donne'"
function hyper(){
	
}

function hyperPlusFun(){
	hyper=new PIXI.Container()
	hyper.x=hyperX
	hyper.y=hyperY
	// hyper.pivot.x=-hyper.x/2
	hyper.pivot.y=-hyperSize+hyperHandlerSize
	hyperBelly=new PIXI.Graphics()
	// hyperBelly.lineStyle(16,hyperColor,0.5)
	hyperBelly.beginFill(hyperColor,0.2)
	hyperBelly.drawCircle(0,0,hyperSize)
	hyperHandler=new PIXI.Graphics()
	hyperHandler.beginFill(hyperColor,1)
	// hyperHandler.drawCircle(2*hyperHandlerSize,0,hyperHandlerSize)
	// hyperHandler.drawCircle(-2*hyperHandlerSize,0,hyperHandlerSize)
	hyperHandler.drawRoundedRect(0,0,hyperHandlerSize*4,hyperHandlerSize*2,hyperHandlerSize/1.1)
	hyperHandler.hitArea=new PIXI.Rectangle(0,0,hyperHandlerSize*4,hyperHandlerSize*2)
	hyperHandler.interactive=true
	hyperHandler.x=-2*hyperHandlerSize
	hyperHandler.y=-hyperSize
	
	hyperHandler.endFill()
	text= new PIXI.Text(wordwrap(hyperText,15))


	hyperHandler.addChild(text)
	hyperHandler.addChild(text)
	hyper.addChild(hyperBelly)
	hyper.addChild(hyperHandler)
	sceneHyper.addChild(hyper)
	console.log(hyperHandler)
	autoSizeTextHyperHandler(hyperHandler,text);
	textDesign(text)
	hyperInteractiveFun()
}
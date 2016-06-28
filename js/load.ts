/////////////////////load.js


function load2(rezoSave: RezoSave, title: string, timeStamp?:number) {

    Rezo.sceneBulle.removeChildren();
    Rezo.sceneLink.removeChildren();
    while (bubbleArray.length > 0) {
        bubbleArray.pop();
    }
    while (Link.linkArray.length > 0) {
        Link.linkArray.pop();
    }
    Rezo.rezoName = title;
    Rezo.rezoNameDiv.html(title);

    for (var i = 0; i < rezoSave.bullesArray.length; i++) {
        var bulleInfo: BulleSave = rezoSave.bullesArray[i];
        if (bulleInfo.shape == ShapeEnum.circle) {
            Rezo.sceneBulle.addChild(new Bulle(bulleInfo.loc.x, bulleInfo.loc.y, bulleInfo.text, parseInt(bulleInfo.color.replace(/^#/, ''), 16), bulleInfo.scale.x, bulleInfo.shape));
        } else if (bulleInfo.shape == ShapeEnum.poly) {
            var timeStamps = (bulleInfo.timeStamps) ? bulleInfo.timeStamps[0] : null;
            var drawText = new Draw(bulleInfo.polyTextPath[0], timeStamps);
            drawText.setPath(bulleInfo.polyTextPath);
            var drawBulle = new Draw({ x: bulleInfo.polyPath[0], y: bulleInfo.polyPath[0] },null, true);
            drawBulle.setPathNumber(bulleInfo.polyPath);
            var bulle = new Bulle(
                bulleInfo.loc.x,
                bulleInfo.loc.y,
                bulleInfo.text,
                parseInt(bulleInfo.color.replace(/^#/, ''), 16),
                bulleInfo.scale.x, bulleInfo.shape,
                drawBulle,
                drawText
            )
            Rezo.sceneBulle.addChild(bulle);
            drawText.drawLine();
            //drawText.setTransform(0, 0);

        }
    }
    for (var i = 0; i < rezoSave.linkSave.length; i++) {
        var lastBulleSelectedIndex = rezoSave.linkSave[i].indexBulle1;
        lastBulleSelected = <Bulle>Rezo.sceneBulle.getChildAt(lastBulleSelectedIndex);
        var selectedBulleIndex = rezoSave.linkSave[i].indexBulle2;
        Rezo.selectedBulle = <Bulle>Rezo.sceneBulle.getChildAt(selectedBulleIndex);
        Link.bubbleLinked.push(lastBulleSelected)
        Link.linkBool = true;
        Link.link2Bool = true;
        Link.linkFun();
    }
    Link.linkBool = false
    Link.link2Bool = false

    Rezo.scene.position.x = rezoSave.loc.x;
    Rezo.scene.position.y = rezoSave.loc.y;

    Rezo.scaleScene.scale.x = rezoSave.scale.x;
    Rezo.scaleScene.scale.y = rezoSave.scale.y;

    $('#loading').css("display", "none");
    //setTimeout(SceneBulle.bitmapDraw(),1000);

}


function load(bubble,linkLoad,title,scenePo,scalePo){
	while(bubbleArray.length > 0) {
		bubbleArray.pop();
	}
	while(Link.linkArray.length > 0) {
		Link.linkArray.pop();
	}
	//console.log(bubble)
    Rezo.rezoName=title
    Rezo.opened = true
    var scaleScene = Rezo.scaleScene;
	for(var i=0;i<bubble.length;i++){
        if (bubble[i][2]) {
            scaleScene.scene.sceneBulle.addChild(new Bulle(bubble[i][0][0], bubble[i][0][1], bubble[i][2][0], bubble[i][2][1], bubble[i][2][2]));
        } else {
            scaleScene.scene.sceneBulle.addChild(new Bulle(bubble[i][0][0], bubble[i][0][1], "txt"));
		}
	}
	///////////////////////////////////load link
	for(var z=0;z<linkLoad.length;z++){
        var lastBulleSelectedIndex = linkLoad[z][0];
        lastBulleSelected = <Bulle>scaleScene.scene.sceneBulle.getChildAt(lastBulleSelectedIndex);
		var selectedBulleIndex=linkLoad[z][1];
        Rezo.selectedBulle = <Bulle>scaleScene.scene.sceneBulle.getChildAt(selectedBulleIndex) ;
		Link.bubbleLinked.push(lastBulleSelected)
        Link.linkBool=true
        Link.link2Bool=true
		console.log("test")
        Link.linkFun()
		console.log("test")
	}
    Link.linkBool=false
	var linkBool2=false

    scaleScene.scene.position.x = parseInt(scenePo[0]);
    scaleScene.scene.position.y = parseInt(scenePo[1]);
	var scaleX=parseFloat(scalePo[0])
	var scaleY=parseFloat(scalePo[1])
	if(isNaN(scaleX)||isNaN(scaleY)){
		scaleX=1;
		scaleY=1;
	}
	scaleScene.scale.x=scaleX
	scaleScene.scale.y=scaleY
	if(bubbleTemp!=null){
		while(bubbleTemp.length>0){
			bubbleTemp.pop()
		}
	}
	
}
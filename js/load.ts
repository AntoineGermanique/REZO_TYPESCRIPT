/////////////////////load.js

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
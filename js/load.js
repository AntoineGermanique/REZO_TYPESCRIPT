/////////////////////load.js

function load(bubble,linkLoad,title,scenePo,scalePo){
	while(bubbleArray.length > 0) {
		bubbleArray.pop();
	}
	while(linkArray.length > 0) {
		linkArray.pop();
	}
	//console.log(bubble)
	rezoName=title
	opened=true
	for(i=0;i<bubble.length;i++){
		if(bubble[i][2]){
			bulle(bubble[i][0][0],bubble[i][0][1],bubble[i][2][0],bubble[i][2][1],bubble[i][2][2])
		}else{
			bulle(bubble[i][0][0],bubble[i][0][1],"txt")
		}
	}
	///////////////////////////////////load link
	for(z=0;z<linkLoad.length;z++){
		lastBulleSelectedIndex=linkLoad[z][0];
		lastBulleSelected=sceneBulle.getChildAt(lastBulleSelectedIndex) ;
		selectedBulleIndex=linkLoad[z][1];
		selectedBulle=sceneBulle.getChildAt(selectedBulleIndex) ;
		bubbleLinked.push(lastBulleSelected)
		linkBool=true
		link2Bool=true
		console.log("test")
		linkFun()
		console.log("test")
	}
	linkBool=false
	linkBool2=false
	
	scene.position.x=parseInt(scenePo[0])
	scene.position.y=parseInt(scenePo[1])
	scaleX=parseFloat(scalePo[0])
	scaleY=parseFloat(scalePo[1])
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
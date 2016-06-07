/////////////save.js
var arrayBulleSave=[]
var arrayLinkSave=[]
var sceneBullePo=[]
var sceneLinkPo=[]
var scenePo=[]
var scalePo=[]



function save(data){
	while(arrayBulleSave.length > 0) {
		arrayBulleSave.pop();
	}
	while(arrayLinkSave.length > 0) {
		arrayLinkSave.pop();
	}
	while(scenePo.length > 0) {
		scenePo.pop();
	}
	while(scalePo.length > 0) {
		scalePo.pop();
	}
	while(sceneBullePo.length > 0) {
		sceneBullePo.pop();
	}
	while(sceneLinkPo.length > 0) {
		sceneLinkPo.pop();
	}
	optimiseLink()
	
	var nbrBulle=bubbleArray.length;
	var nbrLink=linkArray.length;

	for(var i=0;i<nbrBulle;i++){
		arrayBulleSave.push([[bubbleArray[i][0].x,bubbleArray[i][0].y],bubbleArray[i][2],[bubbleArray[i][0].getChildAt(1).text,bubbleArray[i][0].getChildAt(0).graphicsData[0].fillColor,bubbleArray[i][0].scale.x]])
	}
	for(i=0;i<nbrLink;i++){
		arrayLinkSave.push([linkArray[i][3],linkArray[i][4]])
	}
	scenePo.push(scene.x)
	scenePo.push(scene.y)
	scalePo.push(scaleScene.scale.x)
	scalePo.push(scaleScene.scale.y)
	sceneBullePo.push(sceneBulle.x)
	sceneBullePo.push(sceneBulle.y)
	sceneLinkPo.push(sceneLink.x)
	sceneLinkPo.push(sceneLink.y)
	if(rezoName==""&&!isLocalSave){
		promptTitle("Nom du REZO")
	}else if(data!=undefined&&!isLocalSave){
		console.log("modification");
		promptTitle(data);
	}else if(isLocalSave){
		var localRezoName;
		var localeSaveArray=[];
		localeSaveArray.push(arrayBulleSave);
		localeSaveArray.push(arrayLinkSave);
		localeSaveArray.push(rezoName);
		localeSaveArray.push(scenePo);
		localeSaveArray.push(scalePo);
		if(rezoName==""){
			localRezoName="local name";
		}else{
			localRezoName=rezoName;
		}
		localSave(localeSaveArray,localRezoName)
		
	}else{
		postArray()
	}


}

function postArray (){
	$('#loading').css("display","block");
	console.log(arrayBulleSave)
	$.post("php/save.php", {
		'arrayBulleSave':arrayBulleSave,
		"arrayLinkSave":arrayLinkSave,
		"rezoName":rezoName,
		"opened":opened,
		"scenePo":scenePo,
		"scalePo":scalePo,
		"sceneBullePo":sceneBullePo,
		"sceneLinkPo":sceneLinkPo},
		function(data){
			$('#loading').css("display","none");
			console.log(data)
			data.toString()
			if(data==="truc"){
				promptTitle("Nom déjà utilisé, veuillez en utiliser un autre")
			}else{
				opened=true;
			}
		}
	)
	.done(function() {
		console.log("done")
	})
	.fail(function() {
		alert( "error" );
	})

}

function promptTitle(data){
	console.log(rezoName)
	console.log(opened)
	var title = prompt(data, "");
	if(title){
		isTitreInvalid=titreIsValid(title)
		if (title==""||isTitreInvalid==true) {
			promptTitle("Nom invalide, veuillez recommencer")
		}else if(title == null){
			rezoName=""
			alert("rezo non sauvé")
		}else{
			rezoName=title
			postArray()
		}
	}else if(rezoName==""){
		opened=false
	}else{
		opened=true
	}
	console.log(rezoName)
	console.log(opened)
}
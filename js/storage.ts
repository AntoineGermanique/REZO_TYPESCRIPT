/////////storage.js
"use strict";

var arrayBulle=[]
var arrayBulleX=[]
var arrayBulleY=[]

function saveStore(){
	while(arrayBulle.length > 0) {
		arrayBulle.pop();
	}
	while(arrayBulleX.length > 0) {
		arrayBulleX.pop();
	}
	while(arrayBulleY.length > 0) {
		arrayBulleY.pop();
	}

    var scene = Rezo.scene;
	var nbrBulle=scene.children.length
	for(var i=0;i<nbrBulle;i++){
		arrayBulleX.push(scene.children[i].x)
		arrayBulleY.push(scene.children[i].y)
	}
	
	arrayBulle.push(arrayBulleX)
	arrayBulle.push(arrayBulleY)
	$.post("php/save.php", {'arrayBulle':arrayBulle},
		function(data){
			console.log(data)
		}
	)
	.done(function() {
		alert( "file saved" );
	})
	.fail(function() {
		alert( "error" );
	})

}
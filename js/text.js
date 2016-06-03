//////////////////////////text.js

function textFun(){
	if(hyperBool&&selectedHyper){
		
	}else if(selectedBulle!=""){
		string = (selectedBulle.getChildAt(1).text)//.replace(/[^a-zA-Z0-9 !,?.;:/]/g, '');
		if(newText=prompt("nouveau text",string)){
			selectedBulle.getChildAt(1).setText(wordwrap(newText,10))
			rad=bulleSize(selectedBulle)
			autoSizeText(selectedBulle,rad)
			textDesign(selectedBulle.getChildAt(1))
		}
	}
}

function textDesign(text){
	if(hyperBool){
		text.x+=text.parent.width/2-text.width/2
		text.y+=text.parent.height*0.1
	}else{
		text.x=-text.width/2
		text.y=-text.height/2;
	}
}
function replacingText(){
	
}
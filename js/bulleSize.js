/////////////bulleSize.js

function bulleSize(bulleToSize){
	toSize=bulleToSize.getChildAt(0);
	rawSize=toSize.width;
	lineSize=toSize.lineWidth
	size=(rawSize-lineSize)/2
	return size;
}
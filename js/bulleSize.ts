/////////////bulleSize.js
"use strict";


export function bulleSize(bulleToSize: PIXI.Graphics): number {
    var toSize: PIXI.Graphics = <PIXI.Graphics>bulleToSize.getChildAt(0);
	var rawSize=toSize.width;
	var lineSize=toSize.lineWidth
	var size=(rawSize-lineSize)/2
	return size;
}
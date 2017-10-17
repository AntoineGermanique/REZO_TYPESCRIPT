/////////////bulleSize.js
"use strict";
import * as PIXI from 'pixi.js'


export function bulleSize(bulleToSize: PIXI.Graphics): number {
    var toSize: PIXI.Graphics = <PIXI.Graphics>bulleToSize.getChildAt(0);
	var rawSize=toSize.width;
	var lineSize=toSize.lineWidth
	var size=(rawSize-lineSize)/2
	return size;
}
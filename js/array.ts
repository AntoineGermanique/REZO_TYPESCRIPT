///////////////////////////////////////array.js
"use strict";

interface BulleArray {
    bulle: Bulle;
    links: Link[];
    linksIndex: number[];
}

var bubbleArray: Array<BulleArray>;
bubbleArray = [];

function array(data:Bulle) {
    var bulleArray: BulleArray = {
        bulle: data,
        links: [],
        linksIndex:[]
    }
    bubbleArray.push(bulleArray);
	console.log(bubbleArray)
}
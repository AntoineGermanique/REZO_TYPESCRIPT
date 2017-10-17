///////////////////////////////////////array.js
import { Bulle, Link } from './index'
"use strict";

export interface BulleArray {
    bulle: Bulle;
    links: Link[];
    linksIndex: number[];
}

export let bubbleArray: Array<BulleArray>;
bubbleArray = [];

export function array(data: Bulle) {
    let bulleArray: BulleArray = {
        bulle: data,
        links: [],
        linksIndex: []
    }
    bubbleArray.push(bulleArray);
    console.log(bubbleArray)
}
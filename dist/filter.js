"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
////////////filter.js
const _1 = require("./");
var blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = 5;
function invertFilterFun() {
    _1.Rezo.scene.filters = [blurFilter];
    //scene.filterArea = new PIXI.Rectangle(0, 0, windowW, windowH);
    //console.log(scene.filterArea)
    // for(i=0;i<(sceneBulle.children).length;i++){
    // ((sceneBulle.children)[i].getChildAt(0)).filters=[blurFilter]
    // }
}
function supprFilterFun() {
    _1.Rezo.scene.filters = null;
    // for(i=0;i<(sceneBulle.children).length;i++){
    // ((sceneBulle.children)[i].getChildAt(0)).filters=null
    // }
}
//# sourceMappingURL=filter.js.map
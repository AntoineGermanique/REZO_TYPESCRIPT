////////////filter.js
var invertFilter = new PIXI.filters.InvertFilter();
var blurFilter = new PIXI.filters.BlurFilter();
var dotFilter = new PIXI.filters.DotScreenFilter();
blurFilter.blur = 5;
function invertFilterFun() {
    Rezo.scene.filters = [invertFilter, blurFilter];
    //scene.filterArea = new PIXI.Rectangle(0, 0, windowW, windowH);
    //console.log(scene.filterArea)
    // for(i=0;i<(sceneBulle.children).length;i++){
    // ((sceneBulle.children)[i].getChildAt(0)).filters=[blurFilter]
    // }
}
function supprFilterFun() {
    Rezo.scene.filters = null;
    // for(i=0;i<(sceneBulle.children).length;i++){
    // ((sceneBulle.children)[i].getChildAt(0)).filters=null
    // }
}
//# sourceMappingURL=filter.js.map
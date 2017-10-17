////////////filter.js
import { Rezo } from './rezo'
import * as PIXI from 'pixi.js'


var blurFilter = new PIXI.filters.BlurFilter()
blurFilter.blur=5;
function invertFilterFun(){
	
	Rezo.scene.filters = [blurFilter];
	//scene.filterArea = new PIXI.Rectangle(0, 0, windowW, windowH);
	//console.log(scene.filterArea)
	// for(i=0;i<(sceneBulle.children).length;i++){
		// ((sceneBulle.children)[i].getChildAt(0)).filters=[blurFilter]
	// }

}
function supprFilterFun(){
	Rezo.scene.filters = null;
	// for(i=0;i<(sceneBulle.children).length;i++){
		// ((sceneBulle.children)[i].getChildAt(0)).filters=null
	// }
}
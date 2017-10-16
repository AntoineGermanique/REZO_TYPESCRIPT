//sceneBulle.ts Containing Bulles
import {bubbleArray, ShapeEnum, Rezo} from './'
export class SceneBulle extends PIXI.Container {
    static bitmapDraw() {
        var bulles = bubbleArray;
        for (var i = 0; i < bulles.length; i++) {
            var bulle = bulles[i].bulle;
            var texture: PIXI.Texture
            if (bulle.shape.kind == ShapeEnum.poly) {
                texture = bulle.text.textDraw.generateTexture(Rezo.renderer);
                var shapeSprite = new PIXI.Sprite(texture);
                bulle.text.textDraw._bmp = shapeSprite;

                Rezo.sceneBulle.addChild(bulle.text.textDraw._bmp)
                Rezo.sceneBulle.removeChild(bulle.text.textDraw);

            }
        }
    }
}
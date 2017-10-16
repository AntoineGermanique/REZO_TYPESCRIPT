"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//sceneBulle.ts Containing Bulles
const _1 = require("./");
class SceneBulle extends PIXI.Container {
    static bitmapDraw() {
        var bulles = _1.bubbleArray;
        for (var i = 0; i < bulles.length; i++) {
            var bulle = bulles[i].bulle;
            var texture;
            if (bulle.shape.kind == _1.ShapeEnum.poly) {
                texture = bulle.text.textDraw.generateCanvasTexture();
                var shapeSprite = new PIXI.Sprite(texture);
                bulle.text.textDraw._bmp = shapeSprite;
                _1.Rezo.sceneBulle.addChild(bulle.text.textDraw._bmp);
                _1.Rezo.sceneBulle.removeChild(bulle.text.textDraw);
            }
        }
    }
}
exports.SceneBulle = SceneBulle;
//# sourceMappingURL=sceneBulle.js.map
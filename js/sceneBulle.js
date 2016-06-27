//sceneBulle.ts Containing Bulles
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SceneBulle = (function (_super) {
    __extends(SceneBulle, _super);
    function SceneBulle() {
        _super.apply(this, arguments);
    }
    SceneBulle.bitmapDraw = function () {
        var bulles = bubbleArray;
        for (var i = 0; i < bulles.length; i++) {
            var bulle = bulles[i].bulle;
            var texture;
            if (bulle.shape.kind == ShapeEnum.poly) {
                texture = bulle.text.textDraw.generateTexture(Rezo.renderer);
                var shapeSprite = new PIXI.Sprite(texture);
                bulle.text.textDraw._bmp = shapeSprite;
                Rezo.sceneBulle.addChild(bulle.text.textDraw._bmp);
                Rezo.sceneBulle.removeChild(bulle.text.textDraw);
            }
        }
    };
    return SceneBulle;
}(PIXI.Container));
//# sourceMappingURL=sceneBulle.js.map
//////////////////////////text.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextRezoType;
(function (TextRezoType) {
    TextRezoType[TextRezoType["codex"] = 0] = "codex";
    TextRezoType[TextRezoType["type"] = 1] = "type";
})(TextRezoType || (TextRezoType = {}));
var TextRezo = (function (_super) {
    __extends(TextRezo, _super);
    function TextRezo(text, kind) {
        _super.call(this, text);
        this.kind = kind;
        this.text = text;
    }
    TextRezo.prototype.replaceText = function () {
        if (hyperBool && selectedHyper) {
        }
        else if (Rezo.selectedBulle && this.kind == TextRezoType.type) {
            var string = (this.text); //.replace(/[^a-zA-Z0-9 !,?.;:/]/g, '');
            var newText;
            if (newText = prompt("nouveau text", string)) {
                this.text = wordwrap(newText, 10);
                var rad = bulleSize(Rezo.selectedBulle);
                this.autoSizeText(rad);
                this.textDesign(this);
            }
        }
    };
    TextRezo.prototype.textDesign = function (text) {
        if (hyperBool) {
            text.x += text.parent.width / 2 - text.width / 2;
            text.y += text.parent.height * 0.1;
        }
        else {
            text.x = -text.width / 2;
            text.y = -text.height / 2;
        }
    };
    TextRezo.prototype.autoSizeText = function (oldCircleSize) {
        var circleTxtWidth = this.width / this.scale.x;
        var circleTxtHeight = this.height / this.scale.x;
        var longHypotenus = Math.sqrt(Math.pow(circleTxtWidth / 2, 2) + Math.pow(circleTxtHeight / 2, 2));
        var facText = longHypotenus / oldCircleSize;
        this.scale.x = 1 / facText;
        this.scale.y = 1 / facText;
        console.log(facText);
    };
    TextRezo.prototype.autoSizeTextHyperHandler = function (handler) {
        var handlerFact = handler.width / handler.height;
        var textFact = this.width / this.height;
        if (handlerFact < textFact) {
            var sizeFact = handler.width / this.width;
            sizeFact *= 0.9;
            this.scale.x *= sizeFact;
            this.scale.y *= sizeFact;
        }
        else {
            var sizeFact = handler.height / this.height;
            sizeFact *= 0.9;
            this.scale.x *= sizeFact;
            this.scale.y *= sizeFact;
        }
    };
    return TextRezo;
}(PIXI.Text));
function replacingText() {
}
//# sourceMappingURL=text.js.map
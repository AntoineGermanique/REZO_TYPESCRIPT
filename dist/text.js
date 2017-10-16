"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//////////////////////////text.js
const _1 = require("./");
var TextRezoType;
(function (TextRezoType) {
    TextRezoType[TextRezoType["codex"] = 0] = "codex";
    TextRezoType[TextRezoType["type"] = 1] = "type";
})(TextRezoType = exports.TextRezoType || (exports.TextRezoType = {}));
class TextRezo extends PIXI.Text {
    constructor(text, kind) {
        super(text);
        this.kind = kind;
        this.text = text;
    }
    setTextDraw(textDraw) {
        this.textDraw = textDraw;
        this.polyPathNumber = textDraw.getPath();
    }
    replaceText() {
        if (_1.Menu.hyperBool && _1.Hyper.selectedHyper) {
        }
        else if (_1.Rezo.selectedBulle && this.kind == TextRezoType.type) {
            var string = (this.text); //.replace(/[^a-zA-Z0-9 !,?.;:/]/g, '');
            var newText;
            if (newText = prompt("nouveau text", string)) {
                this.text = _1.wordwrap(newText);
                var rad = _1.bulleSize(_1.Rezo.selectedBulle);
                this.autoSizeText(rad);
                this.textDesign(this);
            }
        }
    }
    textDesign(text) {
        if (_1.Menu.hyperBool) {
            text.x += text.parent.width / 2 - text.width / 2;
            text.y += text.parent.height * 0.1;
        }
        else {
            text.x = -text.width / 2;
            text.y = -text.height / 2;
        }
    }
    autoSizeText(oldCircleSize) {
        var circleTxtWidth = this.width / this.scale.x;
        var circleTxtHeight = this.height / this.scale.x;
        var longHypotenus = Math.sqrt(Math.pow(circleTxtWidth / 2, 2) + Math.pow(circleTxtHeight / 2, 2));
        var facText = longHypotenus / oldCircleSize;
        this.scale.x = 1 / facText;
        this.scale.y = 1 / facText;
        console.log(facText);
    }
    autoSizeTextHyperHandler(handler) {
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
    }
}
exports.TextRezo = TextRezo;
function replacingText() {
}
//# sourceMappingURL=text.js.map
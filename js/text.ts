//////////////////////////text.js
import { Loc } from './'

export enum TextRezoType {
    codex, type
}

export class TextRezo extends PIXI.Text {
    textDraw: Draw;
    text: string;
    kind: TextRezoType;
    polyPathNumber: Loc[];

    constructor(text: string, kind: TextRezoType) {
        super(text);
        this.kind = kind;
        this.text = text;
    }
    setTextDraw(textDraw: Draw): void {
        this.textDraw = textDraw;
        this.polyPathNumber = textDraw.getPath();
    }

    replaceText() {
        if (hyperBool && selectedHyper) {

        } else if (Rezo.selectedBulle && this.kind == TextRezoType.type) {
            var string = (this.text)//.replace(/[^a-zA-Z0-9 !,?.;:/]/g, '');
            var newText: string;
            if (newText = prompt("nouveau text", string)) {
                this.text = wordwrap(newText, 10);
                var rad = bulleSize(Rezo.selectedBulle)
                this.autoSizeText(rad);
                this.textDesign(this)
            }
        }
    }
    textDesign(text: TextRezo) {
        if (hyperBool) {
            text.x += text.parent.width / 2 - text.width / 2
            text.y += text.parent.height * 0.1
        } else {
            text.x = -text.width / 2
            text.y = -text.height / 2;
        }
    }
    autoSizeText(oldCircleSize: number) {

        var circleTxtWidth: number = this.width / this.scale.x;
        var circleTxtHeight: number = this.height / this.scale.x;

        var longHypotenus: number = Math.sqrt(Math.pow(circleTxtWidth / 2, 2) + Math.pow(circleTxtHeight / 2, 2));
        var facText: number = longHypotenus / oldCircleSize;
        this.scale.x = 1 / facText;
        this.scale.y = 1 / facText;
        console.log(facText)

    }

    autoSizeTextHyperHandler(handler) {
        var handlerFact: number = handler.width / handler.height
        var textFact: number = this.width / this.height
        if (handlerFact < textFact) {
            var sizeFact: number = handler.width / this.width
            sizeFact *= 0.9
            this.scale.x *= sizeFact
            this.scale.y *= sizeFact

        } else {
            var sizeFact: number = handler.height / this.height
            sizeFact *= 0.9
            this.scale.x *= sizeFact
            this.scale.y *= sizeFact
        }
    }
}



function replacingText() {

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
////////multi.js
const _1 = require("./");
var multiLinkArray = [];
var multiExist = false;
var nbrDetect = 0;
class Multi {
    static multi() {
        var selectedBulle = _1.Rezo.selectedBulle;
        if (_1.Menu.multBool) {
            Multi.spriteMove = PIXI.Sprite.fromImage('./images/MOVE.png');
            Multi.setSpriteMoveMultiListeners();
            _1.Rezo.sceneMulti.addChild(Multi.spriteMove);
            Multi.spriteMove.x = selectedBulle.x - selectedBulle.getChildAt(0).width / 2;
            Multi.spriteMove.y = selectedBulle.y - selectedBulle.getChildAt(0).width / 2;
            console.log(selectedBulle);
            Multi.spriteMove.pivot.x = Multi.spriteMove.width / 2;
            Multi.spriteMove.pivot.y = Multi.spriteMove.width / 2;
            Multi.spriteMove.interactive = true;
            Multi.multiArray.push({
                bulle: selectedBulle,
                loc: {
                    x: Multi.spriteMove.x - selectedBulle.x,
                    y: Multi.spriteMove.y - selectedBulle.y
                },
                links: [],
                linksIndex: []
            });
            Multi.multiLinkSelect();
        }
        else {
            Multi.spriteMove.interactive = false;
            _1.Rezo.sceneMulti.removeChild(Multi.spriteMove);
            while (Multi.multiArray.length > 0) {
                _1.Bulle.fakeClickFun(Multi.multiArray[Multi.multiArray.length - 1].bulle);
                Multi.multiArray.pop();
            }
            while (multiLinkArray.length > 0) {
                multiLinkArray.pop();
            }
        }
    }
    static multiSelect(multiBulle) {
        for (var i = 0; i < Multi.multiArray.length; i++) {
            //console.log(sceneBulle.getChildIndex(multiBulle))
            if (multiBulle == Multi.multiArray[i].bulle) {
                multiExist = true;
                Multi.multiArray.splice(i, 1);
                multiBulle.clear();
                break;
            }
        }
        if (multiExist) {
            multiExist = false;
        }
        else {
            Multi.multiArray.push({
                bulle: multiBulle,
                loc: {
                    x: Multi.spriteMove.x - multiBulle.x,
                    y: Multi.spriteMove.y - multiBulle.y
                },
                links: [],
                linksIndex: []
            });
        }
        Multi.multiLinkSelect();
    }
    static multiLinkSelect() {
        var linkArray = _1.Link.linkArray;
        for (var i = 0; i < Multi.multiArray.length; i++) {
            for (var j = 0; j < linkArray.length; j++) {
                if (Multi.multiArray[i].bulle == linkArray[j].bulle1 || Multi.multiArray[i].bulle == linkArray[j].bulle2) {
                    if (multiLinkArray.length == 0) {
                        multiLinkArray.push(linkArray[j]);
                    }
                    else {
                        for (var k = 0; k < multiLinkArray.length; k++) {
                            if (multiLinkArray[k] == linkArray[j]) {
                                break;
                            }
                            else if (k == multiLinkArray.length - 1) {
                                multiLinkArray.push(linkArray[j]);
                            }
                        }
                    }
                }
            }
        }
    }
    static multiMove(moveX, moveY) {
        for (var i = 0; i < Multi.multiArray.length; i++) {
            Multi.multiArray[i].bulle.x = moveX - Multi.multiArray[i].loc.x;
            Multi.multiArray[i].bulle.y = moveY - Multi.multiArray[i].loc.y;
        }
        for (var i = 0; i < multiLinkArray.length; i++) {
            var currentLink = multiLinkArray[i].link;
            var bulleX0 = multiLinkArray[i].bulle1.x;
            var bulleY0 = multiLinkArray[i].bulle1.y;
            var bulleX1 = multiLinkArray[i].bulle2.x;
            var bulleY1 = multiLinkArray[i].bulle2.y;
            currentLink.clear();
            currentLink.beginFill(0x00FF00);
            if (currentLink.data) {
                currentLink.lineStyle(10, 0xFF0000);
            }
            else {
                currentLink.lineStyle(10, 0x333333);
            }
            currentLink.moveTo(bulleX0, bulleY0);
            currentLink.lineTo(bulleX1, bulleY1);
            var lineHitFact = _1.Link.lineHitFact;
            currentLink.hitArea = new PIXI.Polygon(bulleX0 - lineHitFact, bulleY0 - lineHitFact, bulleX0 + lineHitFact, bulleY0 + lineHitFact, bulleX1 + lineHitFact, bulleY1 + lineHitFact, bulleX1 - lineHitFact, bulleY1 - lineHitFact);
            currentLink.endFill;
        }
    }
    static setSpriteMoveMultiListeners() {
        var startDrag = function (data) {
            console.log("Multi.spriteMove");
            _1.Select.detectPathGraphics.clear();
            data.stopPropagation();
            if (_1.Menu.selectBool) {
                _1.Menu.selectBool = false;
                _1.Select.select();
                _1.Menu.selectBool = true;
            }
            data.data.originalEvent.preventDefault();
            this.dragging = true;
            this.data = data;
            //upperScene.dragging = false;
            console.log("wouf");
        };
        Multi.spriteMove.on("mousedown", startDrag);
        Multi.spriteMove.on("touchstart", startDrag);
        var stopDrag = function () {
            this.dragging = false;
            this.data = null;
            if (_1.Menu.selectBool) {
                _1.Select.selectDown = false;
                _1.Select.select();
            }
        };
        Multi.spriteMove.on("mouseup", stopDrag);
        Multi.spriteMove.on("mouseupoutside", stopDrag);
        Multi.spriteMove.on("touchend", stopDrag);
        Multi.spriteMove.on("touchendoutside", stopDrag);
        var drag = function () {
            if (this.dragging) {
                var newPosition = this.data.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
                //motion(newPosition.x,newPosition.y)
                Multi.multiMove(newPosition.x, newPosition.y);
            }
        };
        Multi.spriteMove.on("mousemove", drag);
        Multi.spriteMove.on("touchmove", drag);
    }
}
Multi.multiArray = [];
exports.Multi = Multi;
//# sourceMappingURL=multi.js.map
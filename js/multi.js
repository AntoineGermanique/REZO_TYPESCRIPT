////////multi.js
var multiArray = [];
var multiLinkArray = [];
var multiExist = false;
var spriteMove;
var nbrDetect = 0;
function multi() {
    var selectedBulle = Rezo.selectedBulle;
    if (multBool) {
        spriteMove = PIXI.Sprite.fromImage('./images/MOVE.png');
        setSpriteMoveMultiListeners();
        sceneMulti.addChild(spriteMove);
        spriteMove.x = selectedBulle.x - selectedBulle.getChildAt(0).width / 2;
        spriteMove.y = selectedBulle.y - selectedBulle.getChildAt(0).width / 2;
        console.log(selectedBulle);
        spriteMove.pivot.x = spriteMove.width / 2;
        spriteMove.pivot.y = spriteMove.width / 2;
        spriteMove.interactive = true;
        multiArray.push({
            bulle: selectedBulle,
            loc: {
                x: spriteMove.x - selectedBulle.x,
                y: spriteMove.y - selectedBulle.y
            },
            links: [],
            linksIndex: []
        });
        multiLinkSelect();
    }
    else {
        spriteMove.interactive = false;
        sceneMulti.removeChild(spriteMove);
        while (multiArray.length > 0) {
            Bulle.fakeClickFun(multiArray[multiArray.length - 1].bulle);
            multiArray.pop();
        }
        while (multiLinkArray.length > 0) {
            multiLinkArray.pop();
        }
    }
}
function multiSelect(multiBulle) {
    for (var i = 0; i < multiArray.length; i++) {
        //console.log(sceneBulle.getChildIndex(multiBulle))
        if (multiBulle == multiArray[i].bulle) {
            multiExist = true;
            multiArray.splice(i, 1);
            multiBulle.clear();
            break;
        }
    }
    if (multiExist) {
        multiExist = false;
    }
    else {
        multiArray.push({
            bulle: multiBulle,
            loc: {
                x: spriteMove.x - multiBulle.x,
                y: spriteMove.y - multiBulle.y
            },
            links: [],
            linksIndex: []
        });
    }
    multiLinkSelect();
}
function multiLinkSelect() {
    var linkArray = Link.linkArray;
    for (var i = 0; i < multiArray.length; i++) {
        for (var j = 0; j < linkArray.length; j++) {
            if (multiArray[i].bulle == linkArray[j].bulle1 || multiArray[i].bulle == linkArray[j].bulle2) {
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
function multiMove(moveX, moveY) {
    for (var i = 0; i < multiArray.length; i++) {
        multiArray[i].bulle.x = moveX - multiArray[i].loc.x;
        multiArray[i].bulle.y = moveY - multiArray[i].loc.y;
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
        var lineHitFact = Link.lineHitFact;
        currentLink.hitArea = new PIXI.Polygon(bulleX0 - lineHitFact, bulleY0 - lineHitFact, bulleX0 + lineHitFact, bulleY0 + lineHitFact, bulleX1 + lineHitFact, bulleY1 + lineHitFact, bulleX1 - lineHitFact, bulleY1 - lineHitFact);
        currentLink.endFill;
    }
}
function setSpriteMoveMultiListeners() {
    var startDrag = function (data) {
        console.log("spriteMove");
        detectPathGraphics.clear();
        data.stopPropagation();
        if (selectBool) {
            selectBool = false;
            select();
            selectBool = true;
        }
        data.data.originalEvent.preventDefault();
        this.dragging = true;
        this.data = data;
        //upperScene.dragging = false;
        console.log("wouf");
    };
    spriteMove.on("mousedown", startDrag);
    spriteMove.on("touchstart", startDrag);
    var stopDrag = function (data) {
        this.dragging = false;
        this.data = null;
        if (selectBool) {
            selectDown = false;
            select();
        }
    };
    spriteMove.on("mouseup", stopDrag);
    spriteMove.on("mouseupoutside", stopDrag);
    spriteMove.on("touchend", stopDrag);
    spriteMove.on("touchendoutside", stopDrag);
    var drag = function (data) {
        if (this.dragging) {
            var newPosition = this.data.data.getLocalPosition(this.parent);
            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
            //motion(newPosition.x,newPosition.y)
            multiMove(newPosition.x, newPosition.y);
        }
    };
    spriteMove.on("mousemove", drag);
    spriteMove.on("touchmove", drag);
}
//# sourceMappingURL=multi.js.map
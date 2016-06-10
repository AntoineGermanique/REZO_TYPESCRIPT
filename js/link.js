////////////////////////////////link.js
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Link = (function (_super) {
    __extends(Link, _super);
    function Link() {
        _super.apply(this, arguments);
    }
    Link.prototype.saveBubbleLinked = function () {
        for (var i = 0; i < bubbleArray.length; i++) {
            if (bubbleArray[i].bulle == lastBulleSelected) {
                bubbleArray[i].links.push(this);
                bubbleArray[i].linksIndex.push(this.parent.getChildIndex(this));
            }
            if (bubbleArray[i].bulle == Rezo.selectedBulle) {
                bubbleArray[i].links.push(this);
                bubbleArray[i].linksIndex.push(this.parent.getChildIndex(this));
            }
        }
    };
    Link.emptyLinkArray = function () {
        while (Link.bubbleLinked.length > 0) {
            Link.bubbleLinked.pop();
        }
    };
    Link.optimiseLink = function (sceneBulle, sceneLink) {
        for (var i = 0; i < Link.linkArray.length; i++) {
            var indexI1 = sceneBulle.getChildIndex(Link.linkArray[i].bulle1);
            var indexI2 = sceneBulle.getChildIndex(Link.linkArray[i].bulle2);
            for (var j = 0; j < Link.linkArray.length; j++) {
                var indexJ1 = sceneBulle.getChildIndex(Link.linkArray[j].bulle1);
                var indexJ2 = sceneBulle.getChildIndex(Link.linkArray[j].bulle2);
                if (indexI1 == indexJ1 && indexI2 == indexJ2 || indexI1 == indexJ2 && indexI2 == indexJ1) {
                    Link.optimizeCounter++;
                    if (Link.optimizeCounter > 1) {
                        if (Link.linkOptimizedArray.length == 0) {
                            Link.linkOptimizedArray.push(Link.linkArray[j].link);
                        }
                        else {
                            var indexLinkJ = sceneLink.getChildIndex(Link.linkArray[j].link);
                            for (var k = 0; k < Link.linkOptimizedArray.length; k++) {
                                var indexLinkK = sceneLink.getChildIndex(Link.linkOptimizedArray[k]);
                                if (indexLinkK == indexLinkJ) {
                                    break;
                                }
                                else if (k == Link.linkOptimizedArray.length - 1) {
                                    Link.linkOptimizedArray.push(Link.linkArray[j].link);
                                }
                            }
                        }
                    }
                }
            }
            Link.optimizeCounter = 0;
        }
        for (var ii = 0; ii < Link.linkOptimizedArray.length; ii++) {
            supprFun();
            console.log("suppr");
        }
        while (Link.linkOptimizedArray.length > 0) {
            Link.linkOptimizedArray.pop();
        }
    };
    Link.prototype.interactiveLink = function () {
        var click = function (data) {
            Link.selectedLink = this;
            if (this.alpha == 1) {
                this.clickLink(this);
            }
            else {
                this.unclickLink(this);
            }
        };
        this.on("mousedown", click);
        this.on("touchstart", click);
        var over = function (data) {
            this.alpha = 1;
        };
        this.on("mouseupoutside", over);
        this.on("touchendoutside", over);
    };
    Link.prototype.unclickLink = function () {
        this.alpha = 1;
        Link.linkSelected = false;
        this.data = false;
        this.clear();
        this.beginFill(0x00FF00);
        this.lineStyle(10, 0x333333);
        var hitArea = this.hitArea;
        var bulleX0 = hitArea.points[0] + Link.lineHitFact;
        var bulleY0 = hitArea.points[1] + Link.lineHitFact;
        var bulleX1 = hitArea.points[6] + Link.lineHitFact;
        var bulleY1 = hitArea.points[7] + Link.lineHitFact;
        this.x0 = bulleX0;
        this.y0 = bulleY0;
        this.x1 = bulleX1;
        this.y1 = bulleY1;
        this.moveTo(this.x0, this.y0);
        this.lineTo(this.x1, this.y1);
        this.endFill();
    };
    Link.prototype.clickLink = function (clicked) {
        if (Link.linkSelected) {
            for (var i = 0; i < Link.linkArray.length; i++) {
                if (Link.linkArray[i].link.data) {
                    console.log("yoh");
                    this.unclickLink();
                    break;
                }
            }
        }
        clicked.alpha = 0.5;
        clicked.data = true;
        Link.linkSelected = true;
        var hitArea = clicked.hitArea;
        var bulleX0 = hitArea.points[0] + Link.lineHitFact;
        var bulleY0 = hitArea.points[1] + Link.lineHitFact;
        var bulleX1 = hitArea.points[6] + Link.lineHitFact;
        var bulleY1 = hitArea.points[7] + Link.lineHitFact;
        clicked.x0 = bulleX0;
        clicked.y0 = bulleY0;
        clicked.x1 = bulleX1;
        clicked.y1 = bulleY1;
        clicked.clear();
        clicked.beginFill(0x00FF00);
        clicked.lineStyle(10, 0xff0000);
        clicked.moveTo(bulleX0, bulleY0);
        clicked.lineTo(bulleX1, bulleY1);
        clicked.endFill();
    };
    Link.linkFun = function () {
        var selectedBulle = Rezo.selectedBulle;
        if (Link.linkBool == true) {
            if (Link.bubbleLinked.length == 0) {
                Link.bubbleLinked.push(selectedBulle);
                console.log("aller encore un ptt effort");
            }
            else {
                Link.bubbleLinked.push(selectedBulle);
                var bulleX0 = Number(lastBulleSelected.x);
                var bulleY0 = Number(lastBulleSelected.y);
                var bulleX1 = Number(selectedBulle.x);
                var bulleY1 = Number(selectedBulle.y);
                var link = new Link();
                link.beginFill(0x00FF00);
                link.lineStyle(10, 0x333333);
                link.moveTo(bulleX0, bulleY0);
                link.lineTo(bulleX1, bulleY1);
                console.log(link);
                console.log("hitarea link!!!!");
                link.hitArea = new PIXI.Polygon(bulleX0 - Link.lineHitFact, bulleY0 - Link.lineHitFact, bulleX0 + Link.lineHitFact, bulleY0 + Link.lineHitFact, bulleX1 + Link.lineHitFact, bulleY1 + Link.lineHitFact, bulleX1 - Link.lineHitFact, bulleY1 - Link.lineHitFact);
                link.endFill();
                //link.data=false;
                if (Rezo.sceneLink.addChild(link)) {
                    console.log("link added");
                }
                ;
                link.interactive = true;
                link.interactiveLink();
                var linkArray = Link.linkArray;
                linkArray.push({
                    link: link,
                    bulle1: lastBulleSelected,
                    bulle2: selectedBulle,
                    indexBulle1: Rezo.sceneBulle.getChildIndex(lastBulleSelected),
                    indexBulle2: Rezo.sceneBulle.getChildIndex(selectedBulle)
                });
                link.saveBubbleLinked();
                if (Link.link2Bool == true) {
                    Link.emptyLinkArray();
                    return true;
                }
                else if (Link.link3Bool == true) {
                }
                else {
                    $("#linkBulle").trigger("click");
                    Link.emptyLinkArray();
                }
            }
        }
    };
    Link.linkBool = false;
    Link.link2Bool = false;
    Link.link3Bool = false;
    Link.optimizeCounter = 0;
    Link.bubbleLinked = new Array;
    Link.linkArray = [];
    Link.lineHitFact = 8;
    Link.linkSelected = false;
    Link.linkOptimizedArray = [];
    return Link;
}(PIXI.Graphics));
//# sourceMappingURL=link.js.map
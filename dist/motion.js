"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////motion.js
const _1 = require("./");
var selectedLinks;
var stillBubblesArray = new Array;
var stillBuble;
class Motion {
    static linkSelection(data) {
        for (var i = 0; i < _1.bubbleArray.length; i++) {
            if (_1.bubbleArray[i].bulle == data) {
                if (_1.bubbleArray[i].links.length > 0) {
                    selectedLinks = _1.bubbleArray[i].links.slice();
                    for (var j = 0; j < _1.bubbleArray[i].links.length; j++) {
                        var indexLink = _1.Rezo.sceneLink.getChildIndex(_1.bubbleArray[i].links[j]);
                        if (_1.Link.linkArray[indexLink].bulle1 == data) {
                            stillBubblesArray.push(_1.Link.linkArray[indexLink].bulle2);
                        }
                        else {
                            stillBubblesArray.push(_1.Link.linkArray[indexLink].bulle1);
                        }
                    }
                }
            }
        }
    }
    static motion(bulleX0, bulleY0) {
        console.log(selectedLinks);
        if (selectedLinks && selectedLinks.length > 0 && stillBubblesArray.length > 0) {
            for (var i = 0; i < selectedLinks.length; i++) {
                var bulleX1 = Number(stillBubblesArray[i].x);
                var bulleY1 = Number(stillBubblesArray[i].y);
                var link = selectedLinks[i];
                link.clear();
                link.beginFill(0x00FF00);
                if (link.data) {
                    link.lineStyle(10, 0xFF0000);
                }
                else {
                    link.lineStyle(10, 0x333333);
                }
                link.moveTo(bulleX0, bulleY0);
                link.lineTo(bulleX1, bulleY1);
                link.hitArea = new PIXI.Polygon(bulleX0 - _1.Link.lineHitFact, bulleY0 - _1.Link.lineHitFact, bulleX0 + _1.Link.lineHitFact, bulleY0 + _1.Link.lineHitFact, bulleX1 + _1.Link.lineHitFact, bulleY1 + _1.Link.lineHitFact, bulleX1 - _1.Link.lineHitFact, bulleY1 - _1.Link.lineHitFact);
                console.log(link);
            }
        }
    }
    static clearMotion() {
        if (selectedLinks) {
            while (selectedLinks.length > 0) {
                selectedLinks.pop();
            }
        }
        while (stillBubblesArray.length > 0) {
            stillBubblesArray.pop();
        }
    }
}
exports.Motion = Motion;
//# sourceMappingURL=motion.js.map
/////////motion.js
var selectedLinks;
var stillBubblesArray = new Array;
var stillBuble;
function linkSelection(data) {
    for (var i = 0; i < bubbleArray.length; i++) {
        if (bubbleArray[i].bulle == data) {
            if (bubbleArray[i].links.length > 0) {
                selectedLinks = bubbleArray[i].links;
                for (var j = 0; j < bubbleArray[i].links.length; j++) {
                    var indexLink = Rezo.sceneLink.getChildIndex(bubbleArray[i].links[j]);
                    if (Link.linkArray[indexLink][1] == data) {
                        stillBubblesArray.push(Link.linkArray[indexLink].bulle2);
                    }
                    else {
                        stillBubblesArray.push(Link.linkArray[indexLink].bulle1);
                    }
                }
            }
        }
    }
    //if(selectedLink.length>0){
    //	for(var i=0;i<selectedLink[0].length;i++){
    //		var indexLink=Rezo.sceneLink.getChildIndex(selectedLink[0][i])
    //           if (Link.linkArray[indexLink][1] == data) {
    //               stillBubbleArray.push(Link.linkArray[indexLink].bulle2);
    //           } else {
    //               stillBubbleArray.push(Link.linkArray[indexLink].bulle1);
    //		}
    //	}
    //}
}
function motion(bulleX0, bulleY0) {
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
            link.hitArea = new PIXI.Polygon(bulleX0 - Link.lineHitFact, bulleY0 - Link.lineHitFact, bulleX0 + Link.lineHitFact, bulleY0 + Link.lineHitFact, bulleX1 + Link.lineHitFact, bulleY1 + Link.lineHitFact, bulleX1 - Link.lineHitFact, bulleY1 - Link.lineHitFact);
            console.log(link);
        }
    }
}
function clearMotion() {
    if (selectedLinks) {
        while (selectedLinks.length > 0) {
            selectedLinks.pop();
        }
    }
    while (stillBubblesArray.length > 0) {
        stillBubblesArray.pop();
    }
}
function multiLinkMotionFun() {
}
//# sourceMappingURL=motion.js.map
////////////////////////suppr.js
"use strict";
var supprLinkArray = [];
var supprLinkRefArray = [];
function supprFun() {
    if (Link.linkSelected) {
        var supprlink;
        var Bulle1index;
        var Bulle2index;
        var allLink = (Rezo.sceneLink.children);
        for (var i = 0; i < allLink.length; i++) {
            if (allLink[i].data) {
                supprlink = allLink[i];
                break;
            }
        }
        for (i = 0; i < Link.linkArray.length; i++) {
            if (Link.linkArray[i].link == supprlink) {
                Bulle1index = Link.linkArray[i].indexBulle1;
                Bulle2index = Link.linkArray[i].indexBulle2;
                console.log(Link.linkArray);
                Link.linkArray.splice(i, 1);
                console.log(Link.linkArray);
            }
        }
        for (i = 0; i < bubbleArray[Bulle1index].links.length; i++) {
            if (bubbleArray[Bulle1index].links[i] == supprlink) {
                bubbleArray[Bulle1index].links.splice(i, 1);
                bubbleArray[Bulle1index].linksIndex.splice(i, 1);
            }
        }
        for (i = 0; i < bubbleArray[Bulle2index].links.length; i++) {
            if (bubbleArray[Bulle2index].links[i] == supprlink) {
                bubbleArray[Bulle2index].links.splice(i, 1);
                bubbleArray[Bulle2index].linksIndex.splice(i, 1);
            }
        }
        Rezo.sceneLink.removeChild(supprlink);
        Link.linkSelected = false;
    }
    else {
        $('#loading').css("display", "block");
        var result;
        for (var i = 0, len = bubbleArray.length; i < len; i++) {
            if (bubbleArray[i].bulle == Rezo.selectedBulle) {
                result = i;
                break;
            }
        }
        for (i = 0; i < bubbleArray[result].links.length; i++) {
            supprLinkArray.push(bubbleArray[result].links[i]);
            for (var j = 0; j < Link.linkArray.length; j++) {
                if (Link.linkArray[j].link == supprLinkArray[i]) {
                    if (Link.linkArray[j].bulle1 == Rezo.selectedBulle) {
                        supprLinkRefArray.push(Link.linkArray[j].bulle2);
                    }
                    else {
                        supprLinkRefArray.push(Link.linkArray[j].bulle1);
                    }
                    Rezo.sceneLink.removeChild(Link.linkArray[j].link);
                    Link.linkArray.splice(j, 1);
                }
            }
        }
        bubbleArray.splice(result, 1);
        Rezo.sceneBulle.removeChild(Rezo.selectedBulle);
        for (i = 0; i < bubbleArray.length; i++) {
            for (j = 0; j < supprLinkRefArray.length; j++) {
                if (bubbleArray[i].bulle == supprLinkRefArray[j]) {
                    for (var k = 0; k < bubbleArray[i].links.length; k++) {
                        for (var l = 0; l < supprLinkArray.length; l++) {
                            if (supprLinkArray[l] == bubbleArray[i].links[k]) {
                                bubbleArray[i].links.splice(k, 1);
                            }
                        }
                    }
                }
            }
        }
        for (i = 0; i < bubbleArray.length; i++) {
            while (bubbleArray[i].linksIndex.length > 0) {
                bubbleArray[i].linksIndex.pop();
            }
            for (j = 0; j < bubbleArray[i].links.length; j++) {
                bubbleArray[i].linksIndex.push(Rezo.sceneLink.getChildIndex(bubbleArray[i].links[j]));
            }
        }
        var linkArray = Link.linkArray;
        var sceneBulle = Rezo.sceneBulle;
        for (i = 0; i < linkArray.length; i++) {
            linkArray[i].indexBulle1 = sceneBulle.getChildIndex(linkArray[i].bulle1);
            linkArray[i].indexBulle2 = sceneBulle.getChildIndex(linkArray[i].bulle2);
        }
        while (supprLinkArray.length > 0) {
            supprLinkArray.pop();
        }
        while (supprLinkRefArray.length > 0) {
            supprLinkRefArray.pop();
        }
        $('#loading').css("display", "none");
    }
}
//# sourceMappingURL=suppr.js.map
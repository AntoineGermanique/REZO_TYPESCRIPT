////////////////////////suppr.js
"use strict"



var supprLinkArray=[];
var supprLinkRefArray=[];
function supprFun() {


    if (Link.linkSelected) {
        var supprlink
        var Bulle1index
        var Bulle2index
        var allLink = <Link[]>(Rezo.sceneLink.children)
        for (var i = 0; i < allLink.length; i++) {
            if (allLink[i].data) {
                supprlink = allLink[i]
                break;
            }
        }
        for (i = 0; i < Link.linkArray.length; i++) {
            if (Link.linkArray[i][0] == supprlink) {

                Bulle1index = Link.linkArray[i][3]
                Bulle2index = Link.linkArray[i][4]
                console.log(Link.linkArray)
                Link.linkArray.splice(i, 1)
                console.log(Link.linkArray)
            }
        }
        for (i = 0; i < bubbleArray[Bulle1index][1].length; i++) {
            if (bubbleArray[Bulle1index][1][i] == supprlink) {
                bubbleArray[Bulle1index][1].splice(i, 1)
                bubbleArray[Bulle1index][2].splice(i, 1)
            }
        }
        for (i = 0; i < bubbleArray[Bulle2index][1].length; i++) {
            if (bubbleArray[Bulle2index][1][i] == supprlink) {
                bubbleArray[Bulle2index][1].splice(i, 1)
                bubbleArray[Bulle2index][2].splice(i, 1)
            }
        }
        Rezo.sceneLink.removeChild(supprlink)
        Link.linkSelected = false
    } else {
        $('#loading').css("display", "block");
        var result;
        for (var i = 0, len = bubbleArray.length; i < len; i++) {
            if (bubbleArray[i][0] == Rezo.selectedBulle) {
                result = i;
                break;
            }
        }
        for (i = 0; i < bubbleArray[result][1].length; i++) {
            supprLinkArray.push(bubbleArray[result][1][i])
            for (var j = 0; j < Link.linkArray.length; j++) {
                if (Link.linkArray[j][0] == supprLinkArray[i]) {
                    if (Link.linkArray[j][1] == Rezo.selectedBulle) {
                        supprLinkRefArray.push(Link.linkArray[j][2])
                    } else {
                        supprLinkRefArray.push(Link.linkArray[j][1])
                    }
                    Rezo.sceneLink.removeChild(Link.linkArray[j][0]);
                    Link.linkArray.splice(j, 1)
                    console.log("link removed")

                }
            }
        }

        bubbleArray.splice(result, 1);
        Rezo.sceneBulle.removeChild(Rezo.selectedBulle);
        for (i = 0; i < bubbleArray.length; i++) {
            for (j = 0; j < supprLinkRefArray.length; j++) {
                if (bubbleArray[i][0] == supprLinkRefArray[j]) {
                    for (var k = 0; k < bubbleArray[i][1].length; k++) {
                        for (var l = 0; l < supprLinkArray.length; l++) {
                            if (supprLinkArray[l] == bubbleArray[i][1][k]) {
                                bubbleArray[i][1].splice(k, 1);
                            }
                        }
                    }
                }
            }
        }
        for (i = 0; i < bubbleArray.length; i++) {
            while (bubbleArray[i][2] > 0) {
                bubbleArray[i][2].pop();
            }
            for (j = 0; j < bubbleArray[i][1].length; j++) {
                bubbleArray[i][2].push(Rezo.sceneLink.getChildIndex(bubbleArray[i][1][j]))
            }
        }
        var linkArray = Link.linkArray;
        var sceneBulle = Rezo.sceneBulle;
        for (i = 0; i < linkArray.length; i++) {
            linkArray[i][3] = sceneBulle.getChildIndex(linkArray[i][1]);
            linkArray[i][4] = sceneBulle.getChildIndex(linkArray[i][2]);
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

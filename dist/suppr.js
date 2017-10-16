////////////////////////suppr.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
var supprLinkArray = [];
var supprLinkRefArray = [];
function supprFun() {
    if (_1.Link.linkSelected) {
        var supprlink;
        var Bulle1index;
        var Bulle2index;
        var allLink = (_1.Rezo.sceneLink.children);
        for (var i = 0; i < allLink.length; i++) {
            if (allLink[i].data) {
                supprlink = allLink[i];
                break;
            }
        }
        for (i = 0; i < _1.Link.linkArray.length; i++) {
            if (_1.Link.linkArray[i].link == supprlink) {
                Bulle1index = _1.Link.linkArray[i].indexBulle1;
                Bulle2index = _1.Link.linkArray[i].indexBulle2;
                console.log(_1.Link.linkArray);
                _1.Link.linkArray.splice(i, 1);
                console.log(_1.Link.linkArray);
            }
        }
        for (i = 0; i < _1.bubbleArray[Bulle1index].links.length; i++) {
            if (_1.bubbleArray[Bulle1index].links[i] == supprlink) {
                _1.bubbleArray[Bulle1index].links.splice(i, 1);
                _1.bubbleArray[Bulle1index].linksIndex.splice(i, 1);
            }
        }
        for (i = 0; i < _1.bubbleArray[Bulle2index].links.length; i++) {
            if (_1.bubbleArray[Bulle2index].links[i] == supprlink) {
                _1.bubbleArray[Bulle2index].links.splice(i, 1);
                _1.bubbleArray[Bulle2index].linksIndex.splice(i, 1);
            }
        }
        _1.Rezo.sceneLink.removeChild(supprlink);
        _1.Link.linkSelected = false;
    }
    else {
        $('#loading').css("display", "block");
        var result;
        for (var i = 0, len = _1.bubbleArray.length; i < len; i++) {
            if (_1.bubbleArray[i].bulle == _1.Rezo.selectedBulle) {
                result = i;
                break;
            }
        }
        for (i = 0; i < _1.bubbleArray[result].links.length; i++) {
            supprLinkArray.push(_1.bubbleArray[result].links[i]);
            for (var j = 0; j < _1.Link.linkArray.length; j++) {
                if (_1.Link.linkArray[j].link == supprLinkArray[i]) {
                    if (_1.Link.linkArray[j].bulle1 == _1.Rezo.selectedBulle) {
                        supprLinkRefArray.push(_1.Link.linkArray[j].bulle2);
                    }
                    else {
                        supprLinkRefArray.push(_1.Link.linkArray[j].bulle1);
                    }
                    _1.Rezo.sceneLink.removeChild(_1.Link.linkArray[j].link);
                    _1.Link.linkArray.splice(j, 1);
                }
            }
        }
        _1.bubbleArray.splice(result, 1);
        _1.Rezo.sceneBulle.removeChild(_1.Rezo.selectedBulle);
        for (i = 0; i < _1.bubbleArray.length; i++) {
            for (j = 0; j < supprLinkRefArray.length; j++) {
                if (_1.bubbleArray[i].bulle == supprLinkRefArray[j]) {
                    for (var k = 0; k < _1.bubbleArray[i].links.length; k++) {
                        for (var l = 0; l < supprLinkArray.length; l++) {
                            if (supprLinkArray[l] == _1.bubbleArray[i].links[k]) {
                                _1.bubbleArray[i].links.splice(k, 1);
                            }
                        }
                    }
                }
            }
        }
        for (i = 0; i < _1.bubbleArray.length; i++) {
            while (_1.bubbleArray[i].linksIndex.length > 0) {
                _1.bubbleArray[i].linksIndex.pop();
            }
            for (j = 0; j < _1.bubbleArray[i].links.length; j++) {
                _1.bubbleArray[i].linksIndex.push(_1.Rezo.sceneLink.getChildIndex(_1.bubbleArray[i].links[j]));
            }
        }
        var linkArray = _1.Link.linkArray;
        var sceneBulle = _1.Rezo.sceneBulle;
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
exports.supprFun = supprFun;
//# sourceMappingURL=suppr.js.map
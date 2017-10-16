"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class LocalStorage {
    static localSave(array, name) {
        if (typeof sessionStorage != 'undefined') {
            var arrayStringify = JSON.stringify(array);
            localStorage.setItem(name, arrayStringify);
            if (name != "AutoSave") {
                _1.afficheGoodNews();
            }
        }
        else {
            alert("sessionStorage n'est pas supporté");
        }
    }
    static localOpen() {
        $("#driveOpen").hide();
        $(".open").remove();
        for (var i = 0, len = localStorage.length; i < len; i++) {
            var titre = localStorage.key(i);
            if (titre != "AutoSave") {
                var timeStamp = LocalStorage.getLocalTimeStamp(titre);
                if (!timeStamp)
                    timeStamp = Date.parse("01/01/1900");
                document.getElementById('open').innerHTML += "<div class='open' attr='" + timeStamp + "' id='" + titre + "'><span class='openSpan' id='" + titre + "'>" + titre + "</span><img class='openImgModif' src='images/pen.png'/><img class='openImgSuppr' src='images/SUPPR.png'></div>";
                LocalStorage.addListenersLocal();
            }
        }
    }
    static addListenersLocal() {
        var arrayLocal;
        $("img#closeOpen").click(() => {
            _1.Menu.openActif = true;
            $("#localHome").trigger("click");
        });
        $(".openSpan").click(() => {
            _1.whipe();
            LocalStorage.localLoad($(this).attr("id"));
            $("#localHome").trigger("click");
        });
        $("img#plusOpen").click(_1.Rezo.newRezo);
        $(".openImgModif").click(() => {
            var key = $(this).parent().attr('id');
            var newKey = _1.Save.promptTitle(key);
            if (newKey) {
                var rezoSaveString = localStorage.getItem(key);
                var rezoSaveObj = JSON.parse(rezoSaveString);
                rezoSaveObj.title = newKey;
                if (_1.Save.saveLocal(newKey, rezoSaveObj)) {
                    localStorage.removeItem(key);
                    LocalStorage.localOpen();
                }
            }
        });
        $(".openImgSuppr").click(() => {
            if (confirm(_1.Ressource.confirmSupprRezo)) {
                var key = $(this).parent().attr('id');
                localStorage.removeItem(key);
                LocalStorage.localOpen();
            }
        });
    }
    localClose() {
        $("#driveOpen").show();
    }
    static localLoad(titre) {
        var arrayLocal = JSON.parse(localStorage.getItem(titre));
        _1.Rezo.rezoId = "";
        if (!arrayLocal.bullesArray && !arrayLocal.arrayBubble) {
            _1.Load.load(arrayLocal[0], arrayLocal[1], titre, arrayLocal[3], arrayLocal[4]);
        }
        else if (arrayLocal.arrayBubble) {
            _1.Load.load(arrayLocal.arrayBubble, arrayLocal.arrayLink, titre, arrayLocal.scenePo, arrayLocal.scalePo);
        }
        else {
            _1.Load.load2(arrayLocal, titre);
        }
    }
    static getLocalTimeStamp(key) {
        var rezoSaveString = localStorage.getItem(key);
        var rezoSaveObj = JSON.parse(rezoSaveString);
        return rezoSaveObj.timeStamp;
    }
}
exports.LocalStorage = LocalStorage;
//# sourceMappingURL=localStorage.js.map
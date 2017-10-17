import { Rezo } from './rezo'

import {
    RezoSave,
    afficheGoodNews,
    Menu,
    whipe,
    Save,
    Ressource,
    Load
} from './index'

export class LocalStorage {
    static localSave(array: RezoSave, name: string) {
        if (typeof sessionStorage != 'undefined') {
            var arrayStringify = JSON.stringify(array);
            localStorage.setItem(name, arrayStringify);
            if (name != "AutoSave") {
                afficheGoodNews();
            }
        } else {
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
                if (!timeStamp) timeStamp = Date.parse("01/01/1900");
                document.getElementById('open').innerHTML += "<div class='open' attr='" + timeStamp + "' id='" + titre + "'><span class='openSpan' id='" + titre + "'>" + titre + "</span><img class='openImgModif' src='images/pen.png'/><img class='openImgSuppr' src='images/SUPPR.png'></div>";
                LocalStorage.addListenersLocal();
            }
        }
    }
    static addListenersLocal() {
        var arrayLocal;
        $("img#closeOpen").click(() => {
            Menu.openActif = true;

            $("#localHome").trigger("click");
        });
        $(".openSpan").click(() => {
            whipe();
            LocalStorage.localLoad($(this).attr("id"));
            $("#localHome").trigger("click");
        });
        $("img#plusOpen").click(Rezo.newRezo);
        $(".openImgModif").click(() => {
            var key = $(this).parent().attr('id');
            var newKey = Save.promptTitle(key)
            if (newKey) {
                var rezoSaveString = localStorage.getItem(key);
                var rezoSaveObj: RezoSave = JSON.parse(rezoSaveString);
                rezoSaveObj.title = newKey;

                if (Save.saveLocal(newKey, rezoSaveObj)) {
                    localStorage.removeItem(key);
                    LocalStorage.localOpen();
                }
            }
        });
        $(".openImgSuppr").click(() => {
            if (confirm(Ressource.confirmSupprRezo)) {
                var key = $(this).parent().attr('id');
                localStorage.removeItem(key);
                LocalStorage.localOpen();
            }

        });

    }
    localClose() {
        $("#driveOpen").show();

    }
    static localLoad(titre: string) {
        var arrayLocal = JSON.parse(localStorage.getItem(titre));
        Rezo.rezoId = "";
        if (!arrayLocal.bullesArray && !arrayLocal.arrayBubble) {
            Load.load(arrayLocal[0], arrayLocal[1], titre, arrayLocal[3], arrayLocal[4]);
        } else if (arrayLocal.arrayBubble) {
            Load.load(arrayLocal.arrayBubble, arrayLocal.arrayLink, titre, arrayLocal.scenePo, arrayLocal.scalePo);

        } else {
            Load.load2(arrayLocal, titre);
        }
    }

    static getLocalTimeStamp(key: string): number {
        var rezoSaveString: string = localStorage.getItem(key);
        var rezoSaveObj: RezoSave = JSON.parse(rezoSaveString);
        return rezoSaveObj.timeStamp;
    }
    //# sourceMappingURL=localStorage.js.map
}
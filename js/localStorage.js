function localSave(array, name) {
    if (typeof sessionStorage != 'undefined') {
        var arrayStringify = JSON.stringify(array);
        localStorage.setItem(name, arrayStringify);
        afficheGoodNews();
    }
    else {
        alert("sessionStorage n'est pas supporté");
    }
}
function localOpen() {
    $("#driveOpen").hide();
    $(".open").remove();
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var titre = localStorage.key(i);
        var timeStamp = getLocalTimeStamp(titre);
        if (!timeStamp)
            timeStamp = Date.parse("01/01/1900");
        document.getElementById('open').innerHTML += "<div class='open' attr='" + timeStamp + "' id='" + titre + "'><span class='openSpan' id='" + titre + "'>" + titre + "</span><img class='openImgModif' src='images/pen.png'/><img class='openImgSuppr' src='images/SUPPR.png'></div>";
        addListenersLocal();
    }
}
function addListenersLocal() {
    var arrayLocal;
    $("img#closeOpen").click(function () {
        openActif = true;
        $("#localHome").trigger("click");
    });
    $(".openSpan").click(function () {
        arrayLocal = localLoad($(this).attr("id"));
        whipe();
        if (!arrayLocal.bullesArray && !arrayLocal.arrayBubble) {
            load(arrayLocal[0], arrayLocal[1], titre, arrayLocal[3], arrayLocal[4]);
        }
        else if (arrayLocal.arrayBubble) {
            load(arrayLocal.arrayBubble, arrayLocal.arrayLink, titre, arrayLocal.scenePo, arrayLocal.scalePo);
        }
        else {
            load2(arrayLocal, $(this).attr("id"));
        }
        $("#localHome").trigger("click");
    });
    $("img#plusOpen").click(Rezo.newRezo);
    $(".openImgModif").click(function () {
        var key = $(this).parent().attr('id');
        var newKey = promptTitle(key);
        if (newKey) {
            var rezoSaveString = localStorage.getItem(key);
            var rezoSaveObj = JSON.parse(rezoSaveString);
            rezoSaveObj.title = newKey;
            if (saveLocal(rezoSaveObj, newKey)) {
                localStorage.removeItem(key);
                localOpen();
            }
        }
    });
    $(".openImgSuppr").click(function () {
        if (confirm(Ressource.confirmSupprRezo)) {
            var key = $(this).parent().attr('id');
            localStorage.removeItem(key);
            localOpen();
        }
    });
}
function localClose() {
    $("#driveOpen").show();
}
function localLoad(titre) {
    var array = JSON.parse(localStorage.getItem(titre));
    Rezo.rezoId = "";
    return array;
}
function getLocalTimeStamp(key) {
    var rezoSaveString = localStorage.getItem(key);
    var rezoSaveObj = JSON.parse(rezoSaveString);
    return rezoSaveObj.timeStamp;
}
//# sourceMappingURL=localStorage.js.map
//# sourceMappingURL=localStorage.js.map
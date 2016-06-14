function localSave(array, name) {
    if (typeof sessionStorage != 'undefined') {
        var arrayStringify = JSON.stringify(array);
        localStorage.setItem(name, arrayStringify);
        afficheGoodNews();
    } else {
        alert("sessionStorage n'est pas supporté");
    }
}

function localOpen() {
    $("driveBulle").hide();
    $(".open").remove();
    var arrayLocal;

    for (var i = 0, len = localStorage.length; i < len; i++) {
        var titre = localStorage.key(i);
        document.getElementById('open').innerHTML += "<div class='open' id='" + titre + "'><span class='openSpan' id='" + titre + "'>" + titre + "</span><img class='openImgModif' src='images/PLUS.png'/><img class='openImgSuppr' src='images/SUPPR.png'></div>";
        $("img#closeOpen").click(function () {
            openActif = true;

            $("#localHome").trigger("click");
        });
        $(".openSpan").click(function () {
            arrayLocal = localLoad($(this).attr("id"));
            whipe();
            if (!arrayLocal.bullesArray && !arrayLocal.arrayBubble) {
                load(arrayLocal[0], arrayLocal[1], titre, arrayLocal[3], arrayLocal[4]);
            } else if (arrayLocal.arrayBubble){
                load(arrayLocal.arrayBubble, arrayLocal.arrayLink, titre, arrayLocal.scenePo, arrayLocal.scalePo);

            } else {
                load2(arrayLocal, $(this).attr("id"));
            }

            $("#localHome").trigger("click");
        });
        $("img#plusOpen").click(Rezo.newRezo);

    }
}
function localClose() {
    $("driveBulle").show();

}
function localLoad(titre) {
    var array = JSON.parse(localStorage.getItem(titre));
    Rezo.rezoId = "";
    return array;
}
//# sourceMappingURL=localStorage.js.map

/////////////open.js
"use strict";
var bubbleTemp;
var isTitreInvalid;
var titre;
var drive = new DriveAPI();
var counter = 0;
function openLoad(data) {
    $("#open").append(data);
    $(".openSpan").click(function () {
        console.log(counter++);
        var id = $(this).parent().attr("id");
        $('#loading').css("display", "block");
        drive.getFile(id, function (file) { drive.downloadFile(file, load2); });
    });
    $(".openImgModif").click(function () {
        var oldTitle = $(this).parent().attr("id");
        var goodMenu = $(this).parent().children(".openSpan");
        console.log($(this).parent().children(".openSpan"));
        var newTitle = prompt("modifier le titre du rezo", oldTitle);
        isTitreInvalid = titreIsValid(newTitle);
        console.log(isTitreInvalid);
        if (isTitreInvalid == true) {
            alert("le titre du rezo contient des caract�res interdits/n ~`!#$%^&*+=-[]\\\';,/{}|\":<>? \nveuillez recommencer\n");
            $(this).trigger("click");
        }
        else {
            postModify(newTitle, oldTitle, goodMenu);
        }
    });
    $(".openImgSuppr").click(function () {
        titre = $(this).parent().attr("id");
        if (confirm('voulez vous vraiment supprimer ce Rezo?')) {
            $.post('php/suppr.php', { "titre": titre }, function (data) {
                $("#homeBulle").trigger("click");
                $("#homeBulle").trigger("click");
                console.log(data);
            });
        }
        else {
        }
    });
    $("img#closeOpen").click(function () {
        openActif = true;
        $("#homeBulle").trigger("click");
    });
    $("img#saveOpen").click(function () {
        Rezo.opened = false;
        save("Enregistrer le rezo " + Rezo.rezoName + " sous un nouveau titre");
    });
    $("img#plusOpen").click(function () {
        Rezo.rezoName = "";
        Rezo.opened = false;
        while (bubbleArray.length > 0) {
            bubbleArray.pop();
        }
        while (Link.linkArray.length > 0) {
            Link.linkArray.pop();
        }
        Rezo.sceneBulle.removeChildren();
        Rezo.sceneLink.removeChildren();
        circleX = screen.width / 2;
        circleY = screen.height / 2;
        Rezo.scene.addChild(new Bulle(circleX, circleY, "rezo"));
        Rezo.scaleScene.scale.x = 1;
        Rezo.scaleScene.scale.y = 1;
        Rezo.scene.position.x = 0;
        Rezo.scene.position.y = 0;
        $("img#closeOpen").trigger("click");
    });
}
function titreIsValid(newTitle) {
    var iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";
    for (var i = 0; i < newTitle.length; i++) {
        if (iChars.indexOf(newTitle.charAt(i)) != -1) {
            return true;
        }
    }
    return false;
}
function postModify(newTitle, oldTitle, goodMenu) {
    $('#loading').css("display", "block");
    $.post("php/modif.php", { "newTitle": newTitle, "oldTitle": oldTitle }, function (data) {
        $('#loading').css("display", "none");
        $(goodMenu).text(newTitle);
        $(goodMenu).attr("id", newTitle);
        $(goodMenu).parent().attr("id", newTitle);
    });
}
//# sourceMappingURL=open.js.map
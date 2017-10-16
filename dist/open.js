/////////////open.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
var isTitreInvalid;
var titre;
exports.drive = new _1.DriveAPI();
var counter = 0;
function openLoad(data) {
    if (data) {
        $("#openContainer").append(data);
    }
    addListenersDrive();
}
exports.openLoad = openLoad;
function addListenersDrive() {
    $(".openSpan").click(function () {
        console.log(counter++);
        var id = $(this).parent().attr("id");
        $('#loading').css("display", "block");
        exports.drive.getFile(id, (file) => { exports.drive.downloadFile(file, _1.Load.load2); });
    });
    $(".openImgModif").click(function () {
        var oldTitle = $(this).attr("id");
        var id = $(this).parent().attr("id");
        var goodMenu = $(this).parent().children(".openSpan");
        console.log($(this).parent().children(".openSpan"));
        var newTitle = prompt("modifier le titre du rezo", oldTitle);
        if (newTitle) {
            isTitreInvalid = titreIsValid(newTitle);
            console.log(isTitreInvalid);
            if (isTitreInvalid == true) {
                alert("le titre du rezo contient des caract�res interdits/n ~`!#$%^&*+=-[]\\\';,/{}|\":<>? \nveuillez recommencer\n");
                $(this).trigger("click");
            }
            else {
                _1.Utilitary.startLoad();
                exports.drive.updateName(newTitle, id);
            }
        }
    });
    $(".openImgSuppr").click(function () {
        titre = $(this).parent().attr("id");
        if (confirm(_1.Ressource.confirmSupprRezo)) {
            exports.drive.trashFile($(this).parent().attr("id"));
        }
        else {
            // Do nothing!
        }
    });
    $("img#closeOpen").click(function () {
        _1.Menu.openActif = true;
        $("#homeBulle").trigger("click");
    });
    //$("img#saveOpen").click(function(){
    //	Rezo.opened=false;
    //	save("Enregistrer le rezo "+Rezo.rezoName+" sous un nouveau titre")
    //})
    $("img#driveOpen").click(function () {
        exports.drive.logOut();
    });
    $("img#plusOpen").click(_1.Rezo.newRezo);
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
//function postModify(newTitle,oldTitle,goodMenu){
//	$('#loading').css("display","block");
//	$.post("php/modif.php",{"newTitle":newTitle,"oldTitle":oldTitle},function(data){
//			$('#loading').css("display","none");
//			$(goodMenu).text(newTitle);
//			$(goodMenu).attr("id",newTitle);
//			$(goodMenu).parent().attr("id",newTitle);
//		})
//}
var Sort;
(function (Sort) {
    Sort[Sort["nameUp"] = 0] = "nameUp";
    Sort[Sort["nameDown"] = 1] = "nameDown";
    Sort[Sort["dateUp"] = 2] = "dateUp";
    Sort[Sort["dateDown"] = 3] = "dateDown";
})(Sort || (Sort = {}));
function setSortingListener() {
    console.log("set listeners");
    $("#orderName .arrowUp").click(() => { sort(Sort.nameUp); });
    $("#orderName .arrowDown").click(() => { sort(Sort.nameDown); });
    $("#orderDate .arrowUp").click(() => { sort(Sort.dateUp); });
    $("#orderDate .arrowDown").click(() => { sort(Sort.dateDown); });
}
exports.setSortingListener = setSortingListener;
function sort(sort) {
    console.log("general sort");
    var nodeList = document.getElementsByClassName("open");
    var array = [];
    for (var i = 0; i < nodeList.length; i++) {
        array.push(nodeList.item(i));
    }
    switch (sort) {
        case Sort.nameUp:
            array = sortUpName(array);
            break;
        case Sort.nameDown:
            array = sortDownName(array);
            break;
        case Sort.dateUp:
            array = sortUpDate(array);
            break;
        case Sort.dateDown:
            array = sortDownDate(array);
            break;
    }
    $(".open").remove();
    var nodeListSorted;
    for (var i = 0; i < array.length; i++) {
        $("#openContainer").append(array[i]);
    }
    if (_1.Menu.isLocalHome) {
        _1.LocalStorage.addListenersLocal();
    }
    else if (_1.Menu.isDriveHome) {
        addListenersDrive();
    }
}
function sortUpDate(array) {
    console.log("sortUpDate");
    array.sort((b, a) => {
        if ($(a).attr("attr") < $(b).attr("attr"))
            return 1;
        if ($(a).attr("attr") > $(b).attr("attr"))
            return -1;
        return 0;
    });
    return array;
}
function sortDownDate(array) {
    console.log("sortDownDate");
    array.sort((a, b) => {
        if ($(a).attr("attr") < $(b).attr("attr"))
            return 1;
        if ($(a).attr("attr") > $(b).attr("attr"))
            return -1;
        return 0;
    });
    return array;
}
function sortUpName(array) {
    console.log("sortUpName");
    array.sort((b, a) => {
        if ($(a).children(".openSpan").attr("id").toLowerCase() < $(b).children(".openSpan").attr("id").toLowerCase())
            return 1;
        if ($(a).children(".openSpan").attr("id").toLowerCase() > $(b).children(".openSpan").attr("id").toLowerCase())
            return -1;
        return 0;
    });
    return array;
}
function sortDownName(array) {
    console.log("sortDownName");
    array.sort((a, b) => {
        if ($(a).children(".openSpan").attr("id").toLowerCase() < $(b).children(".openSpan").attr("id").toLowerCase())
            return 1;
        if ($(a).children(".openSpan").attr("id").toLowerCase() > $(b).children(".openSpan").attr("id").toLowerCase())
            return -1;
        return 0;
    });
    return array;
}
//# sourceMappingURL=open.js.map
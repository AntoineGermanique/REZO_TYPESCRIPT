/////////////open.js
"use strict";
var bubbleTemp;
var isTitreInvalid;
var titre;
var drive = new DriveAPI();
var counter = 0;
function openLoad(data) {
    if (data) {
        $("#openContainer").append(data);
    }
    $(".openSpan").click(function () {
        console.log(counter++);
        var id = $(this).parent().attr("id");
        $('#loading').css("display", "block");
        drive.getFile(id, function (file) { drive.downloadFile(file, load2); });
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
                Utilitary.startLoad();
                drive.updateName(newTitle, id);
            }
        }
    });
    $(".openImgSuppr").click(function () {
        titre = $(this).parent().attr("id");
        if (confirm('voulez vous vraiment supprimer ce Rezo?')) {
            drive.trashFile($(this).parent().attr("id"));
        }
        else {
        }
    });
    $("img#closeOpen").click(function () {
        openActif = true;
        $("#homeBulle").trigger("click");
    });
    //$("img#saveOpen").click(function(){
    //	Rezo.opened=false;
    //	save("Enregistrer le rezo "+Rezo.rezoName+" sous un nouveau titre")
    //})
    $("img#driveOpen").click(function () {
        drive.logOut();
    });
    $("img#plusOpen").click(Rezo.newRezo);
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
    $("#orderName .arrowUp").click(function () { sort(Sort.nameUp); });
    $("#orderName .arrowDown").click(function () { sort(Sort.nameDown); });
    $("#orderDate .arrowUp").click(function () { sort(Sort.dateUp); });
    $("#orderDate .arrowDown").click(function () { sort(Sort.dateDown); });
}
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
    for (var i = 0; i < array.length; i++) {
        $("#openContainer").append(array[i]);
    }
}
function sortUpDate(array) {
    console.log("sortUpDate");
    array.sort(function (b, a) {
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
    array.sort(function (a, b) {
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
    array.sort(function (b, a) {
        if ($(a).children(".openSpan").attr("id") < $(b).children(".openSpan").attr("id"))
            return 1;
        if ($(a).children(".openSpan").attr("id") > $(b).children(".openSpan").attr("id"))
            return -1;
        return 0;
    });
    return array;
}
function sortDownName(array) {
    console.log("sortDownName");
    array.sort(function (a, b) {
        if ($(a).children(".openSpan").attr("id") < $(b).children(".openSpan").attr("id"))
            return 1;
        if ($(a).children(".openSpan").attr("id") > $(b).children(".openSpan").attr("id"))
            return -1;
        return 0;
    });
    return array;
}
//# sourceMappingURL=open.js.map
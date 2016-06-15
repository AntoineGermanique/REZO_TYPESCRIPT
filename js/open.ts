/////////////open.js
"use strict"

var bubbleTemp
var isTitreInvalid
var titre;
var drive: DriveAPI = new DriveAPI();
var counter :number=0;



function openLoad(data){
    if (data) {
        $("#openContainer").append(data);
    }
    addListenersDrive();

    
}

function addListenersDrive() {
    $(".openSpan").click(function () {
        console.log(counter++)
        var id = $(this).parent().attr("id")
        $('#loading').css("display", "block");
        drive.getFile(id, (file) => { drive.downloadFile(file, load2) })
    })
    $(".openImgModif").click(function () {
        var oldTitle = $(this).attr("id")
        var id = $(this).parent().attr("id")
        var goodMenu = $(this).parent().children(".openSpan");
        console.log($(this).parent().children(".openSpan"))
        var newTitle = prompt("modifier le titre du rezo", oldTitle)
        if (newTitle) {
            isTitreInvalid = titreIsValid(newTitle)
            console.log(isTitreInvalid)
            if (isTitreInvalid == true) {
                alert("le titre du rezo contient des caractères interdits/n ~`!#$%^&*+=-[]\\\';,/{}|\":<>? \nveuillez recommencer\n");
                $(this).trigger("click");
            } else {
                Utilitary.startLoad();
                drive.updateName(newTitle, id);
            }
        }

    })
    $(".openImgSuppr").click(function () {
        titre = $(this).parent().attr("id")
        if (confirm(Ressource.confirmSupprRezo)) {
            drive.trashFile($(this).parent().attr("id"))
        } else {
            // Do nothing!
        }

    })
    $("img#closeOpen").click(function () {
        openActif = true;
        $("#homeBulle").trigger("click");
    })
    //$("img#saveOpen").click(function(){

    //	Rezo.opened=false;
    //	save("Enregistrer le rezo "+Rezo.rezoName+" sous un nouveau titre")

    //})
    $("img#driveOpen").click(function () {
        drive.logOut();
    })
    $("img#plusOpen").click(Rezo.newRezo);

}
function titreIsValid(newTitle) {
    var iChars = "~`!#$%^&*+=-[]\\\';,/{}|\":<>?";

    for (var i = 0; i < newTitle.length; i++) {
		if (iChars.indexOf(newTitle.charAt(i)) != -1) {
			return true
        }
    }
	return false
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

enum Sort {
    nameUp,nameDown,dateUp,dateDown
}

function setSortingListener() {
    console.log("set listeners");
    $("#orderName .arrowUp").click(() => { sort(Sort.nameUp) });
    $("#orderName .arrowDown").click(() => { sort(Sort.nameDown) });
    $("#orderDate .arrowUp").click(() => { sort(Sort.dateUp) });
    $("#orderDate .arrowDown").click(() => { sort(Sort.dateDown) });
}

function sort(sort: Sort) {
    console.log("general sort");

    var nodeList = <NodeListOf<HTMLElement>>document.getElementsByClassName("open");
    var array: HTMLElement[] = [];
    for (var i = 0; i < nodeList.length; i++) {
        array.push(nodeList.item(i));
    }
    switch (sort) {
        case Sort.nameUp:
            array = sortUpName(array)
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
    var nodeListSorted: NodeListOf<HTMLElement>;
    for (var i = 0; i < array.length; i++) {
        $("#openContainer").append(array[i]);
    }
    if (isLocalHome) {
        addListenersLocal()
    } else if (isDriveHome) {
        addListenersDrive();
    }
}

function sortUpDate(array: Array<HTMLElement>): Array<HTMLElement> {
    console.log("sortUpDate");
    array.sort((b, a):number => {
        if ($(a).attr("attr") < $(b).attr("attr"))
            return 1;
        if ($(a).attr("attr") > $(b).attr("attr"))
            return -1;
        return 0;
    })
    return array;
}

function sortDownDate (array: Array<HTMLElement>): Array<HTMLElement> {
    console.log("sortDownDate");

    array.sort((a, b): number => {
        if ($(a).attr("attr") < $(b).attr("attr"))
            return 1;
        if ($(a).attr("attr") > $(b).attr("attr"))
            return -1;
        return 0;
    })
    return array;
}

function sortUpName(array: Array<HTMLElement>): Array<HTMLElement> {
    console.log("sortUpName");

    array.sort((b, a): number => {
        if ($(a).children(".openSpan").attr("id").toLowerCase() < $(b).children(".openSpan").attr("id").toLowerCase())
            return 1;
        if ($(a).children(".openSpan").attr("id").toLowerCase() > $(b).children(".openSpan").attr("id").toLowerCase())
            return -1;
        return 0;
    })
    return array
}

function sortDownName(array: Array<HTMLElement>): Array<HTMLElement> {
    console.log("sortDownName")
    array.sort((a, b): number => {
        if ($(a).children(".openSpan").attr("id").toLowerCase() < $(b).children(".openSpan").attr("id").toLowerCase())
            return 1;
        if ($(a).children(".openSpan").attr("id").toLowerCase() > $(b).children(".openSpan").attr("id").toLowerCase())
            return -1;
        return 0;
    })
    return array;
}

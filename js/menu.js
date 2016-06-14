/////////////menu.js
"use strict";
var isLocalSave = false;
var menuActif = false;
var openActif = false;
var fastBool = false;
var editBool = false;
var naviBool = false;
var scalBool = false;
var coloBool = false;
var multBool = false;
var selectBool = false;
var hyperBool = false;
var bulleMiddlePoX;
var bulleMiddlePoY;
function menu() {
    var windowW = Rezo.windowW;
    var windowH = Rezo.windowH;
    $("#menuBtn").click(function () {
        $("#edit1").css("display", "block");
        $("#menuBtn_replie").css("display", "block");
        $("#menuBtn").css("display", "none");
        if (naviBool) {
            $("#naviBulle").trigger("click");
        }
        if (editBool) {
            $("#editBulle").trigger("click");
        }
    });
    $("#menuBtn_replie").click(function () {
        $("#edit1").css("display", "none");
        $("#menuBtn_replie").css("display", "none");
        $("#menuBtn").css("display", "block");
        if (naviBool) {
            $("#naviBulle").trigger("click");
        }
        if (editBool) {
            $("#editBulle").trigger("click");
        }
    });
    $("#plusBulle").click(function () {
        updateWindowSize();
        if (hyperBool) {
            hyperPlusFun();
        }
        else {
            var scaleScene = Rezo.scaleScene;
            bulleMiddlePoX = windowW / 2 / scaleScene.scale.x - scaleScene.scene.x - (windowW / scaleScene.scale.x - windowW) / 2;
            bulleMiddlePoY = windowH / 2 / scaleScene.scale.x - scaleScene.scene.y - (windowH / scaleScene.scale.x - windowH) / 2;
            // dispatchMouseEvent(selectedBulle, 'mousedown', true, true);
            // dispatchMouseEvent(selectedBulle, 'mouseup', true, true);
            scaleScene.scene.sceneBulle.addChild(new Bulle(bulleMiddlePoX, bulleMiddlePoY, "txt", circleColor, 1));
        }
    });
    $("#supprBulle").click(function () { supprFun(); });
    $("#driveBulle").click(function (event) {
        $('#loading').css("display", "block");
        drive.handleAuthClick(event);
    });
    $("#saveBulle").click(saveDrive);
    $("#localSaveBulle").click(function () {
        saveLocal();
    });
    $("#linkBulle").click(linkButton);
    $("#link2Bulle").click(function () {
        Link.emptyLinkArray();
        if (Link.link2Bool == false) {
            setBackground(Ressource.pathImgLink2);
            Link.link3Bool = false;
            $("#link3Bulle").css({ "box-shadow": "none" });
            Link.link2Bool = true;
            $("#link2Bulle").css({ "box-shadow": "purple 0px 0px 20px inset", "border-radius": "20px" });
        }
        else {
            Link.link2Bool = false;
            setBackground(Ressource.pathImgLink);
            $("#link2Bulle").css({ "box-shadow": "none" });
        }
    });
    $("#link3Bulle").click(function () {
        Link.emptyLinkArray();
        if (Link.link3Bool == false) {
            setBackground(Ressource.pathImgLink3);
            Link.link2Bool = false;
            $("#link2Bulle").css({ "box-shadow": "none" });
            Link.link3Bool = true;
            $("#link3Bulle").css({ "box-shadow": "purple 0px 0px 20px inset", "border-radius": "20px" });
        }
        else {
            setBackground(Ressource.pathImgLink);
            Link.link3Bool = false;
            $("#link3Bulle").css({ "box-shadow": "none" });
        }
    });
    $("#homeBulle").click(function () {
        if (openActif == false) {
            $(".open").remove();
            $('#loading').css("display", "block");
            drive.updateConnection();
            //$.post("php/open.php",function(data){
            //	$('#loading').css("display","none");
            //	openLoad(data);
            //})
            $("#open").css("display", "block");
            openActif = true;
        }
        else {
            $("#open").css("display", "none");
            $(".open").remove();
            $("img#closeOpen").off();
            $("img#saveOpen").off();
            openActif = false;
        }
    });
    $("#localHome").click(function () {
        if (openActif == false) {
            var arrayLocal = localOpen();
            $("#open").css("display", "block");
            openActif = true;
        }
        else {
            $("#open").css("display", "none");
            $("img#closeOpen").off();
            $(".open").remove();
            openActif = false;
            localClose();
        }
    });
    $("#textBulle").click(function () {
        Rezo.selectedBulle.text.replaceText();
    });
    $("#fastBulle").click(function () {
        fastFun();
    });
    $("#editBulle").click(editButton);
    $("#naviBulle").click(function () {
        if (!naviBool) {
            naviBool = true;
            $("#zoomPBulle").css("display", "block");
            $("#zoomMBulle").css("display", "block");
            $("#zoomPText").css("display", "block");
            $("#zoomMText").css("display", "block");
            /* $("#plusBulle").css("display","none");
            $("#saveBulle").css("display","none");
            $("#fastBulle").css("display","none");
            $("#homeBulle").css("display","none");
            $("#editBulle").css("display","none");
            $("#editBackground").css("display","none");*/
            $("#naviBulle").css("background", "white");
        }
        else {
            naviBool = false;
            $("#zoomPBulle").css("display", "none");
            $("#zoomMBulle").css("display", "none");
            $("#zoomPText").css("display", "none");
            $("#zoomMText").css("display", "none");
            /* $("#plusBulle").css("display","block");
            $("#saveBulle").css("display","block");
            $("#fastBulle").css("display","block");
            $("#homeBulle").css("display","block");
            $("#editBulle").css("display","block");
            $("#editBackground").css("display","block"); */
            $("#naviBulle").css("background", "none");
        }
    });
    $("#zoomPBulle").click(function () {
        zoomScenePlus();
    });
    $("#zoomMBulle").click(function () {
        zoomSceneMoins();
    });
    $("#fullBulle").click(function () {
        var body = document.getElementsByTagName("body")[0];
        if (this.isFullScreen) {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            }
            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            this.isFullScreen = false;
        }
        else {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
            else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
            else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            }
            this.isFullScreen = true;
        }
    });
    $("#scalBulle").click(function () {
        if (!scalBool) {
            scalBool = true;
            setBackgroundScale();
            $("#scalBackground").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "100px" });
            $("#scalZPBulle").css("display", "block");
            $("#scalZMBulle").css("display", "block");
            $("#scalBackground").css("background", "rgb(127, 255, 0)");
            scaleBulleTouch();
        }
        else {
            scalBool = false;
            setBackgroundScale();
            $("#scalBackground").css({ "box-shadow": "none" });
            $("#scalZPBulle").css("display", "none");
            $("#scalZMBulle").css("display", "none");
            $("#scalBackground").css("background", "none");
            scaleBulleTouch();
        }
    });
    $("#coloBulle").click(function () {
        gradient();
    });
    $("#scalZPBulle").click(function () {
        if (multBool) {
            multiScaleBullePlus(multiArray);
        }
        else {
            scaleBullePlus(Rezo.selectedBulle);
        }
    });
    $("#scalZMBulle").click(function () {
        if (multBool) {
            multiScaleBulleMoins(multiArray);
        }
        else {
            scaleBulleMoins(Rezo.selectedBulle);
        }
    });
    $("#multBulle").click(multiButton);
    $("#selectBulle").click(function () {
        if (selectBool) {
            setBackground(Ressource.pathImgMulti);
            selectBool = false;
            select();
            detectPathGraphics.clear();
            $("#selectBulle").css({ "background": "none", "border-radius": "100px", "box-shadow": "none" });
        }
        else {
            setBackground(Ressource.pathImgSelect);
            if (scalBool) {
                $("#scalBulle").trigger("click");
            }
            selectBool = true;
            select();
            $("#selectBulle").css({ "background": "rgba(255, 255, 0, 0.44)", "border-radius": "100px", "box-shadow": "0PX 0PX 5PX 5px orangered" });
        }
    });
    $("#zoomPText").click(function () {
        multiScaleBullePlus(bubbleArray);
    });
    $("#zoomMText").click(function () {
        multiScaleBulleMoins(bubbleArray);
    });
    $("#hyperBulle").click(function () {
        if (hyperBool) {
            hyperBool = false;
            $("#hyperBulle").css({ "background": "none", "border-radius": "100px", "box-shadow": "none" });
        }
        else {
            hyperBool = true;
            $("#hyperBulle").css({ "background": "rgba(0, 0, 255, 0.44)", "border-radius": "100px", "box-shadow": "0PX 0PX 5PX 5px blue" });
        }
    });
}
function linkButton() {
    Link.emptyLinkArray();
    if (Link.linkBool == false) {
        if (multBool) {
            $("#multBulle").trigger("click");
        }
        setBackground(Ressource.pathImgLink);
        disableButton($("#multBulle"));
        Link.linkBool = true;
        $("#linkBulle").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "20px" });
        $("#link2Bulle").css("display", "block");
        $("#link3Bulle").css("display", "block");
        $("#menu").css("max-height", "none");
    }
    else {
        setBackground();
        enableButton($("#multBulle"), multiButton);
        Link.linkBool = false;
        $("#linkBulle").css({ "box-shadow": "none" });
        Link.link2Bool = false;
        $("#link2Bulle").css("display", "none");
        $("#link2Bulle").css({ "box-shadow": "none" });
        Link.link3Bool = false;
        $("#link3Bulle").css("display", "none");
        $("#link3Bulle").css({ "box-shadow": "none" });
        $("#menu").css("max-height", "100%");
    }
    console.log("hop");
}
;
function multiButton() {
    if (!multBool) {
        setBackground(Ressource.pathImgMulti);
        if (Link.linkBool) {
            $("#linkBulle").trigger("click");
        }
        disableButton($("#linkBulle"));
        multBool = true;
        $("#selectBulle").css("display", "block");
        $("#multiBackground").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "100px" });
        multi();
    }
    else {
        setBackground();
        multBool = false;
        enableButton($("#linkBulle"), linkButton);
        $("#selectBulle").css("display", "none");
        $("#multiBackground").css({ "box-shadow": "none" });
        multi();
        if (selectBool) {
            $("#selectBulle").trigger("click");
        }
        detectPathGraphics.clear();
    }
}
function editButton() {
    if (!editBool) {
        editBool = true;
        $("#supprBulle").css("display", "block");
        $("#textBulle").css("display", "block");
        $("#linkBulle").css("display", "block");
        $("#coloBulle").css("display", "block");
        $("#scalBulle").css("display", "block");
        $("#multBulle").css("display", "block");
        $("#hyperBulle").css("display", "block");
        //$("#plusBulle").css("display","none");
        /* $("#saveBulle").css("display","none");
        $("#fastBulle").css("display","none");
        $("#homeBulle").css("display","none");
        $("#naviBulle").css("display","none");
        $("#navBackground").css("display","none"); */
        $("#editBulle").css("background", "white");
    }
    else {
        editBool = false;
        $("#supprBulle").css("display", "none");
        $("#textBulle").css("display", "none");
        $("#linkBulle").css("display", "none");
        $("#link2Bulle").css("display", "none");
        $("#link3Bulle").css("display", "none");
        $("#coloBulle").css("display", "none");
        $("#scalBulle").css("display", "none");
        $("#multBulle").css("display", "none");
        $("#hyperBulle").css("display", "none");
        //$("#plusBulle").css("display","block");
        /* $("#saveBulle").css("display","block");
        $("#fastBulle").css("display","block");
        $("#homeBulle").css("display","block");
        $("#naviBulle").css("display","block");
        $("#navBackground").css("display","block"); */
        $("#editBulle").css("background", "none");
        if (scalBool) {
            $("#scalBulle").trigger("click");
        }
        if (Link.linkBool) {
            $("#linkBulle").trigger("click");
        }
        if (coloBool) {
            $("#coloBulle").trigger("click");
        }
        if (multBool) {
            $("#multBulle").trigger("click");
        }
    }
}
function enableButton(button, callback) {
    button.css("opacity", "1");
    button.css("cursor", "pointer");
    button.on("click", callback);
}
function disableButton(button) {
    button.css("opacity", "0.2");
    button.css("cursor", "not-allowed");
    button.off();
}
function setBackground(path) {
    if (path) {
        $("#background").css("background", "url('" + path + "')");
        setBackgroundScale();
    }
    else {
        $("#background").css("background", "none");
        setBackgroundScale();
    }
}
function setBackgroundScale() {
    if (scalBool) {
        $("#background-scale").css("background", "url('" + Ressource.pathImgScale + "')");
    }
    else {
        $("#background-scale").css("background", "none");
    }
}
//# sourceMappingURL=menu.js.map
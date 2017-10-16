"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////menu.js
const _1 = require("./");
"use strict";
class Menu {
    static menu() {
        let windowW = _1.Rezo.windowW;
        let windowH = _1.Rezo.windowH;
        $("#menuBtn").click(() => {
            if (!Menu.menuActif) {
                Menu.menuActif = true;
                $("#menuContainer").css("display", "block");
                $("#menuBtn").removeClass("menuBtn").addClass("menuBtn_replie");
                if (Menu.naviBool) {
                    $("#naviBulle").trigger("click");
                }
                if (Menu.editBool) {
                    $("#editBulle").trigger("click");
                }
                if (Menu.drawBool) {
                    $("#drawBulle").trigger("click");
                }
            }
            else {
                Menu.menuActif = false;
                $("#menuBtn").removeClass("menuBtn_replie").addClass("menuBtn");
                $("#menuContainer").css("display", "none");
                if (Menu.naviBool) {
                    $("#naviBulle").trigger("click");
                }
                if (Menu.editBool) {
                    $("#editBulle").trigger("click");
                }
                if (Menu.drawBool) {
                    $("#drawBulle").trigger("click");
                }
            }
        });
        $("#plusBulle").click(() => {
            _1.updateWindowSize();
            if (Menu.hyperBool) {
                new _1.Hyper().hyperPlusFun();
            }
            else {
                var scaleScene = _1.Rezo.scaleScene;
                Menu.bulleMiddlePoX = windowW / 2 / scaleScene.scale.x - scaleScene.scene.x - (windowW / scaleScene.scale.x - windowW) / 2;
                Menu.bulleMiddlePoY = windowH / 2 / scaleScene.scale.x - scaleScene.scene.y - (windowH / scaleScene.scale.x - windowH) / 2;
                // dispatchMouseEvent(selectedBulle, 'mousedown', true, true);
                // dispatchMouseEvent(selectedBulle, 'mouseup', true, true);
                scaleScene.scene.sceneBulle.addChild(new _1.Bulle(Menu.bulleMiddlePoX, Menu.bulleMiddlePoY, "txt", _1.Bulle.bulleColor, 1));
            }
        });
        $("#supprBulle").click(() => { _1.supprFun(); });
        $("#driveBulle").click((event) => {
            $('#loading').css("display", "block");
            _1.drive.handleAuthClick(event);
        });
        $("#saveBulle").click(_1.Save.saveDrive);
        $("#localSaveBulle").click(() => {
            _1.Save.saveLocal();
        });
        $("#linkBulle").click(Menu.linkButton);
        $("#link2Bulle").click(() => {
            _1.Link.emptyLinkArray();
            if (_1.Link.link2Bool == false) {
                Menu.setBackground(_1.Ressource.pathImgLink2);
                _1.Link.link3Bool = false;
                $("#link3Bulle").css({ "box-shadow": "none" });
                _1.Link.link2Bool = true;
                $("#link2Bulle").css({ "box-shadow": "purple 0px 0px 20px inset", "border-radius": "20px" });
            }
            else {
                _1.Link.link2Bool = false;
                Menu.setBackground(_1.Ressource.pathImgLink);
                $("#link2Bulle").css({ "box-shadow": "none" });
            }
        });
        $("#link3Bulle").click(() => {
            _1.Link.emptyLinkArray();
            if (_1.Link.link3Bool == false) {
                Menu.setBackground(_1.Ressource.pathImgLink3);
                _1.Link.link2Bool = false;
                $("#link2Bulle").css({ "box-shadow": "none" });
                _1.Link.link3Bool = true;
                $("#link3Bulle").css({ "box-shadow": "purple 0px 0px 20px inset", "border-radius": "20px" });
            }
            else {
                Menu.setBackground(_1.Ressource.pathImgLink);
                _1.Link.link3Bool = false;
                $("#link3Bulle").css({ "box-shadow": "none" });
            }
        });
        $("#homeBulle").click(() => {
            if (Menu.openActif == false) {
                _1.Rezo.checkSaveStatus();
                Menu.isDriveHome = true;
                $(".open").remove();
                $('#loading').css("display", "block");
                _1.drive.updateConnection();
                //$.post("php/open.php",function(data){
                //	$('#loading').css("display","none");
                //	openLoad(data);
                //})
                $("#open").css("display", "block");
                Menu.openActif = true;
            }
            else {
                $("#open").css("display", "none");
                $(".open").remove();
                $("img#closeOpen").off();
                $("img#saveOpen").off();
                Menu.openActif = false;
                Menu.isDriveHome = false;
            }
        });
        $("#localHome").click(() => {
            if (Menu.openActif == false) {
                _1.Rezo.checkSaveStatus();
                Menu.isLocalHome = true;
                var arrayLocal = new localStorage.localOpen();
                $("#open").css("display", "block");
                Menu.openActif = true;
                _1.setSortingListener();
            }
            else {
                $("#open").css("display", "none");
                $("img#closeOpen").off();
                $(".open").remove();
                Menu.openActif = false;
                new localStorage.localClose();
                Menu.isLocalHome = false;
            }
        });
        $("#textBulle").click(() => {
            _1.Rezo.selectedBulle.text.replaceText();
        });
        $("#fastBulle").click(() => {
            _1.fastFun();
        });
        $("#editBulle").click(Menu.editButton);
        $("#naviBulle").click(() => {
            if (!Menu.naviBool) {
                Menu.naviBool = true;
                $("#zoomPBulle").removeClass("hiddenButton");
                $("#zoomMBulle").removeClass("hiddenButton");
                $("#zoomPText").removeClass("hiddenButton");
                $("#zoomMText").removeClass("hiddenButton");
                $("#naviBulle").addClass("whiteBackground");
            }
            else {
                Menu.naviBool = false;
                $("#zoomPBulle").addClass("hiddenButton");
                $("#zoomMBulle").addClass("hiddenButton");
                $("#zoomPText").addClass("hiddenButton");
                $("#zoomMText").addClass("hiddenButton");
                $("#naviBulle").removeClass("whiteBackground");
            }
        });
        $("#zoomPBulle").click(() => {
            _1.Zoom.zoomScenePlus();
        });
        $("#zoomMBulle").click(() => {
            _1.Zoom.zoomSceneMoins();
        });
        $("#fullBulle").click(() => {
            var body = document.getElementsByTagName("body")[0];
            if (Menu.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                Menu.isFullScreen = false;
            }
            else {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                }
                else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                }
                // else if (document.documentElement.mozRequestFullScreen) {
                //     document.documentElement.mozRequestFullScreen()
                // }
                Menu.isFullScreen = true;
            }
        });
        $("#scalBulle").click(() => {
            if (!Menu.scalBool) {
                Menu.scalBool = true;
                Menu.setBackgroundScale();
                $("#scalBackground").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "100px" });
                $("#scalZPBulle").css("display", "block");
                $("#scalZMBulle").css("display", "block");
                $("#scalBackground").css("background", "rgb(127, 255, 0)");
                _1.Scale.scaleBulleTouch();
            }
            else {
                Menu.scalBool = false;
                Menu.setBackgroundScale();
                $("#scalBackground").css({ "box-shadow": "none" });
                $("#scalZPBulle").css("display", "none");
                $("#scalZMBulle").css("display", "none");
                $("#scalBackground").css("background", "none");
                _1.Scale.scaleBulleTouch();
            }
        });
        $("#coloBulle").click(() => {
            _1.gradient();
        });
        $("#scalZPBulle").click(() => {
            if (Menu.multBool) {
                _1.Scale.multiScaleBullePlus(_1.Multi.multiArray);
            }
            else {
                _1.Scale.scaleBullePlus(_1.Rezo.selectedBulle);
            }
        });
        $("#scalZMBulle").click(() => {
            if (Menu.multBool) {
                _1.Scale.multiScaleBulleMoins(_1.Multi.multiArray);
            }
            else {
                _1.Scale.scaleBulleMoins(_1.Rezo.selectedBulle);
            }
        });
        $("#multBulle").click(this.multiButton);
        $("#selectBulle").click(() => {
            if (Menu.selectBool) {
                Menu.setBackground(_1.Ressource.pathImgMulti);
                Menu.selectBool = false;
                _1.Select.select();
                _1.Select.detectPathGraphics.clear();
                $("#selectBulle").css({ "box-shadow": "none" });
                $("#selectBulle").addClass("noRound");
            }
            else {
                Menu.setBackground(_1.Ressource.pathImgSelect);
                if (Menu.scalBool) {
                    $("#scalBulle").trigger("click");
                }
                Menu.selectBool = true;
                _1.Select.select();
                $("#selectBulle").css({ "box-shadow": "0PX 0PX 5PX 5px orangered" });
                $("#selectBulle").removeClass("noRound");
            }
        });
        $("#zoomPText").click(() => {
            _1.Scale.multiScaleBullePlus(_1.bubbleArray);
        });
        $("#zoomMText").click(() => {
            _1.Scale.multiScaleBulleMoins(_1.bubbleArray);
        });
        $("#hyperBulle").click(() => {
            if (Menu.hyperBool) {
                Menu.hyperBool = false;
                $("#hyperBulle").css({ "background": "none", "border-radius": "100px", "box-shadow": "none" });
            }
            else {
                Menu.hyperBool = true;
                $("#hyperBulle").css({ "background": "rgba(0, 0, 255, 0.44)", "border-radius": "100px", "box-shadow": "0PX 0PX 5PX 5px blue" });
            }
        });
        $("#drawBulle").click(_1.SceneDraw.toggleDrawingMode);
        $("#writeBulle").click(_1.SceneDraw.toggleDrawingWrite);
        $("#circleBulle").click(_1.SceneDraw.toggleDrawingBulle);
        $("#scriptToTypeBulle").click(_1.SceneDraw.scriptToTypeBulle);
        $("#supprDrawBulle").click(_1.SceneDraw.supprDraw);
        $("#undoDrawBulle").click(_1.SceneDraw.undoDraw);
        $("#realtimeBulle").click(() => {
            var realtime = new _1.Realtime();
            realtime.init();
        });
    }
    static linkButton() {
        _1.Link.emptyLinkArray();
        if (_1.Link.linkBool == false) {
            if (Menu.multBool) {
                $("#multBulle").trigger("click");
            }
            Menu.setBackground(_1.Ressource.pathImgLink);
            Menu.disableButton($("#multBulle"));
            _1.Link.linkBool = true;
            $("#linkBulle").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "20px" });
            $("#link2Bulle").css("display", "block");
            $("#link3Bulle").css("display", "block");
            $("#menu").css("max-height", "none");
        }
        else {
            Menu.setBackground();
            Menu.enableButton($("#multBulle"), this.multiButton);
            _1.Link.linkBool = false;
            $("#linkBulle").css({ "box-shadow": "none" });
            _1.Link.link2Bool = false;
            $("#link2Bulle").css("display", "none");
            $("#link2Bulle").css({ "box-shadow": "none" });
            _1.Link.link3Bool = false;
            $("#link3Bulle").css("display", "none");
            $("#link3Bulle").css({ "box-shadow": "none" });
            $("#menu").css("max-height", "100%");
        }
        console.log("hop");
    }
    ;
    static multiButton() {
        if (!Menu.multBool) {
            Menu.setBackground(_1.Ressource.pathImgMulti);
            if (_1.Link.linkBool) {
                $("#linkBulle").trigger("click");
            }
            Menu.disableButton($("#linkBulle"));
            Menu.multBool = true;
            $("#selectBulle").css("display", "block");
            $("#multiBackground").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "100px" });
            _1.Multi.multi();
        }
        else {
            Menu.multBool = false;
            Menu.enableButton($("#linkBulle"), this.linkButton);
            $("#selectBulle").css("display", "none");
            $("#multiBackground").css({ "box-shadow": "none" });
            _1.Multi.multi();
            if (Menu.selectBool) {
                $("#selectBulle").trigger("click");
            }
            _1.Select.detectPathGraphics.clear();
            Menu.setBackground();
        }
    }
    static editButton() {
        if (!Menu.editBool) {
            Menu.editBool = true;
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
        }
        else {
            Menu.editBool = false;
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
            $("#editBulle").removeClass("whiteBackground");
            if (Menu.scalBool) {
                $("#scalBulle").trigger("click");
            }
            if (_1.Link.linkBool) {
                $("#linkBulle").trigger("click");
            }
            if (Menu.coloBool) {
                $("#coloBulle").trigger("click");
            }
            if (Menu.multBool) {
                $("#multBulle").trigger("click");
            }
        }
    }
    static enableButton(button, callback) {
        button.css("opacity", "1");
        button.css("cursor", "pointer");
        button.on("click", callback);
    }
    static disableButton(button) {
        button.css("opacity", "0.2");
        button.css("cursor", "not-allowed");
        button.off();
    }
    static setBackground(path) {
        if (path) {
            $("#background").css("background", "url('" + path + "')");
            this.setBackgroundScale();
        }
        else {
            $("#background").css("background", "none");
            this.setBackgroundScale();
        }
    }
    static setBackgroundScale() {
        if (Menu.scalBool) {
            $("#background-scale").css("background", "url('" + _1.Ressource.pathImgScale + "')");
        }
        else {
            $("#background-scale").css("background", "none");
        }
    }
}
Menu.isLocalSave = false;
Menu.menuActif = false;
Menu.openActif = false;
Menu.fastBool = false;
Menu.editBool = false;
Menu.naviBool = false;
Menu.scalBool = false;
Menu.coloBool = false;
Menu.multBool = false;
Menu.selectBool = false;
Menu.drawBool = false;
Menu.hyperBool = false;
Menu.isLocalHome = false;
Menu.isDriveHome = false;
Menu.isFullScreen = false;
exports.Menu = Menu;

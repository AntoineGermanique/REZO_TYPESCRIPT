/////////////menu.js
import $ from 'jquery'
import {
    Rezo,
    Link,
    Hyper,
    Bulle,
    updateWindowSize,
    supprFun,
    drive,
    Save,
    Ressource,
    setSortingListener,
    fastFun, SceneDraw,
    Zoom,
    Scale, 
    gradient,
    Multi,
    bubbleArray, Realtime
} from './'

"use strict"

interface Document extends HTMLBodyElement{
    cancelFullScreen: () => void;
    mozCancelFullScreen: () => void;
}
interface HTMLElement {
    mozRequestFullScreen: () => void;
}
export class Menu {
    static isLocalSave = false;
    static menuActif = false;
    static openActif = false;
    static fastBool = false;
    static editBool = false;
    static naviBool = false;
    static scalBool = false;
    static coloBool = false;
    static multBool = false;
    static selectBool = false;
    static drawBool = false;
    static hyperBool = false;
    static isLocalHome = false;
    static isDriveHome = false;
    static isFullScreen = false;
    static bulleMiddlePoX: number;
    static bulleMiddlePoY: number;

    static menu() {
        let windowW = Rezo.windowW;
        let windowH = Rezo.windowH;
        $("#menuBtn").click(() => {
            if (!Menu.menuActif) {
                Menu.menuActif = true;
                $("#menuContainer").css("display", "block")
                $("#menuBtn").removeClass("menuBtn").addClass("menuBtn_replie");
                if (Menu.naviBool) { $("#naviBulle").trigger("click") }
                if (Menu.editBool) { $("#editBulle").trigger("click") }
                if (Menu.drawBool) { $("#drawBulle").trigger("click") }
            } else {
                Menu.menuActif = false;
                $("#menuBtn").removeClass("menuBtn_replie").addClass("menuBtn");
                $("#menuContainer").css("display", "none")
                if (Menu.naviBool) { $("#naviBulle").trigger("click") }
                if (Menu.editBool) { $("#editBulle").trigger("click") }
                if (Menu.drawBool) { $("#drawBulle").trigger("click") }
            }
        })



        $("#plusBulle").click(() => {
            updateWindowSize()
            if (Menu.hyperBool) {
                new Hyper().hyperPlusFun()
            } else {
                var scaleScene = Rezo.scaleScene;
                Menu.bulleMiddlePoX = windowW / 2 / scaleScene.scale.x - scaleScene.scene.x - (windowW / scaleScene.scale.x - windowW) / 2
                Menu.bulleMiddlePoY = windowH / 2 / scaleScene.scale.x - scaleScene.scene.y - (windowH / scaleScene.scale.x - windowH) / 2
                // dispatchMouseEvent(selectedBulle, 'mousedown', true, true);
                // dispatchMouseEvent(selectedBulle, 'mouseup', true, true);
                scaleScene.scene.sceneBulle.addChild(new Bulle(Menu.bulleMiddlePoX, Menu.bulleMiddlePoY, "txt", Bulle.bulleColor, 1));
            }
        })

        $("#supprBulle").click(() => { supprFun() });
        $("#driveBulle").click((event) => {
            $('#loading').css("display", "block");
            drive.handleAuthClick(event)
        });

        $("#saveBulle").click(Save.saveDrive);
        $("#localSaveBulle").click(() => {
            Save.saveLocal();
        });
        $("#linkBulle").click(Menu.linkButton);
        $("#link2Bulle").click(() => {
            Link.emptyLinkArray()
            if (Link.link2Bool == false) {
                Menu.setBackground(Ressource.pathImgLink2)
                Link.link3Bool = false;
                $("#link3Bulle").css({ "box-shadow": "none" })
                Link.link2Bool = true;
                $("#link2Bulle").css({ "box-shadow": "purple 0px 0px 20px inset", "border-radius": "20px" })
            } else {
                Link.link2Bool = false;
                Menu.setBackground(Ressource.pathImgLink)
                $("#link2Bulle").css({ "box-shadow": "none" })
            }
        })
        $("#link3Bulle").click(() => {
            Link.emptyLinkArray()
            if (Link.link3Bool == false) {
                Menu.setBackground(Ressource.pathImgLink3);
                Link.link2Bool = false;
                $("#link2Bulle").css({ "box-shadow": "none" })
                Link.link3Bool = true;
                $("#link3Bulle").css({ "box-shadow": "purple 0px 0px 20px inset", "border-radius": "20px" })
            } else {
                Menu.setBackground(Ressource.pathImgLink);
                Link.link3Bool = false;
                $("#link3Bulle").css({ "box-shadow": "none" })
            }
        })

        $("#homeBulle").click(() => {
            if (Menu.openActif == false) {
                Rezo.checkSaveStatus();
                Menu.isDriveHome = true;
                $(".open").remove();

                $('#loading').css("display", "block");
                drive.updateConnection();
                //$.post("php/open.php",function(data){
                //	$('#loading').css("display","none");
                //	openLoad(data);
                //})
                $("#open").css("display", "block")
                Menu.openActif = true;
            } else {
                $("#open").css("display", "none");
                $(".open").remove();
                $("img#closeOpen").off();
                $("img#saveOpen").off();
                Menu.openActif = false;
                Menu.isDriveHome = false;
            }
        })
        $("#localHome").click(() => {
            if (Menu.openActif == false) {
                Rezo.checkSaveStatus();
                Menu.isLocalHome = true;
                var arrayLocal = new localStorage.localOpen();
                $("#open").css("display", "block")
                Menu.openActif = true
                setSortingListener()

            } else {
                $("#open").css("display", "none");
                $("img#closeOpen").off();
                $(".open").remove();
                Menu.openActif = false;
                new localStorage.localClose();
                Menu.isLocalHome = false;

            }
        })
        $("#textBulle").click(() => {
            Rezo.selectedBulle.text.replaceText();
        })
        $("#fastBulle").click(() => {
            fastFun();
        })
        $("#editBulle").click(Menu.editButton)
        $("#naviBulle").click(() => {
            if (!Menu.naviBool) {
                Menu.naviBool = true;
                $("#zoomPBulle").removeClass("hiddenButton");
                $("#zoomMBulle").removeClass("hiddenButton");
                $("#zoomPText").removeClass("hiddenButton");
                $("#zoomMText").removeClass("hiddenButton");
                $("#naviBulle").addClass("whiteBackground");


            } else {
                Menu.naviBool = false;
                $("#zoomPBulle").addClass("hiddenButton");
                $("#zoomMBulle").addClass("hiddenButton");
                $("#zoomPText").addClass("hiddenButton");
                $("#zoomMText").addClass("hiddenButton");
                $("#naviBulle").removeClass("whiteBackground");

            }
        })
        $("#zoomPBulle").click(() => {
            Zoom.zoomScenePlus()
        })
        $("#zoomMBulle").click(() => {
            Zoom.zoomSceneMoins()
        })
        $("#fullBulle").click(() => {
            var body = <HTMLBodyElement>document.getElementsByTagName("body")[0];
            if (Menu.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen() 
                }
                Menu.isFullScreen = false;
            } else {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                }
                // else if (document.documentElement.mozRequestFullScreen) {
                //     document.documentElement.mozRequestFullScreen()
                // }
                Menu.isFullScreen = true;
            }
        })
        $("#scalBulle").click(() => {
            if (!Menu.scalBool) {
                Menu.scalBool = true
                Menu.setBackgroundScale();
                $("#scalBackground").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "100px" })
                $("#scalZPBulle").css("display", "block")
                $("#scalZMBulle").css("display", "block")
                $("#scalBackground").css("background", "rgb(127, 255, 0)")
                Scale.scaleBulleTouch()


            } else {
                Menu.scalBool = false
                Menu.setBackgroundScale();
                $("#scalBackground").css({ "box-shadow": "none" })
                $("#scalZPBulle").css("display", "none")
                $("#scalZMBulle").css("display", "none")
                $("#scalBackground").css("background", "none")
                Scale.scaleBulleTouch()

            }
        })
        $("#coloBulle").click(() => {
            gradient()
        })
        $("#scalZPBulle").click(() => {
            if (Menu.multBool) {
                Scale.multiScaleBullePlus(Multi.multiArray)
            } else {
                Scale.scaleBullePlus(Rezo.selectedBulle)
            }
        })
        $("#scalZMBulle").click(() => {
            if (Menu.multBool) {
                Scale.multiScaleBulleMoins(Multi.multiArray)
            } else {
                Scale.scaleBulleMoins(Rezo.selectedBulle)
            }
        })
        $("#multBulle").click(this.multiButton);
        $("#selectBulle").click(() => {
            if (Menu.selectBool) {
                Menu.setBackground(Ressource.pathImgMulti);
                Menu.selectBool = false
                select();
                detectPathGraphics.clear()
                $("#selectBulle").css({ "box-shadow": "none" })
                $("#selectBulle").addClass("noRound")

            } else {
                Menu.setBackground(Ressource.pathImgSelect);
                if (Menu.scalBool) { $("#scalBulle").trigger("click") }
                Menu.selectBool = true
                select();
                $("#selectBulle").css({ "box-shadow": "0PX 0PX 5PX 5px orangered" })
                $("#selectBulle").removeClass("noRound")

            }
        })

        $("#zoomPText").click(() => {
            Scale.multiScaleBullePlus(bubbleArray)
        })
        $("#zoomMText").click(() => {
            Scale.multiScaleBulleMoins(bubbleArray)
        })
        $("#hyperBulle").click(() => {
            if (Menu.hyperBool) {
                Menu.hyperBool = false
                $("#hyperBulle").css({ "background": "none", "border-radius": "100px", "box-shadow": "none" })

            } else {
                Menu.hyperBool = true
                $("#hyperBulle").css({ "background": "rgba(0, 0, 255, 0.44)", "border-radius": "100px", "box-shadow": "0PX 0PX 5PX 5px blue" })
            }
        })
        $("#drawBulle").click(SceneDraw.toggleDrawingMode);
        $("#writeBulle").click(SceneDraw.toggleDrawingWrite);
        $("#circleBulle").click(SceneDraw.toggleDrawingBulle);
        $("#scriptToTypeBulle").click(SceneDraw.scriptToTypeBulle);
        $("#supprDrawBulle").click(SceneDraw.supprDraw);
        $("#undoDrawBulle").click(SceneDraw.undoDraw);
        $("#realtimeBulle").click(() => {
            var realtime = new Realtime();
            realtime.init();
        });
    }


    static linkButton() {

        Link.emptyLinkArray()
        if (Link.linkBool == false) {
            if (Menu.multBool) {
                $("#multBulle").trigger("click");
            }
            Menu.setBackground(Ressource.pathImgLink);
            Menu.disableButton($("#multBulle"));
            Link.linkBool = true;
            $("#linkBulle").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "20px" })
            $("#link2Bulle").css("display", "block")
            $("#link3Bulle").css("display", "block")
            $("#menu").css("max-height", "none")

        } else {
            Menu.setBackground();
            Menu.enableButton($("#multBulle"), this.multiButton);
            Link.linkBool = false;
            $("#linkBulle").css({ "box-shadow": "none" })
            Link.link2Bool = false;
            $("#link2Bulle").css("display", "none")
            $("#link2Bulle").css({ "box-shadow": "none" })
            Link.link3Bool = false;
            $("#link3Bulle").css("display", "none")
            $("#link3Bulle").css({ "box-shadow": "none" })
            $("#menu").css("max-height", "100%")
        }
        console.log("hop")
    };

    static multiButton() {
        if (!Menu.multBool) {
            Menu.setBackground(Ressource.pathImgMulti);
            if (Link.linkBool) {
                $("#linkBulle").trigger("click");
            }
            Menu.disableButton($("#linkBulle"));
            Menu.multBool = true
            $("#selectBulle").css("display", "block")
            $("#multiBackground").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "100px" })
            Multi.multi();

        } else {
            Menu.multBool = false
            Menu.enableButton($("#linkBulle"), this.linkButton);

            $("#selectBulle").css("display", "none")
            $("#multiBackground").css({ "box-shadow": "none" })
            Multi.multi()
            if (Menu.selectBool) { $("#selectBulle").trigger("click") }
            detectPathGraphics.clear()
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


        } else {
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
            if (Menu.scalBool) { $("#scalBulle").trigger("click") }
            if (Link.linkBool) { $("#linkBulle").trigger("click") }
            if (Menu.coloBool) { $("#coloBulle").trigger("click") }
            if (Menu.multBool) { $("#multBulle").trigger("click") }

        }
    }

    static enableButton(button: JQuery, callback: () => void) {
        button.css("opacity", "1");
        button.css("cursor", "pointer");
        button.on("click", callback);
    }
    static disableButton(button: JQuery) {
        button.css("opacity", "0.2");
        button.css("cursor", "not-allowed");
        button.off();
    }
    static setBackground(path?: string) {
        if (path) {
            $("#background").css("background", "url('" + path + "')");
            this.setBackgroundScale();
        } else {
            $("#background").css("background", "none");
            this.setBackgroundScale();
        }
    }
    static setBackgroundScale() {
        if (Menu.scalBool) {
            $("#background-scale").css("background", "url('" + Ressource.pathImgScale + "')");
        } else {
            $("#background-scale").css("background", "none");
        }
    }
}

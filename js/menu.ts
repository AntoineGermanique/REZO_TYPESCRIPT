/////////////menu.js
import $ from 'jquery'
import {
    Rezo,
    Link,
    hyperPlusFun,
    Bulle,
    updateWindowSize,
    supprFun, 
    drive
} from './'

"use strict"

interface Document {
    cancelFullScreen: () => void;
    mozCancelFullScreen: () => void;
}
interface HTMLElement {
    mozRequestFullScreen: () => void;
}
class Menu {
    isLocalSave = false;
    menuActif = false;
    openActif = false;
    fastBool = false;
    editBool = false;
    naviBool = false;
    scalBool = false;
    coloBool = false;
    multBool = false;
    selectBool = false;
    drawBool = false;
    hyperBool = false;
    isLocalHome = false;
    isDriveHome = false;

    bulleMiddlePoX: number;
    bulleMiddlePoY: number;

    menu() {
        let windowW = Rezo.windowW;
        let windowH = Rezo.windowH;
        $("#menuBtn").click(() => {
            if (!this.menuActif) {
                this.menuActif = true;
                $("#menuContainer").css("display", "block")
                $("#menuBtn").removeClass("menuBtn").addClass("menuBtn_replie");
                if (this.naviBool) { $("#naviBulle").trigger("click") }
                if (this.editBool) { $("#editBulle").trigger("click") }
                if (this.drawBool) { $("#drawBulle").trigger("click") }
            } else {
                this.menuActif = false;
                $("#menuBtn").removeClass("menuBtn_replie").addClass("menuBtn");
                $("#menuContainer").css("display", "none")
                if (this.naviBool) { $("#naviBulle").trigger("click") }
                if (this.editBool) { $("#editBulle").trigger("click") }
                if (this.drawBool) { $("#drawBulle").trigger("click") }
            }
        })



        $("#plusBulle").click(() => {
            updateWindowSize()
            if (this.hyperBool) {
                hyperPlusFun()
            } else {
                var scaleScene = Rezo.scaleScene;
                this.bulleMiddlePoX = windowW / 2 / scaleScene.scale.x - scaleScene.scene.x - (windowW / scaleScene.scale.x - windowW) / 2
                this.bulleMiddlePoY = windowH / 2 / scaleScene.scale.x - scaleScene.scene.y - (windowH / scaleScene.scale.x - windowH) / 2
                // dispatchMouseEvent(selectedBulle, 'mousedown', true, true);
                // dispatchMouseEvent(selectedBulle, 'mouseup', true, true);
                scaleScene.scene.sceneBulle.addChild(new Bulle(this.bulleMiddlePoX, this.bulleMiddlePoY, "txt", bulleColor, 1));
            }
        })

        $("#supprBulle").click(() => { supprFun() });
        $("#driveBulle").click((event) => {
            $('#loading').css("display", "block");
            drive.handleAuthClick(event)
        });

        $("#saveBulle").click(saveDrive);
        $("#localSaveBulle").click(() => {
            saveLocal();
        });
        $("#linkBulle").click(linkButton);
        $("#link2Bulle").click(() => {
            Link.emptyLinkArray()
            if (Link.link2Bool == false) {
                this.setBackground(Ressource.pathImgLink2)
                Link.link3Bool = false;
                $("#link3Bulle").css({ "box-shadow": "none" })
                Link.link2Bool = true;
                $("#link2Bulle").css({ "box-shadow": "purple 0px 0px 20px inset", "border-radius": "20px" })
            } else {
                Link.link2Bool = false;
                this.setBackground(Ressource.pathImgLink)
                $("#link2Bulle").css({ "box-shadow": "none" })
            }
        })
        $("#link3Bulle").click(() => {
            Link.emptyLinkArray()
            if (Link.link3Bool == false) {
                this.setBackground(Ressource.pathImgLink3);
                Link.link2Bool = false;
                $("#link2Bulle").css({ "box-shadow": "none" })
                Link.link3Bool = true;
                $("#link3Bulle").css({ "box-shadow": "purple 0px 0px 20px inset", "border-radius": "20px" })
            } else {
                this.setBackground(Ressource.pathImgLink);
                Link.link3Bool = false;
                $("#link3Bulle").css({ "box-shadow": "none" })
            }
        })

        $("#homeBulle").click(() => {
            if (this.openActif == false) {
                Rezo.checkSaveStatus();
                this.isDriveHome = true;
                $(".open").remove();

                $('#loading').css("display", "block");
                drive.updateConnection();
                //$.post("php/open.php",function(data){
                //	$('#loading').css("display","none");
                //	openLoad(data);
                //})
                $("#open").css("display", "block")
                this.openActif = true;
            } else {
                $("#open").css("display", "none");
                $(".open").remove();
                $("img#closeOpen").off();
                $("img#saveOpen").off();
                this.openActif = false;
                this.isDriveHome = false;
            }
        })
        $("#localHome").click(() => {
            if (this.openActif == false) {
                Rezo.checkSaveStatus();
                this.isLocalHome = true;
                var arrayLocal = localOpen();
                $("#open").css("display", "block")
                this.openActif = true
                setSortingListener()

            } else {
                $("#open").css("display", "none");
                $("img#closeOpen").off();
                $(".open").remove();
                this.openActif = false;
                localClose();
                this.isLocalHome = false;

            }
        })
        $("#textBulle").click(() => {
            Rezo.selectedBulle.text.replaceText();
        })
        $("#fastBulle").click(() => {
            fastFun();
        })
        $("#editBulle").click(editButton)
        $("#naviBulle").click(() => {
            if (!this.naviBool) {
                this.naviBool = true;
                $("#zoomPBulle").removeClass("hiddenButton");
                $("#zoomMBulle").removeClass("hiddenButton");
                $("#zoomPText").removeClass("hiddenButton");
                $("#zoomMText").removeClass("hiddenButton");
                $("#naviBulle").addClass("whiteBackground");


            } else {
                this.naviBool = false;
                $("#zoomPBulle").addClass("hiddenButton");
                $("#zoomMBulle").addClass("hiddenButton");
                $("#zoomPText").addClass("hiddenButton");
                $("#zoomMText").addClass("hiddenButton");
                $("#naviBulle").removeClass("whiteBackground");

            }
        })
        $("#zoomPBulle").click(() => {
            zoomScenePlus()
        })
        $("#zoomMBulle").click(() => {
            zoomSceneMoins()
        })
        $("#fullBulle").click(() => {
            var body = <HTMLBodyElement>document.getElementsByTagName("body")[0];
            if (this.isFullScreen) {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }

                this.isFullScreen = false;
            } else {
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                }
                // else if (document.documentElement.mozRequestFullScreen) {
                //     document.documentElement.mozRequestFullScreen()
                // }
                this.isFullScreen = true;
            }
        })
        $("#scalBulle").click(() => {
            if (!this.scalBool) {
                this.scalBool = true
                setBackgroundScale();
                $("#scalBackground").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "100px" })
                $("#scalZPBulle").css("display", "block")
                $("#scalZMBulle").css("display", "block")
                $("#scalBackground").css("background", "rgb(127, 255, 0)")
                scaleBulleTouch()


            } else {
                this.scalBool = false
                setBackgroundScale();
                $("#scalBackground").css({ "box-shadow": "none" })
                $("#scalZPBulle").css("display", "none")
                $("#scalZMBulle").css("display", "none")
                $("#scalBackground").css("background", "none")
                scaleBulleTouch()

            }
        })
        $("#coloBulle").click(() => {
            gradient()
        })
        $("#scalZPBulle").click(() => {
            if (this.multBool) {
                multiScaleBullePlus(multiArray)
            } else {
                scaleBullePlus(Rezo.selectedBulle)
            }
        })
        $("#scalZMBulle").click(() => {
            if (this.multBool) {
                multiScaleBulleMoins(multiArray)
            } else {
                scaleBulleMoins(Rezo.selectedBulle)
            }
        })
        $("#multBulle").click(multiButton);
        $("#selectBulle").click(() => {
            if (this.selectBool) {
                this.setBackground(Ressource.pathImgMulti);
                this.selectBool = false
                select();
                detectPathGraphics.clear()
                $("#selectBulle").css({ "box-shadow": "none" })
                $("#selectBulle").addClass("noRound")

            } else {
                this.setBackground(Ressource.pathImgSelect);
                if (this.scalBool) { $("#scalBulle").trigger("click") }
                this.selectBool = true
                select();
                $("#selectBulle").css({ "box-shadow": "0PX 0PX 5PX 5px orangered" })
                $("#selectBulle").removeClass("noRound")

            }
        })

        $("#zoomPText").click(() => {
            multiScaleBullePlus(bubbleArray)
        })
        $("#zoomMText").click(() => {
            multiScaleBulleMoins(bubbleArray)
        })
        $("#hyperBulle").click(() => {
            if (this.hyperBool) {
                this.hyperBool = false
                $("#hyperBulle").css({ "background": "none", "border-radius": "100px", "box-shadow": "none" })

            } else {
                this.hyperBool = true
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


    linkButton() {

        Link.emptyLinkArray()
        if (Link.linkBool == false) {
            if (this.multBool) {
                $("#multBulle").trigger("click");
            }
            this.setBackground(Ressource.pathImgLink);
            disableButton($("#multBulle"));
            Link.linkBool = true;
            $("#linkBulle").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "20px" })
            $("#link2Bulle").css("display", "block")
            $("#link3Bulle").css("display", "block")
            $("#menu").css("max-height", "none")

        } else {
            this.setBackground();
            enableButton($("#multBulle"), multiButton);
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

    multiButton() {
        if (!this.multBool) {
            this.setBackground(Ressource.pathImgMulti);
            if (Link.linkBool) {
                $("#linkBulle").trigger("click");
            }
            disableButton($("#linkBulle"));
            this.multBool = true
            $("#selectBulle").css("display", "block")
            $("#multiBackground").css({ "box-shadow": "0px 0px 20px inset", "border-radius": "100px" })
            multi();

        } else {
            this.multBool = false
            this.enableButton($("#linkBulle"), this.linkButton);

            $("#selectBulle").css("display", "none")
            $("#multiBackground").css({ "box-shadow": "none" })
            multi()
            if (this.selectBool) { $("#selectBulle").trigger("click") }
            detectPathGraphics.clear()
            this.setBackground();

        }
    }
    editButton() {
        if (!this.editBool) {
            this.editBool = true;
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
            this.editBool = false;
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
            if (this.scalBool) { $("#scalBulle").trigger("click") }
            if (Link.linkBool) { $("#linkBulle").trigger("click") }
            if (this.coloBool) { $("#coloBulle").trigger("click") }
            if (this.multBool) { $("#multBulle").trigger("click") }

        }
    }

    enableButton(button: JQuery, callback: () => void) {
        button.css("opacity", "1");
        button.css("cursor", "pointer");
        button.on("click", callback);
    }
    disableButton(button: JQuery) {
        button.css("opacity", "0.2");
        button.css("cursor", "not-allowed");
        button.off();
    }
    setBackground(path?: string) {
        if (path) {
            $("#background").css("background", "url('" + path + "')");
            this.setBackgroundScale();
        } else {
            $("#background").css("background", "none");
            this.setBackgroundScale();
        }
    }
    setBackgroundScale() {
        if (this.scalBool) {
            $("#background-scale").css("background", "url('" + Ressource.pathImgScale + "')");
        } else {
            $("#background-scale").css("background", "none");
        }
    }
}

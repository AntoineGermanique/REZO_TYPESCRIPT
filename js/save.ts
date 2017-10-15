﻿/////////////save.js
var arrayBulleSave=[]
var arrayLinkSave=[]
var sceneBullePo=[]
var sceneLinkPo=[]
var scenePo=[]
var scalePo=[]

export interface RezoSave {
    bullesArray: BulleSave[];
    linkSave: LinkSave[];
    scale: Loc;
    loc: Loc;
    title: string;
    timeStamp: number;
}

export interface BulleSave {
    loc: Loc;
    linksIndex: number[];
    text: string;
    color: string;
    scale: Loc;
    width: number;
    height: number;
    shape: number;
    polyPath: number[];
    polyTextPath: Loc[];
    timeStamps: number[];
}

export interface LinkSave {
    indexBulle1: number;
    indexBulle2: number;
    direction: Direction;
    linkPath: Loc[];
}

export interface Direction {
    first: number;
    last: number;
}

export class Loc {
    x: number;
    y: number;
}

function saveLocal(rezoName?: string, rezoSave?: RezoSave): boolean {
    if (!rezoSave && rezoName != "AutoSave") {
        rezoSave = createJsonRezo();
    } else if (!rezoSave) {
        rezoSave = createJsonRezo("AutoSave");
    }
    if (!rezoName)
        rezoName = Rezo.rezoName;
    if (rezoSave) {
        for (var i = 0; i < localStorage.length; i++) {
            if (rezoName == localStorage.key(i) && rezoName!="AutoSave") {
                if (confirm(Ressource.confirmLocalOverwriting)) {
                    localSave(rezoSave, rezoName);
                    return true

                } else {
                    return false
                }
            }
        }
        localSave(rezoSave, rezoName);
        if (rezoName == "AutoSave") {
            AutoSaveCookie(rezoSave)
        } else {
            ResetAutoSaveCookie(rezoSave)

        }
        return true
    }
    return false
}

function saveDrive():string {
    if (Rezo.isDriveConnected) {
        var previousName = Rezo.rezoName;
        var rezoSave = createJsonRezo();
        if (rezoSave) {
            Rezo.load.style.display = "block";

            var blob = new Blob([JSON.stringify(rezoSave)], { type: "application/json;charset=utf-8;" });
            drive.tempBlob = blob;
            if (previousName == Rezo.rezoName) {
                if (Rezo.rezoId != "") {
                    drive.getFile(Rezo.rezoId, (fileMetada) => { drive.updateFile(Rezo.rezoId, fileMetada, drive.tempBlob, null) })
                } else {
                    drive.createFile(Rezo.rezoName, drive.updateFile);
                }

            } else {
                drive.createFile(Rezo.rezoName, drive.updateFile);
            }
        }
        ResetAutoSaveCookie(rezoSave)
        return Rezo.rezoId;
    } else {
        return null;
    }
}

function createJsonRezo(title?: string): RezoSave {
    if (!title) {
        title = promptTitle()
    }
    if (title) {
        if (title != "AutoSave") {
            Rezo.rezoName = title;
            Rezo.rezoNameDiv.html(title);
        }
        var linkArraySave: LinkSave[] = [];
        var bulleArraySave: BulleSave[] = [];
        for (var i = 0; i < Link.linkArray.length; i++) {
            linkArraySave.push({
                indexBulle1: Link.linkArray[i].indexBulle1,
                indexBulle2: Link.linkArray[i].indexBulle2,
                direction: null,
                linkPath: null
            })
        }
        for (var i = 0; i < bubbleArray.length; i++) {
            var bulleInfo: BulleArray = bubbleArray[i];
            var timeStamps = (bulleInfo.bulle.text.textDraw) ? bulleInfo.bulle.text.textDraw.getTimeStamps() : null;
            bulleArraySave.push({
                loc: {
                    x: bulleInfo.bulle.x,
                    y: bulleInfo.bulle.y
                },
                linksIndex: bulleInfo.linksIndex,
                text: bulleInfo.bulle.text.text,
                color: "#" + (bulleInfo.bulle.shape.rezoColor).toString(16),
                scale: { x: bulleInfo.bulle.scale.x, y: bulleInfo.bulle.scale.y },
                width: bulleInfo.bulle.width,
                height: bulleInfo.bulle.height,
                shape: bulleInfo.bulle.shape.kind,
                polyPath: bulleInfo.bulle.shape.polyPathNumber,
                polyTextPath: bulleInfo.bulle.text.polyPathNumber,
                timeStamps: timeStamps
            })
        }
        var rezoSave: RezoSave;
        rezoSave = {
            bullesArray: bulleArraySave,
            linkSave: linkArraySave,
            scale: { x: Rezo.scaleScene.scale.x, y: Rezo.scaleScene.scale.y },
            loc: { x: Rezo.scene.x, y: Rezo.scene.y },
            title: Rezo.rezoName,
            timeStamp: Date.now(),
        }
        return rezoSave;
    } else {
        return null;
    }
}
function cleanName(newName:string): string {
    newName = Utilitary.replaceAll(newName, "é", "e");
    newName = Utilitary.replaceAll(newName, "è", "e");
    newName = Utilitary.replaceAll(newName, "à", "a");
    newName = Utilitary.replaceAll(newName, "ù", "u");
    newName = Utilitary.replaceAll(newName, " ", "_");
    newName = Utilitary.replaceAll(newName, "'", "_");
    return newName;
}
function promptTitle(value?: string): string  {
    if (!value) {
        value = Rezo.rezoName;
    }
    var title = prompt("titre", value);
    if (title) {
        title = cleanName(title);
        if (title != "" && isNameValid(title) && title!="AutoSave") {
            return title;


        } else {
           return promptTitle("le nom choisie est invalide, merci de le modifier (caractères de a à z, nombres acceptés");
        }
    } else {
        return title;
    }
}
function isNameValid(newName: string): boolean {
    var pattern: RegExp = new RegExp("^[a-zA-Z_][a-zA-Z_0-9]{1,50}$");
    if (pattern.test(newName)) {
        return true
    } else {
        return false
    }
}
function nullifyTimeStamp(rezoSaveObj: RezoSave): RezoSave {
    if (rezoSaveObj) {
        rezoSaveObj.timeStamp = null;
        return rezoSaveObj
    }
}
function AutoSaveCookie(rezoSave: RezoSave) {
    console.log("auto save");
    Rezo.autoSaveRezo = JSON.stringify(nullifyTimeStamp(rezoSave));
    if (Rezo.autoSaveRezo != Rezo.initialRezo)
        document.cookie = "hasRecoveryAvailable=true"
}
function ResetAutoSaveCookie(rezoSave: RezoSave) {
    Rezo.initialRezo = JSON.stringify(nullifyTimeStamp(rezoSave));
    Rezo.autoSaveRezo = JSON.stringify(nullifyTimeStamp(rezoSave));
    document.cookie = "hasRecoveryAvailable=false";
}

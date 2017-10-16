"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/////////////save.js
var arrayBulleSave = [];
var arrayLinkSave = [];
var sceneBullePo = [];
var sceneLinkPo = [];
var scenePo = [];
var scalePo = [];
const _1 = require("./");
class Loc {
}
exports.Loc = Loc;
class Save {
    static saveLocal(rezoName, rezoSave) {
        if (!rezoSave && rezoName != "AutoSave") {
            rezoSave = Save.createJsonRezo();
        }
        else if (!rezoSave) {
            rezoSave = Save.createJsonRezo("AutoSave");
        }
        if (!rezoName)
            rezoName = _1.Rezo.rezoName;
        if (rezoSave) {
            for (var i = 0; i < localStorage.length; i++) {
                if (rezoName == localStorage.key(i) && rezoName != "AutoSave") {
                    if (confirm(_1.Ressource.confirmLocalOverwriting)) {
                        _1.LocalStorage.localSave(rezoSave, rezoName);
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            _1.LocalStorage.localSave(rezoSave, rezoName);
            if (rezoName == "AutoSave") {
                Save.AutoSaveCookie(rezoSave);
            }
            else {
                Save.ResetAutoSaveCookie(rezoSave);
            }
            return true;
        }
        return false;
    }
    static saveDrive() {
        if (_1.Rezo.isDriveConnected) {
            var previousName = _1.Rezo.rezoName;
            var rezoSave = Save.createJsonRezo();
            if (rezoSave) {
                _1.Rezo.load.style.display = "block";
                var blob = new Blob([JSON.stringify(rezoSave)], { type: "application/json;charset=utf-8;" });
                _1.drive.tempBlob = blob;
                if (previousName == _1.Rezo.rezoName) {
                    if (_1.Rezo.rezoId != "") {
                        _1.drive.getFile(_1.Rezo.rezoId, (fileMetada) => { _1.drive.updateFile(_1.Rezo.rezoId, fileMetada, _1.drive.tempBlob, null); });
                    }
                    else {
                        _1.drive.createFile(_1.Rezo.rezoName);
                    }
                }
                else {
                    _1.drive.createFile(_1.Rezo.rezoName);
                }
            }
            Save.ResetAutoSaveCookie(rezoSave);
            return _1.Rezo.rezoId;
        }
        else {
            return null;
        }
    }
    static createJsonRezo(title) {
        if (!title) {
            title = Save.promptTitle();
        }
        if (title) {
            if (title != "AutoSave") {
                _1.Rezo.rezoName = title;
                _1.Rezo.rezoNameDiv.html(title);
            }
            var linkArraySave = [];
            var bulleArraySave = [];
            for (var i = 0; i < _1.Link.linkArray.length; i++) {
                linkArraySave.push({
                    indexBulle1: _1.Link.linkArray[i].indexBulle1,
                    indexBulle2: _1.Link.linkArray[i].indexBulle2,
                    direction: null,
                    linkPath: null
                });
            }
            for (var i = 0; i < _1.bubbleArray.length; i++) {
                var bulleInfo = _1.bubbleArray[i];
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
                });
            }
            var rezoSave;
            rezoSave = {
                bullesArray: bulleArraySave,
                linkSave: linkArraySave,
                scale: { x: _1.Rezo.scaleScene.scale.x, y: _1.Rezo.scaleScene.scale.y },
                loc: { x: _1.Rezo.scene.x, y: _1.Rezo.scene.y },
                title: _1.Rezo.rezoName,
                timeStamp: Date.now(),
            };
            return rezoSave;
        }
        else {
            return null;
        }
    }
    static cleanName(newName) {
        newName = _1.Utilitary.replaceAll(newName, "é", "e");
        newName = _1.Utilitary.replaceAll(newName, "è", "e");
        newName = _1.Utilitary.replaceAll(newName, "à", "a");
        newName = _1.Utilitary.replaceAll(newName, "ù", "u");
        newName = _1.Utilitary.replaceAll(newName, " ", "_");
        newName = _1.Utilitary.replaceAll(newName, "'", "_");
        return newName;
    }
    static promptTitle(value) {
        if (!value) {
            value = _1.Rezo.rezoName;
        }
        var title = prompt("titre", value);
        if (title) {
            title = Save.cleanName(title);
            if (title != "" && Save.isNameValid(title) && title != "AutoSave") {
                return title;
            }
            else {
                return Save.promptTitle("le nom choisie est invalide, merci de le modifier (caractères de a à z, nombres acceptés");
            }
        }
        else {
            return title;
        }
    }
    static isNameValid(newName) {
        var pattern = new RegExp("^[a-zA-Z_][a-zA-Z_0-9]{1,50}$");
        if (pattern.test(newName)) {
            return true;
        }
        else {
            return false;
        }
    }
    static nullifyTimeStamp(rezoSaveObj) {
        if (rezoSaveObj) {
            rezoSaveObj.timeStamp = null;
            return rezoSaveObj;
        }
        return null;
    }
    static AutoSaveCookie(rezoSave) {
        console.log("auto save");
        _1.Rezo.autoSaveRezo = JSON.stringify(Save.nullifyTimeStamp(rezoSave));
        if (_1.Rezo.autoSaveRezo != _1.Rezo.initialRezo)
            document.cookie = "hasRecoveryAvailable=true";
    }
    static ResetAutoSaveCookie(rezoSave) {
        _1.Rezo.initialRezo = JSON.stringify(Save.nullifyTimeStamp(rezoSave));
        _1.Rezo.autoSaveRezo = JSON.stringify(Save.nullifyTimeStamp(rezoSave));
        document.cookie = "hasRecoveryAvailable=false";
    }
}
exports.Save = Save;
//# sourceMappingURL=save.js.map
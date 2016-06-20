/////////////save.js
var arrayBulleSave = [];
var arrayLinkSave = [];
var sceneBullePo = [];
var sceneLinkPo = [];
var scenePo = [];
var scalePo = [];
function saveLocal(rezoSave, rezoName) {
    if (!rezoSave)
        rezoSave = createJsonRezo();
    if (!rezoName)
        rezoName = Rezo.rezoName;
    if (rezoSave) {
        for (var i = 0; i < localStorage.length; i++) {
            if (rezoName == localStorage.key(i)) {
                if (confirm(Ressource.confirmLocalOverwriting)) {
                    localSave(rezoSave, rezoName);
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        localSave(rezoSave, rezoName);
        return true;
    }
    return false;
}
function saveDrive() {
    if (Rezo.isDriveConnected) {
        var previousName = Rezo.rezoName;
        var rezoSave = createJsonRezo();
        if (rezoSave) {
            Rezo.load.style.display = "block";
            var blob = new Blob([JSON.stringify(rezoSave)], { type: "application/json;charset=utf-8;" });
            drive.tempBlob = blob;
            if (previousName == Rezo.rezoName) {
                if (Rezo.rezoId != "") {
                    drive.getFile(Rezo.rezoId, function (fileMetada) { drive.updateFile(Rezo.rezoId, fileMetada, drive.tempBlob, null); });
                }
                else {
                    drive.createFile(Rezo.rezoName, drive.updateFile);
                }
            }
            else {
                drive.createFile(Rezo.rezoName, drive.updateFile);
            }
        }
    }
    else {
    }
}
function createJsonRezo() {
    var title = promptTitle();
    if (title) {
        Rezo.rezoName = title;
        Rezo.rezoNameDiv.html(title);
        var linkArraySave = [];
        var bulleArraySave = [];
        for (var i = 0; i < Link.linkArray.length; i++) {
            linkArraySave.push({
                indexBulle1: Link.linkArray[i].indexBulle1,
                indexBulle2: Link.linkArray[i].indexBulle2,
                direction: null,
                linkPath: null
            });
        }
        for (var i = 0; i < bubbleArray.length; i++) {
            var bulleInfo = bubbleArray[i];
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
                polyPath: null,
                polyTextPath: null,
            });
        }
        var rezoSave;
        rezoSave = {
            bullesArray: bulleArraySave,
            linkSave: linkArraySave,
            scale: { x: Rezo.scaleScene.scale.x, y: Rezo.scaleScene.scale.y },
            loc: { x: Rezo.scene.x, y: Rezo.scene.y },
            title: Rezo.rezoName,
            timeStamp: Date.now(),
        };
        return rezoSave;
    }
    else {
        return null;
    }
}
function cleanName(newName) {
    newName = Utilitary.replaceAll(newName, "é", "e");
    newName = Utilitary.replaceAll(newName, "è", "e");
    newName = Utilitary.replaceAll(newName, "à", "a");
    newName = Utilitary.replaceAll(newName, "ù", "u");
    newName = Utilitary.replaceAll(newName, " ", "_");
    newName = Utilitary.replaceAll(newName, "'", "_");
    return newName;
}
function promptTitle(value) {
    if (!value) {
        value = Rezo.rezoName;
    }
    var title = prompt("titre", value);
    if (title) {
        title = cleanName(title);
        if (title != "" && isNameValid(title)) {
            return title;
        }
        else {
            return promptTitle();
        }
    }
    else {
        return title;
    }
}
function isNameValid(newName) {
    var pattern = new RegExp("^[a-zA-Z_][a-zA-Z_0-9]{1,50}$");
    if (pattern.test(newName)) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=save.js.map
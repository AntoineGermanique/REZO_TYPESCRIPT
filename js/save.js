/////////////save.js
var arrayBulleSave = [];
var arrayLinkSave = [];
var sceneBullePo = [];
var sceneLinkPo = [];
var scenePo = [];
var scalePo = [];
function save2() {
    promptTitle2();
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
            shape: bulleInfo.bulle.shape.shape,
            polyPath: null,
            polyTextPath: null
        });
    }
    var rezoSave;
    rezoSave = {
        bullesArray: bulleArraySave,
        linkSave: linkArraySave,
        scale: { x: Rezo.scaleScene.scale.x, y: Rezo.scaleScene.scale.y },
        loc: { x: Rezo.scene.x, y: Rezo.scene.y },
        title: Rezo.rezoName
    };
    localSave(rezoSave, Rezo.rezoName);
}
function promptTitle2() {
    var title = prompt("titre", Rezo.rezoName);
    if (title != "" && isNameValid(title)) {
        Rezo.rezoName = title;
    }
    else {
        promptTitle2();
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
function save(data) {
    while (arrayBulleSave.length > 0) {
        arrayBulleSave.pop();
    }
    while (arrayLinkSave.length > 0) {
        arrayLinkSave.pop();
    }
    while (scenePo.length > 0) {
        scenePo.pop();
    }
    while (scalePo.length > 0) {
        scalePo.pop();
    }
    while (sceneBullePo.length > 0) {
        sceneBullePo.pop();
    }
    while (sceneLinkPo.length > 0) {
        sceneLinkPo.pop();
    }
    Link.optimiseLink(Rezo.sceneBulle, Rezo.sceneLink);
    var nbrBulle = bubbleArray.length;
    var nbrLink = Link.linkArray.length;
    for (var i = 0; i < nbrBulle; i++) {
        arrayBulleSave.push([[bubbleArray[i][0].x, bubbleArray[i][0].y], bubbleArray[i][2], [bubbleArray[i][0].getChildAt(1).text, bubbleArray[i][0].getChildAt(0).graphicsData[0].fillColor, bubbleArray[i][0].scale.x]]);
    }
    for (i = 0; i < nbrLink; i++) {
        arrayLinkSave.push([Link.linkArray[i][3], Link.linkArray[i][4]]);
    }
    var scaleScene = Rezo.scaleScene;
    scenePo.push(scaleScene.scene.x);
    scenePo.push(scaleScene.scene.y);
    scalePo.push(scaleScene.scale.x);
    scalePo.push(scaleScene.scale.y);
    sceneBullePo.push(scaleScene.scene.sceneBulle.x);
    sceneBullePo.push(scaleScene.scene.sceneBulle.y);
    sceneLinkPo.push(scaleScene.scene.sceneLink.x);
    sceneLinkPo.push(scaleScene.scene.sceneLink.y);
    var rezoName = Rezo.rezoName;
    if (Rezo.rezoName == "" && !isLocalSave) {
        promptTitle("Nom du REZO");
    }
    else if (data != undefined && !isLocalSave) {
        console.log("modification");
        promptTitle(data);
    }
    else if (isLocalSave) {
        var localRezoName;
        var localeSaveArray = [];
        localeSaveArray.push(arrayBulleSave);
        localeSaveArray.push(arrayLinkSave);
        localeSaveArray.push(rezoName);
        localeSaveArray.push(scenePo);
        localeSaveArray.push(scalePo);
        if (rezoName == "") {
            localRezoName = "local name";
        }
        else {
            localRezoName = rezoName;
        }
        localSave(localeSaveArray, localRezoName);
    }
    else {
        postArray();
    }
}
function postArray() {
    var rezoName = Rezo.rezoName;
    var opened = Rezo.opened;
    $('#loading').css("display", "block");
    console.log(arrayBulleSave);
    $.post("php/save.php", {
        'arrayBulleSave': arrayBulleSave,
        "arrayLinkSave": arrayLinkSave,
        "rezoName": rezoName,
        "opened": opened,
        "scenePo": scenePo,
        "scalePo": scalePo,
        "sceneBullePo": sceneBullePo,
        "sceneLinkPo": sceneLinkPo }, function (data) {
        $('#loading').css("display", "none");
        console.log(data);
        data.toString();
        if (data === "truc") {
            promptTitle("Nom déjà utilisé, veuillez en utiliser un autre");
        }
        else {
            opened = true;
        }
    })
        .done(function () {
        console.log("done");
    })
        .fail(function () {
        alert("error");
    });
}
function promptTitle(data) {
    var rezoName = Rezo.rezoName;
    var opened = Rezo.opened;
    var title = prompt(data, "");
    if (title) {
        isTitreInvalid = titreIsValid(title);
        if (title == "" || isTitreInvalid == true) {
            promptTitle("Nom invalide, veuillez recommencer");
        }
        else if (title == null) {
            rezoName = "";
            alert("rezo non sauvé");
        }
        else {
            rezoName = title;
            postArray();
        }
    }
    else if (rezoName == "") {
        opened = false;
    }
    else {
        opened = true;
    }
    console.log(rezoName);
    console.log(opened);
}
//# sourceMappingURL=save.js.map
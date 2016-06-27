//Ressource.js
var Ressource = (function () {
    function Ressource() {
    }
    Ressource.pathImg = "images/";
    Ressource.pathImgFast = Ressource.pathImg + "fast_back.png";
    Ressource.pathImgLink = Ressource.pathImg + "link_back.png";
    Ressource.pathImgLink2 = Ressource.pathImg + "link2_back.png";
    Ressource.pathImgLink3 = Ressource.pathImg + "link3_back.png";
    Ressource.pathImgScale = Ressource.pathImg + "scal_back.png";
    Ressource.pathImgMulti = Ressource.pathImg + "mult_back.png";
    Ressource.pathImgSelect = Ressource.pathImg + "select_back.png";
    Ressource.pathImgPen = Ressource.pathImg + "pen_back.png";
    Ressource.confirmLocalOverwriting = "Ce nom de rezo existe déjà, je l'écrase ?";
    Ressource.confirmSupprRezo = 'voulez vous vraiment supprimer ce Rezo?';
    Ressource.urlReco = "https://cloud.myscript.com/api/v3.0/recognition/rest/text/doSimpleRecognition.json";
    Ressource.RecoAppliKey = "c5129adc-46ae-40d5-8a82-c7672ea53f17";
    Ressource.HmacKey = "e039f737-1836-421d-97b9-5fc833a65a56";
    Ressource.langage = "fr_FR";
    Ressource.textInputNode = "CURSIVE";
    return Ressource;
}());
//# sourceMappingURL=Ressource.js.map
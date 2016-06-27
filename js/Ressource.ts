//Ressource.js

class Ressource {
    static pathImg: string = "images/";
    static pathImgFast: string = Ressource.pathImg + "fast_back.png";
    static pathImgLink: string = Ressource.pathImg + "link_back.png";
    static pathImgLink2: string = Ressource.pathImg + "link2_back.png";
    static pathImgLink3: string = Ressource.pathImg + "link3_back.png";
    static pathImgScale: string = Ressource.pathImg + "scal_back.png";
    static pathImgMulti: string = Ressource.pathImg + "mult_back.png";
    static pathImgSelect: string = Ressource.pathImg + "select_back.png";
    static pathImgPen: string = Ressource.pathImg + "pen_back.png";
    static confirmLocalOverwriting: string = "Ce nom de rezo existe déjà, je l'écrase ?";
    static confirmSupprRezo: string = 'voulez vous vraiment supprimer ce Rezo?';
    static urlReco: string = "https://cloud.myscript.com/api/v3.0/recognition/rest/text/doSimpleRecognition.json"
    static RecoAppliKey: string = "c5129adc-46ae-40d5-8a82-c7672ea53f17";
    static HmacKey: string = "e039f737-1836-421d-97b9-5fc833a65a56";
    static langage: string = "fr_FR";
    static textInputNode: string = "CURSIVE"
}
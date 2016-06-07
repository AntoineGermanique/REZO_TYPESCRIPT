/////////interactiveLink.js
function interactiveLink() {
    var click = function (data) {
        if (this.alpha == 1) {
            clickLink(this);
        }
        else {
            unclickLink(this);
        }
    };
    link.on("mousedown", click);
    link.on("touchstart", click);
    var over = function (data) {
        this.alpha = 1;
    };
    link.on("mouseupoutside", over);
    link.on("touchendoutside", over);
}
function unclickLink(unclickL) {
    unclickL.alpha = 1;
    linkSelected = false;
    unclickL.data = false;
    var bulleX0 = unclickL.hitArea.points[0] + lineHitFact;
    var bulleY0 = unclickL.hitArea.points[1] + lineHitFact;
    var bulleX1 = unclickL.hitArea.points[6] + lineHitFact;
    var bulleY1 = unclickL.hitArea.points[7] + lineHitFact;
    console.log(unclickL.hitArea.points[0]);
    unclickL.clear();
    unclickL.beginFill(0x00FF00);
    unclickL.lineStyle(10, 0x333333);
    unclickL.moveTo(bulleX0, bulleY0);
    unclickL.lineTo(bulleX1, bulleY1);
    unclickL.endFill();
}
function clickLink(clicked) {
    if (linkSelected) {
        for (var i = 0; i < linkArray.length; i++) {
            if (linkArray[i][0].data) {
                console.log("yoh");
                unclickLink(linkArray[i][0]);
                break;
            }
        }
    }
    clicked.alpha = 0.5;
    clicked.data = true;
    linkSelected = true;
    var bulleX0 = clicked.hitArea.points[0] + lineHitFact;
    var bulleY0 = clicked.hitArea.points[1] + lineHitFact;
    var bulleX1 = clicked.hitArea.points[6] + lineHitFact;
    var bulleY1 = clicked.hitArea.points[7] + lineHitFact;
    clicked.clear();
    clicked.beginFill(0x00FF00);
    clicked.lineStyle(10, 0xff0000);
    clicked.moveTo(bulleX0, bulleY0);
    clicked.lineTo(bulleX1, bulleY1);
    clicked.endFill();
}
//# sourceMappingURL=interactiveLink.js.map
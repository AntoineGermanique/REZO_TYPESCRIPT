//UpperScene.js, contains scale Scene/ handle dragging
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UpperScene = (function (_super) {
    __extends(UpperScene, _super);
    function UpperScene() {
        _super.apply(this, arguments);
    }
    UpperScene.prototype.dragScene = function () {
        var scene = this.scaleScene.scene;
        var scaleScene = this.scaleScene;
        var startDrag = function (data) {
            // stop the default event...
            data.data.originalEvent.preventDefault();
            // store a reference to the data
            // The reason for this is because of multitouch
            // we want to track the movement of this particular touch
            this.data = data;
            this.dragging = true;
            oldX = scene.position.x * scaleScene.scale.x;
            oldY = scene.position.y * scaleScene.scale.x;
            oldPosition = data.data.getLocalPosition(this.parent);
        };
        this.on("mousedown", startDrag);
        this.on("touchstart", startDrag);
        // set the events for when the mouse is released or a touch is released
        var stopDrag = function (data) {
            this.dragging = false;
            // set the interaction data to null
            this.data = null;
            // scene.pivot.x+=scene.position.x-oldX;
            // scene.pivot.y+=scene.position.y-oldY;
        };
        this.on("mouseup", stopDrag);
        this.on("mouseupoutside", stopDrag);
        this.on("touchend", stopDrag);
        this.on("touchendoutside", stopDrag);
        // set the callbacks for when the mouse or a touch moves
        var drag = function (data) {
            if (this.dragging) {
                var newPosition = this.data.data.getLocalPosition(this.parent);
                scene.position.x = (newPosition.x - oldPosition.x + oldX) / scaleScene.scale.x;
                scene.position.y = (newPosition.y - oldPosition.y + oldY) / scaleScene.scale.x;
            }
        };
        this.on("mousemove", drag);
        this.on("touchmove", drag);
    };
    return UpperScene;
}(PIXI.Graphics));
//# sourceMappingURL=UpperScene.js.map
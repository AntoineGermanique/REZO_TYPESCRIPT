///////////////////////////fast.js
var sensorFast

function fastFun (){
    if (!fastBool) {
        if (editBool) {
            $("#editBulle").trigger("click");
        }
        disableButton($("#editBulle"));
        setBackground(Ressource.pathImgFast);
		$( "#fastBulle" ).css({"box-shadow":"lime 0px 0px 20px inset","border-radius":"20px","padding": "3px"})
		//$( "body" ).css({"border": "lime 1em dashed"})
		//renderer.transparent=true
        //console.log(renderer)
        var windowH = Rezo.windowH
        var windowW = Rezo.windowW
		sensorFast=new PIXI.Graphics();
		sensorFast.beginFill(0x00ff06,0)
		sensorFast.drawRect(0,0,windowW,windowH)
        sensorFast.hitArea = new PIXI.Rectangle(0, 0, windowW, windowH);
        sensorFast.interactive = true;
        var stage = Rezo.stage;
		stage.addChild(sensorFast)
		sensorFast.mousedown=sensorFast.touchstart=function(data){
			data.data.originalEvent.preventDefault();
			this.data = data;
			console.log(this.data)
			var newPosition = this.data.data.getLocalPosition(this.parent);
			var newFastBulleText=prompt('Text nouvelle bulle')
			if(newFastBulleText){
                updateWindowSize()
                var scaleScene = Rezo.scaleScene;
                var fastPoX = newPosition.x / scaleScene.scale.x -scaleScene.scene.x-(windowW/scaleScene.scale.x-windowW)/2
                var fastPoY = newPosition.y / scaleScene.scale.x - scaleScene.scene.y - (windowH / scaleScene.scale.x - windowH) / 2
                Rezo.sceneBulle.addChild(new Bulle(fastPoX, fastPoY, newFastBulleText, color));
                Link.linkBool=true
                Link.link3Bool=true
                Link.link2Bool=false
				
				Link.linkFun()
			}
			
			
			
		}
		fastBool=true
    } else {
        enableButton($("#editBulle"), editButton)
        setBackground();
        $("body").css({ "border": "0em" });
        $("#fastBulle").css({ "box-shadow": "none", "border-radius": "20px", "padding": "0px" });
		//console.log(renderer)
        Rezo.stage.removeChild(sensorFast);
        Link.linkBool = false;
        Link.link3Bool = false;
        Link.emptyLinkArray();
        //sceneBulle.mousedown = sceneBulle.touchstart = function () { };
		fastBool=false
	}
}
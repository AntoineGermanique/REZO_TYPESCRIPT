/////////////////////zoom.js
function zoomScenePlus(){
	scaleScene.scale.x*=2
	scaleScene.scale.y*=2	
	console.log(scene.width)
	console.log(scene.x)


}
function zoomSceneMoins(){
	scaleScene.scale.x/=2
	scaleScene.scale.y/=2
	
	console.log(scene.width)
	console.log(scene.x)

}

function scrollZoom(){
	elem=$('#canvasContainer')
	$(elem).on('mousewheel', function(event) {
		if(scalBool){
			scaleBulleScroll(event)
		}else{
			if(event.deltaY<0){
				scaleScene.scale.x/=1.1
				scaleScene.scale.y/=1.1
				console.log(scaleScene.x)

				
			}else{
				scaleScene.scale.x*=1.1
				scaleScene.scale.y*=1.1
				console.log(scaleScene.x)

			}
		}
	});
}
var touchZoomCounter=0
var touch1MoveX1=0
var touch1MoveY1=0
var touch1MoveX2=0
var touch1MoveY2=0
var touch2MoveX1=0
var touch2MoveY1=0
var touch2MoveX2=0
var touch2MoveY2=0
var squeze1=0
var squeze2=0
var newPosition1
var newPosition2
var calculable1=false
var calculable2=false


function touchZoom(){
	sensorZoomScene.touchstart = function(data){
		if(touchZoomCounter==0){
			data.originalEvent.preventDefault();
			this.data=data;
			//this.interactive=false
			touchZoomCounter+=1;
			console.log(touchZoomCounter)
			this.dragging = true;
			if(touchZoomCounter==1){
				sensorZoomScene2.interactive=true
			}
		}
	}
	sensorZoomScene.touchend = sensorZoomScene.touchendoutside = function(data){
		touchZoomCounter=0
		this.dragging = false;
		touch1MoveX1=touch1MoveY1=touch1MoveX2=touch1MoveY2=0
		diffX1=diffX2=diffY1=diffY2=""
		squeze1=0
		upperScene.interactive=true;
		if(drawBool){
			upperScene.interactive=false;
		}
		sensorZoomScene2.interactive=false
	}
	sensorZoomScene.touchmove = function(data)
	{
		if(this.dragging&&touchZoomCounter==2)
		{	
			squeze1+=1
			newPosition1 = this.data.getLocalPosition(this.parent);
			
			 if(squeze1==1){
				touch1MoveX1=newPosition1.x
				touch1MoveY1=newPosition1.y
			}else if(squeze1==2){
				touch1MoveX2=touch1MoveX1
				touch1MoveY2=touch1MoveY1
				touch1MoveX1=newPosition1.x
				touch1MoveY1=newPosition1.y
				squeze1=1;
				calculable1=true
				squezeZoomCalc()
			}
			
		}
	}
	
	sensorZoomScene2.touchstart=function(data){
		if(touchZoomCounter==1){
			data.originalEvent.preventDefault();
			this.data=data;
			//this.interactive=false
			touchZoomCounter+=1;
			this.dragging = true;
			upperScene.interactive=false;
			// if(scaleBool){sensorScaleBulleScene.interactive=false}
			calculable1=false
			console.log("touched for the second time")
			
		}
	}
	sensorZoomScene2.touchend = sensorZoomScene2.touchendoutside = function(data){
		sensorZoomScene2.interactive=false
		
		this.dragging = false;
		touchZoomCounter=0
		upperScene.interactive=true;
		if(drawBool){
			upperScene.interactive=false;
		}
		touch2MoveX1=touch2MoveY1=touch2MoveX2=touch2MoveY2=0
		diffX1=diffX2=diffY1=diffY2=""
		squeze2=0
		calculable2=false

		
		
		
	}
	sensorZoomScene2.touchmove = function(data)
	{
		if(this.dragging&&touchZoomCounter==2)
		{
			console.log("zooming double touch")
			squeze2+=1		
			newPosition2 = this.data.getLocalPosition(this.parent);

			


			
			 if(squeze2==1){
				touch2MoveX1=newPosition2.x
				touch2MoveY1=newPosition2.y
			}else if(squeze2==2){
				touch2MoveX2=touch2MoveX1
				touch2MoveY2=touch2MoveY1
				touch2MoveX1=newPosition2.x
				touch2MoveY1=newPosition2.y
				squeze2=1;
				calculable2=true
				squezeZoomCalc()
			} 
			
		}
	}
}
var diffX1=""
var diffX2=""
var diffY1=""
var diffY2=""

function squezeZoomCalc(){
	if(sensorZoomScene2.dragging&&sensorZoomScene.dragging&&calculable2&&calculable1){
		diffX1=touch1MoveX1-touch2MoveX1
		diffX2=touch1MoveX2-touch2MoveX2
		diffY1=touch1MoveY1-touch2MoveY1
		diffY2=touch1MoveY2-touch2MoveY2
		if(Math.abs(diffX1)<Math.abs(diffX2)||Math.abs(diffY1)<Math.abs(diffY2)){
			scaleScene.scale.x/=1.02
			scaleScene.scale.y/=1.02
		}else if(Math.abs(diffX1)>Math.abs(diffX2)||Math.abs(diffY1)>Math.abs(diffY2)){
			scaleScene.scale.x*=1.02
			scaleScene.scale.y*=1.02
		}
	}
}
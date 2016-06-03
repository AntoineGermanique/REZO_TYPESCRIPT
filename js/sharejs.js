window.onload = function() {
	var previousX=0;
	var pad = document.getElementById('textArea');
	for(i=0;i<bubbleArray.length;i++){
		Object.observe(bubbleArray[i][0].position,function(changes){
			changes.forEach(function(change){
				console.log(change.type,change.name,change.oldValue)
				if(change.name=="dragging"||change.oldValue){
					pad.value=change.object.x;
				}
			});
		});
	}
	
	var didChangeOccur = function(){
		if(previousX != pad.value){
			return true;
		}
		return false;
    };
	setInterval(function(){
        if(didChangeOccur()){
            changeOtherX();
        }
    }, 100);
	
	var changeOtherX=function(){
		bubbleArray[0][0].x=parseInt(pad.value);
		previousX=parseInt(pad.value);
		pad.select();
	}
	sharejs.open('rezo', 'text', function(error, doc) {
        doc.attach_textarea(pad);
    });
};
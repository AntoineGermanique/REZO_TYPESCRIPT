////////////////////////suppr.js
var supprLinkArray=[];
var supprLinkRefArray=[];
function supprFun(){
	
	if(linkSelected){
		var supprlink
		var Bulle1index
		var Bulle2index
		allLink=sceneLink.children
		for(i=0;i<allLink.length;i++){
			if(allLink[i].data){
				supprlink=allLink[i]
				break;
			}
		}	
		for(i=0;i<linkArray.length;i++){
			if(linkArray[i][0]==supprlink){
				
				Bulle1index=linkArray[i][3]
				Bulle2index=linkArray[i][4]
				console.log(linkArray)
				linkArray.splice(i,1)
				console.log(linkArray)
			}
		}
		for(i=0;i<bubbleArray[Bulle1index][1].length;i++){
			if(bubbleArray[Bulle1index][1][i]==supprlink){
				bubbleArray[Bulle1index][1].splice(i,1)
				bubbleArray[Bulle1index][2].splice(i,1)
			}
		}
		for(i=0;i<bubbleArray[Bulle2index][1].length;i++){
			if(bubbleArray[Bulle2index][1][i]==supprlink){
				bubbleArray[Bulle2index][1].splice(i,1)
				bubbleArray[Bulle2index][2].splice(i,1)
			}
		}
		sceneLink.removeChild(supprlink)
		linkSelected=false
	}else{
		$('#loading').css("display","block");
		var result;
		for( i = 0, len = bubbleArray.length; i < len; i++ ) {
			if( bubbleArray[i][0] == selectedBulle ) {
				result = i;
				break;
			}
		}
		for(i=0;i< bubbleArray[result][1].length;i++){
			supprLinkArray.push(bubbleArray[result][1][i])
			for(j=0;j<linkArray.length;j++){
				if(linkArray[j][0]==supprLinkArray[i]){
					if(linkArray[j][1]==selectedBulle){
						supprLinkRefArray.push(linkArray[j][2])
					}else{
						supprLinkRefArray.push(linkArray[j][1])
					}
					sceneLink.removeChild(linkArray[j][0]);
					linkArray.splice(j,1)
					console.log("link removed")
					
				}
			}
		}
		
		bubbleArray.splice(result,1);
		sceneBulle.removeChild(selectedBulle);
		for(i=0;i<bubbleArray.length;i++){
			for(j=0;j<supprLinkRefArray.length;j++){
				if(bubbleArray[i][0]==supprLinkRefArray[j]){
					for(k=0;k<bubbleArray[i][1].length;k++){
						for(l=0;l<supprLinkArray.length;l++){
							if(supprLinkArray[l]==bubbleArray[i][1][k]){
								bubbleArray[i][1].splice(k,1);
							}
						}
					}
				}
			}
		}
		for(i=0;i<bubbleArray.length;i++){
			while(bubbleArray[i][2] > 0) {
				bubbleArray[i][2].pop();
			}
			for(j=0;j<bubbleArray[i][1].length;j++){
				bubbleArray[i][2].push(sceneLink.getChildIndex(bubbleArray[i][1][j]))
			}
		}
		for(i=0;i<linkArray.length;i++){
			linkArray[i][3]=sceneBulle.getChildIndex(linkArray[i][1]);
			linkArray[i][4]=sceneBulle.getChildIndex(linkArray[i][2]);
		}
		while(supprLinkArray.length > 0) {
			supprLinkArray.pop();
		}
		while(supprLinkRefArray.length > 0) {
			supprLinkRefArray.pop();
		}
		$('#loading').css("display","none");
	}
}
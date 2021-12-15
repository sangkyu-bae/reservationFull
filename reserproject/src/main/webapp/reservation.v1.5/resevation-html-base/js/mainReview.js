/**
 * 
 */
var reviewObj={
	setHtml(html){
		this.html=html;
	},
	getHtml(){
		return this.html;
	},
	review(){
		var html=this.html;
		$('.list_short_review').append(html);
		console.log(html);
	}
}

function review(){
	var html=html;
	$('.list_short_review').append(html);
	console.log(html);
}

document.addEventListener("DOMContentLoaded",function(){
		reviewObj.review();
		reviewObj.getHtml();
        });
/**
 * 
 */
function HeadName(){
	this.getHeaderName();
	this.setHref();
}
HeadName.prototype={
	 getHeaderName(){
			const parsedUrl = new URL(window.location.href);
			var reserveName=parsedUrl.searchParams.get("reserveName");
		
			var headerName=document.querySelector('.title');
			headerName.innerText=reserveName;
	},
	/////뒤로가기 a태그 href 번경
	setHref(){
		///a태그접근
		var title=document.querySelector('.top_title ');
		var aTag=title.getElementsByTagName('a');
		aTag=aTag[0];
		
		///url 분석
		var parsedUrl=new URL(window.location.href);
		var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
		
		aTag.href=`myreservation?reservationEmail=${reservationEmail}`;
	}
}

//////////////
///////////////////리뷰작성 페이지 스크립트 작성
function ReviewAction(){
	this.clickChecked();
	this.getTextarea();
}
ReviewAction.prototype={
	clickChecked(){
		var rating=document.querySelector(".rating");
		rating.addEventListener("click",function(evt){
			if(evt.target.tagName==='INPUT'){
				var radioBox=document.querySelectorAll('.rating_rdo');
				var score=document.querySelector(".star_rank");
				var resultScore=parseInt(score.innerText);
				if(resultScore===0){
						score.classList.remove("gray_star");
						for(var i=0;i<radioBox.length;i++){
						if(radioBox[i].value<=evt.target.value){
							radioBox[i].classList.add("checked");
						}
					}
					score.innerText=evt.target.value;
				}else{
					if(evt.target.classList[1]==='checked'){
						for(var i=evt.target.value;i<radioBox.length;i++){
								radioBox[i].classList.remove('checked');
						}
					}else{
							for(var i=0;i<radioBox.length;i++){
							if(radioBox[i].value<=evt.target.value){
								radioBox[i].classList.add("checked");
							}
						}
					}
					score.innerText=evt.target.value;		
				}
			}
		});
	},
	getTextarea(){
		var reviewWrap=document.querySelector('.ct_wrap');
		reviewWrap.addEventListener('click',function(evt){
			if(evt.target.className==='review_write_info'){
				if(evt.target.display!='none'){
					this.reviewDisplayNone(0,evt.target);
				}
			
			}else if(evt.target.className==='middot'||evt.target.className==='left_space'){
				if(evt.target.parentNode.display!='none'){
					this.reviewDisplayNone(0,evt.target.parentNode);
				}
			}else{
				var reviewWrite=document.querySelector('.review_write_info');
				if(reviewWrite.style.display==='none'){
					this.reviewDisplayNone(1,reviewWrite);
				}
			}
		}.bind(this)) 
	},
	reviewDisplayNone(display,write){
		if(display===0){
				write.style.display='none';
				var review=document.querySelector('.review_textarea');
				review.focus();	
		}else{
				var review=document.querySelector('.review_textarea');
				if(review.value===''){
					write.style.display='block';
				}				
		}
	}
}

function GetImage(){
	this.getImage();
}
GetImage.prototype={
	////이미지 확장자 확인
	valideImageType(image) {
		const result = ([ 'image/jpeg',
						  'image/png',
						  'image/jpg' ].indexOf(image.type) > -1);
		return result;
	},
	///썸네일 만들기
	getImage(){
		const elImage=document.querySelector('#reviewImageFileOpenInput');
		elImage.addEventListener('change',function(evt){
			const image=evt.target.files[0];
			     if(!this.valideImageType(image)) { 
	                console.warn("invalide image file type");
	                return;
	            }
			const elImage=document.querySelector('.item');
			var img=elImage.firstElementChild.nextElementSibling;
			img.src=window.URL.createObjectURL(image);
			console.log(img);
			elImage.style.display='block';
			
			/////x 버튼 클릭스 사라짐 구현
			var cancle=document.querySelector('.spr_book');
			cancle.addEventListener('click',function(evt){
				elImage.style.display='none';
			});
		}.bind(this));
	}
}

////리뷰 등록 클릭시 비동기 통신으롤 처리
function AddReview(){
 	this.addReview();
	this.getTextLength();
}
AddReview.prototype={
	 addReview(){
		var btn=document.querySelector('.bk_btn');
		btn.addEventListener('click',function(){
			var textareaLength=document.querySelector('.review_textarea').value.length;
			var score=parseInt(document.querySelector('.star_rank').innerText);
			if(textareaLength<6&&score<1){
				alert("리뷰와 별점이 작성되지 않았습니다.");
			}
			else if(textareaLength<6){
				alert("리뷰가 5자 이상이여야 합니다.");
			}else if(score<1){
				alert("별점이 등록되지 않았습니다.")
			}else{
				var parsedUrl=new URL(window.location.href);
				var reservationInfoId=parsedUrl.searchParams.get("reservationInfoId");
				var productId=parsedUrl.searchParams.get("productId");
				var score=document.querySelector('.star_rank');
				score=parseInt(score.innerText);
				var data=new FormData();
				//data.append("reservationInfoId",reservationInfoId);
				console.log($('.review_textarea').val());
				data.append("comment",$('.review_textarea').val());
				data.append("productId",productId);
				data.append("score",score);
				data.append("file",$('#reviewImageFileOpenInput').prop('files')[0]);
				/*
				var oReq = new XMLHttpRequest();
		          oReq.open("POST", "http://localhost:8080/reserproject/api/reservation/"+reservationInfoId+"/comments");
		          oReq.responseType='json';
		          oReq.send();
		          oReq.addEventListener("load", function () {
			          var productId=data.productId;
					  window.location.href=`detail?id=${productId}`
		         }.bind(this));
				*/
				$.ajax({
					url: "http://localhost:8080/reserproject/api/reservation/"+reservationInfoId+"/comments",
			        type: "POST",
			        dataType: 'json',
			        data: data,
			        contentType: false,
			        processData: false,
			        cache: false,
					success : function(data) {
						var productId=data.productId;
						window.location.href=`detail?id=${productId}`
					}
				})
			}
		})
	},
	getTextLength(){
		var textarea=document.querySelector('.review_textarea');
		$('.review_textarea').on("change keyup paste",function(){
			var textLength=document.querySelector('.guide_review').firstElementChild;
			textLength.innerText=textarea.value.length;
		})
	}
}

var HeadName=new HeadName();
var ReviewAction=new ReviewAction();
var GetImage=new GetImage();
var AddReview=new AddReview();

/**
 * 
 */
///////////bookinglogin
function Submit(){
	this.checkSubmit();
}
Submit.prototype = {
	checkSubmit(){
	var btn= document.querySelector(".login_btn");
		btn.addEventListener('click',function(evt){
			evt.preventDefault();
			var emailValue=document.querySelector("[name='resrv_email']").value;
			var checknumber=this.checkEmail(emailValue);
			if(checknumber==0){
				alert("올바르지 않은 이메일 형식입니다");
			}else{
				document.querySelector("#form1").submit();
			}
		}.bind(this))
	},
	checkEmail(email){
		console.log(email);
		var checknumber;
		var checkresult=/^[\w+_]\w+@\w+\.\w+$/
		if(!checkresult.test(email)){
			checknumber=0;
			return checknumber;
		}else{
			checknumber=1;
			return checknumber;
		}
	}
}
var Submit= new Submit();
/*
function checkEmail(email){
	var checknumber;
	var checkresult=/^[\w+_]\w+@\w+\.\w+$/
	if(!checkresult.test(email)){
		checknumber=0;
		return checknumber;
	}else{
		checknumber=1;
		return checknumber;
	}
}

function checkSubmit(){
	var btn= document.querySelector(".login_btn");
	btn.addEventListener('click',function(evt){
		evt.preventDefault();
		var emailValue=document.querySelector("[name='resrv_email']").value;
		var checknumber=checkEmail(emailValue);
		if(checknumber==0){
			alert("올바르지 않은 이메일 형식입니다");
		}else{
			document.querySelector("#form1").submit();
		}
	})
}
*/
///url 분석
/*
function parsUrl(){
	const parsedUrl = new URL(window.location.href);
	var pathName=parsedUrl.pathname;
	var path=pathName.split('/');
	console.log(path[2]);
	return path[2];
}
*/
///////////////
//////////////////
///////////myreservation

/*
function getReserveImpo(){
	const parsedUrl = new URL(window.location.href);
	var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
	//확인중
	console.log(reservationEmail);
	
	$.ajax({
		url : "http://localhost:8080/reserproject/api/reservations?reservationEmail="+reservationEmail,
        type : "get",
        dataType : "json",
	    contentType: "application/json; charset=utf-8",
        success : function(data) {
				Header(data);
		}
	})
}
*/
///시간변환

////취소 확인
/*
function cancle(){
	var confirmed=document.querySelector(".confirmed");
	confirmed.addEventListener("click",function(evt){
		var btn=evt.target.className;
		if(btn==='btn'){
			var dark=document.querySelector(".popup_booking_wrapper");
			var cancleId=evt.target.parentNode.id;
			
			var reserveName=evt.target.parentNode.parentNode.firstElementChild.nextElementSibling;//공연이름 가져오기
			var cancleReserveName=document.querySelector('.pop_tit').firstElementChild;//취소 공연예매 이름 변경을 위한 셀랙터 확인
			
			var reserveDate=evt.target.parentNode.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling;//취소 공연예매 날짝확인 셀렉터
			var cancleDate=document.querySelector('.sm');//취소 공연 날자 변경을 위한 셀렉터
			
			cancleReserveName.innerText=reserveName.innerText;
			cancleDate.innerText=reserveDate.innerText;
		
			dark.style.display='block';
			clickYesorNO(cancleId);
		}
	})
}
function clickYesorNO(cancleId){
	var btn=document.querySelector('.popup_booking');
	var dark=document.querySelector(".popup_booking_wrapper");
	btn.addEventListener('click',function(evt){
		if(evt.target.tagName==='SPAN'){
			console.log(evt.target.parentNode.parentNode);
			clickcancle(evt.target.parentNode.parentNode,cancleId);
		}else if(evt.target.tagName==='A'){
			clickcancle(evt.target.parentNode,cancleId);
		}else if(evt.target.className==='spr_book2 ico_cls'){
			dark.style.display='none';
		}
	});
}
function clickcancle(data,cancleId){
	var name=data;
	var dark=document.querySelector(".popup_booking_wrapper");
	console.log(name);
	if(name.className==='btn_gray'){
		dark.style.display='none';
	}else if(name.className==='btn_green'){
		cancleReserve(cancleId);
	}
}

function cancleReserve(cancleId){
	const parsedUrl = new URL(window.location.href);
	var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
	 $.ajax({
        url : "http://localhost:8080/reserproject/api/reservations/"+cancleId,
        type : "put",
        dataType : "json",
	    contentType: "application/json; charset=utf-8",
        success : function(data) {
			alert("취소되었습니다");
			window.location.href=`myreservation?reservationEmail=${reservationEmail}`;
		}
	});
}
*/

/////리뷰 남기기 클릭시 함수

/*
function addReserveReview(){
	var doneSection=document.querySelector(".used");
	doneSection.addEventListener('click',function(evt){
		if(evt.target.className==='btn'){
			var reserveName=evt.target.parentNode.parentNode.previousElementSibling.firstElementChild.nextElementSibling.innerText;
			var reserveInfoId=evt.target.parentNode.parentNode.id;
			
			document.cookie=reserveName;
			window.location.href=`reviewWrite?reservationInfoId=${reserveInfoId}`;
		}
	});
}


function getHeaderName(){
		var cookie=document.cookie;
		cookie=cookie.split(";");
		cookie=cookie[0];
		var headerName=document.querySelector('.title');
		headerName.innerText=cookie;
}
*/


/*
function addReserveReview(){
	var doneSection=document.querySelector(".used");
	doneSection.addEventListener('click',function(evt){
		if(evt.target.className==='btn'){
			var reserveName=evt.target.parentNode.parentNode.previousElementSibling.firstElementChild.nextElementSibling.innerText;
			var reserveInfoId=evt.target.parentNode.parentNode.id;
			var productId=evt.target.parentNode.id;

			var parsedUrl=new URL(window.location.href);
			var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
			
			window.location.href=`reviewWrite?reservationInfoId=${reserveInfoId}&productId=${productId}&reserveName=${reserveName}&reservationEmail=${reservationEmail}`;
		}
	});
}


function getHeaderName(){
	
		const parsedUrl = new URL(window.location.href);
		var reserveName=parsedUrl.searchParams.get("reserveName");
	
		var headerName=document.querySelector('.title');
		headerName.innerText=reserveName;
}

//////////////
///////////////////리뷰작성 페이지 스크립트 작성

function clickChecked(){
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
}

function getTextarea(){
	var reviewWrite=document.querySelector('.review_write_info');
	reviewWrite.addEventListener('click',function(evt){
		reviewWrite.style.display='none';
		var review=document.querySelector('.review_textarea');
		review.focus();
	})
}
////이미지 확장자 확인
function valideImageType(image) {
	const result = ([ 'image/jpeg',
					  'image/png',
					  'image/jpg' ].indexOf(image.type) > -1);
	return result;
}
///썸네일 만들기
function getImage(){
	const elImage=document.querySelector('#reviewImageFileOpenInput');
	elImage.addEventListener('change',function(evt){
		const image=evt.target.files[0];
		     if(!valideImageType(image)) { 
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
	});
}

////리뷰 등록 클릭시 ajax 통신으롤 처리

function addReview(){
	var btn=document.querySelector('.bk_btn');
	btn.addEventListener('click',function(evt){
		var parsedUrl=new URL(window.location.href);
		var reservationInfoId=parsedUrl.searchParams.get("reservationInfoId");
		var productId=parsedUrl.searchParams.get("productId");
		var score=document.querySelector('.star_rank');
		score=parseInt(score.innerText);
		var data=new FormData();
		//data.append("reservationInfoId",reservationInfoId);
		data.append("comment",$('.review_textarea').val());
		data.append("productId",productId);
		data.append("score",score);
		data.append("file",$('#reviewImageFileOpenInput').prop('files')[0]);
		
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
	})
}

/////뒤로가기 a태그 href 번경
function setHref(){
	///a태그접근
	var title=document.querySelector('.top_title ');
	var aTag=title.getElementsByTagName('a');
	aTag=aTag[0];
	
	///url 분석
	var parsedUrl=new URL(window.location.href);
	var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
	
	aTag.href=`myreservation?reservationEmail=${reservationEmail}`;
}
		

document.addEventListener("DOMContentLoaded",function(){
	var path=parsUrl();
	if (path==='bookinglogin'){
		//var Submit= new Submit();
		//checkSubmit();
	}else if(path==='myreservation'){
		//getReserveImpo();
		cancle();
		addReserveReview();
	}else{
		getHeaderName();
		clickChecked();
		getTextarea();
		getImage();
		addReview();
		setHref();
	}
})*/
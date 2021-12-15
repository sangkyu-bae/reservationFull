/**
 * 
 */
/////템플릿 생성
function GetTemplate(email){
	this.getReserveImpo(email);
}

GetTemplate.prototype={
	getReserveImpo(email){
		//확인중
		//const parsedUrl = new URL(window.location.href);
		//var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
		//console.log(email);
		
		    var oReq = new XMLHttpRequest();
	            oReq.open("GET", "http://localhost:8080/reserproject/api/reservations?reservationEmail="+email);
	            oReq.responseType='json';
	            oReq.send();
	            oReq.addEventListener("load", function () {
	                var data = oReq.response;
	                this.Header(data);
	            }.bind(this));
	},
	Header(data){
		///확인중
		//const parsedUrl = new URL(window.location.href);
		//var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
		var logout=document.querySelector('.viewReservation');
		logout.innerText=`로그아웃`;
		
		var totalCount=data['size'];
		var reservations=data['reservations'];
	
		var cancle=0;
		var reserveSoon=0;
		var doneReserve=0;
		for(var i=0;i<totalCount;i++){
			if(reservations[i].cancelYn===1){
				cancle++;
			}else if(reservations[i].cancelYn===0){
				reserveSoon++;
			}else{
				doneReserve++;
			}
		}
		var total=document.querySelector('.ico_book2').nextElementSibling.nextElementSibling;
		var soon=document.querySelector('.ico_book_ss').nextElementSibling.nextElementSibling;
		var finsh=document.querySelector('.ico_back').nextElementSibling.nextElementSibling;
		var done=document.querySelector('.ico_check').nextElementSibling.nextElementSibling;
		total.innerText=`${totalCount}`;
		soon.innerText=`${reserveSoon}`;
		finsh.innerText=`${cancle}`;
		done.innerText=`${doneReserve}`;
		this.confirmationReserveSection(data);		
	},
	confirmationReserveSection(data){
		var inghtml='';
		var cancleHtml='';
		var doneHtml='';
		var nullHtml=`<div class="err"> <i class="spr_book ico_info_nolist"></i>
							<h1 class="tit">예약 리스트가 없습니다</h1>
						</div>`;
		
		var reservations=data['reservations'];
		var size =data.size;
		var num=1;
		
		
		for(var i=0;i<size;i++){
			var cancle=reservations[i].cancelYn;
			var time=this.Unix_timestamp(reservations[i].reservationDate);
			var reservationInDisplay=reservations[i].reservationInDisplay;
			var price=reservations[i].price;
			price=price.toLocaleString();
			time=time.split(".");
			if(cancle==0){
				inghtml+=`<article class="card_item">
										<a href="#" class="link_booking_details">
											<div class="card_body">
												<div class="left"></div>
												<div class="middle">
													<div class="card_detail">
													 	<em class="booking_number">No.000000${num}</em>
														<h4 class="tit">${reservationInDisplay.productDescription}</h4>
														<ul class="detail">
														  
															<li class="item">
																<span class="item_tit">일정</span>
																<em class="item_dsc">
																	${time[0]}.${time[1]}.(월)${time[2]}.(일)
																</em>
															</li>
															<li class="item">
																<span class="item_tit">내역</span>
																<em class="item_dsc">
																	내역이 없습니다.
																</em>
															</li>
															<li class="item">
																<span class="item_tit">장소</span>
																<em class="item_dsc">
																	${reservationInDisplay.placeName}
																</em>
															</li>
															<li class="item">
																<span class="item_tit">업체</span>
																<em class="item_dsc">
																	${reservationInDisplay.productDescription}
																</em>
															</li>
														</ul>
														<div class="price_summary">
															<span class="price_tit">결제 예정금액</span>
															<em class="price_amount">
																<span>${price}</span>
																<span class="unit">원</span>
															</em>
														</div>
														<div class="booking_cancel" id="${reservations[i].reservationInfoId}">
															<button class="btn"><span>취소</span></button>
														</div>
													</div>
												</div>
												<div class="right"></div>
											</div>
											<div class="card_footer">
												<div class="left"></div>
												<div class="middle"></div>
												<div class="right"></div>
											</div>
										</a>
										<a href="#" class="fn fn-share1 naver-splugin btn_goto_share" title="공유하기"></a>
									</article>`;
			}else if(cancle==1){
				cancleHtml+=`<article class="card_item">
										<a href="#" class="link_booking_details">
											<div class="card_body">
												<div class="left"></div>
												<div class="middle">
													<div class="card_detail">
														<em class="booking_number">No.000000${num}</em>
														<h4 class="tit">${reservationInDisplay.productDescription}</h4>
														<ul class="detail">
															<li class="item">
																<span class="item_tit">일정</span>
																<em class="item_dsc">
																	${time[0]}.${time[1]}.(월)${time[2]}.(일)
																</em>
															</li>
															<li class="item">
																<span class="item_tit">내역</span>
																<em class="item_dsc">
																	내역이 없습니다.
																</em>
															</li>
															<li class="item">
																<span class="item_tit">장소</span>
																<em class="item_dsc">
																	${reservationInDisplay.placeName}
																</em>
															</li>
															<li class="item">
																<span class="item_tit">업체</span>
																<em class="item_dsc">
																	${reservationInDisplay.productDescription}
																</em>
															</li>
														</ul>
														<div class="price_summary">
															<span class="price_tit">결제 예정금액</span>
															<em class="price_amount">
																<span>${price}</span>
																<span class="unit">원</span>
															</em>
														</div>
													</div>
												</div>
												<div class="right"></div>
											</div>
											<div class="card_footer">
												<div class="left"></div>
												<div class="middle"></div>
												<div class="right"></div>
											</div>
										</a>
									</article>`;
			}else{
				doneHtml+=`	<article class="card_item">
										<a href="#" class="link_booking_details">
											<div class="card_body">
												<div class="left"></div>
												<div class="middle">
													<div class="card_detail">
														<em class="booking_number">No.000000${num}</em>
														<h4 class="tit">${reservationInDisplay.productDescription}</h4>
														<ul class="detail">
															<li class="item">
																<span class="item_tit">일정</span>
																<em class="item_dsc">
																	${time[0]}.${time[1]}.(월)${time[2]}.(일)
																</em>
															</li>
															<li class="item">
																<span class="item_tit">내역</span>
																<em class="item_dsc">
																	내역이 없습니다.
																</em>
															</li>
															<li class="item">
																<span class="item_tit">장소</span>
																<em class="item_dsc">
																	${reservationInDisplay.placeName}
																</em>
															</li>
															<li class="item">
																<span class="item_tit">업체</span>
																<em class="item_dsc">
																	${reservationInDisplay.productDescription}
																</em>
															</li>
														</ul>
														<div class="price_summary">
															<span class="price_tit">결제 완료금액</span>
															<em class="price_amount">
																<span>${price}</span>
																<span class="unit">원</span>
															</em>
														</div>
														<div class="booking_cancel" id="${reservations[i].reservationInfoId}">
															<a href="javascript:;" id="${reservations[i].productId}"><button class="btn"><span>예매자 리뷰 남기기</span></button></a>
														</div>
													</div>
												</div>
												<div class="right"></div>
											</div>
											<div class="card_footer">
												<div class="left"></div>
												<div class="middle"></div>
												<div class="right"></div>
											</div>
										</a>
									</article>`;
			}
					num++;
		}
		if(inghtml===''){
			inghtml+=nullHtml;
		}
		if(doneHtml===''){
			doneHtml+=nullHtml;
		}
		if(cancleHtml===''){
			cancleHtml+=nullHtml;
		}
	
		j$('.confirmed').append(inghtml);
		j$('.s').append(doneHtml);
		j$('.cancel').append(cancleHtml);
	},
	 ////시간변환
	Unix_timestamp(t){
		t=t.toString();
		t=t.substring(0,10);
		t=parseInt(t);
	    var date = new Date(t*1000);
	    var year = date.getFullYear();
	    var month = "0" + (date.getMonth()+1);
	    var day = "0" + date.getDate();
	    return year + "." + month.substr(-2) + "." + day.substr(-2) ;
	}
}

////공연 취소 누를시
function ReserveCancle(){
	this.cancle();
}

ReserveCancle.prototype={
	////취소 확인
	cancle(){
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
				this.clickYesorNO(cancleId);
			}
		}.bind(this))
	},
	clickYesorNO(cancleId){
		var btn=document.querySelector('.popup_booking');
		var dark=document.querySelector(".popup_booking_wrapper");
		btn.addEventListener('click',function(evt){
			if(evt.target.tagName==='SPAN'){
				//console.log(evt.target.parentNode.parentNode);
				this.clickcancle(evt.target.parentNode.parentNode,cancleId);
			}else if(evt.target.tagName==='A'){
				this.clickcancle(evt.target.parentNode,cancleId);
			}else if(evt.target.className==='spr_book2 ico_cls'){
				dark.style.display='none';
			}
		}.bind(this));
	},
	clickcancle(data,cancleId){
		var name=data;
		var dark=document.querySelector(".popup_booking_wrapper");
		//console.log(name);
		if(name.className==='btn_gray'){
			dark.style.display='none';
		}else if(name.className==='btn_green'){
			this.cancleReserve(cancleId);
		}
	},
	cancleReserve(cancleId){
		const parsedUrl = new URL(window.location.href);
		var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
		
		var oReq = new XMLHttpRequest();
	          oReq.open("put",  "http://localhost:8080/reserproject/api/reservations/"+cancleId);
	          oReq.responseType='json';
	          oReq.send();
	          oReq.addEventListener("load", function () {
				window.location.href=`myreservation`;
	           	alert("취소되었습니다");
				//window.location.href=`myreservation?reservationEmail=${reservationEmail}`;
				
	         }.bind(this));
	}
}

////리뷰넘기는 함수
function AddReserveReview(){
	this.addReserveReview()
}
AddReserveReview.prototype={
	addReserveReview(){
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
}




//var getTemplate=new GetTemplate();
var reserveCancle=new ReserveCancle();
var addReserveReview=new AddReserveReview();
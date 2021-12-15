/**
 * 
 */
/*
function Header(data){
	const parsedUrl = new URL(window.location.href);
	var reservationEmail=parsedUrl.searchParams.get("reservationEmail");
	var email=document.querySelector('.viewReservation');
	email.innerText=`${reservationEmail}`;
	
	var totalCount=data['size'];
	var reservations=data['reservations'];

	var cancle=0;
	var reserveSoon=0
	for(var i=0;i<totalCount;i++){
		if(reservations[i].cancelYn===1){
			cancle++;
		}else if(reservations[i].cancelYn===0){
			reserveSoon++;
		}
	}
	var total=document.querySelector('.ico_book2').nextElementSibling.nextElementSibling;
	var soon=document.querySelector('.ico_book_ss').nextElementSibling.nextElementSibling;
	var finsh=document.querySelector('.ico_back').nextElementSibling.nextElementSibling;
	total.innerText=`${totalCount}`;
	soon.innerText=`${reserveSoon}`;
	finsh.innerText=`${cancle}`;

	confirmationReserveSection(data);		
}
//예약 섹션

function confirmationReserveSection(data){
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
		var time=Unix_timestamp(reservations[i].reservationDate);
		var reservationInDisplay=reservations[i].reservationInDisplay;
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
															<span>000,000,000</span>
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
															<span>000,000,000</span>
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
														<span class="price_tit">결제 예정금액</span>
														<em class="price_amount">
															<span>000,000,000</span>
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

	$('.confirmed').append(inghtml);
	$('.s').append(doneHtml);
	$('.cancel').append(cancleHtml);
}
*/
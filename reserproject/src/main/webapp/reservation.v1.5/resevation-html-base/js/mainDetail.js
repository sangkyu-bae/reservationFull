//////////슬라이드 이미지 구현
/*
var dataUse={
	getData(){
		return this.count;
	},
	setData(Data){
		this.Data=Data;
	},	
	getHeaderImageSlide(){
		var productImages=this.data['productImages'];
		var displayInfo=this.data['displayInfo'];
		var html='';
	
		for(var i=0;i<productImages.length;i++){
			html+=` <li class="item" style="width: 414px;"> <img alt="${displayInfo.productDescription}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${productImages[i].saveFileName}"> <span class="img_bg"></span>
	                                        <div class="visual_txt">
	                                            <div class="visual_txt_inn">
	                                                <h2 class="visual_txt_tit">${displayInfo.productDescription} <span></span> </h2>
	                                                <p class="visual_txt_dsc"></p>
	                                            </div>
	                                        </div>
	                                    </li>`
		}
			$('.visual_img').append(html);
	}
	
};
*/
/*
function getHeaderImageSlide(data){
	var productImages=data['productImages'];
	var displayInfo=data['displayInfo'];
	var html='';

	for(var i=0;i<productImages.length;i++){
		html+=` <li class="item" style="width: 414px;"> <img alt="${displayInfo.productDescription}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${productImages[i].saveFileName}"> <span class="img_bg"></span>
                                        <div class="visual_txt">
                                            <div class="visual_txt_inn">
                                                <h2 class="visual_txt_tit">${displayInfo.productDescription} <span></span> </h2>
                                                <p class="visual_txt_dsc"></p>
                                            </div>
                                        </div>
                                    </li>`
	}
		$('.visual_img').append(html);
		////////set 카운트값 보내기 
		var count =$('.visual_img .item').length;
		CountObj.setCount(count);
		//CountObj.getImageCount();
		CountObj.moveArrow();	
}

//////////////////
/////상단 이미지 컨트롤//
var CountObj={
	setNum(num){
		this.num=num;
	},
	getNum(){
		return this.num;
	},
	getCount(){
		return this.count;
	},
	setCount(count){
		this.count=count;
	},
	getImageForm(){
					var formhtml= `  <div class="bg_pagination"></div>
                        <div class="figure_pagination">
                            <span class="num">${this.num}</span>
                            <span class="num off">/ <span>${this.count}</span></span>
                        </div>`;
						$('.pagination').append(formhtml);
	},	
	getImageCount(){
		    var html=document.getElementById("tabcontent").innerHTML;
			var resultHtml='';
			resultHtml=html.replace("{num}",this.num);

			document.querySelector(".num").innerHTML=resultHtml;
	},
	///////가져온 이미지 갯수가 2개 이하면 이동커서 삭제
	moveArrow(){
			var leftHtml='';
			var rightHtml='';
			if(this.count>1){
					 leftHtml+=` <a href="#" class="btn_prev" title="이전">
		                                        <!-- [D] 첫 이미지 이면 off 클래스 추가 -->
		                                        <i class="spr_book2 ico_arr6_lt off"></i>
		                                    </a>`;
					rightHtml=`  <a href="#" class="btn_nxt" title="다음">
		                                        <i class="spr_book2 ico_arr6_rt"></i>
		                                    </a>`;
			}
			$('.prev_inn').append(leftHtml);
			$('.nxt_inn').append(rightHtml);
	}
};
*/



//////문단 구현
/*
function text(data){
	var displayInfo=data['displayInfo'];
	var html=`<p class="dsc">${displayInfo.productContent} </p>`
	$('.store_details').append(html);
}
*/



/*
////코멘트 구현

function comment(data){
	var comment=data['comments'];
	var count=comment.length;/////코멘트 크기
	var topHtml='';
	if(count==0){
	topHtml+='';
	}else{
		var avg=data['avgScore'];
		avg=avg.toFixed(1);
		var percent=100/5*avg;
		////코멘트 점수 별 표현
		topHtml+=`
	 <span class="graph_mask"> <em class="graph_value" style="width: ${percent}%;"></em> </span>
                                <strong class="text_value"> <span>${avg}</span> <em class="total">5.0</em> </strong>
                                <span class="join_count"><em class="green">${count}건</em> 등록</span>
	`
	}
	$('.grade_area').append(topHtml);
	
	
	var path=parsUrl();
	var displayInfo=data['displayInfo'];
	
	if(path==='review'){
		var html=`<a href="./detail.html" class="btn_back" title="이전 화면으로 이동"> <i class="fn fn-backward1"></i> </a>
                        <h2><a class="title" href=${displayInfo.homepage}#">${displayInfo.productDescription}</a></h2>`
		$('.top_title').append(html);
		
	}
}

///코멘트 템플릿 핸들바 구현
function commentTemplate(data){
	var path=parsUrl();

	var comments=data['comments'];
	var displayInfo=data['displayInfo'];
	var count=comments.length;
	
	for(var i=0;i<count;i++){
		var lastEmail=changEmail(comments[i].reservationEmail);///이메일 형변환
		var lastTime=Unix_timestamp(comments[i].reservationDate);/////날짜 형변환
		comments[i].reservationEmail=lastEmail;
		comments[i].reservationDate=lastTime;
	}
	
	var template=document.querySelector("#listTemplate").innerText;///핸들바 템플릿 활요을 위한 변수
	var bindTemplate=Handlebars.compile(template);///핸들바 템플릿 활용을 위한 변수
	
	console.log(data);
	
	if(path==='detail'){
			Handlebars.registerHelper("commentImagess",function(commentImages){
				if(commentImages.length>0){
					return `<div class="thumb_area">
		                       <a href="#" class="thumb" title="이미지 크게 보기"> <img width="90" height="90" class="img_vertical_top" src="http://localhost:8080/reserproject/reservation.v1.5/${commentImages[0].saveFileName}" alt="리뷰이미지"> </a> <span class="img_count" style="display:none;">1</span></div>
							<h4 class="resoc_name"></h4>`;
				}else{
					return `<h4 class="resoc_name no_img"></h4>`;
				}
			});
			var html=bindTemplate(data);
			var list_short_review=document.querySelector('.list_short_review');
			list_short_review.innerHTML=html;
			
			var liList=document.querySelectorAll('.list_item');
			if(liList.length>3){
				for(var i=3;i<liList.length;i++){
					liList[i].style.display='none';
				}
			}else{
				var button=document.querySelector('.btn_review_more');
					button.style.display='none';
			}
	}else{
			Handlebars.registerHelper("commentImagess",function(commentImages){
				if(commentImages.length>0){
					return `<div class="thumb_area">
		                       <a href="#" class="thumb" title="이미지 크게 보기"> <img width="90" height="90" class="img_vertical_top" src="http://localhost:8080/reserproject/reservation.v1.5/${commentImages[0].saveFileName}" alt="리뷰이미지"> </a> <span class="img_count" style="display:none;">1</span></div>
							<h4 class="resoc_name">${displayInfo.productDescription}</h4>`;
				}else{
					return `<h4 class="resoc_name no_img">${displayInfo.productDescription}</h4>`;
				}
			});
			
			var html=bindTemplate(data);
			var list_short_review=document.querySelector('.list_short_review');
			list_short_review.innerHTML=html;
	}
}

*/
/*
///////하단 구현
function moreInformation(data){
	var html='';
	var content=data['displayInfo'];
	html+=`         <li class="detail_info_lst">
                                        <strong class="in_tit">[소개]</strong>
                                        <p class="in_dsc">
											${content.productContent}
                                        </p>
                                    </li>
                                    <li class="detail_info_lst"> <strong class="in_tit">[공지사항]</strong>
                                        <ul class="in_img_group">
                                            <li class="in_img_lst"> <img alt="" class="img_thumb" src="https://ssl.phinf.net/naverbooking/20170131_238/14858250829398Pnx6_JPEG/%B0%F8%C1%F6%BB%E7%C7%D7.jpg?type=a1000"> </li>
                                        </ul>
                                    </li>`;
	$('.detail_info_group').append(html);
}

function comeWhere(data){
	var displayInfo=data['displayInfo'];
	var image=data['displayInfoImages'];
	
	var html='';
	html+=`   <a href="#" class="store_location" title="지도웹으로 연결">
                                <img class="store_map img_thumb" alt="map" src="http://localhost:8080/reserproject/reservation.v1.5/${image[0].saveFileName}">
                                <span class="img_border"></span>
                                <span class="btn_map"><i class="spr_book2 ico_mapview"></i></span>
                            </a>
                            <h3 class="store_name">${displayInfo.categoryName} ${displayInfo.productDescription}</h3>
                            <div class="store_info">
                                <div class="store_addr_wrap">
                                    <span class="fn fn-pin2"></span>
                                    <p class="store_addr store_addr_bold">${displayInfo.placeStreet} </p>
                                    <p class="store_addr">
                                        <span class="addr_old">지번</span>
                                        <span class="addr_old_detail">${displayInfo.placeLot} </span>
                                    </p>
                                    <p class="store_addr addr_detail">${displayInfo.placeName}</p>
                                </div>
                                <div class="lst_store_info_wrap">
                                    <ul class="lst_store_info">
                                        <li class="item"> <span class="item_lt"> <i class="fn fn-call2"></i> <span class="sr_only">전화번호</span> </span> <span class="item_rt"> <a href="tel:${displayInfo.telephone}" class="store_tel">${displayInfo.telephone}</a></span> </li>
                                    </ul>
                                </div>
 							<div class="bottom_common_path column2">
                                <a href="#" class="btn_path"> <i class="fn fn-path-find2"></i> <span>길찾기</span> </a>
								<a href="#" class="btn_navigation before"> <i class="fn fn-navigation2"></i> <span>내비게이션</span> </a>
                            </div>`;
	$('.box_store_info').append(html);
}
*/

/////////////////////
////////////////////애매하기 구현//////////////
/*
function headSection(data){
	var displayInfo=data['displayInfo'];
	var html=`<h2><span class="title">${displayInfo.productDescription}</span></h2>`;
	$('.top_title').append(html);
}
///정규표현식 수정 필요
function headImgSection(data){
	var productImages=data['productImages'];
	var html=`<li class="item" style="width: 414px;"> <img alt="" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${productImages[0].saveFileName}"> <span class="img_bg"></span>
                                <div class="preview_txt">
                                    <h2 class="preview_txt_tit"></h2> <em class="preview_txt_dsc">₩12,000 ~ </em><em class="preview_txt_dsc">2017.2.17.(금)~2017.4.18.(화), 잔여티켓 2769매</em> </div>
                            </li>`;
	$('.visual_img').append(html);
}
*/

/*
function mainSection(data){
	var displayInfo=data['displayInfo'];
	var productPrices=data['productPrices'];
	var openingHours=displayInfo.openingHours;
//	console.log(openingHours);
	//var period=openingHours.match(/(\d{4}.*[)]|\d{2}[월].*[)])/);
	var period=openingHours.match(/(\d{4}.*([)]|[일])|\d{2}[월].*[)])/);
	if(period===null){
		period="정해져 있는 기간이 없습니다";
	}else{
		period=period[0];
	}
	
	//var openTime=openingHours.replace(/(.*\d{4}.*[)]|\d{2}[월].*[)])/,"");
	var openTime=openingHours.replace(/(.*\d{4}.*([)]|[일])|\d{2}[월].*[)])/,"");
	openTime=openTime.match(/(\S.*\n.*|\S.*)/);
	if(openTime===null){
		openTime="명시된 관람시간이 없수다";
	}else{
		openTime=openTime[0];
	}
	//console.log(openTime);
	var dsc=`<p class="dsc">`;
	for(var i=0;i<productPrices.length;i++){
		productPrices[i].price=productPrices[i].price.toLocaleString('ko-KR');
		if(productPrices[i].priceTypeName==='A'){
			dsc+=`성인(만 19~64세) ${productPrices[i].price}원 /`;
		}else if(productPrices[i].priceTypeName==='Y'){
			dsc+=`청소년(만 13~18세) ${productPrices[i].price}원/`;
		}else if(productPrices[i].priceTypeName==='B'){
			dsc+=`<br> 어린이(만 4~12세) ${productPrices[i].price}원/`;
		}else{
			dsc+=`<br> 세트 ${productPrices[i].price}원/`;
		}
	}
	dsc+= ' 20인 이상 단체 20% 할인<br> 국가유공자, 장애인, 65세 이상 4,000원</p>';
	/*
	var html=` <div class="store_details">
                        <h3 class="in_tit"></h3>
                        <p class="dsc">
                            장소 :${displayInfo.placeName} <br> 기간 : ${period}
                        </p>
                        <h3 class="in_tit">관람시간</h3>
                        <p class="dsc">
                          ${openTime}
                        </p>
                        <h3 class="in_tit">요금</h3>
                        <p class="dsc">
                            성인(만 19~64세) ${productPrices[0].price}원 / 청소년(만 13~18세) ${productPrices[1].price}원<br> 어린이(만 4~12세) ${productPrices[2].price}원 / 20인 이상 단체 20% 할인<br> 국가유공자, 장애인, 65세 이상 4,000원
                        </p>
                    </div>`;
	
	var html=` <div class="store_details">
                        <h3 class="in_tit"></h3>
                        <p class="dsc">
                            장소 :${displayInfo.placeName} <br> 기간 : ${period}
                        </p>
                        <h3 class="in_tit">관람시간</h3>
                        <p class="dsc">
                          ${openTime}
                        </p>
                        <h3 class="in_tit">요금</h3>
                     `;
		html+=dsc;
		html+=`</div>`;
		$('.section_store_details').append(html);
}

function reserSction(data){
	var productPrices=data['productPrices'];
	var html=``;
	var age='';
	for(var i=0;i<productPrices.length;i++){
		productPrices[i].price=productPrices[i].price.toLocaleString('ko-KR');
		if(productPrices[i].priceTypeName==='A'){
			age='성인';
		}else if(productPrices[i].priceTypeName==='Y'){
			age='청소년';
		}else if(productPrices[i].priceTypeName==='B'){
			age='유아';
		}else{
			age='세트';
		}
		html+=`<div class="qty">
                            <div class="count_control">
                                <!-- [D] 수량이 최소 값이 일때 ico_minus3, count_control_input에 disabled 각각 추가, 수량이 최대 값일 때는 ico_plus3에 disabled 추가 -->
                                <div class="clearfix">
                                    <a href="javascript:;" class="btn_plus_minus spr_book2 ico_minus3 disabled" title="빼기"> </a> <input type="tel" class="count_control_input disabled" value="0" readonly title="수량">
                                    <a href="javascript:;" class="btn_plus_minus spr_book2 ico_plus3" title="더하기">
                                    </a>
                                </div>
                                <!-- [D] 금액이 0 이상이면 individual_price에 on_color 추가 -->
                                <div class="individual_price"><span class="total_price">0</span><span class="price_type">원</span></div>
                            </div>
                            <div class="qty_info_icon"> <strong class="product_amount" id="${productPrices[i].id}"> <span>${age}</span> </strong> <strong class="product_price"> <span class="price">${productPrices[i].price}</span> <span class="price_type">원</span> </strong> <em class="product_dsc">${productPrices[i].price}원 (${productPrices[i].discountRate}% 할인가)</em> </div>
                        </div>`
	}
	$('.ticket_body').append(html);
}


function commentTemplate(data){
	
	
	var template=document.querySelector("#listTemplate").innerText;
	
	var comments=data['comments'];
	var count=comments.length;
	
	for(var i=0;i<count;i++){
		var lastEmail=changEmail(comments[i].reservationEmail);///이메일 형변환
		var lastTime=Unix_timestamp(comments[i].reservationDate);/////날짜 형변환
		comments[i].reservationEmail=lastEmail;
		comments[i].reservationDate=lastTime;
	}
	var bindTemplate=Handlebars.compile(template);
	
	console.log(data);
	Handlebars.registerHelper("commentImagess",function(commentImages){
		if(commentImages.length>0){
			return `<div class="thumb_area">
                       <a href="#" class="thumb" title="이미지 크게 보기"> <img width="90" height="90" class="img_vertical_top" src="http://localhost:8080/reserproject/reservation.v1.5/${commentImages[0].saveFileName}" alt="리뷰이미지"> </a> <span class="img_count" style="display:none;">1</span></div>
					<h4 class="resoc_name"></h4>`;
		}else{
			return `<h4 class="resoc_name no_img"></h4>`;
		}
	});
	var html=bindTemplate(data);

	var list_short_review=document.querySelector('.list_short_review');
	
	///review 
	/*
	var list_short_reviews=document.querySelector('.list_short_reviews');
	list_short_reviews.innerHTML=html;
	
	
	list_short_review.innerHTML=html;
	
	var liList=document.querySelectorAll('.list_item');
	if(liList.length>3){
		for(var i=3;i<liList.length;i++){
			liList[i].style.display='none';
		}
	}else{
		var button=document.querySelector('.btn_review_more');
			button.style.display='none';
	}
}
*/


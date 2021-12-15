/**
 * 
 */
function getDetail(){
		const parsedUrl = new URL(window.location.href);
		var displayId=parsedUrl.searchParams.get("id");
		
		//console.log(displayId);
		  var oReq = new XMLHttpRequest();
		            oReq.open("GET", "http://localhost:8080/reserproject/api/displayinfo/"+displayId);
		            oReq.responseType='json';
		            oReq.send();
		            oReq.addEventListener("load", function () {
		                var data = oReq.response;
						var path=parsUrl();
						if(path==='detail'){
							var header=new Header();
							var getMiddleText=new GetMiddleText();
							var getComment=new GetComment();
							var getFootSection=new GetFootSection();
							
							header.getHeaderImageSlide(data);
							getMiddleText.text(data);
							getComment.comment(data);
							getComment.commentTemplate(data);
							/////why url ?? 나중에 확인
							getFootSection.moreInformation(data);
							getFootSection.comeWhere(data);
						}else if(path==='review'){
							var getComment=new GetComment();
							getComment.comment(data);
							getComment.commentTemplate(data);
						}else if(path==='reserve'){
							var getReserveHeader=new GetReserveHeader();
							var getReserveMainSection=new GetReserveMainSection();
							var reserveAction=new ReserveAction();
							console.log(reserveAction);
							getReserveHeader.headSection(data);
							getReserveHeader.headImgSection(data);
							getReserveMainSection.ainSection(data);
							getReserveMainSection.reserSction(data);
						}
		            });
}

function Header(){
	
}
Header.prototype={
	//////////슬라이드 이미지 구현
	 getHeaderImageSlide(data){
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
			this.setCount(count);
			this.moveArrow();
			this.targetArrow();	
	},
	targetArrow(){
	
		var curIndex = 0;///이미지 카운트 세기위한 카운트 생성
		
		var ul = document.querySelector('.visual_img ');
		var lis = document.querySelectorAll('.visual_img .item');
		var count = lis.length;
		var li= ul.firstElementChild;
		var liwidth=parseInt(li.style.width);
		/////사진이 2장이상일 시에만 자연스런 슬라이딩을 위한 복사 이미지 생성
		/////생성후 이벤트 생성
			if(count>1){
				//////사진복사
			    var lastChild = ul.lastElementChild;
				var last =lastChild.cloneNode(true);
			    var firstItemClone = li.cloneNode(true);
			    ul.appendChild(firstItemClone);
				ul.insertBefore(last,ul.firstElementChild);
				ul.style.transform = "translate3d(-" + (liwidth * (curIndex + 1)) + "px, 0px, 0px)";
				//////2장이상 이므로 위에보이는 폼 생성
				this.setNum(curIndex+1);
				this.getImageForm();
				
				//////이벤트생성
				
				var arrow=document.querySelector('.nxt_inn');
				var leftArrow=document.querySelector('.prev_inn');
				leftArrow.addEventListener("click",function(evt){
				if(curIndex===0){
					this.setNum(count);
					this.getImageCount();
					ul.style.transition = '0.2s';
				    ul.style.transform = "translate3d("+ (liwidth*(curIndex))+"px, 0px, 0px)";
					 setTimeout(function(){
				                      ul.style.transition='0s';
				                      ul.style.transform= "translate3d(-" +liwidth*2 + "px, 0px, 0px)";
				                    },201)
							curIndex=1;
		
				}else{
					ul.style.transition = '0.2s';
				    ul.style.transform = "translate3d(-"+ (liwidth*(curIndex))+"px, 0px, 0px)";
					curIndex--;
					this.setNum(curIndex+1);
					this.getImageCount();
				}
				
			}.bind(this));
			arrow.addEventListener("click",function(evt){				
								 if(curIndex === count-1){
								  ul.style.transition = '0.2s';
				            	  ul.style.transform = "translate3d(-"+liwidth*(curIndex+2)+"px, 0px, 0px)";
								  this.setNum(1);
								  this.getImageCount();
								 setTimeout(function(){
				                      ul.style.transition='0s';
				                      ul.style.transform= "translate3d(-" +liwidth + "px, 0px, 0px)";
				                    },201)
									curIndex=0;
									
								}else{
								  ul.style.transition = '0.2s';
				            	  ul.style.transform = "translate3d(-"+liwidth*(curIndex+2)+"px, 0px, 0px)";
								  
							  	  curIndex++;
								  this.setNum(curIndex+1);
								  this.getImageCount();
								}
			}.bind(this));
		}
	},
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
}

///헤더사진 및에 문단 구현
function GetMiddleText(){
	
}
GetMiddleText.prototype={
	///Header의 데이터 받아와 문단 구현
	 text(data){
		var displayInfo=data['displayInfo'];
		var html=`<p class="dsc">${displayInfo.productContent} </p>`
		$('.store_details').append(html);
		this.fullContent();
	},
	fullContent(){
		var open=document.querySelector('._open');
		var close=document.querySelector('._close');
		var fullClass= document.querySelector('.store_details');
		open.addEventListener("click",function(evt){
		    for(var i=0;i<fullClass.classList.length;i++){
		        if(fullClass.classList[i]==='close3'){
		            fullClass.classList.remove('close3');
					open.style.display='none';
					close.style.display='block';
		        }
		     }
	  });
	  	close.addEventListener("click",function(evt){
		fullClass.classList.add('close3');
		close.style.display='none';
		open.style.display='block';
	  });
	}
}

////코멘트 영역 구현 
function GetComment(){
	
}

GetComment.prototype={
	comment(data){
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
			const parsedUrl = new URL(window.location.href);
			var displayId=parsedUrl.searchParams.get("id"); 
			var html=`<a href="detail?id=${displayId}" class="btn_back" title="이전 화면으로 이동"> <i class="fn fn-backward1"></i> </a>
	                        <h2><a class="title" href=${displayInfo.homepage}#">${displayInfo.productDescription}</a></h2>`
			$('.top_title').append(html);
		}
	},
	commentTemplate(data){
		var path=parsUrl();
	
		var comments=data['comments'];
		var displayInfo=data['displayInfo'];
		var count=comments.length;
		
		for(var i=0;i<count;i++){
			var lastEmail=this.changEmail(comments[i].reservationEmail);///이메일 형변환
			var lastTime=this.Unix_timestamp(comments[i].reservationDate);/////날짜 형변환
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
	},
	Unix_timestamp(t){
		t=t.toString();
		t=t.substring(0,10);
		t=parseInt(t);
	    var date = new Date(t*1000);
	    var year = date.getFullYear();
	    var month = "0" + (date.getMonth()+1);
	    var day = "0" + date.getDate();
	    return year + "." + month.substr(-2) + "." + day.substr(-2) ;
	},
	changEmail(email){
				var Sample=email
				var result=Sample.substring(0,4);
				var secure="****";
				var lastResult=result.concat(secure);
				return lastResult;
	}
}


////코멘트 및에있는 상세정보 오시는길 구현
function GetFootSection(){
	this.target();
}
GetFootSection.prototype={
	moreInformation(data){
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
	},
	 comeWhere(data){
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
	},
	target(){
		var tab=document.querySelector('.info_tab_lst');
		tab.addEventListener('click',function(evt){
			if(evt.target.tagName==="LI"){
				var target=evt.target.firstElementChild;
				this.activeClass(target);
				this.hideClass();
			}
			else if(evt.target.tagName==="A"){
				var target=evt.target;
				this.activeClass(target);
				this.hideClass();
			}
			else if(evt.target.tagName=="SPAN"){
				var target=evt.target.parentNode;
				this.activeClass(target);
				this.hideClass();
			}
		}.bind(this));
	},
	//////a태그에 active 클래스 추가
	activeClass(target){
		var removeClass=document.querySelectorAll(".anchor");
		var length= removeClass.length;
		for(var i=0;i<length;i++){
	 		removeClass[i].classList.remove("active");
	    }
		target.classList.add("active");
	},
	hideClass(){
		var name= document.querySelector('.item .active');
		name=name.firstElementChild.innerText;
		if(name==="오시는길"){
			var location=document.querySelector(".detail_location");
			var area=document.querySelector(".detail_area_wrap");
			location.classList.remove('hide');
			area.classList.add('hide');
		}else{
			var location=document.querySelector(".detail_location");
			var area=document.querySelector(".detail_area_wrap");
			location.classList.add('hide');
			area.classList.remove('hide');
		}
	},

}
/////////////리저브
//////////////
/////////리저브 헤더 영역 기능모음
function GetReserveHeader(){
	this.getIdsetUrl();
}
GetReserveHeader.prototype={
	headSection(data){
		var displayInfo=data['displayInfo'];
		var html=`<h2><span class="title">${displayInfo.productDescription}</span></h2>`;
		$('.top_title').append(html);
	},
	headImgSection(data){
		var productImages=data['productImages'];
		var html=`<li class="item" style="width: 414px;"> <img alt="" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${productImages[0].saveFileName}"> <span class="img_bg"></span>
	                                <div class="preview_txt">
	                                    <h2 class="preview_txt_tit"></h2> <em class="preview_txt_dsc">₩12,000 ~ </em><em class="preview_txt_dsc">2017.2.17.(금)~2017.4.18.(화), 잔여티켓 2769매</em> </div>
	                            </li>`;
		$('.visual_img').append(html);
	},
	getIdsetUrl(){
		const parsedUrl = new URL(window.location.href);
		var urlSearch=parsedUrl.searchParams.get("id");
		
		var backHref=document.querySelector('.btn_back');
		backHref.href=`detail?id=${urlSearch}`;
	}
}

////리저브 메인 섹션 기능 구현
function GetReserveMainSection(){
	this.addQut();
}

GetReserveMainSection.prototype={
	ainSection(data){
		var displayInfo=data['displayInfo'];
		var productPrices=data['productPrices'];
		var openingHours=displayInfo.openingHours;
		var period=openingHours.match(/(\d{4}.*([)]|[일])|\d{2}[월].*[)])/);
		if(period===null){
			period="정해져 있는 기간이 없습니다";
		}else{
			period=period[0];
		}
		
		var openTime=openingHours.replace(/(.*\d{4}.*([)]|[일])|\d{2}[월].*[)])/,"");
		openTime=openTime.match(/(\S.*\n.*|\S.*)/);
		if(openTime===null){
			openTime="명시된 관람시간이 없수다";
		}else{
			openTime=openTime[0];
		}
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
	},
	reserSction(data){
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
	},
	////리저브 클릭시 수량상승 
	addQut(){
		var ticketBody=document.querySelector('.ticket_body');
			ticketBody.addEventListener('click',function(evt){
		    var plus= evt.target.classList.length;
		    for(var i=0;i<plus;i++){
		        if(evt.target.classList[i]==='ico_plus3'){
		            var plusticket= evt.target.previousElementSibling;
					var min=plusticket.previousElementSibling;
					min.classList.remove("disabled");
		            ++plusticket.value;
	
					var price=plusticket.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerText;
					var totalViewPrice=plusticket.parentNode.nextElementSibling.firstElementChild;
					var plus=1;
					//console.log(totalViewPrice);
					this.replaceQutPrice(plusticket.value,price,totalViewPrice,plus);
					plusticket.classList.remove("disabled");
		        }else if(evt.target.classList[i]==='ico_minus3'){
					var minticket=evt.target.nextElementSibling;
					if(minticket.value>0){
						--minticket.value;
						var price=minticket.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerText;
						var totalViewPrice=minticket.parentNode.nextElementSibling.firstElementChild;
						var min=-1;
						this.replaceQutPrice(minticket.value,price,totalViewPrice,min);
						if(minticket.value==0){
							minticket.classList.add("disabled");
							evt.target.classList.add("disabled");
						}
					}
				}
		    }
		}.bind(this));
	},
	///토탈금액 변하게하는 함수
	 replaceQutPrice(qut,price,totalView,operator){
		var price=price.toLocaleString().split(",");
		price=price[0]+price[1];
		var resultprice=price*qut;
		resultprice=resultprice.toLocaleString('ko-KR');
		
		var text=`${resultprice}`;
		totalView.innerText=text;
		
		var totalCount=document.querySelector('#totalCount');
		var count =parseInt(totalCount.innerText);
		if(operator==1){
			count+=1;
		}else{
			count-=1;
		}
		var resultTotalCount=`${count}`
		totalCount.innerText=resultTotalCount;
	}
}

///////리저브 클릭시 필요한 함수들

function ReserveAction(){
	this.showTerms();
	this.actionReserve();
}
ReserveAction.prototype={
	///약관 이벤트 걸기
	showTerms(){
		var agreement=document.querySelector('.section_booking_agreement');
		agreement.addEventListener('click',function(evt){
			var className=evt.target.className;
			if(className==='btn_text'){
				var showAgreement=evt.target.parentNode.parentNode;
				this.addClass(showAgreement);
			}else if(className==='btn_agreement'){
				var showAgreement=evt.target.parentNode;
				this.addClass(showAgreement);
			}
		}.bind(this))
	},
	////약관 오픈 클래스 추가 
	addClass(showAgreement){
		if(showAgreement.classList[1]==='open'){
			showAgreement.classList.remove('open');
		}else{
			showAgreement.classList.add('open');
		}
	},
	///체크박스 동의시 예약하기 활성화
	actionReserve(){
		var label=document.querySelector('.chk_txt_label');
		var check;
		label.addEventListener('click',function(){
			var checked=$(chk3).prop("checked");
			var submit=document.querySelector('.bk_btn_wrap');
			var button=document.querySelector('.bk_btn');///예약하기 이벤트 활성화위한
			if(checked===false){
				submit.classList.remove('disable');
				button.addEventListener('click',this.addEvent);//예약이벤트 등록
			}else{
				submit.classList.add('disable');
				check=0;
				button.removeEventListener('click',this.addEvent);//예약이벤트 삭제
			}
		}.bind(this));
	},

	//예약하기 이벤트 등록
	 addEvent(){
			var value=document.querySelectorAll('.count_control_input ');
			var aomunt=document.querySelectorAll('.product_amount');
			var id;
			var html=``;
			const parsedUrl = new URL(window.location.href);
			var displayId=parsedUrl.searchParams.get("id");
			for(var i=0;i<value.length;i++){
				if(value[i].value!=0){
					id=parseInt(aomunt[i].id);
					html+=`<input type="hidden" class="productPriceId" name="productPriceId" value="${id}">
					<input type="hidden" class="count" name="count" value="${value[i].value}">`;
				}
			}
		
			
			var reservationTel=$("#tel").val();
			var reservationEmail=$("#email").val();
			
			var checknumberTel=checkTel(reservationTel);
			var checknumberEmail=checkEmail(reservationEmail);
			if(checknumberTel==1&&checknumberEmail==1){
				html+=`<input type="hidden" id="displayInfoId" name="displayInfoId" value="${displayId}">`;
				$('.form_horizontal').append(html);
				addReserve();
			}else if(checknumberTel==0&&checknumberEmail==0){
				alert("핸드폰 번호와 이메일 형식 둘다 잘못되었습니다");	
			}else if(checknumberTel==0){
				alert("핸드폰 번호 형식이 잘못되었습니다");
			}else if(checknumberEmail==0){
				alert("이메일 형식이 잘못되었습니다")
			}
	},
}

////detail의 id값 가져와넘기기
function getDetailId(){
	const parsedUrl = new URL(window.location.href);
	var search=parsedUrl.search;
	var id=search.split('=')[1];
	window.location.href=`review?id=${id}`;
}
//////Url분석후 넘기기
function parsUrl(){
	const parsedUrl = new URL(window.location.href);
	var pathName=parsedUrl.pathname;
	var path=pathName.split('/');
	//console.log(path[2]);
	return path[2];
}
/////////리저브 넘기는 함수
function clickReserve(){
	var reserve=document.querySelector('.bk_btn');
	reserve.addEventListener("click",function(evt){
	const parsedUrl = new URL(window.location.href);
	var urlSearch=parsedUrl.search;
	var checkId=urlSearch.split('=')[1];
    location.href=`reserve?id=${checkId}`;
	})
}

///핸드폰 번호 이메일 검사 
function checkTel(tel){
		//var checkresult=tel.match(/01[01789]-\d{3,4}-\d{4}/)[0];
		console.log("tle시작");
		var checknumber;
		var checkresult=/01[01789]-\d{3,4}-\d{4}/;
		if(!checkresult.test(tel)){
			//alert("핸드폰 번호가 잘못되었습니다");
			checknumber=0;
			return checknumber;
		}else{
			checknumber=1;
			return checknumber;
		}
}
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
//가격 객체생성
function price(count,productPriceId){
		this.count=count;
		this.productPriceId=productPriceId;
}
function addReserve(){
			////
			var displayInfoId=$("#displayInfoId").val();
			var reservationEmail=$("#email").val();
			var reservationTel=$("#tel").val();
			var reservationName=$("#name").val();
			////
			var reservationInfoPrice=[];
			var count = document.querySelectorAll('.count');
			var productPriceId= document.querySelectorAll('.productPriceId');
			for(var i=0;i<count.length;i++){
				const h=new price(count[i].value,productPriceId[i].value)
				reservationInfoPrice.push(h);
			}
			////
			var data={
				displayInfoId:displayInfoId,
				prices:reservationInfoPrice,
				reservationEmail:reservationEmail,
				reservationName:reservationName,
				reservationTelephone:reservationTel,
			}
			
			$.ajax({
	        url : "http://localhost:8080/reserproject/api/reservations",
			processData:false,
			contentType : "application/json;charset=utf-8",
			headers : {
			    "Accept" : "application/json",
			    "Content-Type" : "application/json;charset=utf-8"
			},
	        type : "post",
			data:JSON.stringify(data),
			dataType:'json',
	        success : function(data) {
			const parsedUrl = new URL(window.location.href);
			var search=parsedUrl.search;
			var id=search.split('=')[1];
			window.location.href=`reserve?id=${id}`;
			
			alert("예약되었습니다.");
	    }
	});
}
////////////
/////////////
/*
function targetArrow(){
	
	var curIndex = 0;///이미지 카운트 세기위한 카운트 생성
	
	var ul = document.querySelector('.visual_img ');
	var lis = document.querySelectorAll('.visual_img .item');
	var count = lis.length;
	var li= ul.firstElementChild;
	var liwidth=parseInt(li.style.width);
	/////사진이 2장이상일 시에만 자연스런 슬라이딩을 위한 복사 이미지 생성
	/////생성후 이벤트 생성
		if(count>1){
			//////사진복사
		    var lastChild = ul.lastElementChild;
			var last =lastChild.cloneNode(true);
		    var firstItemClone = li.cloneNode(true);
		    ul.appendChild(firstItemClone);
			ul.insertBefore(last,ul.firstElementChild);
			ul.style.transform = "translate3d(-" + (liwidth * (curIndex + 1)) + "px, 0px, 0px)";
			//////2장이상 이므로 위에보이는 폼 생성
			CountObj.setNum(curIndex+1);
			CountObj.getImageForm();
			
			//////이벤트생성
			
			var arrow=document.querySelector('.nxt_inn');
			var leftArrow=document.querySelector('.prev_inn');
			leftArrow.addEventListener("click",function(evt){
			if(curIndex===0){
				CountObj.setNum(count);
				CountObj.getImageCount();
				ul.style.transition = '0.2s';
			    ul.style.transform = "translate3d("+ (liwidth*(curIndex))+"px, 0px, 0px)";
				 setTimeout(function(){
			                      ul.style.transition='0s';
			                      ul.style.transform= "translate3d(-" +liwidth*2 + "px, 0px, 0px)";
			                    },201)
						curIndex=1;
	
			}else{
				ul.style.transition = '0.2s';
			    ul.style.transform = "translate3d(-"+ (liwidth*(curIndex))+"px, 0px, 0px)";
				curIndex--;
				CountObj.setNum(curIndex+1);
				CountObj.getImageCount();
			}
			
		});
		arrow.addEventListener("click",function(evt){				
							 if(curIndex === count-1){
							  ul.style.transition = '0.2s';
			            	  ul.style.transform = "translate3d(-"+liwidth*(curIndex+2)+"px, 0px, 0px)";
							  CountObj.setNum(1);
							  CountObj.getImageCount();
							 setTimeout(function(){
			                      ul.style.transition='0s';
			                      ul.style.transform= "translate3d(-" +liwidth + "px, 0px, 0px)";
			                    },201)
								curIndex=0;
								
							}else{
							  ul.style.transition = '0.2s';
			            	  ul.style.transform = "translate3d(-"+liwidth*(curIndex+2)+"px, 0px, 0px)";
							  
						  	  curIndex++;
							  CountObj.setNum(curIndex+1);
							  CountObj.getImageCount();
							}
		});
	}
	/*
	CountObj.setNum(curIndex+1);
	CountObj.getImageCount();
	
}
*/
/*
function fullContent(){
	var open=document.querySelector('._open');
	var close=document.querySelector('._close');
	var fullClass= document.querySelector('.store_details');
	open.addEventListener("click",function(evt){
	    for(var i=0;i<fullClass.classList.length;i++){
	        if(fullClass.classList[i]==='close3'){
	            fullClass.classList.remove('close3');
				open.style.display='none';
				close.style.display='block';
	        }
	     }
  });
  	close.addEventListener("click",function(evt){
	fullClass.classList.add('close3');
	close.style.display='none';
	open.style.display='block';
  });
}
*/


/*
function getDetail(){
	const parsedUrl = new URL(window.location.href);
	var displayId=parsedUrl.searchParams.get("id");
	
	console.log(displayId);

 $.ajax({
        url : "http://localhost:8080/reserproject/api/displayinfo/"+displayId,
        type : "get",
        dataType : "json",
	    contentType: "application/json; charset=utf-8",
        success : function(data) {
		//var getCount=data['productImages'].length;
		////detail 일때만 함수 실행
		var pathName=parsedUrl.pathname;
		var path=pathName.split('/');
		if(path[2]==='detail'){
			//getHeaderImageSlide(data);
			//text(data);
			//targetArrow();



			//comment(data);
			moreInformation(data);
			comeWhere(data);
			//
			comment(data);
			commentTemplate(data);
		}else if(path[2]==='review'){
			comment(data);
			commentTemplate(data);
		}else if(path[2]==='reserve'){
			headSection(data);
			headImgSection(data);
			mainSection(data);
			reserSction(data);
			//
		
		}
		
		//////
	
		//////
		//comment(data)
		//commentTemplate(data);
		
		/////
		//dataUse.setData(data);
		//var dd=dataUse.getData();
		//console.log(dd);
		//getImageCount(getCount);
		//moveArrow(getCount);
		//console.log(data['avgScore']);
        }
    });
}
*/

/*
//////a태그에 active 클래스 추가
function activeClass(target){
	var removeClass=document.querySelectorAll(".anchor");
	var length= removeClass.length;
	for(var i=0;i<length;i++){
 		removeClass[i].classList.remove("active");
    }
	target.classList.add("active");
}

function hideClass(){
	var name= document.querySelector('.item .active');
	name=name.firstElementChild.innerText;
	if(name==="오시는길"){
		var location=document.querySelector(".detail_location");
		var area=document.querySelector(".detail_area_wrap");
		location.classList.remove('hide');
		area.classList.add('hide');
	}else{
		var location=document.querySelector(".detail_location");
		var area=document.querySelector(".detail_area_wrap");
		location.classList.add('hide');
		area.classList.remove('hide');
	}
}

function target(){
	var tab=document.querySelector('.info_tab_lst');
	tab.addEventListener('click',function(evt){
		if(evt.target.tagName==="LI"){
			var target=evt.target.firstElementChild;
			activeClass(target);
			hideClass();
		}
		else if(evt.target.tagName==="A"){
			var target=evt.target;
			activeClass(target);
			hideClass();
		}
		else if(evt.target.tagName=="SPAN"){
			var target=evt.target.parentNode;
			activeClass(target);
			hideClass();
		}
	});
}
*/
/*
////시간변환 
function Unix_timestamp(t){
	t=t.toString();
	t=t.substring(0,10);
	t=parseInt(t);
    var date = new Date(t*1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth()+1);
    var day = "0" + date.getDate();
    return year + "." + month.substr(-2) + "." + day.substr(-2) ;
}
function changEmail(email){
			var Sample=email
			var result=Sample.substring(0,4);
			var secure="****";
			var lastResult=result.concat(secure);
			return lastResult;
}
*/




/*
/////////디테일 경로 만들기
function getIdsetUrl(){
	const parsedUrl = new URL(window.location.href);
	var urlSearch=parsedUrl.searchParams.get("id");
	
	var backHref=document.querySelector('.btn_back');
	backHref.href=`detail?id=${urlSearch}`;
}
*/

/*
function addQut(){
	var ticketBody=document.querySelector('.ticket_body');
		ticketBody.addEventListener('click',function(evt){
	    var plus= evt.target.classList.length;
	    for(var i=0;i<plus;i++){
	        if(evt.target.classList[i]==='ico_plus3'){
	            var plusticket= evt.target.previousElementSibling;
				var min=plusticket.previousElementSibling;
				min.classList.remove("disabled");
	            ++plusticket.value;

				var price=plusticket.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerText;
				var totalViewPrice=plusticket.parentNode.nextElementSibling.firstElementChild;
				var plus=1;
				//console.log(totalViewPrice);
				replaceQutPrice(plusticket.value,price,totalViewPrice,plus);
				plusticket.classList.remove("disabled");
	        }else if(evt.target.classList[i]==='ico_minus3'){
				var minticket=evt.target.nextElementSibling;
				if(minticket.value>0){
					--minticket.value;
					var price=minticket.parentNode.parentNode.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.innerText;
					var totalViewPrice=minticket.parentNode.nextElementSibling.firstElementChild;
					var min=-1;
					replaceQutPrice(minticket.value,price,totalViewPrice,min);
					if(minticket.value==0){
						minticket.classList.add("disabled");
						evt.target.classList.add("disabled");
					}
				}
			}
	    }
	});
}
///토탈금액 변하게하는 함수
function replaceQutPrice(qut,price,totalView,operator){
	var price=price.toLocaleString().split(",");
	price=price[0]+price[1];
	var resultprice=price*qut;
	resultprice=resultprice.toLocaleString('ko-KR');
	
	var html=`<span class="total_price">${resultprice}</span>`;
	totalView.innerHTML=html;
	
	var totalCount=document.querySelector('#totalCount');
	var count =parseInt(totalCount.innerText);
	if(operator==1){
		count+=1;
	}else{
		count-=1;
	}
	
	
	var resultTotalCount=`<span id="totalCount">${count}</span>`
	totalCount.innerHTML=resultTotalCount;
	
	//console.log(resultprice);
	
}
*/
//////////약관보기누를시


/*
function showTerms(){
	var agreement=document.querySelector('.section_booking_agreement');
	agreement.addEventListener('click',function(evt){
		var className=evt.target.className;
		if(className==='btn_text'){
			var showAgreement=evt.target.parentNode.parentNode;
			addClass(showAgreement);
		}else if(className==='btn_agreement'){
			var showAgreement=evt.target.parentNode;
			addClass(showAgreement);
		}
	})
}
////약관 오픈 클래스 추가 
function addClass(showAgreement){
	if(showAgreement.classList[1]==='open'){
		showAgreement.classList.remove('open');
	}else{
		showAgreement.classList.add('open');
	}
}

///체크박스 동의시 예약하기 활성화
function actionReserve(){
	var label=document.querySelector('.chk_txt_label');
	var check;
	label.addEventListener('click',function(){
		var checked=$(chk3).prop("checked");
		var submit=document.querySelector('.bk_btn_wrap');
		var button=document.querySelector('.bk_btn');///예약하기 이벤트 활성화위한
		if(checked===false){
			submit.classList.remove('disable');
			button.addEventListener('click',addEvent);//예약이벤트 등록
		}else{
			submit.classList.add('disable');
			check=0;
			button.removeEventListener('click',addEvent);//예약이벤트 삭제
		}
	});
}
*/
/*
//예약하기 이벤트 등록
	function addEvent(){
			var value=document.querySelectorAll('.count_control_input ');
			var aomunt=document.querySelectorAll('.product_amount');
			var id;
			var html=``;
			const parsedUrl = new URL(window.location.href);
			var displayId=parsedUrl.searchParams.get("id");
			for(var i=0;i<value.length;i++){
				if(value[i].value!=0){
					id=parseInt(aomunt[i].id);
					html+=`<input type="hidden" class="productPriceId" name="productPriceId" value="${id}">
					<input type="hidden" class="count" name="count" value="${value[i].value}">`;
				}
			}
			html+=`<input type="hidden" id="displayInfoId" name="displayInfoId" value="${displayId}">`;
			$('.form_horizontal').append(html);
			
			var reservationTel=$("#tel").val();
			var reservationEmail=$("#email").val();
			
			var checknumberTel=checkTel(reservationTel);
			var checknumberEmail=checkEmail(reservationEmail);
			if(checknumberTel==1&&checknumberEmail==1){
				addReserve();
			}else if(checknumberTel==0&&checknumberEmail==0){
				alert("핸드폰 번호와 이메일 형식 둘다 잘못되었습니다");	
			}else if(checknumberTel==0){
				alert("핸드폰 번호 형식이 잘못되었습니다");
			}else if(checknumberEmail==0){
				alert("이메일 형식이 잘못되었습니다")
			}
			
	}
	
///////예매하기
/*
function addReserves(){
	var form =document.querySelector('form');
	form.submit();
}


//가격 객체생성
function price(count,productPriceId){
	this.count=count;
	this.productPriceId=productPriceId;
}
///핸드폰 번호 이메일 검사 
function checkTel(tel){
	//var checkresult=tel.match(/01[01789]-\d{3,4}-\d{4}/)[0];
	var checknumber;
	var checkresult=/01[01789]-\d{3,4}-\d{4}/;
	if(!checkresult.test(tel)){
		//alert("핸드폰 번호가 잘못되었습니다");
		checknumber=0;
		return checknumber;
	}else{
		checknumber=1;
		return checknumber;
	}
}
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
////
function addReserve(){
		var queryString = $('.form_horizontal').serialize();
		////
		var displayInfoId=$("#displayInfoId").val();
		var reservationEmail=$("#email").val();
		var reservationTel=$("#tel").val();
		var reservationName=$("#name").val();
		////
		var reservationInfoPrice=[];
		var count = document.querySelectorAll('.count');
		var productPriceId= document.querySelectorAll('.productPriceId');
		for(var i=0;i<count.length;i++){
			const h=new price(count[i].value,productPriceId[i].value)
			reservationInfoPrice.push(h);
			//reservationInfoPrice.push(price(count[i].value,productPriceId[i].value));
			//console.log(reservationInfoPrice[i]);
		}
		//console.log(reservationInfoPrice[0].price);
		////
		var data={
			displayInfoId:displayInfoId,
			prices:reservationInfoPrice,
			reservationEmail:reservationEmail,
			reservationName:reservationName,
			reservationTelephone:reservationTel,
		}
		//console.log(data);
		//console.log(queryString);
		$.ajax({
	        url : "http://localhost:8080/reserproject/api/reservations",
			processData:false,
			contentType : "application/json;charset=utf-8",
			headers : {
			    "Accept" : "application/json",
			    "Content-Type" : "application/json;charset=utf-8"
			},
	        type : "post",
			data:JSON.stringify(data),
			dataType:'json',
	        success : function(data) {
			const parsedUrl = new URL(window.location.href);
			var search=parsedUrl.search;
			var id=search.split('=')[1];
			window.location.href=`reserve?id=${id}`;
			
			alert("예약되었습니다.");
	    }
	});
}
*/

////////////myreservation
///////////

document.addEventListener("DOMContentLoaded",function(){
	///////detail 일때만 함수 실행
	//var path=parsUrl();
	getDetail();
	/*
		if(path==='detail'){
			/*
			fullContent();
			target();
			hideClass();
			clickReserve();
			
		}else if(path==='reserve'){
			addQut();
			showTerms();
			actionReserve();
			//getIdsetUrl();
		}*/
});

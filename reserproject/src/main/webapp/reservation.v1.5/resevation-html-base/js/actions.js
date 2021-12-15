/**
 * 
 */

/////무한 슬라이딩 구형
	function Head(){
		this.getInfo();
	}
	
	Head.prototype={
			getInfo(){
			    var oReq = new XMLHttpRequest();
	            oReq.open("GET", "http://localhost:8080/reserproject/api/promotions");
	            oReq.responseType='json';
	            oReq.send();
	            oReq.addEventListener("load", function () {
	                var data = oReq.response;
	                this.templates(data);
	            }.bind(this));
			},
			 templates(item){
				var html='';
				var item =item['item'];
				console.log(item);
				
				for(var i=0;i<item.length;i++){
					html+=`<li class="item its"style=width:414px>
			       <a href="detail?id=${item[i].productId}" class="item_book">
			           <div class="item_preview">
			               <img alt="" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${item[i].productImageUrl}">
			               <span class="img_border">asdfasdg</span>
			           </div>
			           <div class="event_txt">
			               <h4 class="event_txt_tit"> <span></span> <small class="sm"></small> </h4>
			               <p class="event_txt_dsc"></p>
			           </div>
			       </a>
			   </li> `;
				}
			$('.visual_img').append(html);
			this.move();
			},
		  move(){
			 var ul = document.querySelector('.uls');
			 var lis = document.querySelectorAll('.its');
			 var count = lis.length;
			
			 var li= document.querySelector(".its");
			 var firstItemClone = li.cloneNode(true);
			
			 ul.appendChild(firstItemClone);
			 var liwidth=li.style.width;
			 var parseWidth=parseInt(liwidth);
		     var curIndex = 0;
		
		     setInterval(function(){
		        ul.style.transition = '0.2s';
		        ul.style.transform = "translate3d(-"+parseWidth*(curIndex+1)+"px, 0px, 0px)";
		
		        curIndex++;
		
		    	if(curIndex === count){
		       		setTimeout(function(){
		            	ul.style.transition='0s';
		                ul.style.transform="translate3d(0px,0px,0px)";
		                    },201)
		                    curIndex=0;
		       			}
			},3000);
		}
			
	}
	
	
		//////// 리스트 목록 출력
	function Tab(){
		this.GetCountAndAcitve();
	}	
	
	Tab.prototype={
		GetCountAndAcitve(){
			var tab=document.querySelector(".tab_lst_min");
			tab.addEventListener("click",function(evt){
				if(evt.target.tagName==="SPAN"){
					var name=evt.target;
					var datas= name.parentNode;
					var data=datas.parentNode.dataset.category;
					this.active(datas);
					more.moreList(data);
					this.sendAjax("http://localhost:8080/reserproject/api/categories",name.innerText);
				}else if(evt.target.tagName==="A"){
					var datas=evt.target;
					var name=datas.firstElementChild.innerText;
					var data=datas.parentNode.dataset.category;
					this.active(datas);
					more.moreList(data);
					this.sendAjax("http://localhost:8080/reserproject/api/categories",name);
				}else if(evt.target.tagName==="LI"){
					var datas=evt.target.firstElementChild;
					var name=datas.firstElementChild.innerText;
					var data =evt.target.dataset.category;
					this.active(datas);
					more.moreList(data);
					this.sendAjax("http://localhost:8080/reserproject/api/categories",name);
				}
			}.bind(this));
		},
		sendAjax(url,clickedName){
		    var oReq = new XMLHttpRequest();
            oReq.open("GET", url);
            oReq.responseType='json';
            oReq.send();
            oReq.addEventListener("load", function () {
                var data = oReq.response;
                this.makeTemplate(data, clickedName);
            }.bind(this));
		},
		makeTemplate(data, clickedName) {
        	var hh=data['items'];
           	var html = document.getElementById("tabcontent").innerHTML;
            var resultHTML = "";
			
            for (var i = 0; i < hh.length; i++) {
                if (hh[i].name === clickedName) {
                   	resultHTML = html.replace("{name}", hh[i].name)
                        .replace("{count}", hh[i].count);
                  		  break;
					
				}else if(clickedName==="전체리스트"){
					resultHTML=html.replace("{count}","59");
					break;
				}
            }
            document.querySelector(".event_lst_txt").innerHTML = resultHTML;
        },
		active(datas){
			var li=document.querySelectorAll(".anchor");
			if(datas==null){
				for(var i=0 ;i<li.length;i++){
							if(li[i].classList[1]=="active"){
								var name= li[i].firstElementChild.innerText;
								sendAjax("http://localhost:8080/reserproject/api/categories",name);
							}
						}
				}else if(datas!=null){
						for(var i=0 ;i<li.length;i++){
						li[i].classList.remove("active");
					} 
						datas.classList.add('active');
				}	
		}
	}


//////////더보기 구현

function More(){
	this. moreList();
}
More.prototype={
	 moreList(cgData) {
		var categoryId;
		var cgData=cgData;
		//마지막 리스트 번호를 알아내기 위해서 tr태그의 length를 구함.
		var start=document.querySelectorAll(".lst_event_box li").length;
		///사라진 더보기 버튼 구현 
		var tag=document.querySelector(".more");
		if(cgData!=null&&tag==null){
			$('.wrap_event_box').append(` <div class="more">
	                         <button class="btn" onclick="more.moreList();"><span>더보기</span></button>
	                	 </div>`);
			}
		///처음 시작점 category id 확인 		
		if(cgData==null){
				var li=document.querySelectorAll(".anchor");
				for(var i=0 ;i<li.length;i++){
					if(li[i].classList[1]=="active"){
						categoryId= li[i].parentNode.dataset.category;
						}
					}	
		}else{
			categoryId=cgData;
			///카테고리 클릭시 템플릿 교체
			console.log("cgData 발생"+cgData);
			$(".lst_event_box").first().children('li').remove();
			$(".lst_event_box").last().children('li').remove();
			//start 값 0으로 설정
			start=0;
		}
			
		if(start>=4){
			start=start/4;
			start=start*4;
		}else{
			///처음 시작 스타트값 0 보내서 백엔드 0~3 번째 데이터생성
			start=0;
		}
		
		console.log("categoryId",categoryId); //콘솔로그로 categoryId 값확인
	    console.log("start", start); //콘솔로그로 start에 값이 들어오는지 확인
	 	    var oReq = new XMLHttpRequest();
            oReq.open("GET", "http://localhost:8080/reserproject/api/displayinfos?start="+start+"&categoryId="+categoryId);
            oReq.responseType='json';
            oReq.send();
            oReq.addEventListener("load", function () {
				var data=oReq.response;
                var product=data['products'];	
				//////받아온 데이터 더이상 없을때 버튼 삭제
	            if(product.length < 4){
	                $(".more").remove();   // 더보기 버튼을 div 클래스로 줘야 할 수도 있음
	            }	
					///ul 왼쪽
	           		for(var i=0; i<product.length;i=i+2) {
						var left=this.getSectionLiTemplate(data,i);
						$(".lst_event_box").first().append(left);
	                }
					
					///ul 오른쪽
	 				 for(var i=1; i<product.length;i=i+2) {
						var right=this.getSectionLiTemplate(data,i);
						$(".lst_event_box").last().append(right);
					}
	        }.bind(this));
	},
	getSectionLiTemplate(data,i){
		 var product=data['products'];
		 var html="";
		 	html=html+` <li class="item">
	                            <a href="detail?id=${product[i].displayInfoId}" class="item_book">
	                                <div class="item_preview"> <img alt="${product[i].productDescription}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${product[i].productImageUrl}"><span class="img_border"></span> </div>
	                                <div class="event_txt">
	                                    <h4 class="event_txt_tit"> <span>${product[i].productDescription}</span> <small class="sm">${product[i].placeName}</small> </h4>
	                                    <p class="event_txt_dsc">${product[i].productContent}
	                                    </p>
	                                </div>
	                            </a>
	                        </li>`;
			return html;
	}
}
	var head= new Head();
	var tab= new Tab();
	var more=new More();
	
	
/*	
function moreList(cgData) {
		var categoryId;
		var cgData=cgData;
		//마지막 리스트 번호를 알아내기 위해서 tr태그의 length를 구함.
		var start=document.querySelectorAll(".lst_event_box li").length;
		///사라진 더보기 버튼 구현 
		var tag=document.querySelector(".more");
		if(cgData!=null&&tag==null){
			$('.wrap_event_box').append(` <div class="more">
	                         <button class="btn" onclick="moreList();"><span>더보기</span></button>
	                	 </div>`);
			}
		///처음 시작점 category id 확인 		
		if(cgData==null){
				var li=document.querySelectorAll(".anchor");
				for(var i=0 ;i<li.length;i++){
					if(li[i].classList[1]=="active"){
						categoryId= li[i].parentNode.dataset.category;
						}
					}	
		}else{
			categoryId=cgData;
			///카테고리 클릭시 템플릿 교체
			console.log("cgData 발생"+cgData);
			$(".lst_event_box").first().children('li').remove();
			$(".lst_event_box").last().children('li').remove();
			//start 값 0으로 설정
			start=0;
		}
			
		if(start>=4){
			start=start/4;
			start=start*4;
		}else{
			///처음 시작 스타트값 0 보내서 백엔드 0~3 번째 데이터생성
			start=0;
		}
		
		console.log("categoryId",categoryId); //콘솔로그로 categoryId 값확인
	    console.log("start", start); //콘솔로그로 start에 값이 들어오는지 확인
	 
	     $.ajax({
	        url : "http://localhost:8080/reserproject/api/displayinfos",
	        type : "get",
	        dataType : "json",
	        data : {"start":start,
					"categoryId":categoryId
					},
		    contentType: "application/json; charset=utf-8",
	        success : function(data) {
				var product=data['products'];	
				//////받아온 데이터 더이상 없을때 버튼 삭제
	            if(product.length < 4){
	                $(".more").remove();   // 더보기 버튼을 div 클래스로 줘야 할 수도 있음
	            }	
					///ul 왼쪽
	           		for(var i=0; i<product.length;i=i+2) {
						var left=getSectionLiTemplate(data,i);
						$(".lst_event_box").first().append(left);
	                }
					
					///ul 오른쪽
	 				 for(var i=1; i<product.length;i=i+2) {
						var right=getSectionLiTemplate(data,i);
						$(".lst_event_box").last().append(right);
					}
	        }
	    })
	}
function getSectionLiTemplate(data,i){
		 var product=data['products'];
		 var html="";
		 	html=html+` <li class="item">
	                            <a href="detail?id=${product[i].displayInfoId}" class="item_book">
	                                <div class="item_preview"> <img alt="${product[i].productDescription}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${product[i].productImageUrl}"><span class="img_border"></span> </div>
	                                <div class="event_txt">
	                                    <h4 class="event_txt_tit"> <span>${product[i].productDescription}</span> <small class="sm">${product[i].placeName}</small> </h4>
	                                    <p class="event_txt_dsc">${product[i].productContent}
	                                    </p>
	                                </div>
	                            </a>
	                        </li>`;
			return html;
	}
	
	var head= new Head();
	var tab= new Tab();
	document.addEventListener("DOMContentLoaded",function(){
           moreList();
          });	
*/
/*
	function moreList(cgData) {
		var categoryId;
		var cgData=cgData;
		//마지막 리스트 번호를 알아내기 위해서 tr태그의 length를 구함.
		var start=document.querySelectorAll(".lst_event_box li").length;
		///사라진 더보기 버튼 구현 
		var tag=document.querySelector(".more");
		if(cgData!=null&&tag==null){
			$('.wrap_event_box').append(` <div class="more">
	                         <button class="btn" onclick="moreList();"><span>더보기</span></button>
	                	 </div>`);
			}
		///처음 시작점 category id 확인 		
		if(cgData==null){
				var li=document.querySelectorAll(".anchor");
				for(var i=0 ;i<li.length;i++){
					if(li[i].classList[1]=="active"){
						categoryId= li[i].parentNode.dataset.category;
						}
					}	
		}else{
			categoryId=cgData;
			///카테고리 클릭시 템플릿 교체
			console.log("cgData 발생"+cgData);
			$(".lst_event_box").first().children('li').remove();
			$(".lst_event_box").last().children('li').remove();
			//start 값 0으로 설정
			start=0;
		}
			
		if(start>=4){
			start=start/4;
			start=start*4;
		}else{
			///처음 시작 스타트값 0 보내서 백엔드 0~3 번째 데이터생성
			start=0;
		}
		
		console.log("categoryId",categoryId); //콘솔로그로 categoryId 값확인
	    console.log("start", start); //콘솔로그로 start에 값이 들어오는지 확인
	 	    var oReq = new XMLHttpRequest();
            oReq.open("GET", "http://localhost:8080/reserproject/api/displayinfos?start="+start+"&categoryId="+categoryId);
            oReq.responseType='json';
            oReq.send();
            oReq.addEventListener("load", function () {
                var product=data['products'];	
				//////받아온 데이터 더이상 없을때 버튼 삭제
	            if(product.length < 4){
	                $(".more").remove();   // 더보기 버튼을 div 클래스로 줘야 할 수도 있음
	            }	
					///ul 왼쪽
	           		for(var i=0; i<product.length;i=i+2) {
						var left=this.getSectionLiTemplate(data,i);
						$(".lst_event_box").first().append(left);
	                }
					
					///ul 오른쪽
	 				 for(var i=1; i<product.length;i=i+2) {
						var right=this.getSectionLiTemplate(data,i);
						$(".lst_event_box").last().append(right);
					}
	        }.bind(this));
            


	}
	
*/
/*
function moreList(cgData) {
	var categoryId;
	var cgData=cgData;
	//마지막 리스트 번호를 알아내기 위해서 tr태그의 length를 구함.
	var start=document.querySelectorAll(".lst_event_box li").length;
	///사라진 더보기 버튼 구현 
	var tag=document.querySelector(".more");
	if(cgData!=null&&tag==null){
		$('.wrap_event_box').append(` <div class="more">
                         <button class="btn" onclick="moreList();"><span>더보기</span></button>
                	 </div>`);
		}
	///처음 시작점 category id 확인 		
	if(cgData==null){
			var li=document.querySelectorAll(".anchor");
			for(var i=0 ;i<li.length;i++){
				if(li[i].classList[1]=="active"){
					categoryId= li[i].parentNode.dataset.category;
					}
				}	
	}else{
		categoryId=cgData;
		///카테고리 클릭시 템플릿 교체
		console.log("cgData 발생"+cgData);
		$(".lst_event_box").first().children('li').remove();
		$(".lst_event_box").last().children('li').remove();
		//start 값 0으로 설정
		start=0;
	}
		
	if(start>=4){
		start=start/4;
		start=start*4;
	}else{
		///처음 시작 스타트값 0 보내서 백엔드 0~3 번째 데이터생성
		start=0;
	}
	
	console.log("categoryId",categoryId); //콘솔로그로 categoryId 값확인
    console.log("start", start); //콘솔로그로 start에 값이 들어오는지 확인
 
     $.ajax({
        url : "http://localhost:8080/reserproject/api/displayinfos",
        type : "get",
        dataType : "json",
        data : {"start":start,
				"categoryId":categoryId
				},
	    contentType: "application/json; charset=utf-8",
        success : function(data) {
			var product=data['products'];	
			//////받아온 데이터 더이상 없을때 버튼 삭제
            if(product.length < 4){
                $(".more").remove();   // 더보기 버튼을 div 클래스로 줘야 할 수도 있음
            }	
				///ul 왼쪽
           		for(var i=0; i<product.length;i=i+2) {
					var left=getSectionLiTemplate(data,i);
					$(".lst_event_box").first().append(left);
                }
				
				///ul 오른쪽
 				 for(var i=1; i<product.length;i=i+2) {
					var right=getSectionLiTemplate(data,i);
					$(".lst_event_box").last().append(right);
				}
        }
    });

	function getSectionLiTemplate(data,i){
	 var product=data['products'];
	 var html="";
	 	html=html+` <li class="item">
                            <a href="detail?id=${product[i].displayInfoId}" class="item_book">
                                <div class="item_preview"> <img alt="${product[i].productDescription}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${product[i].productImageUrl}"><span class="img_border"></span> </div>
                                <div class="event_txt">
                                    <h4 class="event_txt_tit"> <span>${product[i].productDescription}</span> <small class="sm">${product[i].placeName}</small> </h4>
                                    <p class="event_txt_dsc">${product[i].productContent}
                                    </p>
                                </div>
                            </a>
                        </li>`;
		return html;
}

}
*/
///////웹 구동과 동시에 함수 실행
////////////////



////////////////////
////////////////////////
/////////////////////////
///////////////////////하는중
/*
/////무한 슬라이딩 구형
			
		          function move(){
					  var ul = document.querySelector('.uls');
			          var lis = document.querySelectorAll('.its');
			          var count = lis.length;
			
			          var li= document.querySelector(".its");
			          var firstItemClone = li.cloneNode(true);
			          ul.appendChild(firstItemClone);
			          var liwidth=li.style.width;
		              var curIndex = 0;
		
		              setInterval(function(){
		                  ul.style.transition = '0.2s';
		                  ul.style.transform = "translate3d(-"+414*(curIndex+1)+"px, 0px, 0px)";
		
		                  curIndex++;
		
		                  if(curIndex === count){
		                    setTimeout(function(){
		                      ul.style.transition='0s';
		                      ul.style.transform="translate3d(0px,0px,0px)";
		                    },201)
		                    curIndex=0;
		                  }
		              },3000);
		          }
		//////// 리스트 목록 출력
	function sendAjax(url,clickedName){
		  var oReq = new XMLHttpRequest();
            oReq.open("GET", url);
            oReq.responseType='json';
            oReq.send();
            oReq.addEventListener("load", function () {
                var data = oReq.response;
                makeTemplate(data, clickedName);
            });
		}
		/////////// 구동동시에 active 요소 파악 클릭시 active 클래스 생성 정보 넘기기 
		function active(datas){
			var li=document.querySelectorAll(".anchor");
			if(datas==null){
				for(var i=0 ;i<li.length;i++){
							if(li[i].classList[1]=="active"){
								var name= li[i].firstElementChild.innerText;
								sendAjax("http://localhost:8080/reserproject/api/categories",name);
							}
						}
				}else if(datas!=null){
						for(var i=0 ;i<li.length;i++){
						li[i].classList.remove("active");
				} 
						datas.classList.add('active');
				}		
		}

///////////리스트목록 count 와 active 클래스 
	function GetCountAndAcitve(){
		var tab=document.querySelector(".tab_lst_min");
		tab.addEventListener("click",function(evt){
			if(evt.target.tagName==="SPAN"){
				var name=evt.target;
				var datas= name.parentNode;
				var data=datas.parentNode.dataset.category;
				active(datas);
				moreList(data);
				sendAjax("http://localhost:8080/reserproject/api/categories",name.innerText);
			}else if(evt.target.tagName==="A"){
				var datas=evt.target;
				var name=datas.firstElementChild.innerText;
				var data=datas.parentNode.dataset.category;
				active(datas);
				moreList(data);
				sendAjax("http://localhost:8080/reserproject/api/categories",name);
			}else if(evt.target.tagName==="LI"){
				var datas=evt.target.firstElementChild;
				var name=datas.firstElementChild.innerText;
				var data =evt.target.dataset.category;
				active(datas);
				moreList(data);
				sendAjax("http://localhost:8080/reserproject/api/categories",name);
			}
		});
	}
	

//////////더보기 구현

function moreList(cgData) {
	var categoryId;
	var cgData=cgData;
	//마지막 리스트 번호를 알아내기 위해서 tr태그의 length를 구함.
	var start=document.querySelectorAll(".lst_event_box li").length;
	///사라진 더보기 버튼 구현 
	var tag=document.querySelector(".more");
	if(cgData!=null&&tag==null){
		$('.wrap_event_box').append(` <div class="more">
                         <button class="btn" onclick="moreList();"><span>더보기</span></button>
                	 </div>`);
		}
	///처음 시작점 category id 확인 		
	if(cgData==null){
			var li=document.querySelectorAll(".anchor");
			for(var i=0 ;i<li.length;i++){
				if(li[i].classList[1]=="active"){
					categoryId= li[i].parentNode.dataset.category;
					}
				}	
	}else{
		categoryId=cgData;
		///카테고리 클릭시 템플릿 교체
		console.log("cgData 발생"+cgData);
		$(".lst_event_box").first().children('li').remove();
		$(".lst_event_box").last().children('li').remove();
		//start 값 0으로 설정
		start=0;
	}
		
	if(start>=4){
		start=start/4;
		start=start*4;
	}else{
		///처음 시작 스타트값 0 보내서 백엔드 0~3 번째 데이터생성
		start=0;
	}
	
	console.log("categoryId",categoryId); //콘솔로그로 categoryId 값확인
    console.log("start", start); //콘솔로그로 start에 값이 들어오는지 확인
 
     $.ajax({
        url : "http://localhost:8080/reserproject/api/displayinfos",
        type : "get",
        dataType : "json",
        data : {"start":start,
				"categoryId":categoryId
				},
	    contentType: "application/json; charset=utf-8",
        success : function(data) {
			var product=data['products'];	
			//////받아온 데이터 더이상 없을때 버튼 삭제
            if(product.length < 4){
                $(".more").remove();   // 더보기 버튼을 div 클래스로 줘야 할 수도 있음
            }	
				///ul 왼쪽
           		for(var i=0; i<product.length;i=i+2) {
					var left=getSectionLiTemplate(data,i);
					$(".lst_event_box").first().append(left);
                }
				
				///ul 오른쪽
 				 for(var i=1; i<product.length;i=i+2) {
					var right=getSectionLiTemplate(data,i);
					$(".lst_event_box").last().append(right);
				}
        }
    });
}

///////웹 구동과 동시에 함수 실행
////////////////
*/
/*
document.addEventListener("DOMContentLoaded",function(){
            moreList();
 			active();
		 	move();
			GetCountAndAcitve();
          });
*/

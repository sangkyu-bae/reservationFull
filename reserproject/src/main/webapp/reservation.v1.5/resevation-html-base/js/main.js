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





///////////////main,index jsp 필요 스크립트
/*
function templates(id,description,placeName,content,saveFileName){
  var html=`<li class="item its"style=width:414px>
        <a href="detail.html?id=${id}" class="item_book">
            <div class="item_preview">
                <img alt="${description}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${saveFileName}">
                <span class="img_border">asdfasdg</span>
            </div>
            <div class="event_txt">
                <h4 class="event_txt_tit"> <span>${description}</span> <small class="sm">${placeName}</small> </h4>
                <p class="event_txt_dsc">${content}</p>
            </div>
        </a>
    </li> `;
  document.write(html);
}

function makeTemplate(data, clickedName) {
        	var hh=data['items'];
           	var html = document.getElementById("tabcontent").innerHTML;
			 
            var resultHTML = "";
			
            for (var i = 0; i < hh.length; i++) {
                if (hh[i].name === clickedName) {
                   	resultHTML = html.replace("{name}", hh[i].name)
                        .replace("{count}", hh[i].count);
                  		  break;
					
				}else if(clickedName==="전체리스트"){
					resultHTML=html.replace("{name}","전체리스트")
					.replace("{count}","59");
					break;
				}
            }
            document.querySelector(".event_lst_txt").innerHTML = resultHTML;
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
*/
//////////////////////////////////////////하는중
///////////////////////////////////////
/*
function itemRightLiTemplate(data,i){
		var product=data['products'];
	 	var html="";
	 	html=html+` <li class="item">
                            <a href="detail.html" class="item_book">
                                <div class="item_preview"> <img alt="${product[i].productDescription}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${product[i].productImageUrl}"><span class="img_border"></span> </div>
                                <div class="event_txt">
                                    <h4 class="event_txt_tit"> <span>${product[i].productDescription}</span> <small class="sm">${product[i].placeName}</small> </h4>
                                    <p class="event_txt_dsc">${product[i].productContent}
                                    </p>
                                </div>
                            </a>
                        </li>`;
		 $(".lst_event_box").last().append(html);
}
*/
/*
function itemLiTemplate(productDescription,productImageUrl,placeName,productContent){
	 var html="";
	 html=html+` <li class="item">
                            <a href="detail.html" class="item_book">
                                <div class="item_preview"> <img alt="${productDescription}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${productImageUrl}"><span class="img_border"></span> </div>
                                <div class="event_txt">
                                    <h4 class="event_txt_tit"> <span>${productDescription}</span> <small class="sm">${placeName}</small> </h4>
                                    <p class="event_txt_dsc">${productContent}
                                    </p>
                                </div>
                            </a>
                        </li>`;
		 $(".lst_event_box").first().append(html);
}
*/

////////페이징 구현
/*
	function paging(data){
		var btn=document.querySelector(".btn");
		var a=0;
			btn.addEventListener("click",function(e){
				
				var b=data[a];
				console.log(data[a]);
				a++;
		//document.location='index?limit='+`${b}`;
	});
	}*/
	/*
var btn=document.querySelector(".btn");
btn.addEventListener("click",function(e){
				
				var b=data[a];
				console.log(data[a]);
				a++;
		//document.location='index?limit='+`${b}`;
	});
	*/
	/*
		function paging(){
		var btn=document.querySelector(".btn");
		var a= document.querySelectorAll(".wrap_event_box .item").length;
		console.log(a);
			btn.addEventListener("click",function(e){
			//	a++;
			//	var b=a*4
			//	console.log(b);
			if(a>4){
				a=a/4;
				a++;
				a=a*4;
			}else{
				a=a*2;
			}
			
			console.log(a);
		location.href='index?limit='+`${a}`;
	});
	}
document.addEventListener("DOMContentLoaded",function(){
            paging()
          });*/

/*
function lfteProductTemaplate(description,saveFileName,placeName,content){
	var html=` <li class="item">
                            <a href="detail.html" class="item_book">
                                <div class="item_preview"> <img alt="${description}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${saveFileName}"><span class="img_border"></span> </div>
                                <div class="event_txt">
                                    <h4 class="event_txt_tit"> <span>${description}</span> <small class="sm">${placeName}</small> </h4>
                                    <p class="event_txt_dsc">${content}
                                    </p>
                                </div>
                            </a>
                        </li>`;
 
	document.write(html);
}
function rightProductTemplate(description,saveFileName,placeName,content){
	var html=`       <li class="item">
                            <a href="detail.html" class="item_book">
                                <div class="item_preview"> <img alt="${description}" class="img_thumb" src="http://localhost:8080/reserproject/reservation.v1.5/${saveFileName}"><span class="img_border"></span> </div>
                                <div class="event_txt">
                                    <h4 class="event_txt_tit"> <span>${description}</span> <small class="sm">${placeName}</small> </h4>
                                    <p class="event_txt_dsc">${content}
                                    </p>
                                </div>
                            </a>
                        </li>`
	document.write(html);
}
function countTemplate(count){
	var html=`<p class="event_lst_txt">바로 예매 가능한 행사가 <span class="pink">${count}개</span> 있습니다</p>`;
	 document.write(html);
}

*/
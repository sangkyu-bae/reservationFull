<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>

<ul class="list_short_review">

</ul>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js" integrity="sha512-RNLkV3d+aLtfcpEyFG8jRbnWHxUqVZozacROI4J2F1sTaDqo1dPQYs01OMi1t1w9Y2FdbSCDSQ2ZVdAC8bzgAg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<!--  
	<script type="myTemplate" id="listTemplate">
  <li class="list_item">
                                    <div>
										{{#if comments}}
											{{#each commnets}}
	                                        	<div class="review_area">
													{{#commentImagess commentImages}}
														{{commentImages}}
													{{/commentImagess}}
	                                            	<p class="review">{{comment}}</p>
	                                       		 </div>
	                                        		<div class="info_area">
	                                            		<div class="review_info"> <span class="grade">{{score}}</span> <span class="name">{{reservationEmail}}</span> <span class="date">{{reservationDate}} 방문</span> </div>
	                                       	 	</div>
	                                       	{{/each}}	
										{{else}}
											<div class="review_area">
												<p class="review">등록된 코멘트가 없습니다!</p>
                                       		</div>
										{{/if}}
                                    </div>
   </li>
	</script>
	
	
	<script type="myTemplate" id="listTemplate">
  <li class="list_item">
                                    <div>
                                        <div class="review_area">
											{{#commentImagess commentImages}}
												{{commentImages}}
											{{/commentImagess}}
                                            <p class="review">{{comment}}</p>
                                        </div>
                                        <div class="info_area">
                                            <div class="review_info"> <span class="grade">{{score}}</span> <span class="name">{{reservationEmail}}</span> <span class="date">{{reservationDate}} 방문</span> </div>
                                        </div>
                                    </div>
   </li>
	</script>
	-->
		
	<!--  
	<script type="myTemplate" id="listTemplate">
     
					
						{{#if comments}}
							{{#each comments}}
								 <li class="list_item">
                                    <div>
                                        <div class="review_area">                                 
                                            <h4 class="resoc_name"></h4>
                                            <p class="review">{{comment}}</p>
                                        </div>
                                        <div class="info_area">
                                            <div class="review_info"> <span class="grade">{{score}}</span> <span class="name">{{reservationEmail}}</span> <span class="date">{{reservationDate}} 방문</span> </div>
                                        </div>
                                    </div>
								  </li>
							{{/each}}
						{{else}}
						   <li class="list_item">
							<div class="review_area">                                 
                                            <h4 class="resoc_name"></h4>
                                            <p class="review">코멘트없음</p>
                               </div>
							 </li>
						{{/if}}
        	
	</script>
	-->
	   <!--
		<script type="myTemplate" id="listTemplate">
  <li class="list_item">
                                 {{#count count}}
									{{count}}
								{{/count}}   
   </li>	
	</script>
	-->
	
	<script type="myTemplate" id="listTemplate" type="text/x-handlebars-template">
					 <li class="list_item">
						{{comments.comment}}
						{{#if comments}}								
                                    <div>
                                        <div class="review_area">                                 
                                            <h4 class="resoc_name"></h4>
                                            <p class="review">{{comment}}</p>
                                        </div>
                                        <div class="info_area">
                                            <div class="review_info"> <span class="grade">{{score}}</span> <span class="name">{{reservationEmail}}</span> <span class="date">{{reservationDate}} 방문</span> </div>
                                        </div>
                                    </div>								  
						{{else}}
							<div class="review_area">                                 
                                     <h4 class="resoc_name"></h4>
                                     <p class="review">코멘트없음</p>
                             </div>	
						{{/if}}
					</li>
        	
	</script>

	<script type="text/javascript">
		var template=document.querySelector("#listTemplate").innerText;
		var bindTemplate=Handlebars.compile(template);
	
		var data={
				comments:[
					 {
					      "commentId": 5,
					      "productId": 1,
					      "reservationInfoId": 5,
					      "score": 3,
					      "comment": "지루했어요..",
					      "reservationName": "고아름",
					      "reservationTelephone": "010-0000-0005",
					      "reservationEmail": "goarum@connect.co.kr",
					      "reservationDate": 1632755079000,
					      "createDate": 1632755079000,
					      "modifyDate": 1632755079000,
					      "commentImages": []
					    },
					    {
					      "commentId": 4,
					      "productId": 1,
					      "reservationInfoId": 4,
					      "score": 2,
					      "comment": "가격대비 약간은 실망이었어요.",
					      "reservationName": "도민상",
					      "reservationTelephone": "010-0000-0004",
					      "reservationEmail": "dominsang@connect.co.kr",
					      "reservationDate": 1632755079000,
					      "createDate": 1632755079000,
					      "modifyDate": 1632755079000,
					      "commentImages": []
					    }
			    ]
			};
	
		console.log(data);
		
		Handlebars.registerHelper('lst', function(comments){
			if(comments.length>0){
				for(var i=0;i<comments.length;i++){
					
				}
			}
			
		});
		
		/*
		Handlebars.registerHelper('list',function(item,options){
			for(var i=0;i<item.length;i++){
				
			}
		});
		*/
	
		/*
		if(data.length==0){
			
		}
		*/
		/*
		var resultHTML=data.comments.reduce(function(prev,next){
			return prev + bindTemplate(next);
		},"");
		*/
		
		var html='';
		for(var i=0;i<data.comments.length;i++){
			html+=bindTemplate(data);
		}
		
		console.log(html);
		var list_short_review=document.querySelector('.list_short_review');
		list_short_review.innerHTML=html;
	</script>
	
</body>
</html>
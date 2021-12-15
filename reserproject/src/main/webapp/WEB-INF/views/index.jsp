<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.util.*"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="description" content="네이버 예약, 네이버 예약이 연동된 곳 어디서나 바로 예약하고, 네이버 예약 홈(나의예약)에서 모두 관리할 수 있습니다.">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<title>네이버 예약</title>
<!-- 
<link href="${path}/reservation.v1.5/resevation-html-base/css/bookinglogin.css" rel="stylesheet" >
<link href="${path}/reservation.v1.5/resevation-html-base/css/reservation.css" rel="stylesheet" >
 -->
<link href="${path}/reservation.v1.5/resevation-html-base/style.css" rel="stylesheet" type="text/css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<!-- <script type="text/javascript" src ="${path }/reservation.v1.5/resevation-html-base/js/main.js"></script>-->


<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
</head>
<body>
    <div id="container">
        <div class="header">
            <header class="header_tit">
                <h1 class="logo">
                    <a href="https://m.naver.com/" class="lnk_logo" title="네이버"> <span class="spr_bi ico_n_logo">네이버</span> </a>
                    <a href="./myreservation.html" class="lnk_logo" title="예약"> <span class="spr_bi ico_bk_logo">예약</span> </a>
                </h1>
                <a href="bookinglogin" class="btn_my"> <span class="viewReservation" title="예약확인">예약확인</span> </a>
            </header>
        </div>
        <hr>
        <div class="event">
            <div class="section_visual">
                <div class="group_visual">
                    <div class="container_visual">
                        <div class="prev_e" style="display:none">
                            <div class="prev_inn">
                                <a href="#" class="btn_pre_e" title="이전"> <i class="spr_book_event spr_event_pre">이전</i> </a>
                            </div>
                        </div>
                        <div class="nxt_e" style="display:none">
                            <div class="nxt_inn">
                                <a href="#" class="btn_nxt_e" title="다음"> <i class="spr_book_event spr_event_nxt">다음</i> </a>
                            </div>
                        </div>
                        <div>
                            <div class="container_visual">
                                <!-- 슬라이딩기능: 이미지 (type = 'th')를 순차적으로 노출 -->
                                <ul class="visual_img uls">
                                <!--  
                                 
           						   -->
                                </ul>
                            </div>
                            <span class="nxt_fix" style="display:none"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section_event_tab">
                <ul class="event_tab_lst tab_lst_min">
                    <li class="item" data-category="0">
                        <a class="anchor active"> <span>전체리스트</span> </a>
                    </li>
                    <li class="item" data-category="1">
                        <a class="anchor"> <span>전시</span> </a>
                    </li>
                    <li class="item" data-category="2">
                        <a class="anchor"> <span>뮤지컬</span> </a>
                    </li>
                    <li class="item" data-category="3">
                        <a class="anchor"> <span>콘서트</span> </a>
                    </li>
                    <li class="item" data-category="4">
                        <a class="anchor"> <span>클래식</span> </a>
                    </li>
                    <li class="item" data-category="5">
                        <a class="anchor"> <span>연극</span> </a>
                    </li>
                    <!-- li class="item" data-category="7">
                        <a class="anchor"> <span>클래스</span> </a>
                    </li>
                    <li class="item" data-category="8">
                        <a class="anchor"> <span>체험</span> </a>
                    </li>
                    <li class="item" data-category="9">
                        <a class="anchor last"> <span>키즈</span> </a>
                    </li -->
                </ul>
            </div>
            <div class="section_event_lst">
              
                 <p class="event_lst_txt">바로 예매 가능한 행사가 <span class="pink">59개</span> 있습니다</p>   
                <div class="wrap_event_box">
                    <!-- [D] lst_event_box 가 2컬럼으로 좌우로 나뉨, 더보기를 클릭할때마다 좌우 ul에 li가 추가됨 -->
                    <ul class="lst_event_box">

				  	</ul>
				  	 <ul class="lst_event_box">
				  
				  	</ul>
                    <!-- 더보기 -->
                    <div class="more">
                        <button class="btn" onclick="more.moreList();"><span>더보기</span></button>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="gototop">
            <a href="#" class="lnk_top"> <span class="lnk_top_text">TOP</span> </a>
        </div>
        <div class="footer">
            <p class="dsc_footer">네이버(주)는 통신판매의 당사자가 아니며, 상품의정보, 거래조건, 이용 및 환불 등과 관련한 의무와 책임은 각 회원에게 있습니다.</p>
            <span class="copyright">© NAVER Corp.</span>
        </div>
    </footer>
  <script type="text/javascript" src ="${path }/reservation.v1.5/resevation-html-base/js/actions.js"></script>
  <script id="tabcontent" type="my-template">
 			<p class="event_lst_txt">바로 예매 가능한 행사가 <span class="pink">{count}개</span> 있습니다</p>  
   </script>
   
   <!-- <script type="text/javascript" src ="${path }/reservation.v1.5/resevation-html-base/js/actions.js"></script>-->
</body>
</html>

                    <!--  
   					<c:forEach items ="${products}" step="2" var="list" varStatus="status">
		           	  <script>
		           	lfteProductTemaplate(`${list.productDescription}`,`${list.productImageUrl}`,`${list.placeName}`,`${list.productContent}`);
		           	  </script>
				  	 </c:forEach>
				  	 -->
				  	 	 <!--  
				  	 <c:forEach items ="${products}" begin="1" step="2" var="list" varStatus="status">
				  	  <script>
				  	rightProductTemplate(`${list.productDescription}`,`${list.productImageUrl}`,`${list.placeName}`,`${list.productContent}`);
		           	  </script>
		           	  </c:forEach>
		           	  -->
		           	      <!--  
                     <script type="text/javascript">
                     var data=new Array();
                   	 var path=${path};
                    	<c:forEach  items="${pageStartList}" var ="list">
							data.push(${list});
                   		 </c:forEach>
                   		console.log(data);
                   		paging(data);
                   	</script>
                   	-->
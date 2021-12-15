package kr.or.connect.reserproject.controller;


import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kr.or.connect.reserporject.login.dto.ReservationInfo;
import kr.or.connect.reserporject.login.dto.ReservationInfoPrice;
import kr.or.connect.reserporject.login.dto.ReservationParam;
import kr.or.connect.reserproject.service.MemberService;

@RestController
@RequestMapping(path="/api")
public class MemberApiController {
	@Autowired
	MemberService memberService;
	/*
	///수정필요
	@ApiOperation(value = "예약 등록 하기")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	@PostMapping(path="/reservations")
	public Map<String, Object>addReservations(@RequestBody ReservationInfoPrice reservationInfoPrice,
			@ModelAttribute(name="displayInfoId")Long displayInfoId,
			//@RequestParam(name="reservationDate",required = false)Date reservationDate,
			@ModelAttribute(name="reservationEmail")String reservationEmail,
			@ModelAttribute(name="reservationTel")String reservationTel,
			@ModelAttribute(name="reservationName")String reservationName
		){
		Date reservationDate=new Date();
		Long productId=memberService.getByProductIds(reservationInfoPrice.getProductPriceId());
		//String reservationEmail="기본값임";
		ReservationInfo reservationInfo= memberService.addResrvationAndPrice(reservationInfoPrice, displayInfoId, reservationDate, reservationEmail, reservationTel, reservationName,productId);
		Map<String, Object>map= new HashMap<>();
		map.put("reservationInfo", reservationInfo);
		map.put("ReservationInfoPirce", reservationInfoPrice);
		return map;
	}
	*/
	@ApiOperation(value = "예약 등록 하기")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	@PostMapping(path="/reservations")
	public Map<String, Object>addReservations(@RequestBody ReservationParam reservationParam){
		Date reservationDate=new Date();
		memberService.add(reservationParam, reservationDate);
		Map<String, Object>map=new HashMap<>();
		map.put("reservationParam", reservationParam);
		return map;
	}
	
	
	@ApiOperation(value = "예약 취소 하기")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	@PutMapping(path="reservations/{reservationId}")
	public Map<String, Object>cancelReservation(@PathVariable(name="reservationId")Long reservationId){
		int count =memberService.cancleReserveation(reservationId);
		String message="";
		if(count >0) {
			message="success";
		}else {
			message="falses";
		}
		Map<String,Object >map =new HashMap<>();
		map.put("message", message);
		return map;
	}
	
	@ApiOperation(value = "한줄평 등록 하기")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	@PostMapping(path="reservation/{reservationInfoId}/comments")
	public Map<String, Object>addComment(@PathVariable(name="reservationInfoId") Long reservationInfoId,
			@RequestParam(name="comment") String comment,
			@RequestParam(name="productId")Long productId,
			@RequestParam(name="score")Long score,
			@RequestParam("file")MultipartFile file,
			HttpServletRequest request){
		
		//System.out.println("파일 이름 : " + file.getOriginalFilename());
		//System.out.println("파일 크기 : " + file.getSize());
		//String rootPath ="http://localhost:8080/reserproject/reservation.v1.5/img/"; 
		String rootPath=request.getSession().getServletContext().getRealPath("/");
		String path=rootPath+"/reservation.v1.5/img_map/";
		System.out.println(path);
		  try(
	                // 맥일 경우 
	                //FileOutputStream fos = new FileOutputStream("/tmp/" + file.getOriginalFilename());
	                // 윈도우일 경우
	                FileOutputStream fos = new FileOutputStream(path + file.getOriginalFilename());
	                InputStream is = file.getInputStream();
	        ){
	        	    int readCount = 0;
	        	    byte[] buffer = new byte[1024];
	            while((readCount = is.read(buffer)) != -1){
	                fos.write(buffer,0,readCount);
	            }
	        }catch(Exception ex){
	            throw new RuntimeException("file Save Error");
	        }
		  String fileName=file.getOriginalFilename();
		  String saveFileName="img_map/"+fileName;
		  String contentType=file.getContentType();
		  Map<String, Object>map=memberService.addComment(fileName, saveFileName, contentType, comment, productId, reservationInfoId, score);
		  
		  return map;
	}
}

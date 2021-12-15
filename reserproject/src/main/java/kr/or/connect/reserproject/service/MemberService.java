package kr.or.connect.reserproject.service;



import java.util.Date;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import kr.or.connect.reserporject.login.dto.ReservationInfo;
import kr.or.connect.reserporject.login.dto.ReservationInfoPrice;
import kr.or.connect.reserporject.login.dto.ReservationParam;


public interface MemberService {
	public ReservationInfo addResrvationAndPrice(ReservationInfoPrice price,Long displayInfoId,Date reservationDate,String reservationEmail,String reservationTel,String reservationName,Long productId);
	public int cancleReserveation(Long id);
	public Long getByProductIds(Long productPriceId);
	
	//수정중
	public ReservationInfo addReservationAndPriceS(ReservationInfo reservationInfo,Date reservationDate);
	
	public ReservationParam add(ReservationParam param,Date reservationDate);
	
	public Map<String, Object> addComment(String fileName,String saveFileName,String contentType,String comment,Long productId,Long reservationInfoId,Long score);
}

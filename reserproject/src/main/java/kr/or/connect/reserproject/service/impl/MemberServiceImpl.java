package kr.or.connect.reserproject.service.impl;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import kr.or.connect.reserporject.login.dao.FileInfoDao;
import kr.or.connect.reserporject.login.dao.ReservationInfoDao;
import kr.or.connect.reserporject.login.dao.ReservationInfoPriceDao;
import kr.or.connect.reserporject.login.dao.ReservationUserCommentDao;
import kr.or.connect.reserporject.login.dao.ReservationUserCommentImageDao;
import kr.or.connect.reserporject.login.dto.FileInfo;
import kr.or.connect.reserporject.login.dto.ReservationInfo;
import kr.or.connect.reserporject.login.dto.ReservationInfoPrice;
import kr.or.connect.reserporject.login.dto.ReservationParam;
import kr.or.connect.reserporject.login.dto.ReservationUserComment;
import kr.or.connect.reserporject.login.dto.ReservationUserCommentImage;
import kr.or.connect.reserproject.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService{
	@Autowired 
	ReservationInfoDao reservationInfoDao;
	@Autowired
	ReservationInfoPriceDao reservationInfoPriceDao;
	@Autowired
	ReservationUserCommentDao reservationUserCommentDao;
	@Autowired
	ReservationUserCommentImageDao reservationUserCommentImageDao;
	@Autowired
	FileInfoDao fileInfoDao;
	@Override
	@Transactional(readOnly = false)
	public ReservationInfo addResrvationAndPrice(ReservationInfoPrice price, Long displayInfoId,Date reservationDate,String reservationEmail,String reservationTel,String reservationName,Long productId) {
		ReservationInfo reservationInfo= new ReservationInfo();
		
		reservationInfo.setCancelFlag(0);
		reservationInfo.setCreateDate(new Date());
		reservationInfo.setDisplayInfoId(displayInfoId);
		reservationInfo.setModifyDate(new Date());
		//reservationInfo.setProductId(reservationInfoPriceDao.getByProductIds(price.getProductPriceId()));
		reservationInfo.setProductId(productId);
		reservationInfo.setReservationDate(reservationDate);	
		reservationInfo.setReservationEmail(reservationEmail);
		reservationInfo.setReservationName(reservationName);
		reservationInfo.setReservationTel(reservationTel);
		
		Long reservationInfoId=reservationInfoDao.addReservationInfo(reservationInfo);
		price.setReservationInfoId(reservationInfoId);
		Long priceId=reservationInfoPriceDao.addReservationInfoPrice(price);
		
		return reservationInfo;	
	}

	@Override
	@Transactional(readOnly = false)
	public int cancleReserveation(Long id) {
		int updateCount = reservationInfoDao.updateRervationInfo(id);
		return updateCount;
	}

	@Override
	@Transactional(readOnly = false)
	public Long getByProductIds(Long productPriceId) {
		Long productId=reservationInfoPriceDao.getByProductIds(productPriceId);
		return productId;
	}

	///수정중
	@Override
	@Transactional(readOnly = false)
	public ReservationInfo addReservationAndPriceS(ReservationInfo reservationInfo, Date reservationDate) {
		reservationInfo.setReservationDate(reservationDate);
		
		return reservationInfo;
	}

	
	@Override
	@Transactional(readOnly = false)
	public ReservationParam add(ReservationParam param, Date reservationDate) {
		List<ReservationInfoPrice> list=param.getPrices();
	
		//Long productId
		ReservationInfo reservationInfo = new ReservationInfo();
		reservationInfo.setCancelFlag(0);
		reservationInfo.setCreateDate(new Date());
		reservationInfo.setDisplayInfoId(param.getDisplayInfoId());
		reservationInfo.setModifyDate(new Date());
		reservationInfo.setProductId(reservationInfoPriceDao.getByProductIds(list.get(0).getProductPriceId()));
		reservationInfo.setReservationDate(reservationDate);
		reservationInfo.setReservationEmail(param.getReservationEmail());
		reservationInfo.setReservationName(param.getReservationName());
		reservationInfo.setReservationTel(param.getReservationTelephone());
		
		Long reservationInfoId=reservationInfoDao.addReservationInfo(reservationInfo);
		
		for(ReservationInfoPrice price:list) {
			price.setReservationInfoId(reservationInfoId);
			Long reservationInfopriceId=reservationInfoPriceDao.addReservationInfoPrice(price);
		}
		
		return param;
	}

	@Override
	@Transactional(readOnly = false)
	public Map<String, Object> addComment(String fileName,String saveFileName,String contentType, String comment, Long productId, Long reservationInfoId,
			Long score) {
		ReservationUserComment reservationUserComment=new ReservationUserComment();
		reservationUserComment.setComment(comment);
		reservationUserComment.setProductId(productId);
		reservationUserComment.setReservationInfoId(reservationInfoId);
		reservationUserComment.setScore(score);
		reservationUserComment.setCreateDate(new Date());
		reservationUserComment.setModifyDate(new Date());
		Long reservationUserCommentId=reservationUserCommentDao.addReservationUSerComment(reservationUserComment);
		
		FileInfo fileInfo=new FileInfo();
		fileInfo.setContentType(contentType);
		fileInfo.setCreateDate(new Date());
		fileInfo.setDeleteFlag(0);
		fileInfo.setFileName(saveFileName);
		fileInfo.setModifyDate(new Date());
		fileInfo.setSaveFileName(saveFileName);
		Long fileInfoId=fileInfoDao.addFileInfo(fileInfo);
		
		ReservationUserCommentImage commentImage=new ReservationUserCommentImage();
		commentImage.setFileId(fileInfoId);
		commentImage.setReservationInfoId(reservationInfoId);
		commentImage.setReservationUserCommentId(reservationUserCommentId);
		reservationUserCommentImageDao.addReservationUSerCommentImage(commentImage);
		
		Map<String, Object>map=new HashMap<>();
		map.put("comment", comment);
		map.put("commentId", reservationUserCommentId);
		map.put("commentImage", fileInfo);
		map.put("createDate", new Date());
		map.put("modifyDate", new Date());
		map.put("productId", productId);
		map.put("reservationInfoId", reservationInfoId);
		map.put("score", score);
		return map;
	}

}

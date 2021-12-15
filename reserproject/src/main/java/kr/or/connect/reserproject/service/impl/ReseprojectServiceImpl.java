package kr.or.connect.reserproject.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.reserproject.dao.CategoryDao;
import kr.or.connect.reserproject.dao.ProductDao;
import kr.or.connect.reserproject.dao.DisplayInfoImagesDao;
import kr.or.connect.reserproject.dao.PromotionDao;
import kr.or.connect.reserproject.dao.PromotionsDao;
import kr.or.connect.reserproject.dao.ReservationsDao;
import kr.or.connect.reserproject.dto.Category;
import kr.or.connect.reserproject.dto.DisplayInfo;
import kr.or.connect.reserproject.dto.Product;
import kr.or.connect.reserproject.dto.DisplayInfoImages;
import kr.or.connect.reserproject.dto.ProductImages;
import kr.or.connect.reserproject.dto.ProductPrices;
import kr.or.connect.reserproject.dto.Promotion;
import kr.or.connect.reserproject.dto.Promotions;
import kr.or.connect.reserproject.dto.ReservationUserComments;
import kr.or.connect.reserproject.dto.Reservations;
import kr.or.connect.reserproject.service.ReseprojectService;

@Service
public class ReseprojectServiceImpl implements ReseprojectService{
	@Autowired
	CategoryDao categoryDao;
	@Autowired
	ProductDao displayInfoDao;
	@Autowired
	PromotionDao promotionDao;
	@Autowired
	DisplayInfoImagesDao displayInfoImagesDao;
	@Autowired
	PromotionsDao promotionsDao;
	@Autowired
	ReservationsDao reservationsDao;
	@Override
	@Transactional
	public List<Category> getgroup() {
		List<Category> list = categoryDao.getGroupCategory();
		return list;
	}

	@Override
	@Transactional
	public int getcategory() {
		int count =categoryDao.count();
		return count;
	}

//	@Override
//	@Transactional
//	public int totalCount(Integer id) {
//		return displayInfoDao.totalCount(id);
//	}

//	@Override
//	@Transactional
//	public List<DisplayInfo> getDisplayInfos(Integer start,Integer id) {
//		List<DisplayInfo>list=displayInfoDao.getProduct(start, LIMIT, id);
//		return list;
//	}

	@Override
	@Transactional
	public List<Promotion> getPromotions() {
		List<Promotion>list=promotionDao.getPromotion();
		return list;
	}

	@Override
	@Transactional
	public Long promotionCount() {
		Long count = promotionDao.count();
		return count;
	}

//	@Override
//	@Transactional
//	public List<Product> displayGetPr(Long id) {
//		List<Product>list =displayInfoImagesDao.displayGetPr(id);
//		return list;
//	}
	
	@Override
	@Transactional
	public DisplayInfo getDisplay(Long id) {
		DisplayInfo displayInfo=displayInfoImagesDao.getDisplay(id);
		return displayInfo;
	}
	
	@Override
	@Transactional
	public List<ProductImages> disPlayGetPrIMG(Long id) {
		List<ProductImages>list =displayInfoImagesDao.getDisplayPrimg(id);
		return list;
	}

	@Override
	@Transactional
	public List<DisplayInfoImages> disInfoGetdisImag(Long id) {
		List<DisplayInfoImages>list =displayInfoImagesDao.disInfoGetdisImag(id);
		return list;
	}

	@Override
	@Transactional
	public Double displayAvg(Long id) {
		return displayInfoImagesDao.avgScore(id);
	}

	@Override
	@Transactional
	public List<ProductPrices> displayGetProPrice(Long id) {
		List<ProductPrices>list =displayInfoImagesDao.getProductPrice(id);
		return list;
	}
	
	@Override
	@Transactional
	public List<ReservationUserComments> getComment(Long id) {
		List<ReservationUserComments>list =displayInfoImagesDao.getComments(id);
		for(ReservationUserComments c :list) {
			c.setCommentImages(displayInfoImagesDao.getUserCommentImage(c.getCommentId()));
		}
		return list;
	}
	
//	@Override
//	@Transactional
//	public List<ReservationUserComments> getUserComment() {
//		List<ReservationUserComments>list=reservationUserCommentsDao.getReservationComment(COMMENT_LIMIT);
//		for(ReservationUserComments c :list) {
//			c.setCommentImages(reservationUserCommentsDao.getResComImage(c.getId()));
//		}
//		return list;
//	}
//
//	@Override
//	@Transactional
//	public int getTotalComment() {
//		int count = reservationUserCommentsDao.totalComment();
//		return count;
//	}

	@Override
	@Transactional
	public List<Promotions> getPrImg() {
		List<Promotions>list=promotionsDao.getPromotionsImg();
		return list;
	}

//	@Override
//	@Transactional
//	public List<DisplayInfo> getDisplayInfosing(Integer limit) {
//		List<DisplayInfo>list=displayInfoDao.getProducts(limit);
//		return list;
//	}

	@Override
	public int totalCounting() {
		int count = displayInfoDao.totalCounts();
		return count;
	}

	@Override
	@Transactional
	public List<Product> getDisplayImg(Integer start) {
		List<Product>list =displayInfoDao.getDisplayImg(start, LIMIT);
		return list;
	}

	@Override
	@Transactional
	public List<Product> getDisplayImgId(Integer start,Integer categoryId) {
		List<Product>list =displayInfoDao.getDisplayImgId(start,LIMIT, categoryId);
		return list;
	}

	@Override
	public int totalCountId(Integer categoryId) {
		int count= displayInfoDao.totalCountId(categoryId);
		return count;
	}
//////////예약
	/*
	@Override
	@Transactional
	public List<Reservations> getReserveInfo(String reservationEmail) {
		List<Reservations>list=reservationsDao.getReservationInfo(reservationEmail);
		for(Reservations r:list) {
			r.setReservationInDisplay(reservationsDao.getReserveInDisplay(r.getProductId()));
		}
		return list;
	}
	*/
	@Override
	@Transactional
	public List<Reservations> getReserveInfo(String reservationEmail) {
		List<Reservations>list=reservationsDao.getReservationInfo(reservationEmail);
		List<Integer>displayId=reservationsDao.getDisplayId(reservationEmail);
		int index = 0;
		for(Reservations r:list) {
			Integer i=displayId.get(index);
			r.setReservationInDisplay(reservationsDao.getReserveInDisplay(r.getProductId(),i));
			index++;
		}
		return list;
	}
}

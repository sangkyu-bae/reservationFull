package kr.or.connect.reserproject.service;

import java.util.List;



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



public interface ReseprojectService {
	public static final Integer LIMIT=4;
	public List<Category>getgroup();
	public int getcategory();
	
	public int totalCounting();
	public int totalCountId(Integer categoryId);
	public List<Product>getDisplayImg(Integer start);
	public List<Product>getDisplayImgId(Integer start,Integer categoryId);
	
	public List<Promotion>getPromotions();
	public Long promotionCount();
	public DisplayInfo getDisplay(Long id);
	public List<ProductImages>disPlayGetPrIMG(Long id);
	public List<DisplayInfoImages>disInfoGetdisImag(Long id);
	public Double displayAvg(Long id);
	public List<ProductPrices>displayGetProPrice(Long id);
	public List<ReservationUserComments>getComment(Long id);

	public List<Promotions> getPrImg();
	
	/////////예약
	public List<Reservations> getReserveInfo(String reservationEmail);
	
}

package kr.or.connect.reserproject.dao;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import static kr.or.connect.reserproject.dao.DisplayInfoImagesDaoSqls.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.or.connect.reserproject.dto.Product;
import kr.or.connect.reserproject.dto.DisplayInfo;
import kr.or.connect.reserproject.dto.DisplayInfoImages;
import kr.or.connect.reserproject.dto.ProductImages;
import kr.or.connect.reserproject.dto.ProductPrices;
import kr.or.connect.reserproject.dto.ReservationUserCommentImages;
import kr.or.connect.reserproject.dto.ReservationUserComments;

@Repository
public class DisplayInfoImagesDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<DisplayInfoImages>rowMapper=BeanPropertyRowMapper.newInstance(DisplayInfoImages.class);
	//
	//private RowMapper<Product>rowMapper2=BeanPropertyRowMapper.newInstance(Product.class);
	//
	private RowMapper<DisplayInfo>rowMapper2=BeanPropertyRowMapper.newInstance(DisplayInfo.class);
	private RowMapper<ProductImages>rowMapper3=BeanPropertyRowMapper.newInstance(ProductImages.class);
	private RowMapper<ProductPrices>rowMapper4=BeanPropertyRowMapper.newInstance(ProductPrices.class);
	private RowMapper<ReservationUserComments>rowMapper5=BeanPropertyRowMapper.newInstance(ReservationUserComments.class);
	private RowMapper<ReservationUserCommentImages>rowMapper6=BeanPropertyRowMapper.newInstance(ReservationUserCommentImages.class);
	public DisplayInfoImagesDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<DisplayInfoImages>disInfoGetdisImag(Long id){
		Map<String, Long>map =new HashMap<>();
		map.put("displayInfoId", id);
		return jdbc.query(DISPLAY_GET_IMAGES, map, rowMapper);
	}
	//
//	public List<Product>displayGetPr(Long id){
//		Map<String, Long>map =new HashMap<>();
//		map.put("id", id);
//		return jdbc.query(DISPLAY_PRODUCT, map, rowMapper2);
//	}
	//
	public DisplayInfo getDisplay(Long id) {
		Map<String, Long>map= new HashMap<>();
		map.put("id", id);
		return jdbc.queryForObject(GET_DISPLAY_INFO, map, rowMapper2);
	}
	public List<ProductImages>getDisplayPrimg(Long id){
		Map<String, Long>map =new HashMap<>();
		map.put("id", id);
		return jdbc.query(DISPLAY_GET_PRODUCT_IMAGES, map, rowMapper3);
	}
	public Double avgScore(Long id) {
		Map<String, Long>map =new HashMap<>();
		map.put("id", id);
		return jdbc.queryForObject(DISPLAY_AVG_SCORE, map, Double.class);
	}
	public List<ProductPrices>getProductPrice(Long id){
		Map<String, Long>map =new HashMap<>();
		map.put("id", id);
		return jdbc.query(DISPLAY_GET_PRO_PRICES, map, rowMapper4);
	}
	
	public List<ReservationUserComments>getComments(Long id){
		Map<String, Object>map=new HashMap<>();
		map.put("id", id);
		return jdbc.query(GET_USER_COMMENTS, map, rowMapper5);
	}
	
	public List<ReservationUserCommentImages>getUserCommentImage(Long id){
		Map<String, Object>map=new HashMap<>();
		map.put("id", id);
		return jdbc.query(GET_USER_COMMENT_IMAGE, map, rowMapper6);
	}
}

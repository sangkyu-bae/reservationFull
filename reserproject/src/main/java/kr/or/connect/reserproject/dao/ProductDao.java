package kr.or.connect.reserproject.dao;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reserproject.dto.Product;
import static kr.or.connect.reserproject.dao.ProductDaoSqls.*;
@Repository
public class ProductDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<Product>rowMapper=BeanPropertyRowMapper.newInstance(Product.class);
	
	public ProductDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
	}
	
//	public List<DisplayInfo>getProduct(Integer start,Integer limit,Integer id){
//		Map<String, Integer>map =new HashMap<>();
//		map.put("start", start);
//		map.put("limit", limit);
//		map.put("id", id);
//		return jdbc.query(GET_PRODUCTS, map, rowMapper);
//	}
//	public int totalCount(Integer id) {
//		Map<String, Integer> map =new HashMap<>();
//		map.put("id", id);
//		return jdbc.queryForObject(TOTAL_COUNT, map, int.class);
//	}
//	public List<DisplayInfo>getProducts(Integer limit){
//		Map<String, Integer>map =new HashMap<>();
//		map.put("limit", limit);
//		return jdbc.query(GET_PRODUCT_ING, map, rowMapper);
//	}
	public int totalCounts() {
		return jdbc.queryForObject(TOTAL_COUNT_ING, Collections.emptyMap(), int.class);
	}
	public int totalCountId(Integer categoryId) {
		Map<String, Integer>map=new HashMap<>();
		map.put("categoryId", categoryId);
		return jdbc.queryForObject(TOTAL_COUNT_ID, map, int.class);
	}
	public List<Product>getDisplayImg(Integer start,Integer limit){
		Map<String, Integer>map=new HashMap<>();
		map.put("start",start);
		map.put("limit", limit);
		return jdbc.query(GET_DISPLAY_IMG, map, rowMapper);
	}
	public List<Product>getDisplayImgId(Integer start,Integer limit, Integer categoryId){
		Map<String , Integer>map =new HashMap<>();
		map.put("start", start);
		map.put("limit", limit);
		map.put("categoryId", categoryId);
		return jdbc.query(GET_DISPLAY_IMG_ID, map, rowMapper);
	}
	
}

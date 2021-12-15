package kr.or.connect.reserproject.dao;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reserproject.dto.Promotions;
import static kr.or.connect.reserproject.dao.PromotionsDaoSqls.*;
@Repository
public class PromotionsDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<Promotions>rowMapper=BeanPropertyRowMapper.newInstance(Promotions.class);
	
	public PromotionsDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
	}
	public List<Promotions>getPromotionsImg(){
		return jdbc.query(GET_PROMOTION_IMAGE, rowMapper);
	}
}

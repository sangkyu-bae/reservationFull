package kr.or.connect.reserproject.dao;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import static kr.or.connect.reserproject.dao.PromotionDaoSqls.*;
import kr.or.connect.reserproject.dto.Promotion;

@Repository
public class PromotionDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<Promotion>rowMapper=BeanPropertyRowMapper.newInstance(Promotion.class);
	
	public PromotionDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<Promotion>getPromotion(){
		return jdbc.query(GET_PROMOTION, rowMapper);
	}
	public Long count() {
		return jdbc.queryForObject(TOTAL_COUNT, Collections.emptyMap(), Long.class);
	}
}

package kr.or.connect.reserporject.login.dao;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.reserporject.login.dto.ReservationInfoPrice;
import static kr.or.connect.reserporject.login.dao.ReservationInfoPriceDaoSqls.*;

import java.util.HashMap;
import java.util.Map;
@Repository
public class ReservationInfoPriceDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ReservationInfoPrice>rowMapper=BeanPropertyRowMapper.newInstance(ReservationInfoPrice.class);
	private SimpleJdbcInsert insertAction;
	
	public ReservationInfoPriceDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
		this.insertAction = new SimpleJdbcInsert(dataSource)
								.withTableName("reservation_info_price")
								.usingGeneratedKeyColumns("id");
	}
	
	public Long addReservationInfoPrice(ReservationInfoPrice reservationInfoPrice) {
		SqlParameterSource params=new BeanPropertySqlParameterSource(reservationInfoPrice);
		return insertAction.executeAndReturnKey(params).longValue();
	}
	public Long getByProductId(Long productPriceId) {
		Map<String, Object>map = new HashMap<>();
		map.put("productPriceId", productPriceId);
		return jdbc.queryForObject(GET_BY_PRODCUTID, map, Long.class);
	}
	public Long getByProductIds(Long productPriceId) {
		Map<String,Object>map =new HashMap<>();
		map.put("productPriceId", productPriceId);
		return jdbc.queryForObject(GET_BY_PRODCUTIDS, map, Long.class);
	}
}

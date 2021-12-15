package kr.or.connect.reserporject.login.dao;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.reserporject.login.dto.ReservationInfo;
import static kr.or.connect.reserporject.login.dao.ReservationInfoDaoSqls.*;
@Repository
public class ReservationInfoDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<ReservationInfo>rowMapper=BeanPropertyRowMapper.newInstance(ReservationInfo.class);
	private SimpleJdbcInsert insertAction;
	
	public ReservationInfoDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
		this.insertAction=new SimpleJdbcInsert(dataSource)
							.withTableName("reservation_info")
							.usingGeneratedKeyColumns("id");
	}
	public Long addReservationInfo(ReservationInfo reservationInfo) {
		SqlParameterSource params=new BeanPropertySqlParameterSource(reservationInfo);
		return insertAction.executeAndReturnKey(params).longValue();
	}
	public int updateRervationInfo(Long id) {
		Map<String, Object>map=new HashMap<>();
		map.put("id", id);
		return jdbc.update(UPDATE_RESERVATION, map);
	}
}

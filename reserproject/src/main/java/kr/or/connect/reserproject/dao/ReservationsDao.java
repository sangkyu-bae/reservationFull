package kr.or.connect.reserproject.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;
import static kr.or.connect.reserproject.dao.ReservationsDaoSqls.*;

import kr.or.connect.reserproject.dto.ReservationInDisplay;
import kr.or.connect.reserproject.dto.Reservations;
@Repository
public class ReservationsDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<Reservations>rowMapper=BeanPropertyRowMapper.newInstance(Reservations.class);
	private RowMapper<ReservationInDisplay>rowMapper2=BeanPropertyRowMapper.newInstance(ReservationInDisplay.class);
	public ReservationsDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
	}
	
	public List<Reservations> getReservationInfo(String reservationEmail){
		Map<String, Object> map =new HashMap<>();
		map.put("reservationEmail", reservationEmail);
		return jdbc.query(GET_RESERVATION_INFO, map, rowMapper);
	}
	
//	public ReservationInDisplay getReserveInDisplay(Long id) {
//		Map<String, Object> map =new HashMap<>();
//		map.put("id", id);
//		return jdbc.queryForObject(GET_DISPLAY_INFO_IN_RESERVE, map, rowMapper2);
//	}
	
	public ReservationInDisplay getReserveInDisplay(Long id,Integer displayId) {
		Map<String, Object> map =new HashMap<>();
		map.put("id", id);
		map.put("displayId",displayId);
		return jdbc.queryForObject(GET_DISPLAY_INFO_IN_RESERVE, map, rowMapper2);
	}
	
	public List<Integer> getDisplayId(String reservationEmail) {
		Map<String, Object>map=new HashMap<>();
		map.put("reservationEmail", reservationEmail);
		return jdbc.queryForList(GET_DISPLAY_INFO_ID, map,int.class);
		
	}
}

package kr.or.connect.reserporject.login.dao;

import javax.sql.DataSource;

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.reserporject.login.dto.ReservationUserComment;

@Repository
public class ReservationUserCommentDao {
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	
	public ReservationUserCommentDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
		this.insertAction=new SimpleJdbcInsert(dataSource)
								.withTableName("reservation_user_comment")
								.usingGeneratedKeyColumns("id");
								
	}
	
	public Long addReservationUSerComment(ReservationUserComment comment) {
		SqlParameterSource params=new BeanPropertySqlParameterSource(comment);
		return insertAction.executeAndReturnKey(params).longValue();
	}
}

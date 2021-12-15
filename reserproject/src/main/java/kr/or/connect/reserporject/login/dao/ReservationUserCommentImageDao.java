package kr.or.connect.reserporject.login.dao;

import javax.sql.DataSource;

import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Repository;

import kr.or.connect.reserporject.login.dto.ReservationUserCommentImage;

@Repository
public class ReservationUserCommentImageDao {
	
	private NamedParameterJdbcTemplate jdbc;
	private SimpleJdbcInsert insertAction;
	
	public ReservationUserCommentImageDao(DataSource dataSource) {
		this.jdbc=new NamedParameterJdbcTemplate(dataSource);
		this.insertAction=new SimpleJdbcInsert(dataSource)
								.withTableName("reservation_user_comment_image")
								.usingGeneratedKeyColumns("id");
	}
	
	public Long addReservationUSerCommentImage(ReservationUserCommentImage commentImage) {
		SqlParameterSource params=new BeanPropertySqlParameterSource(commentImage);
		return insertAction.executeAndReturnKey(params).longValue();
	}
}

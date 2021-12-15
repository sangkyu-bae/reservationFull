package kr.or.connect.reserproject.dao;

import java.util.Collections;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.or.connect.reserproject.dto.Category;
import static kr.or.connect.reserproject.dao.CategoryDaoSqls.*;
@Repository
public class CategoryDao {
	private NamedParameterJdbcTemplate jdbc;
	private RowMapper<Category>rowMapper=BeanPropertyRowMapper.newInstance(Category.class);
	
	public CategoryDao(DataSource dataSource) {
		this.jdbc= new NamedParameterJdbcTemplate(dataSource);
	}
	public List<Category> getGroupCategory(){
		return jdbc.query(GUROP_CATEGORY, rowMapper);
	}
	public int count() {
		return jdbc.queryForObject(GET_COUNT, Collections.emptyMap(), int.class);
	}
}
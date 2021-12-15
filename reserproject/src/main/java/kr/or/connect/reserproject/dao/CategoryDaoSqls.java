package kr.or.connect.reserproject.dao;

public class CategoryDaoSqls {
	public static final String GUROP_CATEGORY="select a.id,a.name,count(*)as count from category a\r\n"
			+ "left outer join product c on a.id = c.category_id \r\n"
			+ "left outer join display_info b on c.id= b.product_id\r\n"
			+ "group by a.id";
	public static final String GET_COUNT="select count(*) from category";
}

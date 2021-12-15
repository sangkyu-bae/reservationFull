package kr.or.connect.reserproject.dao;

public class PromotionDaoSqls {
	public static final String TOTAL_COUNT="select count(*)as count from promotion";
	public static final String GET_PROMOTION="\r\n"
			+ "select a.id,a.product_id,b.category_id,c.name as category_name,b.description,d.file_id\r\n"
			+ "\r\n"
			+ "from promotion a \r\n"
			+ "left outer join product b on a.product_id=b.id\r\n"
			+ "left outer join category c on b.category_id= c.id\r\n"
			+ "left outer join product_image d on b.id =d.product_id\r\n"
			+ "where d.type ='ma'";
}

package kr.or.connect.reserproject.dao;

public class PromotionsDaoSqls {
	public static final String GET_PROMOTION_IMAGE="select \r\n"
			+ "a.id,a.product_id,b.save_file_name as product_image_url\r\n"
			+ "from promotion a left outer join product_image c on a.product_id=c.product_id\r\n"
			+ "left outer join file_info b on c.file_id=b.id\r\n"
			+ "where c.type ='th'";
}

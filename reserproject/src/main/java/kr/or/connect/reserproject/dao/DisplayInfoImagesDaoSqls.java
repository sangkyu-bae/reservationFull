package kr.or.connect.reserproject.dao;

public class DisplayInfoImagesDaoSqls {
	public static final String DISPLAY_GET_IMAGES="select\r\n"
			+ "a.id,a.display_info_id,a.file_id,b.file_name,b.save_file_name,b.content_type,b.delete_flag,\r\n"
			+ "b.create_date,b.modify_date\r\n"
			+ "from display_info_image a left outer join file_info b on a.file_id=b.id\r\n"
			+ "where a.display_info_id=:displayInfoId";
	public static final String DISPLAY_GET_PRODUCT_IMAGES="select\r\n"
			+ "a.product_id,c.id as product_image_id, c.type,c.file_id as file_info_id,d.file_name,d.save_file_name,d.content_type,\r\n"
			+ "d.delete_flag,d.create_date,d.modify_date\r\n"
			+ "from display_info a left outer join product_image c on a.product_id=c.product_id\r\n"
			+ "left outer join file_info d on c.file_id = d.id\r\n"
			+ "where a.id =:id and (c.type='ma'or c.type='et')\r\n"
			+ "limit 0,2";
//	public static final String DISPLAY_PRODUCT="select a.id,a.category_id,b.id as display_info_id, c.name,a.description,a.content,a.event,\r\n"
//			+ "b.opening_hours,b.place_name,b.place_lot,b.place_street,b.tel,b.homepage,b.email,b.create_date,\r\n"
//			+ "b.modify_date,d.file_id\r\n"
//			+ "from product a\r\n"
//			+ "left outer join category c on c.id = a.category_id \r\n"
//			+ "left outer join display_info b on a.id= b.product_id\r\n"
//			+ "left outer join product_image d on a.id=d.product_id\r\n"
//			+ "where b.id =:id and d.type='ma'";
	public static final String DISPLAY_AVG_SCORE="select avg(a.score) as avg\r\n"
			+ "from reservation_user_comment a \r\n"
			+ "left outer join reservation_info b on a.reservation_info_id=b.id\r\n"
			+ "left outer join display_info c on b.display_info_id=c.id\r\n"
			+ "where c.id=:id";
	public static final String DISPLAY_GET_PRO_PRICES="select\r\n"
			+ "a.id,a.product_id,a.price_type_name,a.price,a.discount_rate,a.create_date,a.modify_date\r\n"
			+ "from product_price a left outer join product b on a.product_id=b.id\r\n"
			+ "left outer join display_info c on b.id=c.product_id\r\n"
			+ "where c.id =:id";
	
	public static final String GET_DISPLAY_INFO="select \r\n"
			+ "a.product_id,b.category_id,a.id as display_info_id,c.name as category_name,\r\n"
			+ "b.description as product_description, b.content as product_content,\r\n"
			+ "b.event as product_event,a.opening_hours,a.place_name,a.place_lot,a.place_street,\r\n"
			+ "a.tel as telephone, a.homepage,a.email,a.create_date,a.modify_date\r\n"
			+ "\r\n"
			+ "from display_info a left outer join product b on a.product_id=b.id\r\n"
			+ "left outer join category c on b.category_id=c.id\r\n"
			+ "\r\n"
			+ "where a.id=:id";
	
	
	public static final String GET_USER_COMMENTS="select \r\n"
			+ "a.id as comment_id,a.product_id,a.reservation_info_id,a.score,a.comment,\r\n"
			+ "b.reservation_name,b.reservation_tel as reservation_telephone,\r\n"
			+ "b.reservation_email,b.reservation_date,a.create_date,a.modify_date\r\n"
			+ "from reservation_user_comment a left outer join reservation_info b  on a.reservation_info_id=b.id\r\n"
			+ "\r\n"
			+ "where b.display_info_id =:id\r\n"
			+ "order by a.id desc";
	
	public static final String GET_USER_COMMENT_IMAGE="select\r\n"
			+ "a.id as image_id,a.reservation_info_id,a.reservation_user_comment_id,a.file_id,\r\n"
			+ "b.file_name,b.save_file_name,b.content_type,b.delete_flag,b.create_date,b.modify_date\r\n"
			+ "\r\n"
			+ "from reservation_user_comment_image a left outer join file_info b on a.file_id=b.id\r\n"
			+ "where a.reservation_user_comment_id=:id";
}

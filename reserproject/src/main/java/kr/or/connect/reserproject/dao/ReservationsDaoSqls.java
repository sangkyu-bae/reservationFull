package kr.or.connect.reserproject.dao;

public class ReservationsDaoSqls {
//	public final static String GET_RESERVATION_INFO="select \r\n"
//			+ "a.id as reservation_info_id, a.product_id,a.reservation_name,a.reservation_tel as reservation_telephone,\r\n"
//			+ "a.reservation_email,a.cancel_flag as cancel_yn,a.reservation_date,a.create_date,a.modify_date\r\n"
//			+ "from reservation_info a\r\n"
//			+ "where reservation_email=:reservationEmail";
	
	
	public final static String GET_RESERVATION_INFO="select \r\n"
			+ "a.id as reservation_info_id, a.product_id,a.reservation_name,a.reservation_tel as reservation_telephone,\r\n"
			+ "a.reservation_email,a.cancel_flag as cancel_yn,a.reservation_date,a.create_date,a.modify_date,sum(b.count*c.price) as price\r\n"
			+ "from reservation_info a left outer join reservation_info_price b on a.id=b.reservation_info_id\r\n"
			+ "left outer join product_price c on b.product_price_id=c.id\r\n"
			+ "where reservation_email=:reservationEmail\r\n"
			+ "group by a.id";
	
	//////in displayInfo 개발
//	
//	public final static String GET_DISPLAY_INFO_IN_RESERVE="select \r\n"
//			+ "a.category_id,b.name as category_name,a.create_date,c.id as display_info_id,\r\n"
//			+ "c.email,c.homepage,c.modify_date,c.opening_hours,c.place_lot,c.place_name,\r\n"
//			+ "c.place_street,a.content as product_content, a.description as product_description,\r\n"
//			+ "a.event as product_event,c. product_id,c.tel as telephone\r\n"
//			+ "from product a left outer join category b on a.category_id = b.id\r\n"
//			+ "left outer join display_info c on a.id=c.product_id\r\n"
//			+ "where a.id =:id";
	
	public final static String GET_DISPLAY_INFO_IN_RESERVE="select \r\n"
			+ "a.category_id,b.name as category_name,a.create_date,c.id as display_info_id,\r\n"
			+ "c.email,c.homepage,c.modify_date,c.opening_hours,c.place_lot,c.place_name,\r\n"
			+ "c.place_street,a.content as product_content, a.description as product_description,\r\n"
			+ "a.event as product_event,c. product_id,c.tel as telephone\r\n"
			+ "from product a left outer join category b on a.category_id = b.id\r\n"
			+ "left outer join display_info c on a.id=c.product_id\r\n"
			+ "where a.id =:id and c.id=:displayId";
	
	public final static String GET_DISPLAY_INFO_ID="select display_info_id from reservation_info where reservation_email=:reservationEmail";
}

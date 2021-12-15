package kr.or.connect.reserproject.dao;

public class ProductDaoSqls {
//	public static final String GET_PRODUCTS="select a.id,a.category_id,b.id as display_info_id, c.name,a.description,a.content,a.event,\r\n"
//			+ "b.opening_hours,b.place_name,b.place_lot,b.place_street,b.tel,b.homepage,b.email,b.create_date,\r\n"
//			+ "b.modify_date,d.file_id\r\n"
//			+ "from product a\r\n"
//			+ "left outer join category c on c.id = a.category_id \r\n"
//			+ "left outer join display_info b on a.id= b.product_id\r\n"
//			+ "left outer join product_image d on a.id=d.product_id\r\n"
//			+ "where c.id =:id and d.type='ma'\r\n"
//			+ "limit :start,:limit";
//	public static final String TOTAL_COUNT="select count(*)as total_count from category a\r\n"
//			+ "left outer join product c on a.id = c.category_id \r\n"
//			+ "left outer join display_info b on c.id= b.product_id\r\n"
//			+ "where a.id =:id\r\n"
//			+ "group by a.id";
	
//	public static final String GET_PRODUCT_ING="select a.id,a.category_id,b.id as display_info_id, c.name,a.description,a.content,a.event,\r\n"
//			+ "b.opening_hours,b.place_name,b.place_lot,b.place_street,b.tel,b.homepage,b.email,b.create_date,\r\n"
//			+ "b.modify_date,d.file_id,e.save_file_name\r\n"
//			+ "from product a\r\n"
//			+ "left outer join category c on c.id = a.category_id \r\n"
//			+ "left outer join display_info b on a.id= b.product_id\r\n"
//			+ "left outer join product_image d on a.id=d.product_id\r\n"
//			+ "left outer join file_info e on d.id=e.id\r\n"
//			+ "where d.type='th'"
//			+ "limit 0,:limit";
	
	public static final String TOTAL_COUNT_ING="\r\n"
			+ "select count(*)as count from category a\r\n"
			+ "left outer join product c on a.id = c.category_id \r\n"
			+ "left outer join display_info b on c.id= b.product_id";
	public static final String TOTAL_COUNT_ID="select count(*)as count from category a\r\n"
			+ "left outer join product c on a.id = c.category_id \r\n"
			+ "left outer join display_info b on c.id= b.product_id\r\n"
			+ "where a.id=:categoryId\r\n"
			+ "group by a.id";
	public static final String GET_DISPLAY_IMG="select\r\n"
			+ "c.id as display_info_id,c.product_id,b.description as product_description,c.place_name,\r\n"
			+ "b.content as product_content,d.save_file_name as product_image_url\r\n"
			+ "\r\n"
			+ "from product_image f\r\n"
			+ "left outer join product b on b.id=f.product_id\r\n"
			+ "left outer join display_info c on b.id= c.product_id\r\n"
			+ "left outer join file_info d on d.id = f.file_id\r\n"
			+ "left outer join category e on b.category_id=e.id\r\n"
			+ "where f.type='th'\r\n"
			+ "limit :start,:limit";
	public static final String GET_DISPLAY_IMG_ID="select\r\n"
			+ "c.id as display_info_id,c.product_id,b.description as product_description,c.place_name,\r\n"
			+ "b.content as product_content,d.save_file_name as product_image_url\r\n"
			+ "\r\n"
			+ "from product_image f\r\n"
			+ "left outer join product b on b.id=f.product_id\r\n"
			+ "left outer join display_info c on b.id= c.product_id\r\n"
			+ "left outer join file_info d on d.id = f.file_id\r\n"
			+ "left outer join category e on b.category_id=e.id\r\n"
			+ "where f.type='th' and e.id=:categoryId\r\n"
			+ "limit :start,:limit";
}

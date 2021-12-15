package kr.or.connect.reserporject.login.dao;

public class ReservationInfoPriceDaoSqls {
	public static final String GET_BY_PRODCUTID="select \r\n"
			+ "distinct b.product_id\r\n"
			+ "from reservation_info_price a left outer join product_price b on a.product_price_id=b.id\r\n"
			+ "left outer join product c on b.product_id=c.id\r\n"
			+ "where a.product_price_id=:productPriceId";
	public static final String GET_BY_PRODCUTIDS="select product_id from product_price where id=:productPriceId";
}

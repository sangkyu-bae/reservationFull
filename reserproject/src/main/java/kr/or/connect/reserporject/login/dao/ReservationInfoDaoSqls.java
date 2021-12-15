package kr.or.connect.reserporject.login.dao;

public class ReservationInfoDaoSqls {
	public static final String UPDATE_RESERVATION="update reservation_info\r\n"
			+ "set cancel_flag=1\r\n"
			+ "where id=:id";
}

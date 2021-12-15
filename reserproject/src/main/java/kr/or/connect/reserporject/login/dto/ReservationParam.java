package kr.or.connect.reserporject.login.dto;

import java.util.List;

public class ReservationParam {
	private Long displayInfoId;
	private Long productId;
	private String reservationEmail;
	private String reservationName;
	private String reservationTelephone;
	private String reservationYeatMonthDay;
	private List<ReservationInfoPrice>prices;
	public Long getDisplayInfoId() {
		return displayInfoId;
	}
	public void setDisplayInfoId(Long displayInfoId) {
		this.displayInfoId = displayInfoId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getReservationEmail() {
		return reservationEmail;
	}
	public void setReservationEmail(String reservationEmail) {
		this.reservationEmail = reservationEmail;
	}
	public String getReservationName() {
		return reservationName;
	}
	public void setReservationName(String reservationName) {
		this.reservationName = reservationName;
	}
	public String getReservationTelephone() {
		return reservationTelephone;
	}
	public void setReservationTelephone(String reservationTelephone) {
		this.reservationTelephone = reservationTelephone;
	}
	public String getReservationYeatMonthDay() {
		return reservationYeatMonthDay;
	}
	public void setReservationYeatMonthDay(String reservationYeatMonthDay) {
		this.reservationYeatMonthDay = reservationYeatMonthDay;
	}
	public List<ReservationInfoPrice> getPrices() {
		return prices;
	}
	public void setPrices(List<ReservationInfoPrice> prices) {
		this.prices = prices;
	}
	
}

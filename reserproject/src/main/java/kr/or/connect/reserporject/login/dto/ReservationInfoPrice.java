package kr.or.connect.reserporject.login.dto;

public class ReservationInfoPrice {
	private Long id;
	private Long reservationInfoId;
	private Long productPriceId;
	private Long count;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getReservationInfoId() {
		return reservationInfoId;
	}
	public void setReservationInfoId(Long reservationInfoId) {
		this.reservationInfoId = reservationInfoId;
	}
	public Long getProductPriceId() {
		return productPriceId;
	}
	public void setProductPriceId(Long productPriceId) {
		this.productPriceId = productPriceId;
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	
}

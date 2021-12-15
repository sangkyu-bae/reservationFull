package kr.or.connect.reserproject.dto;

import java.util.Date;

public class Reservations {
	private Long reservationInfoId;
	private Long productId;
	private String reservationName;
	private	String reservationTelephone;
	private String reservationEmail;
	private Long cancelYn;
	private Date reservationDate;
	private Date createDate;
	private Date modifyDate;
	///
	private Long price;
	//
	
	private ReservationInDisplay reservationInDisplay;
	
	///
	public Long getPrice() {
		return price;
	}
	public void setPrice(Long price) {
		this.price = price;
	}
	//
	public ReservationInDisplay getReservationInDisplay() {
		return reservationInDisplay;
	}
	public void setReservationInDisplay(ReservationInDisplay reservationInDisplay) {
		this.reservationInDisplay = reservationInDisplay;
	}
	//
	public Long getReservationInfoId() {
		return reservationInfoId;
	}
	public void setReservationInfoId(Long reservationInfoId) {
		this.reservationInfoId = reservationInfoId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
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
	public String getReservationEmail() {
		return reservationEmail;
	}
	public void setReservationEmail(String reservationEmail) {
		this.reservationEmail = reservationEmail;
	}
	public Long getCancelYn() {
		return cancelYn;
	}
	public void setCancelYn(Long cancelYn) {
		this.cancelYn = cancelYn;
	}
	public Date getReservationDate() {
		return reservationDate;
	}
	public void setReservationDate(Date reservationDate) {
		this.reservationDate = reservationDate;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}
}

package kr.or.connect.reserproject.dto;

import java.util.Date;
import java.util.List;

public class ReservationUserComments {
	private Long commentId;
	private Long productId;
	private Long reservationInfoId;
	private Long score;
	private String comment;
	private String reservationName;
	private String reservationTelephone;
	private String reservationEmail;
	private Date reservationDate;
	private Date createDate;
	private Date modifyDate;
	private List<ReservationUserCommentImages>commentImages;
	public Long getCommentId() {
		return commentId;
	}
	public void setCommentId(Long commentId) {
		this.commentId = commentId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Long getReservationInfoId() {
		return reservationInfoId;
	}
	public void setReservationInfoId(Long reservationInfoId) {
		this.reservationInfoId = reservationInfoId;
	}
	public Long getScore() {
		return score;
	}
	public void setScore(Long score) {
		this.score = score;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
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
	public List<ReservationUserCommentImages> getCommentImages() {
		return commentImages;
	}
	public void setCommentImages(List<ReservationUserCommentImages> commentImages) {
		this.commentImages = commentImages;
	}
	
	
	
//	private Long id;
//	private Long productId;
//	private Long reservationInfoId;
//	private Long score;
//	private String reservationEmail;
//	private String comment;
//	private Date createDate;
//	private Date modifyDate;
//	private List<ReservationUserCommentImages>commentImages;
//	public List<ReservationUserCommentImages> getCommentImages() {
//		return commentImages;
//	}
//	public void setCommentImages(List<ReservationUserCommentImages> commentImages) {
//		this.commentImages = commentImages;
//	}
//	public Long getId() {
//		return id;
//	}
//	public void setId(Long id) {
//		this.id = id;
//	}
//	public Long getProductId() {
//		return productId;
//	}
//	public void setProductId(Long productId) {
//		this.productId = productId;
//	}
//	public Long getReservationInfoId() {
//		return reservationInfoId;
//	}
//	public void setReservationInfoId(Long reservationInfoId) {
//		this.reservationInfoId = reservationInfoId;
//	}
//	public Long getScore() {
//		return score;
//	}
//	public void setScore(Long score) {
//		this.score = score;
//	}
//	public String getReservationEmail() {
//		return reservationEmail;
//	}
//	public void setReservationEmail(String reservationEmail) {
//		this.reservationEmail = reservationEmail;
//	}
//	public String getComment() {
//		return comment;
//	}
//	public void setComment(String comment) {
//		this.comment = comment;
//	}
//	public Date getCreateDate() {
//		return createDate;
//	}
//	public void setCreateDate(Date createDate) {
//		this.createDate = createDate;
//	}
//	public Date getModifyDate() {
//		return modifyDate;
//	}
//	public void setModifyDate(Date modifyDate) {
//		this.modifyDate = modifyDate;
//	}
	
}

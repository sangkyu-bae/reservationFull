package kr.or.connect.reserporject.login.dto;

public class ReservationUserCommentImage {
	
	private Long id;
	private Long reservationInfoId;
	private Long reservationUserCommentId;
	private Long fileId;
	
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
	public Long getReservationUserCommentId() {
		return reservationUserCommentId;
	}
	public void setReservationUserCommentId(Long reservationUserCommentId) {
		this.reservationUserCommentId = reservationUserCommentId;
	}
	public Long getFileId() {
		return fileId;
	}
	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}
	
}

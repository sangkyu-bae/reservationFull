package kr.or.connect.reserproject.dto;

import java.util.Date;

public class ReservationUserCommentImages {
	private Long imageId;
	private Long reservationInfoId;
	private Long reservationUserCommentId;
	private Long fileId;
	private String fileName;
	private String saveFileName;
	private String contentType;
	private Long deleteFlag;
	private Date createDate;
	private Date modifyDate;
	public Long getImageId() {
		return imageId;
	}
	public void setImageId(Long imageId) {
		this.imageId = imageId;
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
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getSaveFileName() {
		return saveFileName;
	}
	public void setSaveFileName(String saveFileName) {
		this.saveFileName = saveFileName;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public Long getDeleteFlag() {
		return deleteFlag;
	}
	public void setDeleteFlag(Long deleteFlag) {
		this.deleteFlag = deleteFlag;
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
	
	
//	private Long id;
//	private Long reservationInfoId;
//	private Long reservationUserCommentId;
//	private Long fileId;
//	public Long getId() {
//		return id;
//	}
//	public void setId(Long id) {
//		this.id = id;
//	}
//	public Long getReservationInfoId() {
//		return reservationInfoId;
//	}
//	public void setReservationInfoId(Long reservationInfoId) {
//		this.reservationInfoId = reservationInfoId;
//	}
//	public Long getReservationUserCommentId() {
//		return reservationUserCommentId;
//	}
//	public void setReservationUserCommentId(Long reservationUserCommentId) {
//		this.reservationUserCommentId = reservationUserCommentId;
//	}
//	public Long getFileId() {
//		return fileId;
//	}
//	public void setFileId(Long fileId) {
//		this.fileId = fileId;
//	}
}

package kr.or.connect.reserproject.dto;

import java.util.Date;

public class ProductPrices {
	private Long id;
	private Long productId;
	private String priceTypeName;
	private Long price;
	private Long discountRate;
	private Date createDate;
	private Date modifyDate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getPriceTypeName() {
		return priceTypeName;
	}
	public void setPriceTypeName(String priceTypeName) {
		this.priceTypeName = priceTypeName;
	}
	public Long getPrice() {
		return price;
	}
	public void setPrice(Long price) {
		this.price = price;
	}
	public Long getDiscountRate() {
		return discountRate;
	}
	public void setDiscountRate(Long discountRate) {
		this.discountRate = discountRate;
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

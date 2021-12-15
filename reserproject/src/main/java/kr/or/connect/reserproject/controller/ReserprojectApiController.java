package kr.or.connect.reserproject.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import kr.or.connect.reserproject.dto.Category;
import kr.or.connect.reserproject.dto.DisplayInfo;
import kr.or.connect.reserproject.dto.Product;
import kr.or.connect.reserproject.dto.DisplayInfoImages;
import kr.or.connect.reserproject.dto.ProductImages;
import kr.or.connect.reserproject.dto.ProductPrices;
import kr.or.connect.reserproject.dto.Promotions;
import kr.or.connect.reserproject.dto.ReservationUserComments;
import kr.or.connect.reserproject.dto.Reservations;
import kr.or.connect.reserproject.service.ReseprojectService;


@RestController
@RequestMapping(path="/api")
public class ReserprojectApiController {
	@Autowired
	ReseprojectService reseprojectService;
	
	@ApiOperation(value = "카테고리 목록 구하기")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	
	@GetMapping(path="/categories")
	public Map<String, Object>getCategory(){
		List<Category>items= reseprojectService.getgroup();
		int size =reseprojectService.getcategory();
		Map<String, Object>map=new HashMap<>();
		map.put("size", size);
		map.put("items", items);
		return map;
	}
	
	@ApiOperation(value = "상품 목록 구하기 ")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	@GetMapping(path="/displayinfos")
	public Map<String, Object>getProduct(@RequestParam(name="categoryId",required = false)Integer categoryId,
			@RequestParam(name="start", required = false, defaultValue = "0")Integer start){
//		int productCount=reseprojectService.LIMIT;
//		
//		////페이징 기능 구현
//		int pageCount= totalCount/productCount;
//		if(totalCount%productCount>0) 
//			pageCount++;
//		List<Integer>pageStartList=new ArrayList<>();
//		for(int i = 0; i<pageCount;i++) {
//			if(i==0) {
//				pageStartList.add(reseprojectService.LIMIT);
//			}
//			pageStartList.add(i*reseprojectService.LIMIT);
//		}
		///////
		int totalCount;
		List<Product>products;
		if(categoryId==null||categoryId==0) {
			products=reseprojectService.getDisplayImg(start);
			totalCount=reseprojectService.totalCounting();
		
		}else {
			products=reseprojectService.getDisplayImgId(start, categoryId);
			totalCount=reseprojectService.totalCountId(categoryId);
		}
		Map<String, Object>map= new HashMap<>();
		map.put("totalCount", totalCount);
		map.put("products", products);
		return map;
	}
	
	@ApiOperation(value = "프로모션 목록 구하기 ")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	@GetMapping(path="/promotions")
	public Map<String, Object>getPromotion(){
		Long size= reseprojectService.promotionCount();
		List<Promotions>itme = reseprojectService.getPrImg();
		Map<String, Object> map = new HashMap<>();
		map.put("size", size);
		map.put("item", itme);
		return map;
	}
	@ApiOperation(value = "상품 전시 정보 구하기 ")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	@GetMapping(path="/displayinfo/{displayId}")
	public Map<String, Object>getCategoryList(@PathVariable(name="displayId")Long id){
		DisplayInfo displayInfo=reseprojectService.getDisplay(id);
		List<ProductImages>productImages=reseprojectService.disPlayGetPrIMG(id);
		List<DisplayInfoImages>displayInfoImages=reseprojectService.disInfoGetdisImag(id);
		List<ReservationUserComments>comments=reseprojectService.getComment(id);
		Double avgScore =reseprojectService.displayAvg(id);
		List<ProductPrices>productPrices=reseprojectService.displayGetProPrice(id);
		Map<String, Object>map= new HashMap<>();
		map.put("displayInfo", displayInfo);
		map.put("productImages", productImages);
		map.put("displayInfoImages", displayInfoImages);
		map.put("comments", comments);
		map.put("avgScore", avgScore);
		map.put("productPrices", productPrices);
		return map;
	}
	
	@ApiOperation(value = "예약정보 조회 ")
	@ApiResponses({  // Response Message에 대한 Swagger 설명
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 500, message = "Exception")
    })
	@GetMapping(path="/reservations")
	public Map<String, Object>getResevationInfo(@RequestParam(name="reservationEmail",required = true)String reservationEmail){
		List<Reservations>reservations=reseprojectService.getReserveInfo(reservationEmail);
		int size =reservations.size();
		Map<String, Object>map =new HashMap<>();
		map.put("reservations", reservations);
		map.put("size", size);
		return map;
	}
	
}

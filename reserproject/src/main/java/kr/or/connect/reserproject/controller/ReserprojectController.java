package kr.or.connect.reserproject.controller;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.connect.reserporject.login.dto.ReservationInfo;
import kr.or.connect.reserporject.login.dto.ReservationInfoPrice;
import kr.or.connect.reserporject.login.dto.ReservationParam;
import kr.or.connect.reserproject.dto.Category;
import kr.or.connect.reserproject.dto.DisplayInfo;
import kr.or.connect.reserproject.dto.DisplayInfoImages;
import kr.or.connect.reserproject.dto.Product;
import kr.or.connect.reserproject.dto.ProductImages;
import kr.or.connect.reserproject.dto.ProductPrices;
import kr.or.connect.reserproject.dto.Promotions;
import kr.or.connect.reserproject.dto.ReservationUserComments;
import kr.or.connect.reserproject.dto.Reservations;
import kr.or.connect.reserproject.service.MemberService;
import kr.or.connect.reserproject.service.ReseprojectService;


@Controller
public class ReserprojectController {
	@Autowired
	ReseprojectService reseprojectService;
	@Autowired
	MemberService memberService;
	@GetMapping(path="/index")
	public String index(@RequestParam(name="limit", required = false, defaultValue = "4")Integer limit,ModelMap modelMap) {
		int totalCount=reseprojectService.totalCounting();
		int productCount=reseprojectService.LIMIT;
		int pageCount= totalCount/productCount;
		if(totalCount%productCount>0) 
			pageCount++;
		List<Integer>pageStartList=new ArrayList<>();
		for(int i = 0; i<pageCount;i++) {
			int a =i+1;
			pageStartList.add(a*reseprojectService.LIMIT);
		}
		List<Product>products=reseprojectService.getDisplayImg(limit);
		List<Category>items= reseprojectService.getgroup();
		List<Promotions>img=reseprojectService.getPrImg();
		int size =reseprojectService.getcategory();
		modelMap.addAttribute("size",size);
		modelMap.addAttribute("items", items);
		modelMap.addAttribute("img", img);
		modelMap.addAttribute("pageCount",pageCount);
		modelMap.addAttribute("products",products);
		modelMap.addAttribute("pageStartList", pageStartList);
//		Map<String, Object>map=new HashMap<>();
//		map.put("size", size);
//		map.put("items", items);
		return "index";
	}
	
	@GetMapping(path="/detail")
	public String detail(@RequestParam(name="id",required = false)Long id,ModelMap modelMap) {
		DisplayInfo displayInfo=reseprojectService.getDisplay(id);
		List<ProductImages>productImages=reseprojectService.disPlayGetPrIMG(id);
		List<DisplayInfoImages>displayInfoImages=reseprojectService.disInfoGetdisImag(id);
		List<ReservationUserComments>comments=reseprojectService.getComment(id);
		Double avgScore =reseprojectService.displayAvg(id);
		List<ProductPrices>productPrices=reseprojectService.displayGetProPrice(id);
		
		modelMap.addAttribute("displayInfo", displayInfo);
		modelMap.addAttribute("productImages", productImages);
		modelMap.addAttribute("displayInfoImages", displayInfoImages);
		modelMap.addAttribute("comments", comments);
		modelMap.addAttribute("avgScore", avgScore);
		modelMap.addAttribute("productPrices", productPrices);
		
		return "detail";
	}
	@GetMapping(path="review")
	public String review() {
		return "review";
	}
	@GetMapping(path="reserve")
	public String reserve() {
		return "reserve";
	}
	@GetMapping(path="myreservation")
	public String myreservation() {
		return "myreservation";
	}
	@GetMapping(path="test")
	public String test() {
		return "test";
	}
	@GetMapping(path="bookinglogin")
	public String bookinglogin() {
		return "bookinglogin";
	}
	@PostMapping(path="checkEmail")
	public String checkEmail(@RequestParam(name="resrv_email") String email,
			HttpSession session,
			RedirectAttributes redirectAttr) {
		List<Reservations>list=reseprojectService.getReserveInfo(email);
		int size=list.size();
		if(size==0) {
			redirectAttr.addFlashAttribute("errorMessage","등록된 이메일이 없습니다.");
			return "redirect:/bookinglogin";
		}else {
			session.setAttribute("emailValue", email);
			//return "redirect:/myreservation?reservationEmail="+email;
			return "redirect:/myreservation";
		}
		
	}
	@GetMapping(path="reviewWrite")
	public String reviewWrite() {
		return "reviewWrite";
	}
	@GetMapping(path="logout")
	public String logout(HttpSession session) {
		session.removeAttribute("emailValue");
		return "redirect:/index";
	}
	/*
	@GetMapping(path="addreserve")
	public String addReserve(@RequestBody ReservationParam reservationParam){
		Date reservationDate=new Date();
		memberService.add(reservationParam, reservationDate);
		Long displayInfoId=reservationParam.getDisplayInfoId();
		return "redirect:/reserve?id="+displayInfoId; 
	}
	*/
	
}

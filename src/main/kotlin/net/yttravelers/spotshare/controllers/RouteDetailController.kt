//package net.yttravelers.spotshare.controllers
//
//import net.yttravelers.spotshare.services.RouteService
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.web.bind.annotation.*
//
//@RestController
//@RequestMapping("/routeDetails")
//@CrossOrigin
//class RouteDetailController {
//    @Autowired
//    lateinit var routeService: RouteService
//
//    @DeleteMapping("/{id}")
//    fun deleteRouteDetail(@PathVariable("id") id: Int) {
//        routeService.deleteRouteDetail(id)
//    }
//}
//package net.yttravelers.spotshare.controllers
//
//import net.yttravelers.spotshare.entities.Route
//import net.yttravelers.spotshare.services.RouteService
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.web.bind.annotation.*
//
//class RouteForm {
//    var routeName: String? = null
//    var routeDetails: MutableList<RouteDetailForm> = mutableListOf()
//}
//
//class RouteDetailForm {
//    var routeDetailId: Int? = null
//    var spotId: Int? = null
//    var orderNumber: Int? = null
//    var scheduledDateTime: String? = null
//    var favoritePoint: Int? = null
//    var memo: String? = null
//}
//
//@RestController
//@RequestMapping("/routes")
//@CrossOrigin
//class RouteController {
//    @Autowired
//    lateinit var routeService: RouteService
//
//    @GetMapping
//    fun list(): List<Route> {
//        return routeService.getAll()
//    }
//
//    @GetMapping("/{id}")
//    fun findRoute(@PathVariable("id") id: Int): Route {
//        return routeService.findSpotOrException(id)
//    }
//
//    @PostMapping
//    fun createRoute(@RequestBody routeForm: RouteForm): Route {
//        return routeService.addRoute(routeForm)
//    }
//
//    @PatchMapping("/{id}")
//    fun updateRoute(@PathVariable("id") id: Int, @RequestBody routeForm: RouteForm): Route {
//        return routeService.updateRoute(id, routeForm)
//    }
//
//    @DeleteMapping("/{id}")
//    fun deleteRoute(@PathVariable("id") id: Int) {
//        routeService.deleteRoute(id)
//    }
//}
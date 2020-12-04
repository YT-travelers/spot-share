//package net.yttravelers.spotshare.services
//
//import net.yttravelers.spotshare.controllers.RouteForm
//import net.yttravelers.spotshare.entities.Route
//import net.yttravelers.spotshare.entities.RouteDetail
//import net.yttravelers.spotshare.repositories.RouteDetailRepository
//import net.yttravelers.spotshare.repositories.RouteRepository
//import org.springframework.beans.factory.annotation.Autowired
//import org.springframework.data.repository.findByIdOrNull
//import org.springframework.stereotype.Service
//import org.springframework.transaction.annotation.Transactional
//import java.time.LocalDateTime
//import javax.persistence.EntityNotFoundException
//
//@Service
//@Transactional
//class RouteService {
//    @Autowired
//    lateinit var routeRepository: RouteRepository
//
//    @Autowired
//    lateinit var routeDetailRepository: RouteDetailRepository
//
//    fun getAll(): List<Route> {
//        return routeRepository.findAll()
//    }
//
//    fun findSpotOrException(id: Int): Route {
//        return routeRepository.findByIdOrNull(id) ?: throw EntityNotFoundException()
//    }
//
//    fun addRoute(routeForm: RouteForm): Route {
//        val newRoute = Route()
//        val route = setPropertiesInRoute(newRoute, routeForm)
//        return routeRepository.save(route)
//
//    }
//
//    fun updateRoute(id: Int, routeForm: RouteForm): Route {
//        val existingRoute = this.findSpotOrException(id)
//        val route = setPropertiesInRoute(existingRoute, routeForm)
//        return routeRepository.save(route)
//    }
//
//    private fun setPropertiesInRoute(route: Route, routeForm: RouteForm): Route {
//        if (routeForm.routeName !== null) route.routeName = routeForm.routeName
//        routeForm.routeDetails.forEach {
//            val routeDetailId = it.routeDetailId
//            val entity = if (routeDetailId == null) {
//                val routeDetail = RouteDetail()
////                routeDetail.spot = spotService.findSpotOrException(it.spotId!!)
//                route.routeDetails.add(routeDetail)
//                routeDetail
//            } else {
//                route.routeDetails.find { it.routeDetailId === routeDetailId }!!
//            }
//            if (it.orderNumber !== null) entity.order = it.orderNumber
//        }
//
//        return route
//    }
//
//    fun deleteRoute(id: Int) {
//        routeRepository.deleteById(id)
//    }
//
//    fun deleteRouteDetail(id: Int) {
//        routeDetailRepository.deleteById(id)
//    }
//}
//package net.yttravelers.spotshare.entities
//
//import javax.persistence.Table
//import javax.persistence.*
//
//@Entity
//@Table(name = "routeDetailTourism")
//class RouteDetailTourism {
//    @Id @OneToOne(mappedBy = "routeDetailId")
//    lateinit var routeDetail: RouteDetail
//
//    @ManyToOne(fetch = FetchType.EAGER)
//    lateinit var tourism: Tourism
//
//    var tourismRate: Int? = null
//
//    var tourismMinutes: Int? = null
//
//    var tourismCost: Int? = null
//}
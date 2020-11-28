package net.yttravelers.spotshare.entities

import javax.persistence.*

@Entity
@Table(name = "routeDetail")
class RouteDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var routeDetailId: Int? = null

    @Column(name = "`order`")
    var order: Int? = null

    //TODO: 区分の設計
//    var beanKindDiv:

//    @OneToOne
//    var routeDetailTourism: RouteDetailTourism? = null
}
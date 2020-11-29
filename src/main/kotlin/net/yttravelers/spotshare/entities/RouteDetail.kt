package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
@Table(name = "routeDetail")
class RouteDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var routeDetailId: Int? = null

    @Column(name = "`order`")
    var order: Int? = null

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "routeId")
    var route: Route? = null

    //TODO: 区分の設計
//    var beanKindDiv:

//    @OneToOne
//    var routeDetailTourism: RouteDetailTourism? = null
}
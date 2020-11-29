package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.Table
import javax.persistence.*

@Entity
@Table(name = "routeDetailTourism")
class RouteDetailTourism {
    @Id
    var routeDetailId: Int? = null

//    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "routeDetailId")
    @MapsId
    lateinit var routeDetail: RouteDetail

    @ManyToOne(fetch = FetchType.EAGER)
    lateinit var tourism: Tourism

    var tourismRate: Int? = null

    var tourismMinutes: Int? = null

    var tourismCost: Int? = null
}
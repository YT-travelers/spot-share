package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime
import javax.persistence.Table
import javax.persistence.*

@Entity
@Table(name = "routeDetailRestaurant")
class RouteDetailRestaurant {
    @Id
    var routeDetailId: Int? = null

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "routeDetailId")
    @MapsId
    lateinit var routeDetail: RouteDetail

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurantId")
    lateinit var restaurant: Restaurant

    var restaurantRate: Int? = null

    var restaurantMinutes: Int? = null

    //TODO: 区分の設計
//    var restaurantMealKindDiv:

    var restaurantStartTime: LocalDateTime? = null

    var restaurantEndTime: LocalDateTime? = null

    var restaurantCost: Int? = null
}
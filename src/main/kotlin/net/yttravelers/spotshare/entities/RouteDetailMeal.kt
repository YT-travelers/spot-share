package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.Table
import javax.persistence.*

@Entity
@Table(name = "routeDetailMeal")
class RouteDetailMeal {
    @Id
    var routeDetailId: Int? = null

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "routeDetailId")
    @MapsId
    lateinit var routeDetail: RouteDetail

    var mealMinutes: Int? = null

    var mealCost: Int? = null

    //TODO: 区分の設計
//    var mealKindDiv:
    //必要？
//    var mealKindDivName:
}
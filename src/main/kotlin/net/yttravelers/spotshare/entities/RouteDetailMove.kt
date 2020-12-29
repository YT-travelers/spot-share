package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.Table
import javax.persistence.*

@Entity
@Table(name = "routeDetailMove")
class RouteDetailMove {
    @Id
    var routeDetailId: Int? = null

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "routeDetailId")
    @MapsId
    lateinit var routeDetail: RouteDetail

    var moveMinutes: Int? = null

    //TODO: 区分の設計
//    var moveKindDiv:
    //必要？
//    var moveKindDivName:

    var moveCost: Int? = null

}
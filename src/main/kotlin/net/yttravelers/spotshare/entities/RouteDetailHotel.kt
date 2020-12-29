package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime
import javax.persistence.Table
import javax.persistence.*

@Entity
@Table(name = "routeDetailHotel")
class RouteDetailHotel {
    @Id
    var routeDetailId: Int? = null

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "routeDetailId")
    @MapsId
    lateinit var routeDetail: RouteDetail

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hotelId")
    lateinit var hotel: Hotel

    var hotelRate: Int? = null

    var hotelMinutes: Int? = null

    //TODO: 区分の設計
//    var hotelKindDiv:
    //必要？
//    var hotelKindDivName:

    var hotelCheckInTime: LocalDateTime? = null

    var hotelCheckOutTime: LocalDateTime? = null

    //TODO: 区分の設計
//    var hotelBreakfastYesNoDiv:

    //TODO: 区分の設計
//    var hotelDinnerYesNoDiv:

    var hotelCost: Int? = null
}
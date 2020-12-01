package net.yttravelers.spotshare.entities

import javax.persistence.*

@Entity
@Table(name = "hotel")
class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var hotelId: Int? = null

    @Column(nullable = false)
    var hotelName: String = ""

    //TODO: 区分の設計
//    var hotelKindDiv:

    var hotelSummary: String = ""

    var hotelAddress: String = ""

    var hotelUrl: String = ""

}
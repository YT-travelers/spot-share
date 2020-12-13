package net.yttravelers.spotshare.entities

import net.yttravelers.spotshare.entities.codes.HotelKindDiv
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
    @ManyToOne
    @JoinColumns(
        JoinColumn(name="hotelDivision", referencedColumnName="division"),
        JoinColumn(name="hotelDivKey", referencedColumnName="divKey")
    )
    var hotelKindDiv: HotelKindDiv? = null

    var hotelSummary: String = ""

    var hotelAddress: String = ""

    var hotelUrl: String = ""

}
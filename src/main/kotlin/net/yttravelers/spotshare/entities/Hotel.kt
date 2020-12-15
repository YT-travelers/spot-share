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

    @ManyToOne
    @JoinColumn(name="hotelKindDiv", referencedColumnName="divKey")
    var hotelKindDiv: HotelKindDiv? = null

    var hotelSummary: String = ""

    var hotelAddress: String = ""

    var hotelUrl: String = ""

}